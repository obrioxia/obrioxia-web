import { Injectable, inject } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private http = inject(HttpClient);
  private router = inject(Router);

  /**
   * ✅ FIX: Pointing to the new Python Render backend.
   * Standardized to use the /api/demo prefix for the handshake logic.
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
   * ✅ FIX: Updated to 'request-key' to match Python backend logic.
   * This handles the initial "Handshake" where the user gets their demo key.
   */
  register(data: any): Observable<any> {
    // Send only the email to the new handshake endpoint
    return this.http.post(`${this.apiUrl}/request-key`, { email: data.email });
  }

  /**
   * These endpoints now utilize the updated Python API structure.
   * Note: Ensure your Python backend has corresponding routes for verification/passwords.
   */
  verifyEmail(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/verify/${token}`);
  }

  resendVerification(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-key`, { email });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword });
  }
}
