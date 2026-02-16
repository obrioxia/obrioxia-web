import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take, filter } from 'rxjs/operators';

export const protectedRouteGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // 🔒 SECURITY GATE: ALLOWED EMAILS ONLY
  const allowedEmails = [
    'hello@obrioxia.com',
    'admin@obrioxia.com',
    'jonny@obrioxia.com',
    'demo@obrioxia.com'
  ];

  return auth.user$.pipe(
    // Wait for the auth state to settle (Firebase initial load)
    filter(user => user !== undefined),
    take(1),
    map(user => {
      // 1. If not logged in, go to login
      if (!user) {
        return router.createUrlTree(['/login']);
      }

      // 2. Demo users bypass the whitelist
      if (localStorage.getItem('demo_key')) {
        return true;
      }

      // 3. Check Whitelist for production users
      if (user.email && allowedEmails.includes(user.email)) {
        return true;
      }

      // 4. Block & Redirect Unauthorized Users
      console.warn(`Access Denied for: ${user.email}`);
      return router.createUrlTree(['/pricing']);
    })
  );
};
