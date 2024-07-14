import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import {AsyncPipe} from '@angular/common';

import { FuncionesService } from '../funciones.service';
import { PeliculasService } from '../peliculas.service';
import { PagosService } from '../pagos.service';

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
  constructor(private formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private funcionesService: FuncionesService, private peliculasService: PeliculasService, private pagosService:PagosService) {
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
  
  // Variables para la obtención de los parametros de la URL 
  @Input("pelicula_id") pelicula_id: number = 0;
  @Input("funcion_id") funcion_id: number = 0;


  // (3 paso) Formulario para el pago de los boletos 
  formulario: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    correo: new FormControl('')
  });

  ngOnInit() {
    // Obtnecion de la información de la pelicula y la funcion
    this.peliculasService.getPelicula(this.pelicula_id).subscribe((data: any) => {
      this.titulo = data.titulo;
      this.descripcion = data.descripcion;
      this.imagen = data.poster_url;

    });
    this.funcionesService.getFuncion(this.pelicula_id, this.funcion_id).subscribe((data: any) => {
      let date = new Date(data.horario);
      
      // Formateo de la fecha
      this.fecha = date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
    
      // Formateo de la hora
      this.hora = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true });

      this.sala = data.sala;
    });

    // (3 paso) Validación del formulario de pago  
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]]
    });
    
  }


  // (1 paso del stepper) Variables y Funciones para la selección de asientos

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

  // Validación del primer paso del stepper
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

  // Validación del segundo paso del stepper . Verifica que la cantidad de boletos seleccionados sea igual a la cantidad de asientos seleccionados
  segundoPasoValido() {
    return this.primerPasoValido() && (this.contidadBoletosAdultos + this.contidadBoletosNinos) === this.numeroAsientosSeleccionados;
  }

  // (3 paso)
  onSubmit(): void {
    if (this.formulario.valid) {
      let DatosBoletos = []
      if (this.contidadBoletosAdultos > 0) {
        DatosBoletos.push({
          nombre : "Boleto Adultos",
          precio: this.precioBoletoAdulto,
          cantidad: this.contidadBoletosAdultos,
          monto: this.contidadBoletosAdultos * this.precioBoletoAdulto
        });
      }
      if (this.contidadBoletosNinos > 0) {
        DatosBoletos.push({
          nombre : "Boleto Niños",
          precio: this.precioBoletoNino,
          cantidad: this.contidadBoletosNinos,
          monto: this.contidadBoletosNinos * this.precioBoletoNino
        });
      }

      let DatosCompra = {
        nombre: this.formulario.value.nombre,
        correo: this.formulario.value.correo,
        pelicula: this.titulo,
        sala: this.sala,
        fecha: this.fecha,
        hora: this.hora,
        boletos: DatosBoletos,
        asientos: this.codigosAsientosSeleccionados,
        total: this.pagoTotal
      }
      console.log(DatosCompra);
      this.pagosService.procesarPago(DatosCompra).subscribe((data: any) => {});
    } else {
      alert("Por favor, llena todos los campos");
    }
  }

}
