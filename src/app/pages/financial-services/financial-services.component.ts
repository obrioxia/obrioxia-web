import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-financial-services',
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
            Regulated Financial Services
          </div>

          <h1 class="text-[36px] md:text-[56px] font-medium leading-[1.28] mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
            Reconstruct AI-assisted customer decisions <span class="bg-clip-text text-transparent bg-gradient-to-r from-obrioxia-cyan to-obrioxia-cyan/70">when they are challenged.</span>
          </h1>

          <p class="text-white/70 text-[17px] font-normal max-w-[720px] mx-auto mb-10 text-center">
            Obrioxia helps regulated financial firms capture, seal, verify, and reconstruct AI-assisted decision evidence for complaints, Consumer Duty reviews, audits, and regulatory scrutiny.
          </p>

          <div class="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-sm sm:max-w-none mx-auto">
            <a href="mailto:hello@obrioxia.com?subject=Discovery%20Call%20-%20Financial%20Services"
              class="ob-btn-primary w-full sm:w-auto text-center">
              Book a 15 minute discovery call
            </a>
            <a href="#sample-reconstruction"
              class="ob-btn-secondary w-full sm:w-auto text-center">
              View sample decision reconstruction
            </a>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- SECTION 2 — PROBLEM SECTION                               -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <div class="mb-24">
          <h2 class="text-2xl md:text-3xl text-white font-orbitron mb-8 text-center">
            The Evidence <span class="text-obrioxia-cyan">Gap</span> in AI Workflows
          </h2>
          
          <div class="glass-panel p-8 md:p-10 rounded-xl border border-white/10 mb-8">
            <p class="text-gray-300 leading-relaxed mb-6 max-w-3xl">
              AI is entering customer support, complaints handling, credit decisions, investment guidance, fraud triage, and customer outcome reviews. When an outcome is challenged, firms need evidence of what happened.
            </p>
            
            <h3 class="text-lg text-white font-orbitron mb-4">Post-Decision Proof Questions:</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div class="flex items-start gap-3 p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                <span class="text-obrioxia-cyan text-lg mt-0.5">?</span>
                <p class="text-gray-400 text-sm">What did the system see?</p>
              </div>
              <div class="flex items-start gap-3 p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                <span class="text-obrioxia-cyan text-lg mt-0.5">?</span>
                <p class="text-gray-400 text-sm">What did it recommend?</p>
              </div>
              <div class="flex items-start gap-3 p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                <span class="text-obrioxia-cyan text-lg mt-0.5">?</span>
                <p class="text-gray-400 text-sm">What did a human review?</p>
              </div>
              <div class="flex items-start gap-3 p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                <span class="text-obrioxia-cyan text-lg mt-0.5">?</span>
                <p class="text-gray-400 text-sm">What was escalated?</p>
              </div>
              <div class="flex items-start gap-3 p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                <span class="text-obrioxia-cyan text-lg mt-0.5">?</span>
                <p class="text-gray-400 text-sm">What policy rule was triggered?</p>
              </div>
              <div class="flex items-start gap-3 p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                <span class="text-obrioxia-cyan text-lg mt-0.5">?</span>
                <p class="text-gray-400 text-sm">What evidence exists or is missing?</p>
              </div>
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- SECTION 3 — WHAT OBRIOXIA DOES                            -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <div class="mb-24">
          <h2 class="text-2xl md:text-3xl text-white font-orbitron mb-8 text-center">
            How Obrioxia <span class="text-obrioxia-cyan">Works</span>
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="glass-panel p-8 rounded-xl border border-white/10 relative bg-black/80 z-10">
              <div class="w-12 h-12 bg-obrioxia-cyan/10 border border-obrioxia-cyan rounded-full flex items-center justify-center text-obrioxia-cyan font-orbitron text-xl mb-6 mx-auto">1</div>
              <h3 class="text-xl text-white font-orbitron mb-3 text-center">Capture & Seal</h3>
              <p class="text-gray-400 text-sm text-center">
                Capture decision events and seal them into a tamper-evident chain at the moment they occur.
              </p>
            </div>
            <div class="glass-panel p-8 rounded-xl border border-white/10 relative bg-black/80 z-10">
              <div class="w-12 h-12 bg-obrioxia-cyan/10 border border-obrioxia-cyan rounded-full flex items-center justify-center text-obrioxia-cyan font-orbitron text-xl mb-6 mx-auto">2</div>
              <h3 class="text-xl text-white font-orbitron mb-3 text-center">Verify & Export</h3>
              <p class="text-gray-400 text-sm text-center">
                Verify chain integrity instantly and export a portable proof pack for independent audit.
              </p>
            </div>
            <div class="glass-panel p-8 rounded-xl border border-white/10 relative bg-black/80 z-10">
              <div class="w-12 h-12 bg-obrioxia-cyan/10 border border-obrioxia-cyan rounded-full flex items-center justify-center text-obrioxia-cyan font-orbitron text-xl mb-6 mx-auto">3</div>
              <h3 class="text-xl text-white font-orbitron mb-3 text-center">Reconstruct</h3>
              <p class="text-gray-400 text-sm text-center">
                Reconstruct the decision timeline and explicitly show gaps, missing evidence, or declared loss.
              </p>
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- SECTION 4 — BEST FIRST USE CASES                          -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <div class="mb-24">
          <h2 class="text-2xl md:text-3xl text-white font-orbitron mb-8 text-center">
            Best First <span class="text-obrioxia-cyan">Use Cases</span>
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="glass-panel p-8 rounded-xl border border-obrioxia-cyan/20">
              <h3 class="text-lg text-obrioxia-cyan font-orbitron mb-4">Primary Targets</h3>
              <ul class="space-y-3">
                <li class="flex items-start text-gray-300">
                  <span class="text-obrioxia-cyan mr-2 mt-0.5">►</span>
                  <span>Complaints handling</span>
                </li>
                <li class="flex items-start text-gray-300">
                  <span class="text-obrioxia-cyan mr-2 mt-0.5">►</span>
                  <span>Consumer Duty outcome reviews</span>
                </li>
                <li class="flex items-start text-gray-300">
                  <span class="text-obrioxia-cyan mr-2 mt-0.5">►</span>
                  <span>Customer support AI</span>
                </li>
                <li class="flex items-start text-gray-300">
                  <span class="text-obrioxia-cyan mr-2 mt-0.5">►</span>
                  <span>AI-assisted credit decisions</span>
                </li>
                <li class="flex items-start text-gray-300">
                  <span class="text-obrioxia-cyan mr-2 mt-0.5">►</span>
                  <span>Vulnerable customer journeys</span>
                </li>
                <li class="flex items-start text-gray-300">
                  <span class="text-obrioxia-cyan mr-2 mt-0.5">►</span>
                  <span>Investment guidance support</span>
                </li>
              </ul>
            </div>
            
            <div class="glass-panel p-8 rounded-xl border border-white/10">
              <h3 class="text-lg text-white font-orbitron mb-4">Secondary Expansion</h3>
              <ul class="space-y-3">
                <li class="flex items-start text-gray-400">
                  <span class="text-gray-500 mr-2 mt-0.5">—</span>
                  <span>AML (Anti-Money Laundering) triage</span>
                </li>
                <li class="flex items-start text-gray-400">
                  <span class="text-gray-500 mr-2 mt-0.5">—</span>
                  <span>KYC (Know Your Customer) verifications</span>
                </li>
                <li class="flex items-start text-gray-400">
                  <span class="text-gray-500 mr-2 mt-0.5">—</span>
                  <span>Fraud triage decisions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- SECTION 5 — SAMPLE DEMO STORY                             -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <div id="sample-reconstruction" class="mb-24 pt-10">
          <h2 class="text-2xl md:text-3xl text-white font-orbitron mb-4 text-center">
            Sample: <span class="text-obrioxia-cyan">Challenged Lending Decision</span>
          </h2>
          <p class="text-gray-400 text-center mb-10 max-w-2xl mx-auto font-mono text-sm">
            Note: This is a synthetic demonstration to illustrate timeline reconstruction.
          </p>

          <div class="relative">
            <div class="hidden md:block absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-transparent via-obrioxia-cyan/30 to-transparent"></div>
            
            <div class="space-y-6">
              <div class="flex items-start gap-6">
                <div class="w-12 h-12 min-w-[3rem] bg-obrioxia-cyan/10 border border-obrioxia-cyan rounded-full flex items-center justify-center text-obrioxia-cyan font-orbitron text-sm relative z-10">1</div>
                <div class="glass-panel p-6 rounded-xl border border-white/10 w-full">
                  <h3 class="text-lg text-white font-orbitron mb-1">Customer submits application</h3>
                  <p class="text-gray-400 text-sm">Initial intake details are captured.</p>
                </div>
              </div>
              <div class="flex items-start gap-6">
                <div class="w-12 h-12 min-w-[3rem] bg-obrioxia-cyan/10 border border-obrioxia-cyan rounded-full flex items-center justify-center text-obrioxia-cyan font-orbitron text-sm relative z-10">2</div>
                <div class="glass-panel p-6 rounded-xl border border-white/10 w-full">
                  <h3 class="text-lg text-white font-orbitron mb-1">Affordability data received</h3>
                  <p class="text-gray-400 text-sm">External API response logged and sealed.</p>
                </div>
              </div>
              <div class="flex items-start gap-6">
                <div class="w-12 h-12 min-w-[3rem] bg-obrioxia-cyan/10 border border-obrioxia-cyan rounded-full flex items-center justify-center text-obrioxia-cyan font-orbitron text-sm relative z-10">3</div>
                <div class="glass-panel p-6 rounded-xl border border-white/10 w-full">
                  <h3 class="text-lg text-white font-orbitron mb-1">AI risk recommendation generated</h3>
                  <p class="text-gray-400 text-sm">Model output and confidence scores captured into the evidence chain.</p>
                </div>
              </div>
              <div class="flex items-start gap-6">
                <div class="w-12 h-12 min-w-[3rem] bg-obrioxia-cyan/10 border border-obrioxia-cyan rounded-full flex items-center justify-center text-obrioxia-cyan font-orbitron text-sm relative z-10">4</div>
                <div class="glass-panel p-6 rounded-xl border border-white/10 w-full">
                  <h3 class="text-lg text-white font-orbitron mb-1">Policy rule triggered</h3>
                  <p class="text-gray-400 text-sm">A specific internal credit policy is flagged by the recommendation.</p>
                </div>
              </div>
              <div class="flex items-start gap-6">
                <div class="w-12 h-12 min-w-[3rem] bg-obrioxia-cyan/10 border border-obrioxia-cyan rounded-full flex items-center justify-center text-obrioxia-cyan font-orbitron text-sm relative z-10">5</div>
                <div class="glass-panel p-6 rounded-xl border border-white/10 w-full">
                  <h3 class="text-lg text-white font-orbitron mb-1">Human review completed</h3>
                  <p class="text-gray-400 text-sm">An underwriter verifies the AI's flagged policy.</p>
                </div>
              </div>
              <div class="flex items-start gap-6">
                <div class="w-12 h-12 min-w-[3rem] bg-obrioxia-cyan/10 border border-obrioxia-cyan rounded-full flex items-center justify-center text-obrioxia-cyan font-orbitron text-sm relative z-10">6</div>
                <div class="glass-panel p-6 rounded-xl border border-white/10 w-full">
                  <h3 class="text-lg text-white font-orbitron mb-1">Decision approved or declined</h3>
                  <p class="text-gray-400 text-sm">Final outcome is sealed into the record.</p>
                </div>
              </div>
              <div class="flex items-start gap-6">
                <div class="w-12 h-12 min-w-[3rem] bg-obrioxia-cyan/10 border border-obrioxia-cyan rounded-full flex items-center justify-center text-obrioxia-cyan font-orbitron text-sm relative z-10">7</div>
                <div class="glass-panel p-6 rounded-xl border border-white/10 w-full">
                  <h3 class="text-lg text-white font-orbitron mb-1">Proof pack exported</h3>
                  <p class="text-gray-400 text-sm">Portable evidence bundle is generated upon request.</p>
                </div>
              </div>
              <div class="flex items-start gap-6">
                <div class="w-12 h-12 min-w-[3rem] bg-obrioxia-cyan/10 border border-obrioxia-cyan rounded-full flex items-center justify-center text-obrioxia-cyan font-orbitron text-sm relative z-10">8</div>
                <div class="glass-panel p-6 rounded-xl border border-obrioxia-green/30 w-full">
                  <h3 class="text-lg text-obrioxia-green font-orbitron mb-1">Decision reconstructed later</h3>
                  <p class="text-gray-400 text-sm">During a Consumer Duty review, the chain is verified and the full sequence of events is reconstructed from the sealed evidence.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Verification Summary Card -->
          <div class="mt-12 glass-panel p-8 rounded-xl border border-white/10 max-w-3xl mx-auto">
            <h3 class="text-xl text-white font-orbitron mb-6 text-center border-b border-white/10 pb-4">Verification Summary</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8">
              <div class="flex justify-between items-center border-b border-white/5 pb-2">
                <span class="text-gray-400 text-sm">Chain status:</span>
                <span class="text-obrioxia-green font-orbitron text-sm">verified</span>
              </div>
              <div class="flex justify-between items-center border-b border-white/5 pb-2">
                <span class="text-gray-400 text-sm">Human review:</span>
                <span class="text-white font-orbitron text-sm">present</span>
              </div>
              <div class="flex justify-between items-center border-b border-white/5 pb-2">
                <span class="text-gray-400 text-sm">Policy trigger:</span>
                <span class="text-white font-orbitron text-sm">recorded</span>
              </div>
              <div class="flex justify-between items-center border-b border-white/5 pb-2">
                <span class="text-gray-400 text-sm">Missing evidence:</span>
                <span class="text-white font-orbitron text-sm">none</span>
              </div>
              <div class="flex justify-between items-center sm:col-span-2 border-b border-white/5 pb-2">
                <span class="text-gray-400 text-sm">Decision reconstruction:</span>
                <span class="text-obrioxia-cyan font-orbitron text-sm">possible</span>
              </div>
            </div>
            <div class="text-center">
              <a routerLink="/demo-gate" class="ob-btn-primary inline-block w-full sm:w-auto">
                Try the live demo
              </a>
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- SECTION 6 — PILOT OFFER                                   -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <div class="mb-24">
          <div class="glass-panel p-8 md:p-12 rounded-xl border border-obrioxia-cyan/30 text-center relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-obrioxia-cyan/5 to-transparent pointer-events-none"></div>
            
            <h2 class="text-2xl md:text-4xl text-white font-orbitron mb-4 relative z-10">
              AI Decision <span class="text-obrioxia-cyan">Evidence Pilot</span>
            </h2>
            <p class="text-gray-300 mb-8 max-w-2xl mx-auto text-lg relative z-10">
              Prove whether one AI-assisted financial workflow can be reconstructed after challenge.
            </p>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 relative z-10 max-w-4xl mx-auto text-left">
              <div class="p-4 rounded border border-white/10 bg-black/40">
                <h4 class="text-white font-orbitron text-sm mb-1">Scope</h4>
                <p class="text-gray-400 text-xs">4 to 6 weeks</p>
              </div>
              <div class="p-4 rounded border border-white/10 bg-black/40">
                <h4 class="text-white font-orbitron text-sm mb-1">Target</h4>
                <p class="text-gray-400 text-xs">One AI-assisted workflow</p>
              </div>
              <div class="p-4 rounded border border-white/10 bg-black/40">
                <h4 class="text-white font-orbitron text-sm mb-1">Setup</h4>
                <p class="text-gray-400 text-xs">Evidence capture map</p>
              </div>
              <div class="p-4 rounded border border-white/10 bg-black/40">
                <h4 class="text-white font-orbitron text-sm mb-1">Execution</h4>
                <p class="text-gray-400 text-xs">Sample event trail</p>
              </div>
              <div class="p-4 rounded border border-white/10 bg-black/40">
                <h4 class="text-white font-orbitron text-sm mb-1">Export</h4>
                <p class="text-gray-400 text-xs">Proof-pack walkthrough</p>
              </div>
              <div class="p-4 rounded border border-white/10 bg-black/40">
                <h4 class="text-white font-orbitron text-sm mb-1">Review</h4>
                <p class="text-gray-400 text-xs">Reconstruction report</p>
              </div>
              <div class="p-4 rounded border border-white/10 bg-black/40 col-span-2 md:col-span-2">
                <h4 class="text-white font-orbitron text-sm mb-1">Analysis</h4>
                <p class="text-gray-400 text-xs">Gap findings and missing evidence detection</p>
              </div>
            </div>

            <a href="mailto:hello@obrioxia.com?subject=Discovery%20Call%20-%20AI%20Evidence%20Pilot"
              class="ob-btn-primary w-full sm:w-auto text-center relative z-10 text-lg px-8 py-3">
              Book a 15 minute discovery call
            </a>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- SECTION 7 — TRUST NOTE                                    -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <div class="mt-20 pt-8 border-t border-white/10 text-center">
          <p class="text-gray-500 font-mono text-xs max-w-2xl mx-auto mb-4 leading-relaxed">
            The demo uses synthetic data. Obrioxia does not need to expose customer PII to prove chain integrity.
          </p>
          <p class="text-gray-600 font-orbitron text-[10px] tracking-widest uppercase">
            Obrioxia Immutable Systems &copy; 2025–2026 · Patent pending.
          </p>
        </div>

      </div>
    </div>
  `
})
export class FinancialServicesComponent {}
