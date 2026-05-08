import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-demo-gate',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center p-4 pt-28 pb-20">
      <div class="w-full max-w-3xl space-y-8">

        <!-- Header -->
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-orbitron font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            TRY THE <span class="text-obrioxia-cyan">DEMO</span>
          </h1>
          <p class="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
            Obrioxia creates tamper-evident evidence around AI-supported decisions so they can later be verified, audited, reconstructed, and defended.
          </p>
        </div>

        <!-- Split Paths -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <!-- Path 1: New user -->
          <div class="glass-panel p-8 rounded-xl border border-white/10 hover:border-obrioxia-cyan/40 transition-all group">
            <div class="w-12 h-12 bg-obrioxia-cyan/10 border border-obrioxia-cyan rounded-full flex items-center justify-center text-obrioxia-cyan font-orbitron text-xl mb-5 mx-auto">
              1
            </div>
            <h2 class="text-xl text-white font-orbitron mb-3 text-center">New here?</h2>
            <p class="text-gray-400 text-sm text-center mb-6">
              Create a demo account to receive your access key.
            </p>
            <a routerLink="/signup" class="block w-full py-3 bg-obrioxia-cyan text-black font-bold text-center rounded hover:bg-cyan-400 transition-all font-orbitron text-sm">
              CREATE DEMO ACCOUNT
            </a>
          </div>

          <!-- Path 2: Returning user -->
          <div class="glass-panel p-8 rounded-xl border border-white/10 hover:border-obrioxia-cyan/40 transition-all group">
            <div class="w-12 h-12 bg-obrioxia-cyan/10 border border-obrioxia-cyan rounded-full flex items-center justify-center text-obrioxia-cyan font-orbitron text-xl mb-5 mx-auto">
              ►
            </div>
            <h2 class="text-xl text-white font-orbitron mb-3 text-center">Already have a demo key?</h2>
            <p class="text-gray-400 text-sm text-center mb-6">
              Open the demo environment and paste your key to start.
            </p>
            <a href="https://demo.obrioxia.com/demo-gate" class="block w-full py-3 bg-white/10 border border-white/20 text-white font-bold text-center rounded hover:bg-white/20 transition-all font-orbitron text-sm">
              OPEN DEMO ENVIRONMENT
            </a>
          </div>

        </div>

        <!-- How it works -->
        <div class="glass-panel p-8 rounded-xl border border-white/10">
          <h3 class="text-lg text-white font-orbitron mb-5 text-center">How the demo works</h3>
          <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div class="text-center">
              <div class="w-8 h-8 bg-obrioxia-cyan/10 border border-obrioxia-cyan/30 rounded-full flex items-center justify-center text-obrioxia-cyan font-orbitron text-sm mb-2 mx-auto">1</div>
              <p class="text-gray-400 text-xs">Create account</p>
            </div>
            <div class="text-center">
              <div class="w-8 h-8 bg-obrioxia-cyan/10 border border-obrioxia-cyan/30 rounded-full flex items-center justify-center text-obrioxia-cyan font-orbitron text-sm mb-2 mx-auto">2</div>
              <p class="text-gray-400 text-xs">Verify email if prompted</p>
            </div>
            <div class="text-center">
              <div class="w-8 h-8 bg-obrioxia-cyan/10 border border-obrioxia-cyan/30 rounded-full flex items-center justify-center text-obrioxia-cyan font-orbitron text-sm mb-2 mx-auto">3</div>
              <p class="text-gray-400 text-xs">Get your demo key</p>
            </div>
            <div class="text-center">
              <div class="w-8 h-8 bg-obrioxia-cyan/10 border border-obrioxia-cyan/30 rounded-full flex items-center justify-center text-obrioxia-cyan font-orbitron text-sm mb-2 mx-auto">4</div>
              <p class="text-gray-400 text-xs">Open demo environment</p>
            </div>
            <div class="text-center">
              <div class="w-8 h-8 bg-obrioxia-cyan/10 border border-obrioxia-cyan/30 rounded-full flex items-center justify-center text-obrioxia-cyan font-orbitron text-sm mb-2 mx-auto">5</div>
              <p class="text-gray-400 text-xs">Paste key &amp; explore</p>
            </div>
          </div>
        </div>

        <!-- Demo actions preview -->
        <div class="glass-panel p-8 rounded-xl border border-white/10">
          <h3 class="text-lg text-white font-orbitron mb-5 text-center">What you can do in the demo</h3>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div class="text-center p-3 rounded-lg bg-white/5 border border-white/5">
              <p class="text-obrioxia-cyan text-xs font-orbitron mb-1">Log Event</p>
              <p class="text-gray-500 text-[10px]">Submit a decision record</p>
            </div>
            <div class="text-center p-3 rounded-lg bg-white/5 border border-white/5">
              <p class="text-obrioxia-cyan text-xs font-orbitron mb-1">Verify Chain</p>
              <p class="text-gray-500 text-[10px]">Check chain integrity</p>
            </div>
            <div class="text-center p-3 rounded-lg bg-white/5 border border-white/5">
              <p class="text-obrioxia-cyan text-xs font-orbitron mb-1">Audit Ledger</p>
              <p class="text-gray-500 text-[10px]">Browse the full ledger</p>
            </div>
            <div class="text-center p-3 rounded-lg bg-white/5 border border-white/5">
              <p class="text-red-400 text-xs font-orbitron mb-1">Shredder</p>
              <p class="text-gray-500 text-[10px]">Crypto-shred a field</p>
            </div>
            <div class="text-center p-3 rounded-lg bg-white/5 border border-white/5">
              <p class="text-yellow-400 text-xs font-orbitron mb-1">Golden Path</p>
              <p class="text-gray-500 text-[10px]">Guided walkthrough</p>
            </div>
          </div>
        </div>

        <!-- Footer note -->
        <p class="text-center text-gray-600 text-xs font-mono">
          The demo uses synthetic data. It demonstrates technical capabilities, not a compliance certification.
        </p>

      </div>
    </div>
  `
})
export class DemoGateComponent {}
