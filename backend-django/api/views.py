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

class FuncionListCreate(generics.ListCreateAPIView):
    queryset = Funcion.objects.all()
    serializer_class = FuncionSerializer

class FuncionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Funcion.objects.all()
    serializer_class = FuncionSerializer

class BoletoListCreate(generics.ListCreateAPIView):
    queryset = Boleto.objects.all()
    serializer_class = BoletoSerializer

class BoletoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Boleto.objects.all()
    serializer_class = BoletoSerializer