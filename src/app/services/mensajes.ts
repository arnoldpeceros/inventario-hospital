import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Mensaje {
  tipo: 'exito' | 'error' | 'info' | 'advertencia';
  texto: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private mensajeSubject = new BehaviorSubject<Mensaje>({
    tipo: 'info',
    texto: '',
    visible: false
  });

  mensaje$ = this.mensajeSubject.asObservable();

  constructor() { }

  // Mostrar mensaje de éxito
  mostrarExito(texto: string) {
    this.mostrarMensaje('exito', texto);
  }

  // Mostrar mensaje de error
  mostrarError(texto: string) {
    this.mostrarMensaje('error', texto);
  }

  // Mostrar mensaje de info
  mostrarInfo(texto: string) {
    this.mostrarMensaje('info', texto);
  }

  // Mostrar mensaje de advertencia
  mostrarAdvertencia(texto: string) {
    this.mostrarMensaje('advertencia', texto);
  }

  // Función privada para mostrar mensaje
  private mostrarMensaje(tipo: 'exito' | 'error' | 'info' | 'advertencia', texto: string) {
    this.mensajeSubject.next({
      tipo,
      texto,
      visible: true
    });

    // Ocultar después de 4 segundos
    setTimeout(() => {
      this.ocultarMensaje();
    }, 4000);
  }

  // Ocultar mensaje
  ocultarMensaje() {
    const mensajeActual = this.mensajeSubject.value;
    this.mensajeSubject.next({
      ...mensajeActual,
      visible: false
    });
  }
}