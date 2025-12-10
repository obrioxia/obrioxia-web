import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pricing.component.html'
})
export class PricingComponent {
  auth = inject(AuthService);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  
  // Backend URL
  private apiUrl = 'https://obrioxia-backend-pkrp.onrender.com/api/checkout';
  
  paymentCancelled = false;

  constructor() {
    this.route.queryParams.subscribe(params => {
      if (params['payment'] === 'cancelled') {
        this.paymentCancelled = true;
      }
    });
  }

  buyGrowth(tier: string) {
    // 1. Get current user
    this.auth.user$.pipe(take(1)).subscribe(user => {
      if (!user) {
        // If not logged in, force login
        alert("You must be logged in to upgrade.");
        window.location.href = '/login';
        return;
      }

      // 2. Call Backend to get Stripe URL
      this.http.post(this.apiUrl, { 
        email: user.email, 
        id: user.uid,
        tier: tier 
      }).subscribe({
        next: (res: any) => {
          if (res.checkoutUrl) {
            // 3. Redirect to Stripe
            window.location.href = res.checkoutUrl;
          }
        },
        error: (err) => {
          alert("Checkout failed: " + (err.error?.detail || "Unknown error"));
        }
      });
    });
  }
}
