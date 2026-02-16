import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuditService } from '../../../core/services/audit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shredder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-obrioxia-base pt-28 pb-20 px-4">
      <div class="max-w-3xl mx-auto">

        <div class="mb-8">
          <button (click)="goBack()" class="text-red-500 text-sm font-orbitron hover:underline mb-2">&larr; BACK TO HUB</button>
          <h1 class="text-3xl text-white font-orbitron">Crypto <span class="text-red-500">Shredder</span></h1>
          <p class="text-gray-400 mt-2">Selectively shred sensitive fields. This makes protected data irrecoverable while preserving the integrity of the tamper-evident ledger.</p>
        </div>

        <div class="glass-panel p-8 rounded-xl border border-red-500/20">
          
          <div class="mb-6">
            <label class="block text-xs font-orbitron text-red-400 mb-2">TARGET SUBJECT ID (POLICY NUMBER / DECISION ID)</label>
            <input 
              [(ngModel)]="targetId" 
              class="w-full bg-black/50 border border-red-900/50 rounded p-4 text-white font-mono text-sm focus:border-red-500 outline-none placeholder-gray-700" 
              placeholder="e.g. POL-TEST-001 or UUID">
          </div>

          <div class="p-4 bg-red-900/10 border border-red-500/10 rounded mb-6">
            <p class="text-xs text-red-300">⚠️ WARNING: This action is irreversible. Once shredded, sensitive data fields are replaced with [SHREDDED] tags on the ledger forever.</p>
          </div>

          <button 
            (click)="shred()" 
            [disabled]="loading() || !targetId" 
            class="w-full py-4 bg-red-500/10 border border-red-500 text-red-500 font-orbitron rounded hover:bg-red-600 hover:text-white transition-all disabled:opacity-50 uppercase">
            {{ loading() ? 'Executing Redaction...' : 'Execute Shred' }}
          </button>

          <div *ngIf="successMessage" class="mt-8 p-6 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
            <h3 class="text-green-400 font-orbitron text-lg">SHRED SUCCESSFUL</h3>
            <p class="text-gray-300 text-sm mt-2">{{ successMessage }}</p>
            <button (click)="successMessage = ''" class="mt-4 text-xs text-gray-500 hover:text-white underline uppercase tracking-widest">Clear Notification</button>
          </div>

        </div>
      </div>
    </div>
  `
})
export class ShredderComponent {
  private audit = inject(AuditService);
  private router = inject(Router);

  targetId = '';
  loading = signal(false);
  successMessage = '';

  /**
   * Executes the shredding operation.
   * This calls the DELETE /api/admin/shred/{id} endpoint.
   */
  shred() {
    if (!this.targetId) return;

    // We keep this confirmation as a safety rail for destructive actions
    if (!confirm(`PERMANENT ACTION: Redact all PII for "${this.targetId}"?`)) return;

    this.loading.set(true);
    this.successMessage = '';

    this.audit.shredSubject(this.targetId).subscribe({
      next: (res: any) => {
        // Handled silently in UI state
        this.successMessage = `Policy ${this.targetId} has been redacted. Ledger integrity remains intact.`;
        this.targetId = '';
        this.loading.set(false);
      },
      error: (err) => {
        console.error('❌ Shred Failure:', err);
        // Error alerts remain to notify of Auth (401) or Not Found (404) issues
        alert('Shred Failed: ' + (err.error?.detail || err.message));
        this.loading.set(false);
      }
    });
  }

  goBack() {
    this.router.navigate(['/hub']);
  }
}
