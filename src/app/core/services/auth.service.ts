import { Injectable, inject } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, sendEmailVerification, User } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private http = inject(HttpClient);
  private router = inject(Router);

  /**
   * Backend URL for the demo handshake endpoint only.
   */
  private apiUrl = `${environment.backendUrl}/api/demo`;

  user$: Observable<User | null> = authState(this.auth);

  /**
   * Firebase authentication for the Admin/Hub area.
   */
  login(credentials: any): Observable<any> {
    const { email, password } = credentials;
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap(() => this.router.navigate(['/hub']))
    );
  }

  logout(): Observable<any> {
    return from(signOut(this.auth)).pipe(
      tap(() => this.router.navigate(['/login']))
    );
  }

  /**
   * Demo key request — calls the real backend handshake endpoint.
   */
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-key`, { email: data.email });
  }

  /**
   * Firebase client-side password reset.
   * Sends a real reset email via Firebase Auth — no backend stub needed.
   */
  forgotPassword(email: string): Observable<any> {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  /**
   * Firebase client-side email verification resend.
   * Sends a real verification email if the user is logged in but unverified.
   */
  resendVerification(email: string): Observable<any> {
    const currentUser = this.auth.currentUser;
    if (currentUser && !currentUser.emailVerified) {
      return from(sendEmailVerification(currentUser));
    }
    // If no user is logged in, return success silently to avoid leaking account info
    return of({ status: 'sent' });
  }
}
