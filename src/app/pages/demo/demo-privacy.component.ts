import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-demo-privacy',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="min-h-screen bg-obrioxia-base pt-28 pb-20 px-4">
      <div class="max-w-3xl mx-auto">

        <div class="text-center mb-12">
          <h1 class="text-3xl text-white font-orbitron mb-4">Privacy <span class="text-obrioxia-cyan">Policy</span></h1>
          <p class="text-gray-500 text-sm">Demo Environment</p>
        </div>

        <div class="glass-panel p-8 rounded-xl border border-white/10 text-gray-300 space-y-6 leading-relaxed text-sm">

          <section>
            <h2 class="text-lg text-white font-orbitron mb-3">1. Demo Environment</h2>
            <p>This is a demonstration environment. It is not intended for processing real personal data. Please avoid entering genuine personal information.</p>
          </section>

          <section>
            <h2 class="text-lg text-white font-orbitron mb-3">2. Data Submitted</h2>
            <p>Any data submitted through this demo may be logged for demonstration and diagnostic purposes. This data is treated as synthetic and may be periodically cleared.</p>
          </section>

          <section>
            <h2 class="text-lg text-white font-orbitron mb-3">3. No Sensitive Data</h2>
            <p>This demo is not designed to handle sensitive personal data. Do not submit information that could identify a real individual, including names, addresses, financial details, or health records.</p>
          </section>

          <section>
            <h2 class="text-lg text-white font-orbitron mb-3">4. Storage</h2>
            <p>Demo data is stored for demonstration purposes only and may be deleted without notice. This environment does not represent a production data-handling commitment.</p>
          </section>

          <section>
            <h2 class="text-lg text-white font-orbitron mb-3">5. Not a Consumer Commitment</h2>
            <p>This privacy policy applies only to this demo environment. It does not constitute a consumer privacy commitment or replace any production privacy policy.</p>
          </section>

        </div>

        <div class="mt-8 text-center">
          <a routerLink="/demo" class="text-obrioxia-cyan text-sm hover:underline font-orbitron">← Back to Demo</a>
        </div>

      </div>
    </div>
  `
})
export class DemoPrivacyComponent { }
