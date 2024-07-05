import { Routes } from '@angular/router';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { DetalleComponent } from './detalle/detalle.component';

export const appRoutes: Routes= [
  { path: '', component: PeliculasComponent },
  { path: 'peliculas', component: PeliculasComponent},
  { path: 'peliculas/:pelicula_id', component: DetalleComponent},
  { path: 'peliculas/:pelicula_id/funciones/:funcion_id', component: DetalleComponent},
];