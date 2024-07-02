import { Component } from '@angular/core';
import { PeliculasService} from '../peliculas.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  peliculas: any = [];
  constructor(private peliculaService: PeliculasService) {
    this.peliculas = this.peliculaService.getPeliculas().subscribe(data => {
      this.peliculas = data;
    });
  }
}