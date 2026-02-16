import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-demo-terms',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="min-h-screen bg-obrioxia-base pt-28 pb-20 px-4">
      <div class="max-w-3xl mx-auto">

        <div class="text-center mb-12">
          <h1 class="text-3xl text-white font-orbitron mb-4">Terms &amp; <span class="text-obrioxia-cyan">Conditions</span></h1>
          <p class="text-gray-500 text-sm">Demo Environment</p>
        </div>

        <div class="glass-panel p-8 rounded-xl border border-white/10 text-gray-300 space-y-6 leading-relaxed text-sm">

          <section>
            <h2 class="text-lg text-white font-orbitron mb-3">1. Demo Purpose</h2>
            <p>This is a demonstration environment. All data within this demo is synthetic and generated for illustration purposes only. The demo is provided to help you evaluate the capabilities of the Obrioxia platform.</p>
          </section>

          <section>
            <h2 class="text-lg text-white font-orbitron mb-3">2. No Warranties</h2>
            <p>This demo is provided "as is" without warranties of any kind, either express or implied. We make no guarantees regarding availability, accuracy, or fitness for any particular purpose.</p>
          </section>

          <section>
            <h2 class="text-lg text-white font-orbitron mb-3">3. User Responsibility</h2>
            <p>Do not submit real personal data into this demo environment. You are responsible for ensuring that any data you enter is synthetic or non-sensitive. Obrioxia accepts no liability for real data submitted to the demo.</p>
          </section>

          <section>
            <h2 class="text-lg text-white font-orbitron mb-3">4. Changes</h2>
            <p>This demo environment may be updated, modified, or removed at any time without notice. Features shown may not reflect the final production offering.</p>
          </section>

          <section>
            <h2 class="text-lg text-white font-orbitron mb-3">5. Service Basis</h2>
            <p>The service is provided as-is for evaluation purposes. No service-level agreement applies to this demo environment.</p>
          </section>

        </div>

        <div class="mt-8 text-center">
          <a routerLink="/demo" class="text-obrioxia-cyan text-sm hover:underline font-orbitron">← Back to Demo</a>
        </div>

      </div>
    </div>
  `
})
export class DemoTermsComponent { }
