import { Component, Input, OnInit } from '@angular/core';
import { PagosService } from '../pagos.service';
import { RouterLink } from '@angular/router';
import { S } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './confirmacion.component.html',
  styleUrl: './confirmacion.component.css'
})
export class ConfirmacionComponent implements OnInit{
  @Input("session_id") session_id: string = "";
  url_imagen: string = "../assets/img/confirmacion.png";
  datos_pago: any = {};
  constructor(private pagosService:PagosService) { }

  ngOnInit() {
    this.pagosService.getDatosPago(this.session_id).subscribe(
      (data: any) => {
        if(data.status == "complete"){
          this.datos_pago = data;
        }
      }
    );
  }

  descargarRecibo(): void {
    this.pagosService.generarReciboPDF().subscribe((response: any) => {
      let archivoBlob = new Blob([response], { type: "application/pdf" });
      let url = window.URL.createObjectURL(archivoBlob);
      let link = document.createElement("a");
      link.href = url;
      link.download = "Recibo_Compra.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
      console.log(this.filtrarDatosPago());
    });
  }

  filtrarDatosPago(): any {
    let datos = {
      nombre : this.datos_pago.customer_details.name,
      email : this.datos_pago.customer_details.email,
      dni : this.datos_pago.custom_fields[0].numeric.value,
      telefono : this.datos_pago.customer_details.phone,

      pelicula : this.datos_pago.metadata.pelicula,
      sala : this.datos_pago.metadata.sala,
      butacas : this.datos_pago.metadata.asientos,
      fecha: this.datos_pago.metadata.fecha,
      hora : this.datos_pago.metadata.hora,
      boletos: JSON.parse(this.datos_pago.metadata.boletos.replace(/'/g, '"')),

      monto: this.datos_pago.metadata.total,
    };
    return datos;
  }
}
