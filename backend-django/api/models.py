from django.db import models

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
