import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const demoGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Check for the flag in local storage
  const hasAccess = localStorage.getItem('obrioxia_demo_access_granted');

  if (hasAccess === 'true') {
    return true;
  } else {
    // Redirect to the gate if access is missing
    return router.createUrlTree(['/demo-gate']);
  }
};
