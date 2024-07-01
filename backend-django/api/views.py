from django.shortcuts import render

from rest_framework import generics
from .models import Pelicula
from .serializers import PeliculaSerializer

class PeliculaListCreate(generics.ListCreateAPIView):
    queryset = Pelicula.objects.all()
    serializer_class = PeliculaSerializer

class PeliculaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pelicula.objects.all()
    serializer_class = PeliculaSerializer
