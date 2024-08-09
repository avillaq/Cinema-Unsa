import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { map } from 'rxjs';
import { environment } from '../environments';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  constructor( private http: HttpClient ) {}

  private stripeAPIKey: any = environment.contentful.stripeAPIKey;

  procesarPago(Datos: any) {
    return this.http.post(`${environment.contentful.backendURL}/api/compra/create-checkout-session/`, Datos).pipe(
      map(async (res: any) => {
        const stripe = await loadStripe(this.stripeAPIKey);
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      }
    ));

  }

  getDatosPago(session_id: string) {
    return this.http.get("https://cinemaunsa-api.up.railway.app/api/compra/get-session-data/"+session_id);
  }

  generarReciboPDF(datosCompra: any) {
    return this.http.post("https://cinemaunsa-api.up.railway.app/api/compra/generar-recibo/", datosCompra,{
      responseType: "blob"
    });
  }
  enviarCorreo(datosCompra: any) {
    return this.http.post("https://cinemaunsa-api.up.railway.app/api/compra/enviar-correo/", datosCompra);
  }

}
