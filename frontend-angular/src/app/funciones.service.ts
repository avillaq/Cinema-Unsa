import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {
  constructor( private http: HttpClient ) {}

  getFunciones(id: number) {
    return this.http.get(`${environment.contentful.backendURL}/api/peliculas/` + id + "/funciones/")
    
  }
  getFuncion(id_peli: number, id_funcion: number) {
    return this.http.get(`${environment.contentful.backendURL}/api/peliculas/` + id_peli + "/funciones/" + id_funcion + "/")
  }

}