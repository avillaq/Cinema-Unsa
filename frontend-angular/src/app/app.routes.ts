import { Routes } from '@angular/router';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { RankingComponent } from './ranking/ranking.component';
import { DetalleComponent } from './detalle/detalle.component';
import { FuncionDetalleComponent } from './funcion-detalle/funcion-detalle.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';

export const appRoutes: Routes= [
  { path: '', component: PeliculasComponent },
  { path: 'peliculas', component: PeliculasComponent},
  { path: 'peliculas/ranking', component: RankingComponent},
  { path: 'peliculas/:pelicula_id', component: DetalleComponent},
  { path: 'peliculas/:pelicula_id/funciones/:funcion_id', component: FuncionDetalleComponent},
  { path: 'pago/confirmacion', component: ConfirmacionComponent },
];