import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take, filter } from 'rxjs/operators';

export const protectedRouteGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    // Wait for the auth state to settle (Firebase initial load)
    filter(user => user !== undefined),
    take(1),
    map(user => {
      // 1. If not logged in, go to login
      if (!user) {
        return router.createUrlTree(['/login']);
      }

      // 2. Any authenticated Firebase user can enter the hub.
      //    Feature access and quotas are enforced by the backend
      //    entitlement system (plan_id, monthly_event_quota, features).
      return true;
    })
  );
};
