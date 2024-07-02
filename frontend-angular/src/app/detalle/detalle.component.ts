import { Component, Input,OnInit, numberAttribute } from '@angular/core';
import { PeliculasService } from '../peliculas.service';
import { DatePipe } from '@angular/common';

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
  constructor(private PeliculaService: PeliculasService) {}

  ngOnInit() {
    this.PeliculaService.getPelicula(this.pelicula_id).subscribe(data => {
      this.pelicula = data;
    });
    
  }
}