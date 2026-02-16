import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-demo-gate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-black flex items-center justify-center p-4">
      <div class="glass-panel p-12 rounded-xl border border-obrioxia-cyan/30 w-full max-w-lg text-center">
        <h1 class="text-4xl font-orbitron text-white mb-2">DEMO <span class="text-obrioxia-cyan">ACCESS</span></h1>
        <p class="text-gray-400 font-mono text-sm mb-8">ENTER YOUR 8-DIGIT SECURE KEY</p>
        
        <input [(ngModel)]="key" maxlength="8" class="w-full bg-black/60 border-2 border-obrioxia-cyan text-center text-4xl text-white font-mono py-4 rounded-lg tracking-[0.5em] uppercase mb-8" placeholder="XXXXXXXX">
        
        <div *ngIf="error" class="mb-6 text-red-400 font-mono font-bold">{{ error }}</div>

        <button (click)="verifyKey()" [disabled]="loading() || key.length < 8" class="w-full py-5 bg-obrioxia-cyan text-black font-bold text-xl font-orbitron rounded hover:bg-cyan-400 transition-all">
          {{ loading() ? 'VERIFYING...' : 'ENTER HUB' }}
        </button>
      </div>
    </div>
  `
})
export class DemoGateComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  key = '';
  loading = signal(false);
  error = '';

  verifyKey() {
    if (this.key.length < 8) return;
    this.loading.set(true);
    this.error = '';

    const url = `${environment.backendUrl}/api/demo/verify/`;

    this.http.post<any>(url, { key: this.key })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          if (res.valid) {
            localStorage.setItem('demo_key', this.key);
            this.router.navigate(['/demo']);
          } else {
            this.error = "INVALID KEY";
          }
        },
        error: (err) => {
          console.error(err);
          this.error = "CONNECTION FAILED";
        }
      });
  }
}
