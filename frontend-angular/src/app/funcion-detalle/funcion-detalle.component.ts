import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import {AsyncPipe} from '@angular/common';
import { OnInit } from '@angular/core';

import { FuncionesService } from '../funciones.service';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-funcion-detalle',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatButtonModule,
    AsyncPipe
  ],
  templateUrl: './funcion-detalle.component.html',
  styleUrl: './funcion-detalle.component.css'
})
export class FuncionDetalleComponent implements OnInit{


  // Orientación del stepper
  stepperOrientation: Observable<StepperOrientation>;

  // Constructor que se encarga de la orientación del stepper: horizontal o vertical
  constructor(private formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private funcionesService: FuncionesService, private peliculasService: PeliculasService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  // Variables que almacenarán la información de la funcion
  titulo: string = '';
  descripcion: string = '';
  imagen: string = '';
  sala: string = '';
  asientos: any[] = [
    {fila:'A', totalAsientos: 8},
    {fila:'B', totalAsientos: 8},
    {fila:'C', totalAsientos: 8}, 
    {fila:'D', totalAsientos: 8}
  ];
  fecha = "";
  hora = "";

  


  // (3 paso) Formulario para el pago de los boletos 
  formulario: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    correo: new FormControl('')
  });

  ngOnInit() {
    this.peliculasService.getPelicula(3).subscribe((data: any) => {
      console.log(data);
    });

    this.funcionesService.getFuncion(3,4).subscribe((data: any) => {
      console.log(data);
      
    });


    this.titulo = 'Este es un titulo';
    this.descripcion = 'La descripcion es este , fecha, hora .  La descripcion es este , fecha, hora. La descripcion es este , fecha, hora. La descripcion es este , fecha, hora';
    this.imagen = 'https://cdn.pixabay.com/photo/2016/10/26/22/02/dog-1772759_1280.jpg';
    this.sala = '06';
    this.fecha = "15 de Julio, 2027";
    this.hora = "7:00 PM";

    // (3 paso) Validación del formulario de pago  
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]]
    });
    
  }


  // Variables y Funciones para la selección de asientos (1 paso del stepper)

  listaAsientosSeleccionados: any []= [];
  numeroAsientosSeleccionados: number = 0;
  codigosAsientosSeleccionados: string = '';

  getArregloAsientos (totalAsientos:any) { 
    let arregloAsientos = [];
    for (let index = 1; index <= totalAsientos; index++) {
      arregloAsientos.push(index)
    }
    return arregloAsientos;
  }

  reservarAsiento(letraFila:any, numeroAsiento:any) {
    // Si el asiento NO está reservado, se agrega a la lista de asientos reservados
    if(!this.revisarAsientoReservado(letraFila,numeroAsiento)) {
      
      const asiento = {
        letraFila: letraFila,
        numeroAsiento: numeroAsiento
      };
      this.listaAsientosSeleccionados.push(asiento)
      this.numeroAsientosSeleccionados++;
      this.mostrarCodigoAsientosSeleccionados();

    } else {  // Si el asiento ya está reservado, se elimina de la lista de asientos reservados
      const indice =  this.listaAsientosSeleccionados.findIndex(m=>m.letraFila === letraFila && m.numeroAsiento === numeroAsiento);
      this.listaAsientosSeleccionados.splice(indice,1) 
      this.numeroAsientosSeleccionados--;
      this.mostrarCodigoAsientosSeleccionados();
    } 
  }

  revisarAsientoReservado(letraFila:any,numeroAsiento:any) {
    const datoReserva =  this.listaAsientosSeleccionados.find(m=>m.letraFila === letraFila && m.numeroAsiento === numeroAsiento);
    if(datoReserva == undefined) {
      return false
    }  
    return true;
  }

  mostrarCodigoAsientosSeleccionados() {
    this.codigosAsientosSeleccionados = '';
    this.listaAsientosSeleccionados.forEach(asiento => {
      this.codigosAsientosSeleccionados += asiento.letraFila + asiento.numeroAsiento + ', ';
    });
    this.codigosAsientosSeleccionados = this.codigosAsientosSeleccionados.slice(0, -2);
  }

  primerPasoValido() {
    return this.numeroAsientosSeleccionados > 0;
  }

  // (2 paso)
  precioBoletoAdulto: number = 10.0;
  precioBoletoNino: number = 5.0;

  contidadBoletosAdultos: number = 0;
  contidadBoletosNinos: number = 0;

  pagoTotal:number = 0.0;

  aumentarCantidadBoletos(tipo: string) {
    const totalBoletos = this.contidadBoletosAdultos + this.contidadBoletosNinos;
    if (totalBoletos < this.numeroAsientosSeleccionados) {
      if (tipo === 'adultos') {
        this.contidadBoletosAdultos++;
        this.pagoTotal += this.precioBoletoAdulto;
      } else if (tipo === 'ninos'){
        this.contidadBoletosNinos++;
        this.pagoTotal += this.precioBoletoNino;
      }
    }

  }
  
  disminuirCantidadBoletos(tipo: string) {
    if (tipo === 'adultos' && this.contidadBoletosAdultos > 0) {
      this.contidadBoletosAdultos--;
      this.pagoTotal -= this.precioBoletoAdulto;
    } else if (tipo === 'ninos' && this.contidadBoletosNinos > 0) {
      this.contidadBoletosNinos--;
      this.pagoTotal -= this.precioBoletoNino;
    }
  }

  segundoPasoValido() {
    return this.primerPasoValido() && (this.contidadBoletosAdultos + this.contidadBoletosNinos) === this.numeroAsientosSeleccionados;
  }

  // (3 paso)
  onSubmit(): void {
    if (this.formulario.valid) {
      console.log("Datos del formulario");
      console.log(this.formulario.value.nombre);
      console.log(this.formulario.value.correo);
      console.log("Pelicula: " + this.titulo);
      console.log("Sala: " + this.sala);
      console.log("fecha: " + this.fecha);
      console.log("Hora: " + this.hora);
      console.log("Tipo de boletos: Adultos: " + this.contidadBoletosAdultos + " Niños: " + this.contidadBoletosNinos);
      console.log("Asientos: " + this.codigosAsientosSeleccionados);
      console.log("Total a pagar: " + this.pagoTotal);

      alert("Boletos Comprados Exitosamente!");
    }
  }

}
