import { Component } from '@angular/core';
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
    MatStepperModule,
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

  // Variables y Funciones para la selección de asientos (1 paso del stepper)

  listaAsientosSeleccionados: any []= [];
  numeroAsientosSeleccionados: number = 0;

  getArregloAsientos (totalAsientos:any) { 
    let arregloAsientos = [];
    for (let index = 1; index <= totalAsientos; index++) {
      arregloAsientos.push(index)
    }
    return arregloAsientos;
  }






}
