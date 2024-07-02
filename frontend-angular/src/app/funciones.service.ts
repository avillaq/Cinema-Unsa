import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {
  constructor( private http: HttpClient ) {}

  getFunciones(id: number) {
    return this.http.get("http://127.0.0.1:8000/api/peliculas/" + id + "/funciones/")
    
  }
  getFuncion(id_peli: number, id_funcion: number) {
    return this.http.get("http://127.0.0.1:8000/api/peliculas/" + id_peli + "/funciones/" + id_funcion + "/")
  }

}