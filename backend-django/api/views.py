from django.shortcuts import render

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

class BoletoLista(generics.ListCreateAPIView):
    queryset = Boleto.objects.all()
    serializer_class = BoletoSerializer

class BoletoDetalle(generics.RetrieveUpdateDestroyAPIView):
    queryset = Boleto.objects.all()
    serializer_class = BoletoSerializer