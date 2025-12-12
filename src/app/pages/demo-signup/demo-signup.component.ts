import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-demo-signup',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-obrioxia-base pt-32 pb-20 px-4 flex flex-col items-center text-center">
      <div class="max-w-2xl mx-auto">
        
        <div class="w-20 h-20 bg-obrioxia-cyan/10 rounded-2xl border border-obrioxia-cyan/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
          <svg class="w-10 h-10 text-obrioxia-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
        </div>

        <h1 class="text-4xl md:text-5xl text-white font-orbitron mb-6">
          Request <span class="text-obrioxia-cyan">Live Demo</span> Access
        </h1>

        <div class="space-y-6 text-gray-400 text-lg leading-relaxed mb-12">
          <p>
            The Obrioxia Live Demo is a restricted-access sandbox environment for evaluating our immutable audit chain technology.
          </p>
          <div class="bg-white/5 border border-white/10 rounded-lg p-6 text-left space-y-3">
            <div class="flex items-start gap-3">
              <span class="text-obrioxia-cyan mt-1">▸</span>
              <span><strong>Invite Only:</strong> To maintain system integrity, access is granted via session keys only.</span>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-obrioxia-cyan mt-1">▸</span>
              <span><strong>Evaluation Purpose:</strong> Designed for technical verification of logging, hashing, and shredding capabilities.</span>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-obrioxia-cyan mt-1">▸</span>
              <span><strong>Limited Scope:</strong> This environment does not connect to production APIs or store persistent data.</span>
            </div>
          </div>
        </div>

        <a routerLink="/signup" class="inline-block px-8 py-4 bg-obrioxia-cyan text-black font-bold text-lg font-orbitron rounded hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] uppercase tracking-wide">
          Get Your Session Key
        </a>
        
        <p class="mt-6 text-sm text-gray-500">
          Already have a key? <a href="https://demo.obrioxia.com" class="text-obrioxia-cyan hover:underline">Enter Demo Environment →</a>
        </p>

      </div>
    </div>
  `
})
export class DemoSignupComponent {}
