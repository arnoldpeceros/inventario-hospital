import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // Para saber si hay un usuario logueado
  usuarioActual: User | null = null;

  constructor(private auth: Auth) {
    // Escucha si hay cambios en el usuario (login/logout)
    this.auth.onAuthStateChanged((user) => {
      this.usuarioActual = user;
      console.log('Usuario actual:', user?.email);
    });
  }

  // REGISTRAR un nuevo usuario
  registrar(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // INICIAR SESIÓN
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // CERRAR SESIÓN
  logout() {
    return signOut(this.auth);
  }

  // Saber si está logueado
  estaLogueado(): boolean {
    return this.usuarioActual !== null;
  }

  // Obtener el email del usuario actual
  obtenerEmail(): string {
    return this.usuarioActual?.email || '';
  }
}