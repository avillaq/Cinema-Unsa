import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  constructor( private http: HttpClient ) {}

  getPeliculas() {
    return this.http.get('http://127.0.0.1:8000/api/peliculas/')
    
  }
  getPelicula(id: number) {
    return this.http.get("http://127.0.0.1:8000/api/peliculas/" + id + "/") 
  }
}