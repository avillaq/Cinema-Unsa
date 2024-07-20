from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .models import Pelicula, Funcion, Boleto
from .serializers import PeliculaSerializer, FuncionSerializer, BoletoSerializer

import stripe
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import json

from django.http import HttpResponse
from .renderes import render_to_pdf 
from datetime import date

stripe.api_key = settings.STRIPE_SECRET_KEY

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

@api_view(['GET'])
def get_session_data(request, session_id):
    try:
        session = stripe.checkout.Session.retrieve(session_id)
        return Response(session)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
def generate_pdf(request):
    context = request.data
    context["fecha_actual"] = date.today().strftime("%d/%m/%y")
    pdf = render_to_pdf('invoice.html', context)
    if pdf:
        response = HttpResponse(pdf, content_type='application/pdf')
        filename = "Recibo_Compra.pdf"
        response['Content-Disposition'] = f'attachment; filename={filename}'
        return response
    return HttpResponse("Not found", status=404)

# Crear y Listar los boletos cuando se haya paguado
class BoletoLista(generics.ListCreateAPIView):
    queryset = Boleto.objects.all()
    serializer_class = BoletoSerializer