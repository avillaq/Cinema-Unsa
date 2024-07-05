import { Component, Input, OnInit } from '@angular/core'; // Importamos lo necesario desde Angular
import { PeliculasService } from '../peliculas.service'; // Importamos el servicio de películas
import { DatePipe } from '@angular/common'; // Importamos DatePipe para formatear fechas
import { FuncionesService } from '../funciones.service'; // Importamos el servicio de funciones
import { RouterLink } from '@angular/router';

// Definimos una interfaz para las funciones de películas
interface Funcion {
  id: number; // Identificador único de la función
  horario: string; // Horario de la función en formato de string
  pelicula: number; // Identificador de la película asociada
  sala: number; // Identificador de la sala donde se proyecta la película
}

// Definimos el componente DetalleComponent
@Component({
  selector: 'app-detalle', // Nombre del selector para usar este componente en HTML
  standalone: true, // Indica que el componente es autónomo
  imports: [DatePipe, RouterLink], // Importa DatePipe para usar en el template
  templateUrl: './detalle.component.html', // Ruta al archivo de template HTML
  styleUrl: './detalle.component.css' // Ruta al archivo de estilos CSS
})
export class DetalleComponent implements OnInit { // Clase del componente que implementa OnInit
  @Input("pelicula_id") pelicula_id: number = 0; // Decorador Input para recibir el ID de la película desde el componente padre
  pelicula: any = {}; // Objeto para almacenar los detalles de la película
  funciones: { fecha: string; funciones: Funcion[]; }[] = []; // Array para almacenar funciones agrupadas por fecha

  // Constructor que inyecta los servicios PeliculasService y FuncionesService
  constructor(private PeliculaService: PeliculasService, private FuncionesService: FuncionesService) { }

  // Método para agrupar funciones por fecha
  agruparFuncionesPorFecha(funciones: Funcion[]): { fecha: string; funciones: Funcion[]; }[] {
    const funcionesAgrupadas: { [fecha: string]: Funcion[] } = {}; // Objeto para agrupar funciones

    // Iteramos sobre cada función
    funciones.forEach((funcion: Funcion) => {
      const fecha = new Date(funcion.horario).toDateString(); // Convertimos el horario a una fecha legible
      if (!funcionesAgrupadas[fecha]) {
        funcionesAgrupadas[fecha] = []; // Inicializamos el array si no existe para la fecha
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
        horario: new Date(funcion.horario).getHours() + ':' + new Date(funcion.horario).getMinutes(), // Formateamos el horario
        pelicula: funcion.pelicula,
        sala: funcion.sala,
      })),
    }));
  }

  // Método ngOnInit que se ejecuta al inicializar el componente
  ngOnInit() {
    // Llamada al servicio para obtener los detalles de la película
    this.PeliculaService.getPelicula(this.pelicula_id).subscribe(data => {
      this.pelicula = data; // Asignamos los datos de la película a la propiedad
    });

    // Llamada al servicio para obtener las funciones de la película
    this.FuncionesService.getFunciones(this.pelicula_id).subscribe((data: Object) => {
      this.funciones = this.agruparFuncionesPorFecha(data as Funcion[]); // Agrupamos las funciones por fecha
      console.log(this.funciones, typeof (this.funciones)); // Imprimimos las funciones en consola para depuración
    });
  }
}
