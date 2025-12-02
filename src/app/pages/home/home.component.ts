import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- HERO SECTION -->
    <div class="relative overflow-hidden min-h-[90vh] flex items-center justify-center pt-20">
      <!-- Background Grid -->
      <div class="absolute inset-0 z-0 opacity-20 bg-grid-pattern [background-size:40px_40px]"></div>
      
      <!-- Radial Glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-obrioxia-cyan rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

      <div class="relative z-10 text-center max-w-4xl px-4">
        <div class="inline-block px-3 py-1 mb-6 border border-obrioxia-cyan/30 rounded-full bg-obrioxia-cyan/5 backdrop-blur-sm">
          <span class="text-obrioxia-cyan text-xs font-bold tracking-[0.2em] font-orbitron">SYSTEM ONLINE // V3.6</span>
        </div>
        
        <h1 class="font-orbitron text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          Trust, But <span class="text-transparent bg-clip-text bg-gradient-to-r from-obrioxia-cyan to-obrioxia-green">Verify</span>.
        </h1>
        
        <p class="text-obrioxia-text text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          The immutable audit layer for Enterprise AI. Secure your autonomous agents with cryptographic proof and real-time black box recording.
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
           <a href="https://demo.obrioxia.com" target="_blank" class="font-orbitron text-sm font-bold bg-obrioxia-cyan text-obrioxia-base px-8 py-4 rounded hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] w-full sm:w-auto cursor-pointer flex items-center justify-center text-decoration-none">
             START INTEGRATION
           </a>
           <a routerLink="/docs" class="font-orbitron text-sm font-bold bg-transparent border border-obrioxia-muted text-obrioxia-text px-8 py-4 rounded hover:border-white hover:text-white transition-all duration-300 w-full sm:w-auto cursor-pointer flex items-center justify-center text-decoration-none">
             VIEW DOCUMENTATION
           </a>
        </div>
      </div>
    </div>

    <!-- FEATURES GRID SECTION -->
    <div class="py-24 bg-obrioxia-base relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="font-orbitron text-3xl md:text-4xl text-white mb-4">The AI Black Box Recorder</h2>
          <p class="text-obrioxia-muted max-w-2xl mx-auto">Obrioxia acts as an independent observer, logging every decision your AI makes to an immutable ledger.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <!-- Card 1 -->
          <div class="glass-panel p-8 rounded-xl hover:border-obrioxia-cyan/50 transition-colors duration-300 group">
            <div class="w-12 h-12 bg-obrioxia-cyan/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-obrioxia-cyan/20 transition-colors">
              <svg class="w-6 h-6 text-obrioxia-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h3 class="font-orbitron text-xl text-white mb-3">Immutable Security</h3>
            <p class="text-obrioxia-muted leading-relaxed">Every log entry is cryptographically hashed. Once written, it cannot be altered or deleted by anyone, including you.</p>
          </div>

          <!-- Card 2 -->
          <div class="glass-panel p-8 rounded-xl hover:border-obrioxia-green/50 transition-colors duration-300 group">
            <div class="w-12 h-12 bg-obrioxia-green/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-obrioxia-green/20 transition-colors">
              <svg class="w-6 h-6 text-obrioxia-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 class="font-orbitron text-xl text-white mb-3">Instant Verification</h3>
            <p class="text-obrioxia-muted leading-relaxed">Generate verification receipts for any AI action. Prove to regulators and customers that your model followed policy.</p>
          </div>

          <!-- Card 3 -->
          <div class="glass-panel p-8 rounded-xl hover:border-purple-500/50 transition-colors duration-300 group">
            <div class="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
              <svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 class="font-orbitron text-xl text-white mb-3">Zero Latency</h3>
            <p class="text-obrioxia-muted leading-relaxed">Built on high-performance infrastructure designed to audit high-frequency trading and autonomous agents without slowing them down.</p>
          </div>

        </div>
      </div>
    </div>
  `
})
export class HomeComponent {}


