import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center p-4">
      <div class="glass-panel p-8 rounded-xl border border-white/10 w-full max-w-md text-center">
        <h2 class="text-2xl text-white font-orbitron mb-6">Reset <span class="text-obrioxia-cyan">Password</span></h2>
        <p class="text-gray-300 mb-4">
          Password resets are handled securely via your email.
        </p>
        <p class="text-gray-400 text-sm mb-8">
          If you requested a reset, check your inbox for a link from Firebase. 
          The link will let you set a new password directly.
        </p>
        <div class="space-y-4">
          <a routerLink="/forgot-password" class="block w-full py-3 bg-white/10 border border-white/20 text-white font-orbitron rounded hover:bg-white/20 transition-all">
            REQUEST RESET LINK
          </a>
          <a routerLink="/login" class="block text-xs text-gray-500 hover:text-white">Back to Login</a>
        </div>
      </div>
    </div>
  `
})
export class ResetPasswordComponent {}
