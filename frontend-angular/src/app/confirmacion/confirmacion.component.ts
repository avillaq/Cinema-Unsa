import { Component, Input, OnInit } from '@angular/core';
import { PagosService } from '../pagos.service';
import { BoletosService } from '../boletos.service';
import { RouterLink } from '@angular/router';

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
  datosFiltrados: any = {};
  constructor(private pagosService:PagosService, private boletosService:BoletosService) { }

  ngOnInit() {
    let estadoGuardado = localStorage.getItem("estado"+this.session_id);
    if (!estadoGuardado) {
      this.pagosService.getDatosPago(this.session_id).subscribe(
        (data: any) => {
          if (data.status == "complete") {
            this.filtrarDatosPago(data);
            this.registrarBoletos();
            localStorage.setItem("estado"+this.session_id, 'true');
          }
        }
      );
    }
  }

  descargarRecibo(): void {
    this.pagosService.generarReciboPDF(this.datosFiltrados).subscribe((response: any) => {
      let archivoBlob = new Blob([response], { type: "application/pdf" });
      let url = window.URL.createObjectURL(archivoBlob);
      let link = document.createElement("a");
      link.href = url;
      link.download = "Recibo_Compra.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
  registrarBoletos(): void {
    this.boletosService.registrarBoletos(this.datosFiltrados).subscribe(
      (data: any) => {
        console.log(data);
      }
    );
  }


  filtrarDatosPago(data:any): any {
    let datos = {
      nombre : data.customer_details.name,
      email : data.customer_details.email,
      dni : data.custom_fields[0].numeric.value,
      telefono : data.customer_details.phone,

      pelicula : data.metadata.pelicula,
      sala : data.metadata.sala,
      asientos : data.metadata.asientos,
      fecha: data.metadata.fecha,
      hora : data.metadata.hora,
      boletos: JSON.parse(data.metadata.boletos.replace(/'/g, '"')),
      funcion: data.metadata.funcion,

      total_monto: data.metadata.total,
    };
    this.datosFiltrados = datos;
  }
}
