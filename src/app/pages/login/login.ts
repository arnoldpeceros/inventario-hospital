import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  
  // Formulario reactivo
  loginForm: FormGroup;
  mensajeError: string = '';
  mensajeExito: string = '';
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Crear el formulario con validaciones
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.minLength(5)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]]
    });
  }

  // Getters para acceder fácilmente a los campos
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Función para INICIAR SESIÓN
  iniciarSesion() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensajeError = '';
    this.mensajeExito = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password)
      .then(() => {
        this.mensajeExito = '¡Inicio de sesión exitoso!';
        setTimeout(() => {
          this.router.navigate(['/inicio']);
        }, 1000);
      })
      .catch((error: any) => {
        console.error('Error en login:', error);
        this.cargando = false;
        
        // Mensajes de error personalizados
        if (error.code === 'auth/user-not-found') {
          this.mensajeError = 'No existe una cuenta con este email';
        } else if (error.code === 'auth/wrong-password') {
          this.mensajeError = 'Contraseña incorrecta';
        } else if (error.code === 'auth/invalid-credential') {
          this.mensajeError = 'Email o contraseña incorrectos';
        } else {
          this.mensajeError = 'Error al iniciar sesión. Intenta de nuevo';
        }
      });
  }

  // Función para REGISTRARSE
  registrarse() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensajeError = '';
    this.mensajeExito = '';

    const { email, password } = this.loginForm.value;

    this.authService.registrar(email, password)
      .then(() => {
        this.mensajeExito = '¡Registro exitoso! Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/inicio']);
        }, 1000);
      })
      .catch((error: any) => {
        console.error('Error en registro:', error);
        this.cargando = false;
        
        if (error.code === 'auth/email-already-in-use') {
          this.mensajeError = 'Este email ya está registrado';
        } else if (error.code === 'auth/weak-password') {
          this.mensajeError = 'La contraseña debe tener al menos 6 caracteres';
        } else if (error.code === 'auth/invalid-email') {
          this.mensajeError = 'Email inválido';
        } else {
          this.mensajeError = 'Error al registrar. Intenta de nuevo';
        }
      });
  }
}