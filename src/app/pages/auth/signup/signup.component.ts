import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-obrioxia-base flex items-center justify-center p-4">
      <div class="glass-panel p-8 rounded-xl border border-white/10 w-full max-w-2xl">
        <h2 class="text-3xl text-white font-orbitron mb-6 text-center">Create <span class="text-obrioxia-cyan">Account</span></h2>

        <div *ngIf="successMessage" class="p-6 bg-green-500/10 border border-green-500/30 rounded text-center">
          <h3 class="text-green-400 font-orbitron text-xl mb-2">Check Your Inbox</h3>
          <p class="text-gray-300">{{ successMessage }}</p>
          <a routerLink="/login" class="block mt-4 text-obrioxia-cyan hover:underline">Go to Login</a>
        </div>

        <form *ngIf="!successMessage" (ngSubmit)="onSubmit()" #f="ngForm" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-orbitron text-gray-500 mb-1">FULL NAME</label>
              <input [(ngModel)]="data.fullName" name="fullName" required class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
            </div>
            <div>
              <label class="block text-xs font-orbitron text-gray-500 mb-1">WORK EMAIL</label>
              <input [(ngModel)]="data.email" name="email" type="email" required class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-orbitron text-gray-500 mb-1">COMPANY NAME</label>
              <input [(ngModel)]="data.companyName" name="companyName" required class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
            </div>
            <div>
              <label class="block text-xs font-orbitron text-gray-500 mb-1">WEBSITE</label>
              <input [(ngModel)]="data.companyWebsite" name="companyWebsite" required class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-orbitron text-gray-500 mb-1">PHONE (OPTIONAL)</label>
              <input [(ngModel)]="data.phone" name="phone" class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
            </div>
            <div>
              <label class="block text-xs font-orbitron text-gray-500 mb-1">COUNTRY</label>
              <input [(ngModel)]="data.country" name="country" required class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-orbitron text-gray-500 mb-1">PASSWORD</label>
              <input [(ngModel)]="data.password" name="password" [type]="showPassword ? 'text' : 'password'" required class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
            </div>
            <div>
              <label class="block text-xs font-orbitron text-gray-500 mb-1">CONFIRM PASSWORD</label>
              <input [(ngModel)]="confirmPassword" name="confirmPassword" [type]="showPassword ? 'text' : 'password'" required class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
            </div>
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" [(ngModel)]="showPassword" name="showPw" class="accent-obrioxia-cyan">
            <span class="text-xs text-gray-400">Show Password</span>
          </div>
          <div class="space-y-2 pt-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" [(ngModel)]="termsAccepted" name="terms" required class="accent-obrioxia-cyan">
              <span class="text-xs text-gray-400">I accept the <a routerLink="/trust-center" class="text-obrioxia-cyan underline">Terms & Privacy Policy</a></span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" [(ngModel)]="data.businessUseConfirmed" name="biz" required class="accent-obrioxia-cyan">
              <span class="text-xs text-gray-400">I confirm this is for business use</span>
            </label>
          </div>
          <div class="p-3 bg-black/30 border border-white/10 rounded flex items-center gap-3">
            <input type="checkbox" [(ngModel)]="captchaVerified" name="captcha" required class="w-6 h-6 accent-obrioxia-cyan">
            <span class="text-sm text-gray-300">I am human</span>
          </div>
          <div *ngIf="errorMessage" class="text-red-500 text-sm text-center">{{ errorMessage }}</div>
          <button type="submit" [disabled]="loading() || !f.valid || !captchaVerified" class="w-full py-4 bg-obrioxia-cyan text-black font-bold font-orbitron rounded hover:bg-obrioxia-cyan/90 transition-all disabled:opacity-50">
            {{ loading() ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT' }}
          </button>
          <p class="text-center text-gray-500 text-xs mt-4">
            Already have an account? <a routerLink="/login" class="text-white hover:text-obrioxia-cyan">Log In</a>
          </p>
        </form>
      </div>
    </div>
  `
})
export class SignupComponent {
  auth = inject(AuthService);
  loading = signal(false);
  
  data = {
    fullName: '',
    email: '',
    companyName: '',
    companyWebsite: '',
    phone: '',
    country: '',
    password: '',
    businessUseConfirmed: false
  };
  confirmPassword = '';
  showPassword = false;
  termsAccepted = false;
  captchaVerified = false;
  successMessage = '';
  errorMessage = '';

  onSubmit() {
    if (this.data.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match.";
      return;
    }
    this.loading.set(true);
    this.errorMessage = '';

    this.auth.register(this.data).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;
        this.loading.set(false);
      },
      error: (err: any) => {
        this.errorMessage = err.error?.detail || "Registration failed.";
        this.loading.set(false);
      }
    });
  }
}
