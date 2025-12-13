import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth'; 

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-obrioxia-base flex items-center justify-center p-4">
      <div class="glass-panel p-8 rounded-xl border border-white/10 w-full max-w-2xl">
        <h2 class="text-3xl text-white font-orbitron mb-6 text-center">Create <span class="text-obrioxia-cyan">Account</span></h2>

        <div *ngIf="successMessage" class="p-6 bg-green-500/10 border border-green-500/30 rounded text-center animate-fade-in">
          <h3 class="text-green-400 font-orbitron text-xl mb-2">Secure Account Created</h3>
          <p class="text-gray-300">{{ successMessage }}</p>
          
          <a href="https://hub.obrioxia.com" class="block mt-6 py-3 bg-obrioxia-cyan text-black font-bold rounded hover:bg-cyan-400 transition-all font-orbitron">
            GO TO APP LOGIN
          </a>
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
              <label class="block text-xs font-orbitron text-gray-500 mb-1">PHONE</label>
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
              <input [(ngModel)]="data.password" name="password" type="password" required minlength="6" class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
            </div>
            <div>
              <label class="block text-xs font-orbitron text-gray-500 mb-1">CONFIRM PASSWORD</label>
              <input [(ngModel)]="confirmPassword" name="confirmPassword" type="password" required class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
            </div>
          </div>
          
          <div class="space-y-2 pt-2">
             <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" [(ngModel)]="data.businessUseConfirmed" name="biz" required class="accent-obrioxia-cyan">
              <span class="text-xs text-gray-400">I confirm this is for business use</span>
            </label>
          </div>

          <div *ngIf="errorMessage" class="text-red-500 text-sm text-center font-bold">{{ errorMessage }}</div>

          <button type="submit" [disabled]="loading() || !f.valid" class="w-full py-4 bg-obrioxia-cyan text-black font-bold font-orbitron rounded hover:bg-obrioxia-cyan/90 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            {{ loading() ? 'INITIALIZING SECURE ACCOUNT...' : 'CREATE ACCOUNT' }}
          </button>
        </form>
      </div>
    </div>
  `
})
export class SignupComponent {
  private auth = inject(Auth);
  private http = inject(HttpClient);
  
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
  successMessage = '';
  errorMessage = '';

  async onSubmit() {
    if (this.data.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match.";
      return;
    }

    this.loading.set(true);
    this.errorMessage = '';

    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth, 
        this.data.email, 
        this.data.password
      );

      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: this.data.fullName
        });
      }

      this.http.post('https://obrioxia-backend-pkrp.onrender.com/auth/register', this.data)
        .subscribe({
          next: () => {
            this.successMessage = "Secure Account Created Successfully.";
            this.loading.set(false);
          },
          error: (err) => {
            console.error("Backend Sync Error:", err);
            this.successMessage = "Account Created. Please Login to App.";
            this.loading.set(false);
          }
        });

    } catch (err: any) {
      console.error("Registration Error:", err);
      this.loading.set(false);

      if (err.code === 'auth/email-already-in-use') {
        this.errorMessage = "This email is already registered.";
      } else if (err.code === 'auth/weak-password') {
        this.errorMessage = "Password must be at least 6 characters.";
      } else {
        this.errorMessage = "Registration Failed: " + err.message;
      }
    }
  }
}
