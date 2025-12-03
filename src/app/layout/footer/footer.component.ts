import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-black border-t border-white/10 pt-20 pb-10 px-4">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        <!-- Brand -->
        <div class="col-span-1 md:col-span-1">
          <a routerLink="/" class="text-xl font-orbitron text-white tracking-widest mb-6 block">OBRIOXIA</a>
          <p class="text-gray-500 text-sm leading-relaxed">
            The immutable audit layer for Enterprise AI. Trust, but verify.
          </p>
        </div>

        <!-- Product -->
        <div>
          <h4 class="text-white font-orbitron text-sm mb-6">PRODUCT</h4>
          <ul class="space-y-4 text-sm text-gray-500">
            <li><a routerLink="/features" class="hover:text-obrioxia-cyan transition-colors">Features</a></li>
            <li><a routerLink="/how-it-works" class="hover:text-obrioxia-cyan transition-colors">How It Works</a></li>
            <li><a routerLink="/pricing" class="hover:text-obrioxia-cyan transition-colors">Pricing</a></li>
            <li><a href="https://demo.obrioxia.com" target="_blank" class="hover:text-obrioxia-cyan transition-colors">Live Demo</a></li>
          </ul>
        </div>

        <!-- Compliance -->
        <div>
          <h4 class="text-white font-orbitron text-sm mb-6">COMPLIANCE</h4>
          <ul class="space-y-4 text-sm text-gray-500">
            <li><a routerLink="/compliance/eu-ai-act" class="hover:text-obrioxia-cyan transition-colors">EU AI Act (Art. 12)</a></li>
            <li><a routerLink="/compliance/iso-42001" class="hover:text-obrioxia-cyan transition-colors">ISO 42001</a></li>
            <li><a routerLink="/compliance/insurance-automotive" class="hover:text-obrioxia-cyan transition-colors">Insurance & Auto</a></li>
            <li><a routerLink="/trust-center" class="hover:text-obrioxia-cyan transition-colors">Trust Center</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-white font-orbitron text-sm mb-6">CONTACT</h4>
          <ul class="space-y-4 text-sm text-gray-500">
            <li><a href="mailto:sales@obrioxia.com" class="hover:text-obrioxia-cyan transition-colors">Sales Inquiries</a></li>
            <li><a href="mailto:security@obrioxia.com" class="hover:text-obrioxia-cyan transition-colors">Security Contact</a></li>
          </ul>
        </div>

      </div>

      <div class="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-gray-600 text-xs">© 2025 Obrioxia. All rights reserved.</p>
        <div class="flex gap-6">
          <a routerLink="/trust-center" class="text-gray-600 text-xs hover:text-white transition-colors">Privacy Policy</a>
          <a routerLink="/trust-center" class="text-gray-600 text-xs hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
