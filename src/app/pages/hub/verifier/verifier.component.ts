import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuditService } from '../../../core/services/audit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-obrioxia-base pt-28 pb-20 px-4">
      <div class="max-w-3xl mx-auto">

        <div class="mb-8">
          <button (click)="goBack()" class="text-obrioxia-green text-sm font-orbitron hover:underline mb-2">&larr; BACK TO HUB</button>
          <h1 class="text-3xl text-white font-orbitron">Chain <span class="text-obrioxia-green">Verifier</span></h1>
          <p class="text-gray-400 mt-2">Cryptographically verify the integrity of any hash against the master ledger.</p>
        </div>

        <div class="glass-panel p-8 rounded-xl border border-white/10">
          
          <div class="mb-6">
            <label class="block text-xs font-orbitron text-gray-500 mb-2">ENTRY HASH TO VERIFY</label>
            <input [(ngModel)]="hashToVerify" class="w-full bg-black/50 border border-white/10 rounded p-4 text-white font-mono text-sm focus:border-obrioxia-green outline-none" placeholder="Paste SHA-256 Hash here...">
          </div>

          <button (click)="verify()" [disabled]="loading()" class="w-full py-4 bg-obrioxia-green/10 border border-obrioxia-green text-obrioxia-green font-orbitron rounded hover:bg-obrioxia-green hover:text-black transition-all disabled:opacity-50">
            {{ loading() ? 'VERIFYING BLOCKCHAIN...' : 'RUN INTEGRITY CHECK' }}
          </button>

          <!-- Result Area -->
          <div *ngIf="result" class="mt-8 p-6 rounded-lg border transition-all" 
               [ngClass]="result.valid ? 'bg-green-500/10 border-green-500/50' : 'bg-red-500/10 border-red-500/50'">
            
            <div class="flex items-center gap-4 mb-4">
              <div [ngClass]="result.valid ? 'text-green-500' : 'text-red-500'">
                <svg *ngIf="result.valid" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <svg *ngIf="!result.valid" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h3 class="font-orbitron text-lg" [ngClass]="result.valid ? 'text-green-400' : 'text-red-400'">
                  {{ result.valid ? 'INTEGRITY VERIFIED' : 'INTEGRITY CHECK FAILED' }}
                </h3>
                <p class="text-xs text-gray-400">{{ result.valid ? 'This record exists in the immutable chain.' : 'Hash not found or chain corrupted.' }}</p>
              </div>
            </div>

            <div *ngIf="result.valid" class="text-xs font-mono text-gray-300 space-y-2 border-t border-white/10 pt-4 mt-4">
              <p><span class="text-gray-500">ANCHOR STATUS:</span> VALID</p>
              <p><span class="text-gray-500">SEQUENCE:</span> {{ result.sequence }}</p>
              <p><span class="text-gray-500">TIMESTAMP:</span> {{ result.timestamp }}</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  `
})
export class VerifierComponent {
  private audit = inject(AuditService);
  private router = inject(Router);

  hashToVerify = '';
  loading = signal(false);
  result: any = null;

  verify() {
    if (!this.hashToVerify) return;
    this.loading.set(true);
    this.result = null;

    this.audit.verifyHash(this.hashToVerify.trim()).subscribe({
      next: (res) => {
        this.result = res;
        this.loading.set(false);
      },
      error: () => {
        this.result = { valid: false };
        this.loading.set(false);
      }
    });
  }

  goBack() {
    this.router.navigate(['/hub']);
  }
}


