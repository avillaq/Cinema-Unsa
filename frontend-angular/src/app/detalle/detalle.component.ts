import { Component, Input, OnInit } from '@angular/core';
import { PeliculasService } from '../peliculas.service'; 
import { DatePipe } from '@angular/common'; // Importamos DatePipe para formatear fechas
import { FuncionesService } from '../funciones.service'; 
import { RouterLink } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import {YouTubePlayer} from '@angular/youtube-player';

// Definimos una interfaz para las funciones de películas
interface Funcion {
  id: number; // Identificador único de la función
  horario: string; 
  pelicula: number; 
  sala: number; 
}

@Component({
  selector: 'app-detalle', 
  standalone: true, 
  imports: [DatePipe, RouterLink, MatExpansionModule, YouTubePlayer],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css' 
})
export class DetalleComponent implements OnInit {
  // Decorador Input para recibir el ID de la película desde la url
  @Input("pelicula_id") pelicula_id: number = 0; 
  pelicula: any = {};
  funciones: { fecha: string; funciones: Funcion[]; }[] = []; // Array para almacenar funciones agrupadas por fecha

  @Input("cancel") cancel: string = ""; 

  constructor(private PeliculaService: PeliculasService, private FuncionesService: FuncionesService, private matsnackbar: MatSnackBar) { }

  // Método ngOnInit que se ejecuta al inicializar el componente
  ngOnInit() {
    // Llamada al servicio para obtener los detalles de la película
    this.PeliculaService.getPelicula(this.pelicula_id).subscribe(data => {
      this.pelicula = data; 
    });

    // Llamada al servicio para obtener las funciones de la película
    this.FuncionesService.getFunciones(this.pelicula_id).subscribe((data: Object) => {
      this.funciones = this.agruparFuncionesPorFecha(data as Funcion[]); // Agrupamos las funciones por fecha
    });

    // Si se cancela la compra, se muestra un mensaje
    if (this.cancel) {
      this.mostrarMensaje();
    }
    
  }

  // Método para agrupar funciones por fecha
  agruparFuncionesPorFecha(funciones: Funcion[]): { fecha: string; funciones: Funcion[]; }[] {
    const funcionesAgrupadas: { [fecha: string]: Funcion[] } = {}; // Objeto para agrupar funciones

    // Iteramos sobre cada función
    funciones.forEach((funcion: Funcion) => {
      // Obtenemos la fecha de la función en formato dd de mes de aaaa
      const fecha = new Date(funcion.horario).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
      if (!funcionesAgrupadas[fecha]) {
        funcionesAgrupadas[fecha] = [];
      }
      funcionesAgrupadas[fecha].push(funcion); // Añadimos la función al array de la fecha correspondiente
    });

    // Ordenamos las fechas en orden ascendente
    const fechasOrdenadas = Object.keys(funcionesAgrupadas).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    // Mapeamos el objeto agrupado a un array de objetos con fecha y funciones
    return fechasOrdenadas.map(fecha => ({
      fecha,
      funciones: funcionesAgrupadas[fecha].map(funcion => ({
        id: funcion.id,
        // Formateamos el horario
        horario: new Date(funcion.horario).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit'}),
        pelicula: funcion.pelicula,
        sala: funcion.sala,
      })),
    }));
  }

  mostrarMensaje() { // Método para mostrar mensaje de compra cancelada
    this.matsnackbar.open("Compra cancelada", "Ok", {
      duration: 3000,
    });
  }
  
  player: any; // Variable para almacenar el reproductor de YouTube
  onStateChange(event: any) {
    if (event.data === 1) {
      this.player = event.target;
    }
  }

  // Cuando el modal se cierra, pausamos el video
  pausarVideo() {
    this.player.pauseVideo();
  }

}
