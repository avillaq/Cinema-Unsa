import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  constructor( private http: HttpClient ) {}

  getPeliculas() {
    return this.http.get(`${environment.contentful.backendURL}/api/peliculas/`)
    
  }
  getPelicula(id: number) {
    return this.http.get(`${environment.contentful.backendURL}/api/peliculas/` + id + "/") 
  }
  getRankingPeliculas() {
    return this.http.get(`${environment.contentful.backendURL}/api/peliculas/ranking`) 
  }
}