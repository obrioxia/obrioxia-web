import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-demo-data-disclaimer',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="min-h-screen pt-28 pb-20 px-4">
      <div class="max-w-3xl mx-auto">

        <div class="text-center mb-12">
          <h1 class="text-3xl text-white font-orbitron mb-4">Data <span class="text-obrioxia-cyan">Disclaimer</span></h1>
          <p class="text-gray-500 text-sm">Demo Environment</p>
        </div>

        <div class="glass-panel p-8 rounded-xl border border-white/10 text-gray-300 space-y-6 leading-relaxed text-sm">

          <section>
            <h2 class="text-lg text-white font-orbitron mb-3">1. Synthetic Data Only</h2>
            <p>All data displayed in this demo environment is synthetic. It does not represent real individuals, real decisions, or real outcomes. Do not enter real personal data.</p>
          </section>

          <section>
            <h2 class="text-lg text-white font-orbitron mb-3">2. What This Demo Illustrates</h2>
            <p>This demo illustrates tamper-evident logging and write-only protection for selected fields. Events are sealed into a hash chain that detects any modification after the fact.</p>
          </section>

          <section>
            <h2 class="text-lg text-white font-orbitron mb-3">3. Selective Shredding</h2>
            <p>The shredding feature makes protected fields permanently irrecoverable while preserving the integrity of the audit chain. The record remains in the chain, but the sensitive payload can no longer be accessed.</p>
          </section>

          <section>
            <h2 class="text-lg text-white font-orbitron mb-3">4. No Real Data</h2>
            <p>This environment is not intended for production use. Any data entered should be fictional. Obrioxia accepts no responsibility for real personal data submitted to this demo.</p>
          </section>

        </div>

        <div class="mt-8 text-center">
          <a routerLink="/demo" class="text-obrioxia-cyan text-sm hover:underline font-orbitron">← Back to Demo</a>
        </div>

      </div>
    </div>
  `
})
export class DemoDataDisclaimerComponent { }
