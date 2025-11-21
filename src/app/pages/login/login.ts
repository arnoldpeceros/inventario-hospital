import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  
  // Variables para el formulario
  email: string = '';
  password: string = '';
  mensajeError: string = '';
  cargando: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Función para INICIAR SESIÓN
  iniciarSesion() {
    this.cargando = true;
    this.mensajeError = '';

    this.authService.login(this.email, this.password)
      .then(() => {
        console.log('Login exitoso');
        this.router.navigate(['/inicio']); // Ir a la página de inicio
      })
      .catch((error) => {
        console.error('Error en login:', error);
        this.mensajeError = 'Email o contraseña incorrectos';
        this.cargando = false;
      });
  }

  // Función para REGISTRARSE
  registrarse() {
    this.cargando = true;
    this.mensajeError = '';

    this.authService.registrar(this.email, this.password)
      .then(() => {
        console.log('Registro exitoso');
        this.router.navigate(['/inicio']); // Ir a la página de inicio
      })
      .catch((error) => {
        console.error('Error en registro:', error);
        if (error.code === 'auth/email-already-in-use') {
          this.mensajeError = 'Este email ya está registrado';
        } else if (error.code === 'auth/weak-password') {
          this.mensajeError = 'La contraseña debe tener al menos 6 caracteres';
        } else {
          this.mensajeError = 'Error al registrar. Intenta de nuevo';
        }
        this.cargando = false;
      });
  }
}