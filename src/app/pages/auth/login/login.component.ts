import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-obrioxia-base flex items-center justify-center p-4">
      <div class="glass-panel p-8 rounded-xl border border-white/10 w-full max-w-md">
        <h2 class="text-3xl text-white font-orbitron mb-6 text-center">Hub <span class="text-obrioxia-cyan">Login</span></h2>
        <form (ngSubmit)="onSubmit()" #f="ngForm" class="space-y-6">
          <div>
            <label class="block text-xs font-orbitron text-gray-500 mb-1">EMAIL</label>
            <input [(ngModel)]="email" name="email" type="email" required class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
          </div>
          <div>
            <label class="block text-xs font-orbitron text-gray-500 mb-1">PASSWORD</label>
            <div class="relative">
              <input [(ngModel)]="password" name="password" [type]="showPassword ? 'text' : 'password'" required class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
              <button type="button" (click)="showPassword = !showPassword" class="absolute right-3 top-3 text-gray-500 text-xs uppercase">
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>
          <div class="flex justify-end">
            <a routerLink="/forgot-password" class="text-xs text-gray-400 hover:text-white">Forgot Password?</a>
          </div>
          <div *ngIf="errorMessage" class="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-xs text-center">
            {{ errorMessage }}
            <div *ngIf="isUnverified" class="mt-2">
              <button type="button" (click)="resendEmail()" class="underline hover:text-white">Resend Verification Email</button>
            </div>
          </div>
          <div *ngIf="resendSuccess" class="text-green-400 text-xs text-center">
            Verification email resent! Check inbox.
          </div>
          <button type="submit" [disabled]="loading()" class="w-full py-4 bg-obrioxia-cyan text-black font-bold font-orbitron rounded hover:bg-obrioxia-cyan/90 transition-all disabled:opacity-50">
            {{ loading() ? 'LOGGING IN...' : 'LOGIN' }}
          </button>
          <p class="text-center text-gray-500 text-xs mt-4">
            New here? <a routerLink="/signup" class="text-white hover:text-obrioxia-cyan">Create Account</a>
          </p>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  auth = inject(AuthService);
  loading = signal(false);
  
  email = '';
  password = '';
  showPassword = false;
  errorMessage = '';
  isUnverified = false;
  resendSuccess = false;

  onSubmit() {
    this.loading.set(true);
    this.errorMessage = '';
    this.isUnverified = false;
    this.resendSuccess = false;

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.loading.set(false);
      },
      error: (err: any) => {
        this.errorMessage = err.error?.detail || "Login failed.";
        if (this.errorMessage && this.errorMessage.includes("verified")) {
          this.isUnverified = true;
        }
        this.loading.set(false);
      }
    });
  }

  resendEmail() {
    this.auth.resendVerification(this.email).subscribe(() => {
      this.resendSuccess = true;
    });
  }
}
