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
  
  user$ = user(this.auth);
  currentUser = signal<User | null>(null);

  constructor() {
    this.user$.subscribe(u => this.currentUser.set(u));
  }

  async register(email: string, pass: string) {
    await createUserWithEmailAndPassword(this.auth, email, pass);
    this.router.navigate(['/hub']);
  }

  async login(email: string, pass: string) {
    await signInWithEmailAndPassword(this.auth, email, pass);
    this.router.navigate(['/hub']);
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/']);
  }
}
