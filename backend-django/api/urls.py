from django.urls import path
from .views import PeliculaLista, PeliculaDetalle, FuncionLista, FuncionDetalle, BoletoLista, BoletoDetalle

urlpatterns = [
    path('peliculas/', PeliculaLista.as_view(), name='pelicula-lista'),
    path('peliculas/<int:pk>/', PeliculaDetalle.as_view(), name='pelicula-detalle'),
    path('funciones/', FuncionLista.as_view(), name='funcion-lista'),
    path('funciones/<int:pk>/', FuncionDetalle.as_view(), name='funcion-detalle'),
    path('boletos/', BoletoLista.as_view(), name='boleto-lista'),
    path('boletos/<int:pk>/', BoletoDetalle.as_view(), name='boleto-detail'),
]

