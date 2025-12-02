import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  
  // Observable for route guards
  user$ = user(this.auth);
  
  // Signal for UI components (Navbar etc)
  currentUser = signal<User | null>(null);

  constructor() {
    // Sync signal with firebase user state
    this.user$.subscribe(u => this.currentUser.set(u));
  }

  async register(email: string, pass: string) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, pass);
      this.router.navigate(['/hub']);
    } catch (err) {
      throw err;
    }
  }

  async login(email: string, pass: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, pass);
      this.router.navigate(['/hub']);
    } catch (err) {
      throw err;
    }
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/']);
  }
}
