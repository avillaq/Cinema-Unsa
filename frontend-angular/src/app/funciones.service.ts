import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {
  constructor( private http: HttpClient ) {}

  getFunciones(id: number) {
    return this.http.get("https://proyecto-pw2-backend-production.up.railway.app/api/peliculas/" + id + "/funciones/")
    
  }
  getFuncion(id_peli: number, id_funcion: number) {
    return this.http.get("https://proyecto-pw2-backend-production.up.railway.app/api/peliculas/" + id_peli + "/funciones/" + id_funcion + "/")
  }

}