import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import {AsyncPipe} from '@angular/common';

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
export class FuncionDetalleComponent {


  // Orientación del stepper
  stepperOrientation: Observable<StepperOrientation>;

  // Constructor que se encarga de la orientación del stepper: horizontal o vertical
  constructor(breakpointObserver: BreakpointObserver, ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  // Variables que almacenarán la información de la funcion
  titulo: string = '';
  descripcion: string = '';
  imagen: string = '';
  sala: string = '06';
  asientos: any[] = [
    {fila:'A', totalAsientos: 8},
    {fila:'B', totalAsientos: 8},
    {fila:'C', totalAsientos: 8}, 
    {fila:'D', totalAsientos: 8}
  ];
  fecha = "15 de Julio, 2027";
  hora = "7:00 PM";


  // (3 paso) Formulario para el pago de los boletos 
  formulario: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    correo: new FormControl('')
  });


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





}
