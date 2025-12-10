import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-obrioxia-base pt-24 pb-20 flex items-center justify-center relative">
        <!-- Background -->
        <div class="absolute inset-0 bg-grid-pattern [background-size:40px_40px] opacity-20 pointer-events-none"></div>

        <div class="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row gap-12">
            
            <!-- Left: Context -->
            <div class="md:w-1/2">
                <div class="inline-block px-3 py-1 mb-4 border border-obrioxia-green/30 rounded bg-obrioxia-green/5">
                    <span class="text-obrioxia-green text-xs font-bold font-orbitron">ENTERPRISE SALES</span>
                </div>
                <h1 class="font-orbitron text-4xl text-white mb-6">Secure Your <br/><span class="text-obrioxia-cyan">Compliance</span> Strategy.</h1>
                <p class="text-obrioxia-text text-lg font-light mb-8">
                    Book a technical deep-dive to discuss your architecture. We will demonstrate:
                </p>
                <ul class="space-y-4 mb-8">
                    <li class="flex items-center text-gray-300">
                        <span class="w-6 h-6 rounded-full bg-obrioxia-cyan/10 flex items-center justify-center text-obrioxia-cyan mr-3 text-xs">01</span>
                        VPC / On-Premise Architecture
                    </li>
                    <li class="flex items-center text-gray-300">
                        <span class="w-6 h-6 rounded-full bg-obrioxia-cyan/10 flex items-center justify-center text-obrioxia-cyan mr-3 text-xs">02</span>
                        Custom Retention Policy Setup
                    </li>
                    <li class="flex items-center text-gray-300">
                        <span class="w-6 h-6 rounded-full bg-obrioxia-cyan/10 flex items-center justify-center text-obrioxia-cyan mr-3 text-xs">03</span>
                        EU AI Act Gap Analysis
                    </li>
                </ul>
                <div class="text-sm text-obrioxia-muted">
                    <p class="font-bold text-white mb-1">Direct Email:</p>
                    <a href="mailto:hello@obrioxia.com" class="hover:text-obrioxia-cyan transition-colors">hello@obrioxia.com</a>
                </div>
            </div>

            <!-- Right: The Form -->
            <div class="md:w-1/2">
                <div class="glass-panel p-8 rounded-xl border border-white/5">
                    <form class="space-y-4">
                        <div>
                            <label class="block text-xs font-orbitron text-gray-400 mb-2">WORK EMAIL</label>
                            <input type="email" placeholder="name@company.com" class="w-full bg-[#050B14] border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan focus:outline-none transition-colors">
                        </div>
                        <div>
                            <label class="block text-xs font-orbitron text-gray-400 mb-2">COMPANY SIZE</label>
                            <select class="w-full bg-[#050B14] border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan focus:outline-none transition-colors">
                                <option>1-50 Employees</option>
                                <option>51-500 Employees</option>
                                <option>500+ (Enterprise)</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-orbitron text-gray-400 mb-2">INTEREST</label>
                            <textarea rows="4" placeholder="We are building a medical diagnostic agent and need ISO 42001 logging..." class="w-full bg-[#050B14] border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan focus:outline-none transition-colors"></textarea>
                        </div>
                        <button type="button" class="w-full py-3 bg-obrioxia-cyan text-obrioxia-base font-orbitron font-bold rounded hover:bg-[#80F7FF] transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                            REQUEST DEMO
                        </button>
                    </form>
                </div>
            </div>

        </div>
    </div>
  `
})
export class ContactComponent {}


