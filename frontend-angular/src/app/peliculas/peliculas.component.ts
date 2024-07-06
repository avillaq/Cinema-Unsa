import { Component } from '@angular/core';
import { PeliculasService} from '../peliculas.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent {
  peliculas: any = [];
  constructor(private peliculaService: PeliculasService) {
    this.peliculaService.getPeliculas().subscribe(data => {
      this.peliculas = data;
    });
  }
}