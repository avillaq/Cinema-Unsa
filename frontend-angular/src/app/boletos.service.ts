import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments';

@Injectable({
  providedIn: 'root'
})
export class BoletosService {

  constructor(private http:HttpClient) { }

  registrarBoletos(datos:any){
    return this.http.post(`${environment.contentful.backendURL}/api/compra/boletos/`, datos)
    
  }

}
