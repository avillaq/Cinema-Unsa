import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  constructor( private http: HttpClient ) {}

  getPeliculas() {
    return this.http.get('https://proyecto-pw2-backend-production.up.railway.app/api/peliculas/')
    
  }
  getPelicula(id: number) {
    return this.http.get("https://proyecto-pw2-backend-production.up.railway.app/api/peliculas/" + id + "/") 
  }
  getRankingPeliculas() {
    return this.http.get("https://proyecto-pw2-backend-production.up.railway.app/api/peliculas/ranking") 
  }
}