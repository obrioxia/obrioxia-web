import { Injectable, inject } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  // Expose the Firebase user state directly
  user$: Observable<User | null> = authState(this.auth);

  login(email: string, pass: string): Observable<any> {
    // Uses Firebase SDK
    return from(signInWithEmailAndPassword(this.auth, email, pass)).pipe(
      tap(() => this.router.navigate(['/hub']))
    );
  }

  logout(): Observable<any> {
    return from(signOut(this.auth)).pipe(
      tap(() => this.router.navigate(['/login']))
    );
  }
}
