from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Usuario(models.Model):
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    dni = models.CharField(max_length=8, unique=True)
    telefono = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.username} - {self.email}"

class Pelicula(models.Model):
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    fecha_estreno = models.DateField()
    duracion = models.PositiveIntegerField()   # minutos
    director = models.CharField(max_length=100)
    poster_url = models.URLField(max_length=200)    # imagen
    trailer_url = models.URLField(max_length=200, default="")
    total_votos = models.PositiveIntegerField(default=0)
    promedio_votos = models.FloatField(default=0)
    tmdb_id = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return self.titulo

class Funcion(models.Model):
    pelicula = models.ForeignKey(Pelicula, on_delete=models.CASCADE)
    horario = models.DateTimeField()
    sala = models.CharField(max_length=50)
    asientos_ocupados = models.JSONField(default=list)

    def __str__(self):
        return f"{self.pelicula.titulo} - {self.horario}"

class Boleto(models.Model):
    funcion = models.ForeignKey(Funcion, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=50, choices=[("adulto", "Adulto"), ("niño", "Niño")])
    cantidad = models.PositiveIntegerField(default=0)
    monto_total = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    fecha_compra = models.DateTimeField(auto_now_add=True)
    codigo_compra = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.funcion.pelicula.titulo} - {self.usuario.username} - {self.fecha_compra}"
