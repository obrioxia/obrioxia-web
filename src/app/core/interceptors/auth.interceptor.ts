import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';

/**
 * Attaches auth credentials to every outgoing /api/ request.
 * Priority: Firebase Bearer token > localStorage demo_key.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // Only intercept API calls to our backend
    if (!req.url.includes('/api/')) {
        return next(req);
    }

    const auth = inject(Auth);
    const user = auth.currentUser;

    if (user) {
        // Firebase user is logged in — attach Bearer token
        return from(user.getIdToken()).pipe(
            switchMap(token => {
                const cloned = req.clone({
                    setHeaders: { Authorization: `Bearer ${token}` }
                });
                return next(cloned);
            })
        );
    }

    // Fallback: attach demo key from localStorage if present
    const demoKey = localStorage.getItem('demo_key');
    if (demoKey) {
        const cloned = req.clone({
            setHeaders: { 'x-demo-key': demoKey }
        });
        return next(cloned);
    }

    // No auth available — send request as-is (will 401 on protected endpoints)
    return next(req);
};
