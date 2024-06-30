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
