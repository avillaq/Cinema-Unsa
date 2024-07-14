from django.urls import path
from .views import PeliculaLista, PeliculaDetalle, FuncionListaPorPelicula, FuncionDetallePorPelicula, BoletoListaPorFuncion, create_checkout_session, get_session_data, generate_pdf
urlpatterns = [
    path('peliculas/', PeliculaLista.as_view(), name='pelicula-lista'),
    path('peliculas/<int:pk>/', PeliculaDetalle.as_view(), name='pelicula-detalle'),
    path('peliculas/<int:pelicula_id>/funciones/', FuncionListaPorPelicula.as_view(), name='funcion-lista-por-pelicula'),
    path('peliculas/<int:pelicula_id>/funciones/<int:pk>/', FuncionDetallePorPelicula.as_view(), name='funcion-detalle-por-pelicula'),
    path('funciones/<int:funcion_id>/boletos/', BoletoListaPorFuncion.as_view(), name='boleto-lista-por-funcion'),
    path('create-checkout-session/', create_checkout_session, name='create-checkout-session'),
    path('get-session-data/<str:session_id>/', get_session_data, name='get-session-data'),
    path('generar-recibo/', generate_pdf, name='generate_pdf'),
]

