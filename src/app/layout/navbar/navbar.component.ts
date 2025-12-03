import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// FIXED IMPORT PATH (Removed one ../)
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-obrioxia-base/90 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Logo -->
          <div class="flex-shrink-0 cursor-pointer" routerLink="/">
            <span class="font-orbitron text-2xl font-bold tracking-wider text-white">
              OBRI<span class="text-obrioxia-cyan">OXIA</span>
            </span>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-8">
            <a routerLink="/" class="text-gray-300 hover:text-obrioxia-cyan text-sm font-medium transition-colors uppercase tracking-wide">Home</a>
            <a routerLink="/features" class="text-gray-300 hover:text-obrioxia-cyan text-sm font-medium transition-colors uppercase tracking-wide">Features</a>
            <a routerLink="/pricing" class="text-gray-300 hover:text-obrioxia-cyan text-sm font-medium transition-colors uppercase tracking-wide">Pricing</a>
            
            <!-- Auth Buttons -->
            <ng-container *ngIf="auth.currentUser() as user; else guest">
              <a routerLink="/hub" class="text-obrioxia-green hover:text-white text-sm font-bold transition-colors uppercase tracking-wide flex items-center">
                <div class="w-2 h-2 rounded-full bg-obrioxia-green mr-2 animate-pulse"></div>
                HUB ACCESS
              </a>
            </ng-container>
            <ng-template #guest>
               <a routerLink="/login" class="font-orbitron text-xs tracking-widest bg-transparent border border-obrioxia-cyan text-obrioxia-cyan hover:bg-obrioxia-cyan hover:text-obrioxia-base px-6 py-2.5 rounded transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0.1)] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                LOGIN / DEMO
              </a>
            </ng-template>
          </div>

          <!-- Mobile Menu Button -->
          <div class="flex md:hidden">
            <button (click)="isMobileMenuOpen = !isMobileMenuOpen" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none">
              <span class="sr-only">Open main menu</span>
              <svg *ngIf="!isMobileMenuOpen" class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg *ngIf="isMobileMenuOpen" class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Dropdown -->
      <div *ngIf="isMobileMenuOpen" class="md:hidden bg-obrioxia-base border-b border-white/10">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a routerLink="/" (click)="isMobileMenuOpen = false" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
          <a routerLink="/features" (click)="isMobileMenuOpen = false" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Features</a>
          <a routerLink="/pricing" (click)="isMobileMenuOpen = false" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Pricing</a>
          
          <div class="border-t border-white/10 my-2 pt-2">
            <ng-container *ngIf="auth.currentUser(); else mobileGuest">
              <a routerLink="/hub" (click)="isMobileMenuOpen = false" class="text-obrioxia-green font-bold block px-3 py-2 rounded-md text-base">GO TO HUB</a>
            </ng-container>
            <ng-template #mobileGuest>
              <a routerLink="/login" (click)="isMobileMenuOpen = false" class="text-obrioxia-cyan font-bold block px-3 py-2 rounded-md text-base">LOGIN</a>
              <a routerLink="/register" (click)="isMobileMenuOpen = false" class="text-white block px-3 py-2 rounded-md text-base">CREATE ACCOUNT</a>
            </ng-template>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  auth = inject(AuthService);
  isMobileMenuOpen = false;
}


