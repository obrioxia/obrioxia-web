import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-black text-white font-sans selection:bg-obrioxia-cyan selection:text-black">
      <nav class="border-b border-white/10 bg-black/50 backdrop-blur-md fixed top-0 w-full z-50">
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="font-orbitron font-bold tracking-widest text-lg">OBRIOXIA <span class="text-obrioxia-cyan">DEMO</span></span>
          </div>
          <button (click)="logout()" class="text-xs font-mono text-red-400 hover:text-red-300 border border-red-500/30 px-3 py-1 rounded">
            EXIT DEMO
          </button>
        </div>
      </nav>

      <div class="pt-32 pb-20 px-4 max-w-7xl mx-auto text-center">
        <h1 class="text-5xl md:text-6xl font-orbitron font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
          AUDIT <span class="text-obrioxia-cyan">ENGINE</span>
        </h1>
        <p class="text-gray-400 max-w-2xl mx-auto text-lg mb-12">
          Tamper-Evident Ledger Active. Select a module to begin testing.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-obrioxia-cyan/50 transition-all">
            <h3 class="text-2xl font-orbitron text-white mb-2">LOGGER</h3>
            <p class="text-sm text-gray-400 mb-6">Submit a decision event. Sensitive fields are sealed with write-only protection.</p>
            <a routerLink="/hub/logger" class="inline-block w-full py-3 bg-obrioxia-cyan text-black font-bold rounded hover:bg-cyan-400 transition-all font-orbitron">LAUNCH</a>
          </div>
          <div class="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all">
            <h3 class="text-2xl font-orbitron text-white mb-2">VERIFIER</h3>
            <p class="text-sm text-gray-400 mb-6">Cryptographically verify the integrity of any audit log.</p>
            <a routerLink="/hub/verifier" class="inline-block w-full py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-all font-orbitron">LAUNCH</a>
          </div>
          <div class="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/50 transition-all">
            <h3 class="text-2xl font-orbitron text-white mb-2">SHREDDER</h3>
            <p class="text-sm text-gray-400 mb-6">Selectively shred sensitive fields. The record stays in the chain but protected data becomes irrecoverable.</p>
            <a routerLink="/hub/shredder" class="inline-block w-full py-3 bg-transparent border border-red-500 text-red-500 font-bold rounded hover:bg-red-500/10 transition-all font-orbitron">LAUNCH</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DemoComponent implements OnInit { // ✅ FIXED CLASS NAME
  private router = inject(Router);

  ngOnInit() { }

  logout() {
    localStorage.removeItem('demo_key');
    this.router.navigate(['/']);
  }
}
