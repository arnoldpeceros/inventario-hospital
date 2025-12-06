import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajesService } from '../../services/mensajes';

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificacion.html',
  styleUrl: './notificacion.css'
})
export class Notificacion implements OnInit {
  
  mensaje$;

  constructor(private mensajesService: MensajesService) {
    this.mensaje$ = this.mensajesService.mensaje$;
  }

  ngOnInit() {}

  cerrar() {
    this.mensajesService.ocultarMensaje();
  }
}