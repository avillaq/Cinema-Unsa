import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoletosService {

  constructor(private http:HttpClient) { }

  registrarBoletos(datos:any){
    return this.http.post("http://127.0.0.1:8000/api/compra/boletos/", datos)
    
  }

}
