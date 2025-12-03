import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const protectedRouteGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const allowedEmails = [
    'hello@obrioxia.com',
    'admin@obrioxia.com',
    'demo@obrioxia.com',
    'jonny@obrioxia.com'
  ];

  return auth.user$.pipe(
    take(1),
    map(user => {
      if (!user) return router.createUrlTree(['/login']);
      
      if (allowedEmails.includes(user.email)) {
        return true;
      }

      return router.createUrlTree(['/pricing']);
    })
  );
};
