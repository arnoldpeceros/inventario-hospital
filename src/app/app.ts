import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './services/auth';
import { CommonModule } from '@angular/common';
import { Notificacion } from './shared/notificacion/notificacion';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, Notificacion],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'inventario-hospital';

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  // Cerrar sesión
  cerrarSesion() {
    this.authService.logout()
      .then(() => {
        console.log('Sesión cerrada');
        this.router.navigate(['/login']);
      });
  }
}