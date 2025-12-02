import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-obrioxia-base flex items-center justify-center p-4 pt-20">
      <div class="glass-panel w-full max-w-md p-8 rounded-2xl border border-white/10">
        <h2 class="font-orbitron text-3xl text-white mb-6 text-center">Create <span class="text-obrioxia-cyan">Account</span></h2>
        
        <form (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label class="block text-xs font-orbitron text-gray-400 mb-2">WORK EMAIL</label>
            <input [(ngModel)]="email" name="email" type="email" class="w-full bg-[#050B14] border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan focus:outline-none transition-colors" required>
          </div>
          
          <div>
            <label class="block text-xs font-orbitron text-gray-400 mb-2">PASSWORD</label>
            <input [(ngModel)]="password" name="password" type="password" class="w-full bg-[#050B14] border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan focus:outline-none transition-colors" required>
          </div>

          <div *ngIf="error" class="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded">
            {{ error }}
          </div>

          <button type="submit" [disabled]="loading" class="w-full py-3 bg-obrioxia-cyan text-obrioxia-base font-orbitron font-bold rounded hover:bg-[#80F7FF] transition-all disabled:opacity-50">
            {{ loading ? 'CREATING...' : 'INITIALIZE LEDGER' }}
          </button>
        </form>

        <p class="text-center text-gray-400 text-sm mt-6">
          Already verified? <a routerLink="/login" class="text-obrioxia-cyan hover:underline">Login</a>
        </p>
      </div>
    </div>
  `
})
export class RegisterComponent {
  private auth = inject(AuthService);
  email = '';
  password = '';
  error = '';
  loading = false;

  async onSubmit() {
    this.loading = true;
    this.error = '';
    try {
      await this.auth.register(this.email, this.password);
    } catch (err: any) {
      this.error = err.message || "Registration failed.";
    } finally {
      this.loading = false;
    }
  }
}
