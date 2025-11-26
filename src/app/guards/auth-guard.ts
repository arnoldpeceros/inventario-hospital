import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si está logueado, puede pasar
  if (authService.estaLogueado()) {
    return true;
  }

  // Si no, lo manda al login
  router.navigate(['/login']);
  return false;
};