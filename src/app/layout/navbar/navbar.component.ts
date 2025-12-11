import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        <a routerLink="/" class="flex items-center gap-2 group">
          <div class="w-8 h-8 bg-obrioxia-cyan/20 rounded flex items-center justify-center border border-obrioxia-cyan/50 group-hover:bg-obrioxia-cyan/30 transition-all">
            <div class="w-3 h-3 bg-obrioxia-cyan rounded-sm"></div>
          </div>
          <span class="text-xl font-orbitron text-white tracking-widest group-hover:text-obrioxia-cyan transition-colors">OBRIOXIA</span>
        </a>

        <div class="hidden md:flex items-center gap-6">
          <a routerLink="/" routerLinkActive="text-obrioxia-cyan" [routerLinkActiveOptions]="{exact: true}" class="text-sm font-orbitron text-gray-400 hover:text-white transition-colors">HOME</a>
          <a routerLink="/features" routerLinkActive="text-obrioxia-cyan" class="text-sm font-orbitron text-gray-400 hover:text-white transition-colors">FEATURES</a>
          
          <button (click)="handleLiveDemo()" class="text-sm font-orbitron text-gray-400 hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer uppercase">
            LIVE DEMO
          </button>

          <a routerLink="/how-it-works" routerLinkActive="text-obrioxia-cyan" class="text-sm font-orbitron text-gray-400 hover:text-white transition-colors">HOW IT WORKS</a>
          <a routerLink="/trust-center" routerLinkActive="text-obrioxia-cyan" class="text-sm font-orbitron text-gray-400 hover:text-white transition-colors">TRUST CENTER</a>
          <a routerLink="/pricing" routerLinkActive="text-obrioxia-cyan" class="text-sm font-orbitron text-gray-400 hover:text-white transition-colors">PRICING</a>
        </div>

        <div class="flex items-center gap-4">
          <ng-container *ngIf="auth.user$ | async as user; else loginBtn">
            <a routerLink="/hub" class="flex items-center gap-2 px-4 py-2 border border-obrioxia-green/50 bg-obrioxia-green/10 rounded hover:bg-obrioxia-green/20 transition-all group">
              <div class="w-2 h-2 rounded-full bg-obrioxia-green animate-pulse"></div>
              <span class="text-xs font-orbitron text-obrioxia-green">HUB ACCESS</span>
            </a>
          </ng-container>
          <ng-template #loginBtn>
            <a routerLink="/hub" class="px-5 py-2 border border-white/20 text-white text-xs font-orbitron rounded hover:bg-white/10 transition-all">
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
  private router = inject(Router);

  handleLiveDemo() {
    this.auth.user$.pipe(take(1)).subscribe(user => {
      if (user) {
        // User is logged in -> Go to Demo
        this.router.navigate(['/demo']);
      } else {
        // User NOT logged in -> Go to Signup
        this.router.navigate(['/signup']);
      }
    });
  }
}
