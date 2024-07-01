from django.urls import path
from .views import PeliculaLista, PeliculaDetalle, BoletoLista, BoletoDetalle, FuncionListaPorPelicula, FuncionDetallePorPelicula

urlpatterns = [
    path('peliculas/', PeliculaLista.as_view(), name='pelicula-lista'),
    path('peliculas/<int:pk>/', PeliculaDetalle.as_view(), name='pelicula-detalle'),
    path('peliculas/<int:pelicula_id>/funciones/', FuncionListaPorPelicula.as_view(), name='funcion-lista-por-pelicula'),
    path('peliculas/<int:pelicula_id>/funciones/<int:pk>/', FuncionDetallePorPelicula.as_view(), name='funcion-detalle-por-pelicula'),
    path('boletos/', BoletoLista.as_view(), name='boleto-lista'),
    path('boletos/<int:pk>/', BoletoDetalle.as_view(), name='boleto-detail'),
]

