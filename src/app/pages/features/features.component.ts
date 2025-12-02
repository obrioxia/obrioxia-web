import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-obrioxia-base pt-20 pb-20 overflow-x-hidden">
        <!-- Background Grid -->
        <div class="fixed inset-0 z-0 opacity-20 bg-grid-pattern [background-size:40px_40px] pointer-events-none"></div>

        <!-- Header -->
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
            <h1 class="font-orbitron text-4xl md:text-6xl text-white mb-6">System <span class="text-obrioxia-cyan">Architecture</span></h1>
            <p class="text-obrioxia-text max-w-3xl mx-auto text-lg">
                The Obrioxia Engine is built on three fundamental pillars designed to withstand adversarial conditions and regulatory scrutiny.
            </p>
        </div>

        <!-- Feature 1: The Ledger (STORAGE) -->
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div class="order-2 md:order-1">
                    <div class="inline-block px-3 py-1 mb-4 border border-obrioxia-cyan/30 rounded bg-obrioxia-cyan/5">
                        <span class="text-obrioxia-cyan text-xs font-bold font-orbitron">01 // STORAGE</span>
                    </div>
                    <h2 class="font-orbitron text-3xl text-white mb-4">Immutable Ledger</h2>
                    <p class="text-obrioxia-muted leading-relaxed mb-6">
                        Unlike traditional databases, Obrioxia uses an append-only log structure. Once a decision event is written, it becomes cryptographically sealed and cannot be altered without detection. No root user, admin, or hacker can modify history without breaking the verification chain.
                    </p>
                    <ul class="space-y-3 text-obrioxia-text">
                        <li class="flex items-center"><span class="text-obrioxia-cyan mr-2">➜</span> Write-Once-Read-Many (WORM) compliant</li>
                        <li class="flex items-center"><span class="text-obrioxia-cyan mr-2">➜</span> Millisecond-level timestamp precision</li>
                    </ul>
                </div>
                <div class="order-1 md:order-2">
                    <div class="glass-panel h-64 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
                         <div class="absolute inset-0 bg-obrioxia-cyan/5 group-hover:bg-obrioxia-cyan/10 transition-colors duration-500"></div>
                         <div class="font-orbitron text-6xl text-white/5 font-bold tracking-widest select-none">LOCKED</div>
                         <div class="absolute bottom-4 right-4 text-obrioxia-cyan/50">
                            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                         </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Feature 2: Verification (PROOF) -->
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div class="order-1">
                     <div class="glass-panel h-64 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
                         <div class="absolute inset-0 bg-obrioxia-green/5 group-hover:bg-obrioxia-green/10 transition-colors duration-500"></div>
                         <div class="font-orbitron text-6xl text-white/5 font-bold tracking-widest select-none">VALID</div>
                         <div class="absolute bottom-4 left-4 text-obrioxia-green/50">
                            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                         </div>
                    </div>
                </div>
                <div class="order-2">
                    <div class="inline-block px-3 py-1 mb-4 border border-obrioxia-green/30 rounded bg-obrioxia-green/5">
                        <span class="text-obrioxia-green text-xs font-bold font-orbitron">02 // PROOF</span>
                    </div>
                    <h2 class="font-orbitron text-3xl text-white mb-4">Cryptographic Verification</h2>
                    <p class="text-obrioxia-muted leading-relaxed mb-6">
                        Every entry generates a SHA-256 hash receipt. This receipt acts as a digital fingerprint. You can download these proofs to verify locally that the data on our servers matches exactly what your AI sent originally, independent of our infrastructure.
                    </p>
                    <ul class="space-y-3 text-obrioxia-text">
                        <li class="flex items-center"><span class="text-obrioxia-green mr-2">➜</span> Independent verification mechanism</li>
                        <li class="flex items-center"><span class="text-obrioxia-green mr-2">➜</span> Zero-knowledge proof compatible architecture</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Feature 3: Integration (CODE) -->
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div class="order-2 md:order-1">
                    <div class="inline-block px-3 py-1 mb-4 border border-purple-500/30 rounded bg-purple-500/5">
                        <span class="text-purple-400 text-xs font-bold font-orbitron">03 // INTEGRATION</span>
                    </div>
                    <h2 class="font-orbitron text-3xl text-white mb-4">5 Lines of Code</h2>
                    <p class="text-obrioxia-muted leading-relaxed mb-6">
                        Your data scientists shouldn't need to be cryptographers. Our REST API fits into any Python, Node, or Go workflow. We handle the hashing, timestamping, and ledger storage asynchronously.
                    </p>
                    <a routerLink="/docs" class="text-sm font-bold text-white border-b border-obrioxia-cyan pb-1 hover:text-obrioxia-cyan transition-colors cursor-pointer">READ THE DOCS &rarr;</a>
                </div>
                <div class="order-1 md:order-2">
                    <div class="bg-[#0d1117] rounded-xl border border-white/10 p-6 shadow-2xl relative">
                        <div class="absolute top-4 right-4 flex space-x-2">
                            <div class="w-3 h-3 rounded-full bg-red-500"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div class="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <code class="text-sm font-mono block text-gray-300 pt-6">
                            <span class="text-purple-400">import</span> obrioxia<br/><br/>
                            <span class="text-gray-500"># Log the decision</span><br/>
                            receipt = obrioxia.log({{ '{' }}<br/>
                            &nbsp;&nbsp;<span class="text-green-400">"agent"</span>: <span class="text-yellow-300">"claims-v2"</span>,<br/>
                            &nbsp;&nbsp;<span class="text-green-400">"decision"</span>: <span class="text-yellow-300">"APPROVED"</span>,<br/>
                            &nbsp;&nbsp;<span class="text-green-400">"confidence"</span>: 0.98<br/>
                            {{ '}' }})<br/><br/>
                            print(receipt.hash)<br/>
                            <span class="text-gray-500"># "0x8f43a..."</span>
                        </code>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  `
})
export class FeaturesComponent {}


