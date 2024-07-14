import { Component, Input, OnInit } from '@angular/core';
import { PagosService } from '../pagos.service';
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

  constructor(private pagosService:PagosService) { }

  ngOnInit() {
    this.pagosService.getDatosPago(this.session_id).subscribe(
      (data: any) => {
        if(data.status == "complete"){
          console.log(data.customer_details.name);
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
    });
  }
}
