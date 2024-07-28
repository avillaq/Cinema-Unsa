import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoletosService {

  constructor(private http:HttpClient) { }

  registrarBoletos(datos:any){
    return this.http.post("https://cinemaunsa-api.up.railway.app/api/compra/boletos/", datos)
    
  }

}
