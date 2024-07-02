import { Component, Input,OnInit, numberAttribute,NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { PeliculasService } from '../peliculas.service';
import { DatePipe } from '@angular/common';
import { FuncionesService } from '../funciones.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit{
  @Input("pelicula_id") pelicula_id: number = 0;
  pelicula: any = {};
  funciones: any = [];
  constructor(private PeliculaService: PeliculasService, private FuncionesService: FuncionesService) {}


  ngOnInit() {
    this.PeliculaService.getPelicula(this.pelicula_id).subscribe(data => {
      this.pelicula = data;
    });
    this.FuncionesService.getFunciones(this.pelicula_id).subscribe(data => {
      this.funciones = data;
      console.log(this.funciones);
    });

  }
  agruparFuncionesPorFecha(funciones:any) {
    const funcionesAgrupadas:any = {};
    funciones.forEach((funcion: any) => {
      const fecha = new Date(funcion.horario).toDateString();
      if (!funcionesAgrupadas[fecha]) {
        funcionesAgrupadas[fecha] = [];
      }
      funcionesAgrupadas[fecha].push(funcion);
    });
    return funcionesAgrupadas;
  }
}