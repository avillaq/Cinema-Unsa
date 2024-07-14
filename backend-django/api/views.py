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
    compras = [ { 'price_data': { 'currency': 'pen', 'product_data': { 'name': boleto['nombre'] }, 'unit_amount': int(boleto['precio'] * 100), }, 'quantity': int(boleto['cantidad']), } for boleto in data ]
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=compras,
            mode='payment',
            success_url='http://localhost:4200/',
            cancel_url='http://localhost:4200/',
        )
        return Response({'id': checkout_session.id})
    except Exception as e:
        return Response({'error': str(e)}, status=500)

# Esta vista sirve para crear los boletos cuando se haya paguado
# Despues de crear los boletos, se debe actualizar la cantidad de asientos disponibles
# class CrearBoletos():


# Esta vista sirve para listar cuando se haya paguado los boletos
class BoletoListaPorFuncion(generics.ListCreateAPIView):
    serializer_class = BoletoSerializer

    def get_queryset(self):
        funcion_id = self.kwargs['funcion_id']
        # Despues se va a cambiar este metodo de autenticacion
        email_usuario = self.request.data.get('email_usuario')
        usuario = User.objects.get(email=email_usuario) 
        return Boleto.objects.filter(funcion_id=funcion_id, usuario=usuario)