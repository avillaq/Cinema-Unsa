from rest_framework import serializers
from .models import Pelicula, Funcion, Boleto

class PeliculaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pelicula
        fields = '__all__'

class FuncionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funcion
        fields = '__all__'

class BoletoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boleto
        fields = '__all__'