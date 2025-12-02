import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-obrioxia-base pt-24 pb-20 relative overflow-hidden">
        <!-- Background Decor -->
        <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-obrioxia-cyan/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div class="fixed inset-0 z-0 opacity-20 bg-grid-pattern [background-size:40px_40px] pointer-events-none"></div>

        <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <!-- Header -->
            <div class="text-center mb-16">
                <div class="inline-block px-3 py-1 mb-4 border border-obrioxia-cyan/30 rounded-full bg-obrioxia-cyan/5 backdrop-blur-sm">
                    <span class="text-obrioxia-cyan text-xs font-bold tracking-[0.2em] font-orbitron">COMPLIANCE INFRASTRUCTURE</span>
                </div>
                <h1 class="font-orbitron text-4xl md:text-5xl text-white mb-6">Audit Logic. <span class="text-obrioxia-cyan">Not Budgets.</span></h1>
                <p class="text-obrioxia-text max-w-2xl mx-auto text-lg font-light">
                    Select the retention profile that matches your regulatory risk class.
                </p>
            </div>

            <!-- PRICING GRID (4 Columns) -->
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start mb-20">
                
                <!-- TIER 1: BUILDER -->
                <div class="glass-panel p-6 rounded-xl border border-white/5 hover:border-obrioxia-muted/50 transition-all duration-300 flex flex-col h-full">
                    <div class="mb-4">
                        <h3 class="font-orbitron text-lg text-white">Builder</h3>
                        <div class="mt-2 flex items-baseline">
                            <span class="text-3xl font-bold text-white">£0</span>
                            <span class="ml-1 text-obrioxia-muted">/mo</span>
                        </div>
                        <p class="text-obrioxia-muted text-xs mt-2">Prototypes & Hackathons.</p>
                    </div>
                    <div class="w-full h-px bg-white/10 mb-6"></div>
                    <ul class="space-y-3 mb-8 flex-grow">
                        <li class="flex items-start text-xs text-gray-300"><span class="text-obrioxia-cyan mr-2">✓</span> 25,000 Events / Mo</li>
                        <li class="flex items-start text-xs text-gray-300"><span class="text-obrioxia-cyan mr-2">✓</span> 30-Day Retention</li>
                        <li class="flex items-start text-xs text-gray-300"><span class="text-obrioxia-cyan mr-2">✓</span> Standard Verification</li>
                    </ul>
                    <!-- CHANGED: Links to Register page -->
                    <a routerLink="/register" class="block w-full py-2 border border-obrioxia-muted text-obrioxia-text font-orbitron text-xs rounded hover:border-white hover:text-white transition-all text-center">START BUILDING</a>
                </div>

                <!-- TIER 2: PRO -->
                <div class="glass-panel p-6 rounded-xl border border-obrioxia-cyan shadow-[0_0_30px_rgba(0,240,255,0.1)] relative flex flex-col h-full transform xl:-translate-y-4 z-20 bg-[#0A1120]">
                    <div class="absolute top-0 right-0 bg-obrioxia-cyan text-obrioxia-base text-[10px] font-bold px-2 py-1 rounded-bl-lg font-orbitron tracking-wider">POPULAR</div>
                    <div class="mb-4">
                        <h3 class="font-orbitron text-lg text-white">Pro</h3>
                        <div class="mt-2 flex items-baseline">
                            <span class="text-4xl font-bold text-white tracking-tight">£475</span>
                            <span class="ml-1 text-obrioxia-muted">/mo</span>
                        </div>
                        <p class="text-obrioxia-muted text-xs mt-2">Production AI Agents.</p>
                    </div>
                    <div class="w-full h-px bg-obrioxia-cyan/30 mb-6"></div>
                    <ul class="space-y-3 mb-8 flex-grow">
                        <li class="flex items-start text-xs text-white"><span class="text-obrioxia-cyan mr-2">✓</span> <span class="font-bold">1 Million Events</span></li>
                        <li class="flex items-start text-xs text-white"><span class="text-obrioxia-cyan mr-2">✓</span> 1-Year Retention</li>
                        <li class="flex items-start text-xs text-white"><span class="text-obrioxia-cyan mr-2">✓</span> API Verification Endpoint</li>
                        <li class="flex items-start text-xs text-white"><span class="text-obrioxia-cyan mr-2">✓</span> PDF Audit Receipts</li>
                    </ul>
                    <a routerLink="/contact" class="block w-full text-center py-3 bg-obrioxia-cyan text-obrioxia-base font-orbitron text-xs font-bold rounded hover:bg-[#80F7FF] transition-all cursor-pointer">DEPLOY NOW</a>
                    <p class="text-center text-[10px] text-obrioxia-muted mt-3">Overage: £0.60 / 1k events</p>
                </div>

                <!-- TIER 3: BUSINESS -->
                <div class="glass-panel p-6 rounded-xl border border-white/5 hover:border-obrioxia-green/50 transition-all duration-300 flex flex-col h-full">
                    <div class="mb-4">
                        <h3 class="font-orbitron text-lg text-white">Business</h3>
                        <div class="mt-2 flex items-baseline">
                            <span class="text-3xl font-bold text-white">£1,999</span>
                            <span class="ml-1 text-obrioxia-muted">/mo</span>
                        </div>
                        <p class="text-obrioxia-muted text-xs mt-2">Regulatory Compliance.</p>
                    </div>
                    <div class="w-full h-px bg-white/10 mb-6"></div>
                    <ul class="space-y-3 mb-8 flex-grow">
                        <li class="flex items-start text-xs text-gray-300"><span class="text-obrioxia-green mr-2">✓</span> <span class="font-bold">5 Million Events</span></li>
                        <li class="flex items-start text-xs text-gray-300"><span class="text-obrioxia-green mr-2">✓</span> <span class="font-bold">7-Year Retention</span> (EU AI Act)</li>
                        <li class="flex items-start text-xs text-gray-300"><span class="text-obrioxia-green mr-2">✓</span> SOC2 Mapping Report</li>
                        <li class="flex items-start text-xs text-gray-300"><span class="text-obrioxia-green mr-2">✓</span> Priority Support (4h SLA)</li>
                    </ul>
                    <a href="mailto:hello@obrioxia.com?subject=Business%20Tier%20Inquiry" class="block w-full text-center py-2 border border-obrioxia-green text-obrioxia-green font-orbitron text-xs rounded hover:bg-obrioxia-green hover:text-obrioxia-base transition-all font-bold cursor-pointer">CONTACT SALES</a>
                </div>

                <!-- TIER 4: ENTERPRISE -->
                <div class="glass-panel p-6 rounded-xl border border-white/5 hover:border-purple-500/50 transition-all duration-300 flex flex-col h-full">
                    <div class="mb-4">
                        <h3 class="font-orbitron text-lg text-white">Enterprise</h3>
                        <div class="mt-2 flex items-baseline">
                            <span class="text-3xl font-bold text-white">Custom</span>
                        </div>
                        <p class="text-obrioxia-muted text-xs mt-2">Zero-Egress Infrastructure.</p>
                    </div>
                    <div class="w-full h-px bg-white/10 mb-6"></div>
                    <ul class="space-y-3 mb-8 flex-grow">
                        <li class="flex items-start text-xs text-gray-300"><span class="text-purple-400 mr-2">✓</span> Unlimited Volume</li>
                        <li class="flex items-start text-xs text-gray-300"><span class="text-purple-400 mr-2">✓</span> Infinite Retention</li>
                        <li class="flex items-start text-xs text-gray-300"><span class="text-purple-400 mr-2">✓</span> VPC / On-Premise (Docker)</li>
                        <li class="flex items-start text-xs text-gray-300"><span class="text-purple-400 mr-2">✓</span> Dedicated Support</li>
                    </ul>
                    <a href="mailto:hello@obrioxia.com?subject=Enterprise%20Inquiry" class="w-full py-2 border border-purple-500 text-purple-400 font-orbitron text-xs rounded hover:bg-purple-500 hover:text-white transition-all text-center block">CONTACT US</a>
                </div>
            </div>

            <!-- COMPLIANCE SPRINT -->
            <div class="max-w-4xl mx-auto glass-panel p-8 rounded-2xl border border-obrioxia-cyan/20 relative overflow-hidden">
                <div class="absolute top-0 left-0 w-2 h-full bg-obrioxia-cyan"></div>
                <div class="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2">
                            <h3 class="font-orbitron text-2xl text-white">Compliance Sprint</h3>
                            <span class="bg-obrioxia-cyan/10 text-obrioxia-cyan text-[10px] font-bold px-2 py-1 rounded font-orbitron">FIXED PRICE</span>
                        </div>
                        <p class="text-obrioxia-muted text-sm mb-4">
                            A 4-week structured pilot to integrate Obrioxia, run a mock audit, and prove ROI before committing to an annual contract.
                        </p>
                        <ul class="flex flex-wrap gap-4 text-xs text-white">
                            <li class="flex items-center"><span class="text-obrioxia-cyan mr-1">●</span> Full Business Tier Access</li>
                            <li class="flex items-center"><span class="text-obrioxia-cyan mr-1">●</span> 2x Integration Calls</li>
                            <li class="flex items-center"><span class="text-obrioxia-cyan mr-1">●</span> Mock Audit Report</li>
                        </ul>
                    </div>
                    <div class="text-center md:text-right">
                        <div class="text-3xl font-bold text-white font-orbitron mb-1">£5,000</div>
                        <div class="text-xs text-obrioxia-muted mb-4">One-time fee</div>
                        <a href="mailto:hello@obrioxia.com?subject=Compliance%20Sprint%20Inquiry" class="inline-block px-6 py-3 bg-white text-obrioxia-base font-orbitron text-xs font-bold rounded hover:bg-gray-200 transition-colors cursor-pointer">BOOK SPRINT</a>
                    </div>
                </div>
            </div>

            <!-- LOGOS -->
            <div class="mt-20 pt-10 border-t border-white/5 text-center">
                 <div class="flex flex-wrap justify-center gap-8 md:gap-16 font-orbitron text-sm font-bold text-white">
                    <a routerLink="/compliance/iso42001" class="opacity-40 hover:opacity-100 hover:text-obrioxia-cyan transition-all duration-300 cursor-pointer">ISO/IEC 42001</a>
                    <a routerLink="/compliance/soc2" class="opacity-40 hover:opacity-100 hover:text-obrioxia-cyan transition-all duration-300 cursor-pointer">SOC 2 Type II</a>
                    <a routerLink="/compliance/gdpr" class="opacity-40 hover:opacity-100 hover:text-obrioxia-cyan transition-all duration-300 cursor-pointer">GDPR</a>
                    <a routerLink="/compliance/eu-ai-act" class="opacity-40 hover:opacity-100 hover:text-obrioxia-cyan transition-all duration-300 cursor-pointer">EU AI ACT</a>
                 </div>
            </div>

        </div>
    </div>
  `
})
export class PricingComponent {}
