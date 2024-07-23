from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .models import Pelicula, Funcion, Boleto, Usuario
from .serializers import PeliculaSerializer, FuncionSerializer, BoletoSerializer

import stripe
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import json

from django.http import HttpResponse
from .renderes import render_to_pdf, render_html
from django.core.mail import EmailMultiAlternatives
from datetime import date
import locale
from django.db.models import Avg
import uuid

# configuracion para obtener los nombres de los meses en español
locale.setlocale(locale.LC_TIME, 'es_ES.UTF-8')

stripe.api_key = settings.STRIPE_SECRET_KEY # Clave secreta de stripe

class PeliculaLista(generics.ListCreateAPIView):
    queryset = Pelicula.objects.all()
    serializer_class = PeliculaSerializer

class PeliculaDetalle(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pelicula.objects.all()
    serializer_class = PeliculaSerializer

class FuncionListaPorPelicula(generics.ListCreateAPIView):
    serializer_class = FuncionSerializer
    def get_queryset(self):
        pelicula_id = self.kwargs['pelicula_id']
        return Funcion.objects.filter(pelicula_id=pelicula_id)

class FuncionDetallePorPelicula(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FuncionSerializer
    def get_queryset(self):
        pelicula_id = self.kwargs['pelicula_id']
        return Funcion.objects.filter(pelicula_id=pelicula_id)

# Vista para crear la sesión de pago
@csrf_exempt
@api_view(['POST'])
def create_checkout_session(request):
    data = request.data["boletos"]
    compras = [ 
        { 'price_data': 
         { 'currency': 'pen',
           'product_data': { 'name': f"Boleto {boleto['tipo']}" }, 
           'unit_amount': int(boleto['precio'] * 100), 
         }, 'quantity': int(boleto['cantidad']), 
        } for boleto in data ]
    try:
        # Serializar los valores de metadata a cadenas JSON
        metadata = {key: json.dumps(value) if isinstance(value, dict) else str(value) for key, value in request.data.items()}

        checkout_session = stripe.checkout.Session.create(
            line_items=compras,
            phone_number_collection={"enabled": True},
            mode='payment',
            success_url='http://localhost:4200/pago/confirmacion?session_id={CHECKOUT_SESSION_ID}',
            cancel_url='http://localhost:4200/',
            custom_fields=[
                {
                    "key": "DNI",
                    "label": {"type": "custom", "custom": "Numero de DNI"},
                    "type": "numeric",
                    "numeric": {"minimum_length": 8, "maximum_length": 8, "default_value": 11111111},
                },
            ],
            metadata=metadata,
        )
        return Response({'id': checkout_session.id})
    except Exception as e:
        return Response({'error': str(e)}, status=500)

# Obtener los datos de la sesión de pago
@api_view(['GET'])
def get_session_data(request, session_id):
    try:
        session = stripe.checkout.Session.retrieve(session_id)
        return Response(session)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

# Generar el PDF del recibo de compra
@api_view(['POST'])
def generate_pdf(request):
    context = request.data
    context["fecha_actual"] = date.today().strftime("%d de %B de %Y")
    pdf = render_to_pdf('invoice.html', context)
    if pdf:
        response = HttpResponse(pdf, content_type='application/pdf')
        filename = "Recibo_Compra.pdf"
        response['Content-Disposition'] = f'attachment; filename={filename}'
        return response
    return HttpResponse("Not found", status=404)

# Crear y Listar los boletos cuando se haya pagado
class BoletoListaRegistrar(generics.ListCreateAPIView):
    queryset = Boleto.objects.all()
    serializer_class = BoletoSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        respuesta = []
        # Creamos al usuario si no existe
        user, created = Usuario.objects.get_or_create(
            username=data["nombre"],
            email=data["email"],
            dni=data["dni"],
            telefono=data["telefono"]
        )
        funcion = Funcion.objects.get(pk=data["funcion"])
        # Generamos un código de compra único para poder diferenciar la compra
        codigo_compra = str(uuid.uuid4())

        boletos = data["boletos"]
        for boleto in boletos:
            tipo = boleto["tipo"]
            cantidad = boleto["cantidad"]
            monto_total = boleto["monto"]

            boleto = Boleto.objects.create(funcion=funcion, usuario=user, tipo=tipo, cantidad=cantidad, monto_total=monto_total, codigo_compra=codigo_compra)
            respuesta.append(boleto)

        # Actualizamos los asientos ocupados
        asientos_ocupar = data["asientos"].split(", ")

        funcion.asientos_ocupados.extend(asientos_ocupar)
        funcion.save()

        # Serializamos los objetos de la lista "respuesta"
        serializer = BoletoSerializer(respuesta, many=True)
        return Response(serializer.data, status=201)

# Ranking de películas
class PeliculaListaRanking(generics.ListAPIView):
    serializer_class = PeliculaSerializer

    def get_queryset(self):
        peliculas = Pelicula.objects.all()
        m = 100  # Impacto que tiene el número de votos en el ranking
        C = peliculas.aggregate(C=Avg("promedio_votos"))["C"]  # Calificacion promedio de todas las películas

        ranking = []

        for pelicula in peliculas:
            if pelicula.total_votos < m:
                continue
            v = pelicula.total_votos
            R = pelicula.promedio_votos
            WR = (v / (v + m)) * R + (m / (v + m)) * C
            ranking.append((pelicula, WR))

        # Ordenamos el ranking de mayor a menor
        ranking.sort(key=lambda elemento: elemento[1], reverse=True)
        ranked_peliculas = [pelicula[0] for pelicula in ranking]

        return ranked_peliculas

# Vista para enviar correo con el recibo de compra
@api_view(['POST'])
def enviar_correo(request):
    context = request.data
    context["fecha_actual"] = date.today().strftime("%d de %B de %Y")
    pdf = render_to_pdf('invoice.html', context)
    if pdf:
        # Configuracion del template del correo
        contenido = render_html("correo.html", context)
        # Enviamos el correo
        email = context["email"]
        asunto = "Recibo de compra - CinemaUNSA"
        mensaje = "Gracias por su compra"
        pdf_content = pdf.content

        # Enviamos el correo con el recibo de compra
        msg = EmailMultiAlternatives(asunto, mensaje, settings.EMAIL_HOST_USER, [email])
        msg.attach_alternative(contenido, "text/html")
        msg.attach("Recibo_Compra.pdf", pdf_content, "application/pdf")
        msg.send()

        return Response({"mensaje": "Correo enviado"}, status=200)
    return Response({"mensaje": "Error al enviar el correo"}, status=500)