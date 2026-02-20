import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <!-- Global Cinematic Background (Fixed, behind everything) -->
    <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <video
        autoplay
        loop
        muted
        playsinline
        preload="auto"
        class="absolute inset-0 w-full h-full object-cover">
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4" type="video/mp4">
      </video>
      <div class="absolute inset-0 bg-black/50"></div>
    </div>

    <!-- Site Content (relative z-10 to stay clickable above video) -->
    <div class="relative z-10 flex flex-col min-h-screen text-white font-sans selection:bg-obrioxia-cyan selection:text-black">
      <app-navbar></app-navbar>
      
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>

      <app-footer></app-footer>
    </div>
  `
})
export class AppComponent { }

