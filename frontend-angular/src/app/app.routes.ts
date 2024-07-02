import { Routes } from '@angular/router';
import { PeliculasComponent } from './peliculas/peliculas.component';

export const appRoutes: Routes= [
  { path: '', component: PeliculasComponent },
  { path: 'peliculas', component: PeliculasComponent},
];