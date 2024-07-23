from django.contrib import admin

# Register your models here.
from .models import Pelicula, Funcion, Boleto, Usuario

admin.site.register(Pelicula)
admin.site.register(Funcion)
admin.site.register(Boleto)
admin.site.register(Usuario)
