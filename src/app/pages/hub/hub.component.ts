import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-obrioxia-base pt-28 pb-20 px-4">
      <div class="max-w-7xl mx-auto">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
          <div>
            <div class="text-obrioxia-cyan text-xs font-orbitron tracking-widest mb-2">SECURE SESSION ACTIVE</div>
            <h1 class="text-4xl text-white font-orbitron">Obrioxia <span class="text-gray-500">Hub</span></h1>
            <p class="text-gray-400 mt-2">Welcome back, {{ (auth.user$ | async)?.email }}</p>
          </div>
          <button (click)="auth.logout()" class="mt-4 md:mt-0 px-4 py-2 border border-red-500/30 text-red-400 text-xs font-orbitron rounded hover:bg-red-500/10 transition-colors">
            TERMINATE SESSION
          </button>
        </div>

        <!-- Dashboard Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <!-- Tool 1: Event Logger -->
          <a routerLink="/hub/logger" class="glass-panel p-6 rounded-xl border border-white/10 hover:border-obrioxia-cyan/50 transition-all group cursor-pointer">
            <div class="flex items-center justify-between mb-4">
              <div class="w-10 h-10 rounded bg-obrioxia-cyan/10 flex items-center justify-center text-obrioxia-cyan">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <span class="text-xs font-bold text-obrioxia-cyan bg-obrioxia-cyan/10 px-2 py-1 rounded">LIVE ENV</span>
            </div>
            <h3 class="text-xl text-white font-orbitron mb-2 group-hover:text-obrioxia-cyan transition-colors">Event Logger</h3>
            <p class="text-gray-400 text-sm">Access the real-time event ingestion engine. Generate hash chains and simulate AI decisions.</p>
          </a>

          <!-- Tool 2: Chain Verifier -->
          <a routerLink="/hub/verifier" class="glass-panel p-6 rounded-xl border border-white/10 hover:border-obrioxia-green/50 transition-all group cursor-pointer">
            <div class="flex items-center justify-between mb-4">
              <div class="w-10 h-10 rounded bg-obrioxia-green/10 flex items-center justify-center text-obrioxia-green">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <span class="text-xs font-bold text-obrioxia-green bg-obrioxia-green/10 px-2 py-1 rounded">AUDIT TOOL</span>
            </div>
            <h3 class="text-xl text-white font-orbitron mb-2 group-hover:text-obrioxia-green transition-colors">Chain Verifier</h3>
            <p class="text-gray-400 text-sm">Cryptographically verify the integrity of your audit logs against the public ledger.</p>
          </a>

          <!-- Tool 3: Crypto Shredder -->
          <a routerLink="/hub/shredder" class="glass-panel p-6 rounded-xl border border-red-500/20 hover:border-red-500/80 transition-all group cursor-pointer">
            <div class="flex items-center justify-between mb-4">
              <div class="w-10 h-10 rounded bg-red-500/10 flex items-center justify-center text-red-500">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </div>
              <span class="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">GDPR ADMIN</span>
            </div>
            <h3 class="text-xl text-white font-orbitron mb-2 group-hover:text-red-500 transition-colors">Crypto-Shredder</h3>
            <p class="text-gray-400 text-sm">Execute Right-to-Erasure. Destroy encryption keys while maintaining chain integrity.</p>
          </a>

        </div>
      </div>
    </div>
  `
})
export class HubComponent {
  auth = inject(AuthService);
}


