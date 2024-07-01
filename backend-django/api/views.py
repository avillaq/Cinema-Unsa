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

class FuncionLista(generics.ListCreateAPIView):
    queryset = Funcion.objects.all()
    serializer_class = FuncionSerializer

class FuncionDetalle(generics.RetrieveUpdateDestroyAPIView):
    queryset = Funcion.objects.all()
    serializer_class = FuncionSerializer

class BoletoLista(generics.ListCreateAPIView):
    queryset = Boleto.objects.all()
    serializer_class = BoletoSerializer

class BoletoDetalle(generics.RetrieveUpdateDestroyAPIView):
    queryset = Boleto.objects.all()
    serializer_class = BoletoSerializer