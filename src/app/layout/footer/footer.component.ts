import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="border-t border-white/5 bg-obrioxia-base py-16 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <!-- Brand -->
            <div class="col-span-1 md:col-span-1">
                <span class="font-orbitron text-xl font-bold tracking-wider text-white">
                    OBRI<span class="text-obrioxia-cyan">OXIA</span>
                </span>
                <p class="text-obrioxia-muted text-sm mt-4 leading-relaxed">
                    The immutable audit layer for Enterprise AI. Trust, but verify.
                </p>
            </div>

            <!-- Product -->
            <div>
                <h4 class="font-orbitron text-white text-sm mb-4">PRODUCT</h4>
                <ul class="space-y-2 text-sm text-obrioxia-muted">
                    <li><a routerLink="/features" class="hover:text-obrioxia-cyan transition-colors cursor-pointer">Features</a></li>
                    <li><a routerLink="/pricing" class="hover:text-obrioxia-cyan transition-colors cursor-pointer">Pricing</a></li>
                    <li><a href="https://demo.obrioxia.com" target="_blank" class="hover:text-obrioxia-cyan transition-colors cursor-pointer">Live Demo</a></li>
                </ul>
            </div>

            <!-- Use Cases -->
            <div>
                <h4 class="font-orbitron text-white text-sm mb-4">USE CASES</h4>
                <ul class="space-y-2 text-sm text-obrioxia-muted">
                    <li><a routerLink="/industries/automotive" class="hover:text-obrioxia-cyan transition-colors cursor-pointer">Automotive</a></li>
                    <li><a routerLink="/industries/insurance" class="hover:text-obrioxia-cyan transition-colors cursor-pointer">Insurance</a></li>
                    <li><a routerLink="/industries/healthcare" class="hover:text-obrioxia-cyan transition-colors cursor-pointer">Healthcare</a></li>
                </ul>
            </div>

            <!-- Contact -->
            <div>
                <h4 class="font-orbitron text-white text-sm mb-4">CONTACT</h4>
                <ul class="space-y-2 text-sm text-obrioxia-muted">
                    <li><a href="mailto:hello@obrioxia.com?subject=Sales%20Inquiry" class="hover:text-obrioxia-cyan transition-colors cursor-pointer">Sales Inquiries</a></li>
                    <li><a href="mailto:hello@obrioxia.com?subject=Security%20Issue" class="hover:text-obrioxia-cyan transition-colors cursor-pointer">Security Contact</a></li>
                </ul>
            </div>
        </div>

        <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-obrioxia-muted">
            <p>&copy; 2025 Obrioxia. All rights reserved.</p>
            <div class="flex space-x-6 mt-4 md:mt-0">
                <span class="cursor-pointer hover:text-white">Privacy Policy</span>
                <span class="cursor-pointer hover:text-white">Terms of Service</span>
            </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {}


