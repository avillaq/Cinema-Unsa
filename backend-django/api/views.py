from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .models import Pelicula, Funcion, Boleto
from .serializers import PeliculaSerializer, FuncionSerializer, BoletoSerializer

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