import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-obrioxia-base flex items-center justify-center p-4">
      <div class="glass-panel p-8 rounded-xl border border-white/10 w-full max-w-md text-center">
        
        <div *ngIf="status === 'verifying'" class="text-gray-400">
          <div class="w-8 h-8 border-2 border-obrioxia-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Verifying your email token...</p>
        </div>

        <div *ngIf="status === 'success'">
          <h2 class="text-2xl text-green-400 font-orbitron mb-4">Verified!</h2>
          <p class="text-gray-300 mb-6">Your email has been confirmed successfully.</p>
          <a routerLink="/login" class="block w-full py-3 bg-obrioxia-cyan text-black font-bold font-orbitron rounded hover:bg-obrioxia-cyan/90 transition-all">
            PROCEED TO LOGIN
          </a>
        </div>

        <div *ngIf="status === 'error'">
          <h2 class="text-2xl text-red-500 font-orbitron mb-4">Verification Failed</h2>
          <p class="text-gray-300 mb-6">Invalid or expired token.</p>
          <a routerLink="/login" class="text-obrioxia-cyan hover:underline">Back to Login</a>
        </div>

      </div>
    </div>
  `
})
export class VerifyEmailComponent implements OnInit {
  route = inject(ActivatedRoute);
  auth = inject(AuthService);
  status: 'verifying' | 'success' | 'error' = 'verifying';

  ngOnInit() {
    const token = this.route.snapshot.queryParams['token'];
    if (!token) {
      this.status = 'error';
      return;
    }

    this.auth.verifyEmail(token).subscribe({
      next: () => this.status = 'success',
      error: () => this.status = 'error'
    });
  }
}
