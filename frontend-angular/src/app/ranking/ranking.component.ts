import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../peliculas.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent implements OnInit {
  peliculas: any;
  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    this.peliculasService.getRankingPeliculas().subscribe((data: any) => {
      this.peliculas = data;
    });
  }
}
