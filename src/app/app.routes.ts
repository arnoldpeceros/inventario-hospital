import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Inicio } from './pages/inicio/inicio';
import { Productos } from './pages/productos/productos';
import { Movimientos } from './pages/movimientos/movimientos';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  
  { 
    path: 'inicio', 
    component: Inicio,
    canActivate: [authGuard]
  },
  { 
    path: 'productos', 
    component: Productos,
    canActivate: [authGuard]
  },
  { 
    path: 'productos/:id',
    loadComponent: () => import('./pages/producto-detalle/producto-detalle').then(m => m.ProductoDetalle),
    canActivate: [authGuard]
  },
  { 
    path: 'movimientos', 
    component: Movimientos,
    canActivate: [authGuard]
  },
  { 
    path: 'admin/estadisticas',
    loadComponent: () => import('./pages/admin/estadisticas/estadisticas').then(m => m.Estadisticas),
    canActivate: [authGuard]
  },
  
  { path: '**', component: NotFound }
];