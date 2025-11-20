import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Inicio } from './pages/inicio/inicio';
import { Productos } from './pages/productos/productos';
import { Movimientos } from './pages/movimientos/movimientos';

export const routes: Routes = [
  // Si entras a la raíz, te manda al login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Ruta del login
  { path: 'login', component: Login },
  
  // Ruta de inicio (dashboard)
  { path: 'inicio', component: Inicio },
  
  // Ruta de productos
  { path: 'productos', component: Productos },
  
  // Ruta de movimientos
  { path: 'movimientos', component: Movimientos },
  
  // Si escriben algo que no existe, vuelve al login
  { path: '**', redirectTo: 'login' }
];