from django.contrib import admin

# Register your models here.
from .models import Pelicula, Funcion, Boleto

admin.site.register(Pelicula)
admin.site.register(Funcion)
admin.site.register(Boleto)
