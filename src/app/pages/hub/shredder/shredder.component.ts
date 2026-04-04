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
    <div class="min-h-screen pt-28 pb-20 px-4">
      <div class="max-w-3xl mx-auto">

        <div class="mb-8">
          <button (click)="goBack()" class="text-red-500 text-sm font-orbitron hover:underline mb-2">&larr; BACK TO HUB</button>
          <h1 class="text-3xl text-white font-orbitron">Crypto <span class="text-red-500">Shredder</span></h1>
          <p class="text-gray-400 mt-2">Selectively shred sensitive fields. This makes protected data irrecoverable while preserving the integrity of the tamper-evident ledger.</p>
        </div>

        <div class="glass-panel p-8 rounded-xl border border-red-500/20">
          
          <div class="mb-6">
            <label class="block text-xs font-orbitron text-red-400 mb-2">TARGET SUBJECT ID (POLICY NUMBER / DECISION ID)</label>
            <div class="flex gap-2">
              <input 
                [(ngModel)]="targetId" 
                [disabled]="!!targetRef()"
                (keydown.enter)="lookup()"
                class="flex-grow bg-black/50 border border-red-900/50 rounded p-4 text-white font-mono text-sm focus:border-red-500 outline-none placeholder-gray-700 disabled:opacity-50" 
                placeholder="e.g. POL-TEST-001 or UUID">
              <button *ngIf="!targetRef()" (click)="lookup()" [disabled]="loading() || !targetId"
                class="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-5 rounded font-bold transition-colors disabled:opacity-50 font-orbitron text-xs">
                FIND
              </button>
              <button *ngIf="targetRef()" (click)="resetSearch()" [disabled]="loading() || !!successMessage"
                class="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-5 rounded font-bold transition-colors disabled:opacity-50 font-orbitron text-xs">
                CLEAR
              </button>
            </div>
          </div>

          <!-- Record Found Preview -->
          <div *ngIf="targetRef() && !successMessage" class="p-4 bg-gray-900/80 border border-gray-700 rounded mb-6">
            <div class="text-green-400 font-bold mb-2 flex items-center gap-2 text-sm">&#10003; RECORD FOUND</div>
            <div class="grid grid-cols-2 gap-2 font-mono text-xs text-slate-300">
              <div class="text-gray-500">Type:</div><div>{{ targetRef()?.incident_type }}</div>
              <div class="text-gray-500">Hash:</div><div class="truncate text-cyan-400" [title]="targetRef()?.current_hash">{{ targetRef()?.current_hash }}</div>
              <div class="text-gray-500">Time:</div><div>{{ targetRef()?.timestamp | date:'short' }}</div>
              <div class="text-gray-500">Status:</div><div>{{ targetRef()?.is_shredded ? 'ALREADY SHREDDED' : 'INTACT' }}</div>
            </div>
          </div>

          <div class="p-4 bg-red-900/10 border border-red-500/10 rounded mb-6">
            <p class="text-xs text-red-300">&#9888;&#65039; WARNING: This action is irreversible. Once shredded, sensitive data fields are replaced with [SHREDDED] tags on the ledger forever.</p>
          </div>

          <button 
            (click)="shred()" 
            [disabled]="loading() || !targetId || (targetRef() && targetRef()?.is_shredded)" 
            class="w-full py-4 bg-red-500/10 border border-red-500 text-red-500 font-orbitron rounded hover:bg-red-600 hover:text-white transition-all disabled:opacity-50 uppercase">
            {{ loading() ? 'Executing Redaction...' : 'Execute Shred' }}
          </button>

          <div *ngIf="successMessage" class="mt-8 p-6 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
            <h3 class="text-green-400 font-orbitron text-lg">SHRED SUCCESSFUL</h3>
            <p class="text-gray-300 text-sm mt-2">{{ successMessage }}</p>
            <button (click)="resetAll()" class="mt-4 text-xs text-gray-500 hover:text-white underline uppercase tracking-widest">Shred Another Record</button>
          </div>

          <div *ngIf="errorMessage" class="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded text-center">
            <p class="text-red-400 text-sm font-bold">{{ errorMessage }}</p>
            <button (click)="errorMessage = ''" class="mt-2 text-xs text-gray-500 hover:text-white underline">Dismiss</button>
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
  targetRef = signal<any | null>(null);
  successMessage = '';
  errorMessage = '';

  private isDemoUser(): boolean {
    return !!localStorage.getItem('demo_key');
  }

  lookup() {
    if (!this.targetId) return;
    this.loading.set(true);
    this.errorMessage = '';

    const lookup$ = this.isDemoUser()
      ? this.audit.demoLookup(this.targetId.trim())
      : this.audit.adminLookup(this.targetId.trim());

    lookup$.subscribe({
      next: (res) => {
        this.targetRef.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        const status = err.status;
        if (status === 404) {
          this.errorMessage = 'Record not found. Check the policy number or decision ID.';
        } else if (status === 403) {
          this.errorMessage = 'This record belongs to a different session.';
        } else if (status === 401) {
          this.errorMessage = 'Demo key invalid or expired.';
        } else {
          this.errorMessage = 'Lookup failed — please try again.';
        }
        this.loading.set(false);
      }
    });
  }

  resetSearch() {
    this.targetId = '';
    this.targetRef.set(null);
    this.errorMessage = '';
    this.successMessage = '';
  }

  shred() {
    if (!this.targetId) return;
    if (!confirm(`PERMANENT ACTION: Redact all PII for "${this.targetId}"?`)) return;

    this.loading.set(true);
    this.successMessage = '';
    this.errorMessage = '';

    if (this.isDemoUser()) {
      this.audit.demoShred(this.targetId.trim()).subscribe({
        next: (res: any) => {
          this.successMessage = `Policy ${this.targetId} has been redacted. Ledger integrity remains intact.`;
          this.loading.set(false);
        },
        error: (err) => {
          this.errorMessage = 'Shred Failed: ' + (err.error?.detail || err.message);
          this.loading.set(false);
        }
      });
    } else {
      this.audit.shredSubject(this.targetId.trim()).subscribe({
        next: (res: any) => {
          this.successMessage = `Policy ${this.targetId} has been redacted. Ledger integrity remains intact.`;
          this.loading.set(false);
        },
        error: (err) => {
          this.errorMessage = 'Shred Failed: ' + (err.error?.detail || err.message);
          this.loading.set(false);
        }
      });
    }
  }

  resetAll() {
    this.targetId = '';
    this.targetRef.set(null);
    this.successMessage = '';
    this.errorMessage = '';
  }

  goBack() {
    this.router.navigate(['/hub']);
  }
}
