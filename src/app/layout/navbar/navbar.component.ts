import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Auth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <!-- Mobile Menu Overlay -->
    <div *ngIf="isMobileMenuOpen" class="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col pt-28 px-6 pointer-events-auto lg:hidden">
      <div class="flex flex-col gap-6 text-lg font-medium">
        <a routerLink="/features" routerLinkActive="text-obrioxia-cyan" (click)="isMobileMenuOpen = false" class="text-white/80 hover:text-white transition-colors">FEATURES</a>
        <a routerLink="/demo-signup" routerLinkActive="text-obrioxia-cyan" (click)="isMobileMenuOpen = false" class="text-white/80 hover:text-white transition-colors uppercase">LIVE DEMO SIGN-UP</a>
        <a routerLink="/how-it-works" routerLinkActive="text-obrioxia-cyan" (click)="isMobileMenuOpen = false" class="text-white/80 hover:text-white transition-colors">HOW IT WORKS</a>
        <a routerLink="/trust-center" routerLinkActive="text-obrioxia-cyan" (click)="isMobileMenuOpen = false" class="text-white/80 hover:text-white transition-colors">TRUST CENTER</a>
        <a routerLink="/pricing" routerLinkActive="text-obrioxia-cyan" (click)="isMobileMenuOpen = false" class="text-white/80 hover:text-white transition-colors">PRICING</a>
        
        <hr class="border-white/10 my-2">
        
        <ng-container *ngIf="auth.user$ | async as user; else loginBtnMobile">
          <a routerLink="/hub" (click)="isMobileMenuOpen = false" class="ob-btn-primary flex justify-center gap-2">
            <div class="w-2 h-2 rounded-full bg-obrioxia-green animate-pulse"></div>
            <span>ENTER HUB</span>
          </a>
          <button (click)="logout(); isMobileMenuOpen = false" class="text-red-400 hover:text-red-300 transition-all text-center">
            LOGOUT
          </button>
        </ng-container>
        <ng-template #loginBtnMobile>
          <a routerLink="/hub" (click)="isMobileMenuOpen = false" class="ob-btn-secondary flex justify-center">
            LOGIN
          </a>
        </ng-template>
      </div>
    </div>

    <!-- Main Floating Pill -->
    <nav class="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <div class="pointer-events-auto mx-4 lg:mx-auto mt-4 max-w-[1200px] w-[calc(100%-2rem)] lg:w-full rounded-full border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.35)] px-5 lg:px-10 py-3 lg:py-4 flex items-center justify-between">
        
        <a routerLink="/" (click)="isMobileMenuOpen = false" class="flex items-center gap-2 group relative z-50">
          <img src="/brand/obrioxia-logo.png" alt="Obrioxia" class="shrink-0 h-7 lg:h-8 w-auto object-contain block hover:opacity-80 transition-opacity duration-300">
        </a>

        <!-- Desktop Links -->
        <div class="hidden lg:flex items-center gap-[30px]">
          <a routerLink="/features" routerLinkActive="text-obrioxia-cyan" class="text-[15px] text-white/80 hover:text-white transition-colors whitespace-nowrap">FEATURES</a>
          <a routerLink="/demo-signup" routerLinkActive="text-obrioxia-cyan" class="text-[15px] text-white/80 hover:text-white transition-colors uppercase cursor-pointer whitespace-nowrap">LIVE DEMO SIGN-UP</a>
          <a routerLink="/how-it-works" routerLinkActive="text-obrioxia-cyan" class="text-[15px] text-white/80 hover:text-white transition-colors whitespace-nowrap">HOW IT WORKS</a>
          <a routerLink="/trust-center" routerLinkActive="text-obrioxia-cyan" class="text-[15px] text-white/80 hover:text-white transition-colors whitespace-nowrap">TRUST CENTER</a>
          <a routerLink="/pricing" routerLinkActive="text-obrioxia-cyan" class="text-[15px] text-white/80 hover:text-white transition-colors whitespace-nowrap">PRICING</a>
        </div>

        <div class="hidden lg:flex items-center gap-[30px] ml-4">
          <ng-container *ngIf="auth.user$ | async as user; else loginBtn">
            <a routerLink="/hub" class="ob-btn-primary flex gap-2">
              <div class="w-2 h-2 rounded-full bg-obrioxia-green animate-pulse"></div>
              <span>ENTER HUB</span>
            </a>
            <button (click)="logout()" class="text-[14px] text-red-400 hover:text-red-300 transition-all font-medium">
              LOGOUT
            </button>
          </ng-container>
          <ng-template #loginBtn>
            <a routerLink="/hub" class="ob-btn-secondary">
              LOGIN
            </a>
          </ng-template>
        </div>

        <!-- Mobile Menu Toggle -->
        <button (click)="isMobileMenuOpen = !isMobileMenuOpen" class="lg:hidden text-white/80 hover:text-white p-2 relative z-50">
          <svg *ngIf="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg *ngIf="isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

      </div>
    </nav>
  `
})
export class NavbarComponent {
  auth = inject(AuthService);
  private firebaseAuth = inject(Auth);
  isMobileMenuOpen = false;

  async logout() {
    try {
      await signOut(this.firebaseAuth);
      localStorage.removeItem('demo_key');
      localStorage.clear();
      window.location.href = 'https://demo.obrioxia.com';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }
}
