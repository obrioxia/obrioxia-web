import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuditService, AuditLogPayload } from '../../../core/services/audit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logger',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-obrioxia-base pt-28 pb-20 px-4">
      <div class="max-w-3xl mx-auto">
        
        <div class="mb-8">
          <button (click)="goBack()" class="text-obrioxia-cyan text-sm font-orbitron hover:underline mb-2">&larr; BACK TO HUB</button>
          <h1 class="text-3xl text-white font-orbitron">Event <span class="text-obrioxia-cyan">Logger</span></h1>
          <p class="text-gray-400 mt-2">Submit a secure event to the immutable ledger. PII will be encrypted.</p>
        </div>

        <div class="glass-panel p-8 rounded-xl border border-white/10">
          <form (ngSubmit)="onSubmit()" #logForm="ngForm" class="space-y-6">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-orbitron text-gray-500 mb-2">POLICY / USER ID (PII)</label>
                <input [(ngModel)]="formData.policyNumber" name="policyNumber" required class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none" placeholder="e.g. POL-998877">
              </div>
              <div>
                <label class="block text-xs font-orbitron text-gray-500 mb-2">INCIDENT TYPE</label>
                <select [(ngModel)]="formData.incidentType" name="incidentType" class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
                  <option value="Manual Review">Manual Review</option>
                  <option value="AI Decision">AI Decision</option>
                  <option value="Claim Approval">Claim Approval</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-orbitron text-gray-500 mb-2">CLAIM AMOUNT ($)</label>
                <input type="number" [(ngModel)]="formData.claimAmount" name="claimAmount" class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
              </div>
              <div>
                <label class="block text-xs font-orbitron text-gray-500 mb-2">AI CONFIDENCE (0.0 - 1.0)</label>
                <input type="number" step="0.01" [(ngModel)]="formData.aiConfidenceScore" name="aiConfidenceScore" class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
              </div>
            </div>

            <div>
              <label class="block text-xs font-orbitron text-gray-500 mb-2">DECISION NOTES (PII ENCRYPTED)</label>
              <textarea [(ngModel)]="formData.decisionNotes" name="decisionNotes" rows="4" class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none"></textarea>
            </div>

            <button type="submit" [disabled]="loading()" class="w-full py-4 bg-obrioxia-cyan/10 border border-obrioxia-cyan text-obrioxia-cyan font-orbitron rounded hover:bg-obrioxia-cyan hover:text-black transition-all disabled:opacity-50">
              {{ loading() ? 'ENCRYPTING & LOGGING...' : 'SECURE LOG ENTRY' }}
            </button>

          </form>

          <div *ngIf="receipt" class="mt-8 p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h3 class="text-green-400 font-orbitron mb-4">Entry Sealed on Ledger</h3>
            <div class="text-xs font-mono text-gray-300 space-y-2 break-all">
              <p><span class="text-gray-500">SEQUENCE:</span> {{ receipt.sequence }}</p>
              <p><span class="text-gray-500">CURRENT HASH:</span> {{ receipt.current_hash }}</p>
              <p><span class="text-gray-500">PREVIOUS HASH:</span> {{ receipt.prev_hash }}</p>
              <p><span class="text-gray-500">TIMESTAMP:</span> {{ receipt.timestamp }}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  `
})
export class LoggerComponent {
  private audit = inject(AuditService);
  private router = inject(Router);
  
  loading = signal(false);
  receipt: any = null;

  formData: AuditLogPayload = {
    policyNumber: '',
    incidentType: 'AI Decision',
    claimAmount: 0,
    decisionNotes: '',
    aiConfidenceScore: 0.95,
    agentId: 'obrioxia_web_user'
  };

  onSubmit() {
    this.loading.set(true);
    this.audit.submitLog(this.formData).subscribe({
      next: (res) => {
        this.receipt = res.receipt;
        this.loading.set(false);
      },
      error: (err) => {
        alert('Logging Failed: ' + err.message);
        this.loading.set(false);
      }
    });
  }

  goBack() {
    this.router.navigate(['/hub']);
  }
}


