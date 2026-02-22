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

      <div class="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h1 class="text-5xl md:text-6xl font-orbitron font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            AUDIT <span class="text-obrioxia-cyan">ENGINE</span>
          </h1>
          <p class="text-gray-400 max-w-2xl mx-auto text-lg">
            Tamper-Evident Ledger Active. Select a module to begin testing.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div class="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-obrioxia-cyan/50 transition-all duration-300 hover:-translate-y-1">
            <div class="absolute inset-0 bg-gradient-to-br from-obrioxia-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <h3 class="text-2xl font-orbitron text-white mb-2">LOGGER</h3>
            <p class="text-sm text-gray-400 mb-6 h-12">Submit a decision event. Sensitive fields are sealed with write-only protection.</p>
            <a href="https://demo.obrioxia.com/log" class="inline-flex items-center justify-center w-full py-3 bg-obrioxia-cyan text-black font-bold rounded hover:bg-cyan-400 transition-all font-orbitron">
              LAUNCH LOGGER
            </a>
          </div>

          <div class="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <h3 class="text-2xl font-orbitron text-white mb-2">VERIFIER</h3>
            <p class="text-sm text-gray-400 mb-6 h-12">Cryptographically verify the integrity of any audit log.</p>
            <a href="https://demo.obrioxia.com/verify" class="inline-flex items-center justify-center w-full py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-all font-orbitron">
              LAUNCH VERIFIER
            </a>
          </div>

          <div class="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1">
            <div class="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <h3 class="text-2xl font-orbitron text-white mb-2">SHREDDER</h3>
            <p class="text-sm text-gray-400 mb-6 h-12">Selectively shred sensitive fields. The record stays in the chain but protected data becomes irrecoverable.</p>
            <a href="https://demo.obrioxia.com/shred" class="inline-flex items-center justify-center w-full py-3 bg-transparent border border-red-500 text-red-500 font-bold rounded hover:bg-red-500/10 transition-all font-orbitron">
              LAUNCH SHREDDER
            </a>
          </div>

        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-3xl mx-auto">
          <div class="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 class="text-lg font-orbitron text-obrioxia-cyan mb-3">What this demo includes</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li class="flex items-start"><span class="text-obrioxia-cyan mr-2">►</span>Log decision events to a live sandbox ledger</li>
              <li class="flex items-start"><span class="text-obrioxia-cyan mr-2">►</span>Verify chain integrity in real time</li>
              <li class="flex items-start"><span class="text-obrioxia-cyan mr-2">►</span>Shred sensitive fields and re-verify</li>
              <li class="flex items-start"><span class="text-obrioxia-cyan mr-2">►</span>All data is synthetic — no real PII</li>
            </ul>
          </div>
          <div class="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 class="text-lg font-orbitron text-gray-400 mb-3">What the paid Hub adds</h3>
            <ul class="space-y-2 text-sm text-gray-500">
              <li class="flex items-start"><span class="text-gray-600 mr-2">+</span>Your own API key and production ledger</li>
              <li class="flex items-start"><span class="text-gray-600 mr-2">+</span>PDF audit certificates with ownership proof</li>
              <li class="flex items-start"><span class="text-gray-600 mr-2">+</span>Analytics dashboard (trends, anomalies)</li>
              <li class="flex items-start"><span class="text-gray-600 mr-2">+</span>Higher quotas, longer retention, priority support</li>
            </ul>
          </div>
        </div>

        <div class="mt-10 text-center">
          <a routerLink="/signup" class="inline-flex items-center justify-center px-8 py-3 bg-obrioxia-cyan text-black font-bold rounded hover:bg-cyan-400 transition-all font-orbitron">
            SIGN UP FOR HUB ACCESS
          </a>
        </div>

        <div class="mt-8 text-center">
            <div class="inline-block px-6 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-gray-400">
                SESSION ID: <span class="text-obrioxia-cyan">{{ demoKey }}</span>
            </div>
        </div>

        <div class="mt-16 border-t border-white/10 pt-8 text-center">
          <p class="text-gray-600 text-xs font-orbitron tracking-widest uppercase mb-4">OBRIOXIA AUDIT ENGINE · Patent pending.</p>
          <div class="flex justify-center gap-6">
            <a routerLink="/demo/terms" class="text-gray-600 text-xs hover:text-white transition-colors">Terms &amp; Conditions</a>
            <a routerLink="/demo/privacy" class="text-gray-600 text-xs hover:text-white transition-colors">Privacy Policy</a>
            <a routerLink="/demo/data-disclaimer" class="text-gray-600 text-xs hover:text-white transition-colors">Data Disclaimer</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DemoComponent implements OnInit {
  private router = inject(Router);
  demoKey = '';

  ngOnInit() {
    this.demoKey = localStorage.getItem('demo_key') || 'UNKNOWN';
  }

  logout() {
    localStorage.removeItem('demo_key');
    this.router.navigate(['/']);
  }
}
