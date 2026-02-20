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
    <nav class="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div class="max-w-[1440px] mx-auto px-4 md:px-[120px] py-[20px] flex items-center justify-between">
        
        <a routerLink="/" class="flex items-center gap-2 group">
          <img src="/brand/obrioxia-logo.png" alt="Obrioxia" class="h-[32px] w-auto shrink-0 object-contain hover:opacity-80 transition-opacity duration-300">
        </a>

        <div class="flex items-center gap-[30px]">
          <a routerLink="/features" routerLinkActive="text-obrioxia-cyan" class="text-[15px] text-white/80 hover:text-white transition-colors whitespace-nowrap">FEATURES</a>
          
          <a routerLink="/demo-signup" 
             routerLinkActive="text-obrioxia-cyan"
             class="text-[15px] text-white/80 hover:text-white transition-colors uppercase cursor-pointer whitespace-nowrap">
             LIVE DEMO SIGN-UP
          </a>

          <a routerLink="/how-it-works" routerLinkActive="text-obrioxia-cyan" class="text-[15px] text-white/80 hover:text-white transition-colors whitespace-nowrap">HOW IT WORKS</a>
          <a routerLink="/trust-center" routerLinkActive="text-obrioxia-cyan" class="text-[15px] text-white/80 hover:text-white transition-colors whitespace-nowrap">TRUST CENTER</a>
          <a routerLink="/pricing" routerLinkActive="text-obrioxia-cyan" class="text-[15px] text-white/80 hover:text-white transition-colors whitespace-nowrap">PRICING</a>
        </div>

        <div class="flex items-center gap-[30px] ml-4">
          
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

      </div>
    </nav>
  `
})
export class NavbarComponent {
  auth = inject(AuthService);
  private firebaseAuth = inject(Auth);

  async logout() {
    try {
      // 1. Sign out of Firebase
      await signOut(this.firebaseAuth);

      // 2. 👇 THIS IS THE CRITICAL FIX
      // Destroy the key so the browser forgets it
      localStorage.removeItem('demo_key');
      localStorage.clear();

      // 3. Force them back to the login gate (refresh page)
      window.location.href = 'https://demo.obrioxia.com';

    } catch (err) {
      console.error('Logout failed:', err);
    }
  }
}
