import { Routes } from '@angular/router';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DetalleComponent } from './detalle/detalle.component';
import { FuncionDetalleComponent } from './funcion-detalle/funcion-detalle.component';

export const appRoutes: Routes= [
  { path: '', component: PeliculasComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'peliculas', component: PeliculasComponent},
  { path: 'peliculas/:pelicula_id', component: DetalleComponent},
  { path: 'peliculas/:pelicula_id/funciones/:funcion_id', component: FuncionDetalleComponent},
  
];