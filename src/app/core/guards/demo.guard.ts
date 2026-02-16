import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const demoGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // 1. Check if the key exists in the browser's pocket
  const key = localStorage.getItem('demo_key');

  // 2. If NO key, kick them out to the login gate
  if (!key) {
    // If they are trying to go to the demo, redirect to the gate (home or login page)
    return router.createUrlTree(['/']); 
  }

  // 3. If key exists, let them pass
  return true;
};
