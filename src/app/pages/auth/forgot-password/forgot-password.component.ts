import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-obrioxia-base flex items-center justify-center p-4">
      <div class="glass-panel p-8 rounded-xl border border-white/10 w-full max-w-md">
        
        <h2 class="text-2xl text-white font-orbitron mb-6 text-center">Reset <span class="text-obrioxia-cyan">Password</span></h2>

        <div *ngIf="sent" class="text-center text-gray-300">
          <p class="mb-4">If an account exists for <strong>{{ email }}</strong>, you will receive a reset link shortly.</p>
          <a routerLink="/login" class="text-obrioxia-cyan hover:underline">Back to Login</a>
        </div>

        <form *ngIf="!sent" (ngSubmit)="onSubmit()">
          <div class="mb-6">
            <label class="block text-xs font-orbitron text-gray-500 mb-1">ENTER YOUR EMAIL</label>
            <input [(ngModel)]="email" name="email" type="email" required class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
          </div>

          <button type="submit" [disabled]="loading || !email" class="w-full py-4 bg-white/10 border border-white/20 text-white font-orbitron rounded hover:bg-white/20 transition-all disabled:opacity-50">
            {{ loading ? 'SENDING...' : 'SEND RESET LINK' }}
          </button>
          
          <div class="text-center mt-4">
            <a routerLink="/login" class="text-xs text-gray-500 hover:text-white">Cancel</a>
          </div>
        </form>

      </div>
    </div>
  `
})
export class ForgotPasswordComponent {
  auth = inject(AuthService);
  email = '';
  loading = false;
  sent = false;

  onSubmit() {
    this.loading = true;
    this.auth.forgotPassword(this.email).subscribe({
      next: () => {
        this.sent = true;
        this.loading = false;
      },
      error: () => {
        this.sent = true;
        this.loading = false;
      }
    });
  }
}
