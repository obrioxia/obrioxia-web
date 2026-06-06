import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ai-insurance-evidence',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen pt-28 pb-20 px-4">
      <div class="max-w-7xl mx-auto">

        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- SECTION 1 — HERO                                          -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <div class="text-center mb-24 flex flex-col items-center">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-medium text-gray-400 mb-6 tracking-widest uppercase backdrop-blur-sm">
            <span class="w-1.5 h-1.5 rounded-full bg-obrioxia-cyan opacity-60"></span>
            Compliance & Insurance
          </div>

          <h1 class="text-[36px] md:text-[56px] font-medium leading-[1.28] mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
            AI Insurance Evidence for <span class="bg-clip-text text-transparent bg-gradient-to-r from-obrioxia-cyan to-obrioxia-cyan/70">Agentic Workflows</span>
          </h1>

          <p class="text-white/70 text-[17px] font-normal max-w-[720px] mx-auto mb-10 text-center">
            Obrioxia turns AI-agent decisions into tamper-evident runtime evidence for underwriting, claims review, complaints, and policy-condition assurance.
          </p>

          <div class="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-sm sm:max-w-none mx-auto mb-8">
            <a href="mailto:hello@obrioxia.com?subject=Discuss%20an%20AI%20Insurance%20Evidence%20Sandbox"
              class="ob-btn-primary w-full sm:w-auto text-center">
              Discuss an AI Insurance Evidence Sandbox
            </a>
            <a routerLink="/pricing"
              class="ob-btn-secondary w-full sm:w-auto text-center">
              Explore Engagement Options
            </a>
          </div>
          
          <p class="text-obrioxia-cyan/60 text-xs font-mono max-w-2xl mx-auto border border-obrioxia-cyan/20 bg-obrioxia-cyan/5 rounded p-3">
            Note: The Pre-Action Evidence Gate is currently a locally verified sandbox capability and is not yet a public production deployment.
          </p>
        </div>

        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- SECTION 2 — PROBLEM SECTION                               -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <div class="mb-24">
          <h2 class="text-2xl md:text-3xl text-white font-orbitron mb-8 text-center">
            The Agentic Commerce <span class="text-obrioxia-cyan">Evidence Gap</span>
          </h2>
          
          <div class="glass-panel p-8 md:p-10 rounded-xl border border-white/10 mb-8 max-w-4xl mx-auto">
            <p class="text-gray-300 leading-relaxed mb-6 text-center">
              AI agents are moving from providing answers to taking actions. This shift in agentic commerce creates profound new insurance and liability questions when an automated action leads to a dispute.
            </p>
            
            <h3 class="text-lg text-white font-orbitron mb-4 text-center">New Questions for AI-Agent Liability:</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex items-start gap-3 p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                <span class="text-obrioxia-cyan text-[10px] uppercase tracking-widest font-mono border border-obrioxia-cyan/30 px-1.5 py-0.5 rounded bg-obrioxia-cyan/10 shrink-0 mt-0.5">INTENT</span>
                <p class="text-gray-400 text-sm">What did the customer ask?</p>
              </div>
              <div class="flex items-start gap-3 p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                <span class="text-obrioxia-cyan text-[10px] uppercase tracking-widest font-mono border border-obrioxia-cyan/30 px-1.5 py-0.5 rounded bg-obrioxia-cyan/10 shrink-0 mt-0.5">PROPOSAL</span>
                <p class="text-gray-400 text-sm">What did the agent propose?</p>
              </div>
              <div class="flex items-start gap-3 p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                <span class="text-obrioxia-cyan text-[10px] uppercase tracking-widest font-mono border border-obrioxia-cyan/30 px-1.5 py-0.5 rounded bg-obrioxia-cyan/10 shrink-0 mt-0.5">MATCH</span>
                <p class="text-gray-400 text-sm">Did it match intent?</p>
              </div>
              <div class="flex items-start gap-3 p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                <span class="text-obrioxia-cyan text-[10px] uppercase tracking-widest font-mono border border-obrioxia-cyan/30 px-1.5 py-0.5 rounded bg-obrioxia-cyan/10 shrink-0 mt-0.5">APPROVAL</span>
                <p class="text-gray-400 text-sm">Was human approval required?</p>
              </div>
              <div class="flex items-start gap-3 p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                <span class="text-obrioxia-cyan text-[10px] uppercase tracking-widest font-mono border border-obrioxia-cyan/30 px-1.5 py-0.5 rounded bg-obrioxia-cyan/10 shrink-0 mt-0.5">RECONSTRUCT</span>
                <p class="text-gray-400 text-sm">Can the decision be reconstructed later?</p>
              </div>
              <div class="flex items-start gap-3 p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                <span class="text-obrioxia-cyan text-[10px] uppercase tracking-widest font-mono border border-obrioxia-cyan/30 px-1.5 py-0.5 rounded bg-obrioxia-cyan/10 shrink-0 mt-0.5">ROUTE</span>
                <p class="text-gray-400 text-sm">Could a risky action be blocked or routed before execution?</p>
              </div>
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- SECTION 3 — THREE-LAYER CAPABILITY                        -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <div class="mb-24">
          <h2 class="text-2xl md:text-3xl text-white font-orbitron mb-8 text-center">
            Three Layers of <span class="text-obrioxia-cyan">AI Runtime Evidence</span>
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="glass-panel p-8 rounded-xl border border-white/10 relative bg-black/80 z-10 flex flex-col h-full hover:border-obrioxia-cyan/40 transition-all">
              <div class="w-12 h-12 bg-obrioxia-cyan/10 border border-obrioxia-cyan rounded-full flex items-center justify-center text-obrioxia-cyan font-orbitron text-xl mb-6 mx-auto">1</div>
              <h3 class="text-xl text-white font-orbitron mb-3 text-center">Evidence Capture and Reconstruction</h3>
              <p class="text-gray-400 text-sm text-center flex-grow">
                Capture what happened and reconstruct it later.
              </p>
            </div>
            <div class="glass-panel p-8 rounded-xl border border-white/10 relative bg-black/80 z-10 flex flex-col h-full hover:border-obrioxia-cyan/40 transition-all">
              <div class="w-12 h-12 bg-obrioxia-cyan/10 border border-obrioxia-cyan rounded-full flex items-center justify-center text-obrioxia-cyan font-orbitron text-xl mb-6 mx-auto">2</div>
              <h3 class="text-xl text-white font-orbitron mb-3 text-center">Real-Time Evidence Flags</h3>
              <p class="text-gray-400 text-sm text-center flex-grow">
                Detect policy mismatches and abnormal AI-agent actions.
              </p>
            </div>
            <div class="glass-panel p-8 rounded-xl border border-obrioxia-cyan/30 relative bg-black/80 z-10 flex flex-col h-full shadow-[0_0_15px_rgba(0,255,255,0.05)] transition-all">
              <div class="w-12 h-12 bg-obrioxia-cyan/20 border border-obrioxia-cyan rounded-full flex items-center justify-center text-white font-orbitron text-xl mb-6 mx-auto">3</div>
              <h3 class="text-xl text-white font-orbitron mb-3 text-center">Pre-Action Evidence Gate</h3>
              <p class="text-gray-400 text-sm text-center flex-grow">
                Where a client routes proposed AI-agent actions through Obrioxia before execution, Obrioxia can return allow, block, flag, or require-human-review decisions and record that decision as tamper-evident evidence.
              </p>
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- SECTION 4 — PRE-ACTION EVIDENCE GATE SECTION              -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <div class="mb-24">
          <h2 class="text-2xl md:text-3xl text-white font-orbitron mb-8 text-center">
            How the <span class="text-obrioxia-cyan">Pre-Action Evidence Gate</span> Works
          </h2>

          <div class="glass-panel p-0 rounded-xl border border-white/10 max-w-4xl mx-auto overflow-hidden">
            <div class="flex flex-col md:flex-row">
              <!-- Left side: The Flow -->
              <div class="p-8 md:w-1/2 bg-white/[0.02]">
                <h3 class="text-lg text-white font-orbitron mb-6">Pre-Action Policy Checkpoint</h3>
                
                <div class="space-y-4 mb-6">
                  <div>
                    <span class="text-gray-500 text-xs font-mono block mb-1">Customer intent:</span>
                    <span class="text-gray-300 text-sm font-medium">Paris, Tuesday, max £250</span>
                  </div>
                  
                  <div class="flex flex-col items-center text-white/20 my-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                  </div>
                  
                  <div class="p-3 rounded border border-white/10 bg-black/40">
                    <span class="text-gray-500 text-xs font-mono block mb-1">AI proposed action:</span>
                    <span class="text-gray-300 text-sm font-medium">Madrid, Wednesday, £430</span>
                  </div>
                  
                  <div class="flex flex-col items-center text-white/20 my-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                  </div>
                </div>
              </div>
              
              <!-- Right side: Obrioxia Response -->
              <div class="p-8 md:w-1/2 border-t md:border-t-0 md:border-l border-white/10 bg-black/50">
                <div class="mb-6">
                  <span class="text-gray-500 text-xs font-mono block mb-2">Obrioxia response:</span>
                  <div class="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-orbitron font-bold tracking-widest text-lg">
                    BLOCK
                  </div>
                </div>
                
                <div class="mb-4">
                  <span class="text-gray-500 text-xs font-mono block mb-2">Reasons:</span>
                  <ul class="space-y-1">
                    <li class="text-red-300/80 text-sm font-mono bg-red-500/5 px-2 py-1 rounded inline-block mr-2 mb-2">price_limit_breached</li>
                    <li class="text-red-300/80 text-sm font-mono bg-red-500/5 px-2 py-1 rounded inline-block mr-2 mb-2">destination_mismatch</li>
                    <li class="text-red-300/80 text-sm font-mono bg-red-500/5 px-2 py-1 rounded inline-block mr-2 mb-2">date_mismatch</li>
                    <li class="text-red-300/80 text-sm font-mono bg-red-500/5 px-2 py-1 rounded inline-block mb-2">missing_human_approval</li>
                  </ul>
                </div>
                
                <div>
                  <span class="text-gray-500 text-xs font-mono block mb-1">Recommended action:</span>
                  <span class="text-obrioxia-cyan text-sm font-medium">route to human review</span>
                </div>
              </div>
            </div>
            
            <div class="bg-obrioxia-cyan/5 border-t border-obrioxia-cyan/20 p-4 text-center">
              <p class="text-gray-400 text-sm leading-relaxed max-w-3xl mx-auto">
                The client system must enforce the returned decision. Obrioxia provides the checkpoint decision and the tamper-evident evidence record where integrated before execution.
              </p>
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- SECTION 5 — EVIDENCE PACK                                 -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <div class="mb-24">
          <h2 class="text-2xl md:text-3xl text-white font-orbitron mb-8 text-center">
            <span class="text-obrioxia-cyan">Underwriter-Readable</span> Evidence Pack
          </h2>
          
          <div class="glass-panel p-8 md:p-12 rounded-xl border border-white/10 max-w-4xl mx-auto">
            <p class="text-gray-300 leading-relaxed mb-8 text-center max-w-2xl mx-auto">
              Transform opaque AI logs into structured, policy-condition evidence. The exported evidence pack can show:
            </p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="p-4 rounded border border-white/10 bg-black/40 text-center">
                <h4 class="text-white font-orbitron text-sm mb-1">Original Intent</h4>
                <p class="text-gray-500 text-[10px] uppercase tracking-wider">Captured</p>
              </div>
              <div class="p-4 rounded border border-white/10 bg-black/40 text-center">
                <h4 class="text-white font-orbitron text-sm mb-1">Proposed Action</h4>
                <p class="text-gray-500 text-[10px] uppercase tracking-wider">Captured</p>
              </div>
              <div class="p-4 rounded border border-white/10 bg-black/40 text-center">
                <h4 class="text-white font-orbitron text-sm mb-1">Gate Decision</h4>
                <p class="text-gray-500 text-[10px] uppercase tracking-wider">Sealed</p>
              </div>
              <div class="p-4 rounded border border-white/10 bg-black/40 text-center">
                <h4 class="text-white font-orbitron text-sm mb-1">Gate Reasons</h4>
                <p class="text-gray-500 text-[10px] uppercase tracking-wider">Sealed</p>
              </div>
              <div class="p-4 rounded border border-white/10 bg-black/40 text-center">
                <h4 class="text-white font-orbitron text-sm mb-1">Gate Event ID</h4>
                <p class="text-gray-500 text-[10px] uppercase tracking-wider">Reference</p>
              </div>
              <div class="p-4 rounded border border-white/10 bg-black/40 text-center">
                <h4 class="text-white font-orbitron text-sm mb-1">Verification Status</h4>
                <p class="text-obrioxia-cyan text-[10px] uppercase tracking-wider">Math Verified</p>
              </div>
              <div class="p-4 rounded border border-white/10 bg-black/40 text-center">
                <h4 class="text-white font-orbitron text-sm mb-1">Evidence Chain</h4>
                <p class="text-gray-500 text-[10px] uppercase tracking-wider">Entries Linked</p>
              </div>
              <div class="p-4 rounded border border-white/10 bg-black/40 text-center border-b-2 border-b-red-500/50">
                <h4 class="text-white font-orbitron text-sm mb-1">Compliant Erasure</h4>
                <p class="text-gray-500 text-[10px] uppercase tracking-wider">Support Where Configured</p>
              </div>
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- SECTION 6 — CTA                                           -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <div class="mb-24">
          <div class="glass-panel p-8 md:p-12 rounded-xl border border-obrioxia-cyan/30 text-center relative overflow-hidden max-w-4xl mx-auto">
            <div class="absolute inset-0 bg-gradient-to-b from-obrioxia-cyan/5 to-transparent pointer-events-none"></div>
            
            <h2 class="text-2xl md:text-4xl text-white font-orbitron mb-8 relative z-10">
              Ready to discuss <span class="text-obrioxia-cyan">AI Insurance Evidence?</span>
            </h2>
            
            <div class="flex flex-col sm:flex-row justify-center gap-4 w-full relative z-10">
              <a href="mailto:hello@obrioxia.com?subject=Discuss%20an%20AI%20Insurance%20Evidence%20Sandbox"
                class="ob-btn-primary w-full sm:w-auto text-center px-8 py-3">
                Discuss an AI Insurance Evidence Sandbox
              </a>
              <a routerLink="/pricing"
                class="ob-btn-secondary w-full sm:w-auto text-center px-8 py-3">
                Explore Engagement Options
              </a>
            </div>
          </div>
        </div>
        
        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- FOOTER NOTE                                               -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <div class="mt-20 pt-8 border-t border-white/10 text-center">
          <p class="text-gray-600 font-orbitron text-[10px] tracking-widest uppercase">
            Obrioxia Immutable Systems &copy; 2025–2026 · Patent pending.
          </p>
        </div>

      </div>
    </div>
  `
})
export class AiInsuranceEvidenceComponent {}
