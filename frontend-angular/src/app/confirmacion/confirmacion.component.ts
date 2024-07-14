import { Component, Input, OnInit } from '@angular/core';
import { PagosService } from '../pagos.service';
@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [],
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
          alert("Pago completado con éxito");
          console.log(data);
        }
      }
    );
  }
}
