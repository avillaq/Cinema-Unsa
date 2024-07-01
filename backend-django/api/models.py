from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Pelicula(models.Model):
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    fecha_estreno = models.DateField()
    duracion = models.PositiveIntegerField()   # minutos
    director = models.CharField(max_length=100)
    poster_url = models.URLField(max_length=200)    # imagen
    tmdb_id = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return self.titulo

class Funcion(models.Model):
    pelicula = models.ForeignKey(Pelicula, on_delete=models.CASCADE)
    horario = models.DateTimeField()
    sala = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.pelicula.titulo} - {self.horario}"

class Boleto(models.Model):
    funcion = models.ForeignKey(Funcion, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    asiento = models.CharField(max_length=10)
    fecha_compra = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.funcion.pelicula.titulo} - {self.asiento} - {self.usuario.username}"
