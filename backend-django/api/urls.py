from django.urls import path
from .views import PeliculaLista, PeliculaDetalle

urlpatterns = [
    path('peliculas/', PeliculaLista.as_view(), name='pelicula-lista'),
    path('peliculas/<int:id>/', PeliculaDetalle.as_view(), name='pelicula-detalle'),
]

