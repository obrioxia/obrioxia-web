import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-obrioxia-base flex items-center justify-center p-4">
      <div class="glass-panel p-8 rounded-xl border border-white/10 w-full max-w-md">
        <h2 class="text-2xl text-white font-orbitron mb-6 text-center">New <span class="text-obrioxia-cyan">Password</span></h2>
        <div *ngIf="success" class="text-center">
          <p class="text-green-400 mb-4">Password updated successfully!</p>
          <a routerLink="/login" class="block w-full py-3 bg-obrioxia-cyan text-black font-bold font-orbitron rounded">LOGIN NOW</a>
        </div>
        <form *ngIf="!success" (ngSubmit)="onSubmit()">
          <div class="space-y-4 mb-6">
            <div>
              <label class="block text-xs font-orbitron text-gray-500 mb-1">NEW PASSWORD</label>
              <input [(ngModel)]="password" name="pw" type="password" required class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
            </div>
            <div>
              <label class="block text-xs font-orbitron text-gray-500 mb-1">CONFIRM PASSWORD</label>
              <input [(ngModel)]="confirm" name="cpw" type="password" required class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
            </div>
          </div>
          <div *ngIf="error" class="text-red-500 text-xs text-center mb-4">{{ error }}</div>
          <button type="submit" [disabled]="loading || !password" class="w-full py-4 bg-obrioxia-cyan text-black font-bold font-orbitron rounded hover:bg-obrioxia-cyan/90 transition-all disabled:opacity-50">
            {{ loading ? 'UPDATING...' : 'UPDATE PASSWORD' }}
          </button>
        </form>
      </div>
    </div>
  `
})
export class ResetPasswordComponent implements OnInit {
  route = inject(ActivatedRoute);
  auth = inject(AuthService);
  
  token = '';
  password = '';
  confirm = '';
  loading = false;
  success = false;
  error = '';

  ngOnInit() {
    this.token = this.route.snapshot.queryParams['token'];
    if (!this.token) {
      this.error = "Invalid reset link.";
    }
  }

  onSubmit() {
    if (this.password !== this.confirm) {
      this.error = "Passwords do not match.";
      return;
    }
    this.loading = true;
    this.auth.resetPassword(this.token, this.password).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err.error?.detail || "Failed to reset password.";
        this.loading = false;
      }
    });
  }
}
