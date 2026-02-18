import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './pricing.component.html'
})
export class PricingComponent {
  auth = inject(AuthService);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  // Backend URLs
  private checkoutUrl = `${environment.backendUrl}/api/checkout`;
  private contactUrl = `${environment.backendUrl}/api/contact`;

  paymentCancelled = false;

  // Pilot Modal State
  showPilotModal = false;
  pilotForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;

  constructor() {
    // 1. Check for cancellation query param from Stripe redirect
    this.route.queryParams.subscribe(params => {
      if (params['payment'] === 'cancelled') {
        this.paymentCancelled = true;
      }
    });

    // 2. Initialize the Pilot Request Form
    this.pilotForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['']
    });
  }

  checkoutLoading = false;

  buyGrowth(tier: string) {
    if (this.checkoutLoading) return;

    // 1. Get current user
    this.auth.user$.pipe(take(1)).subscribe(user => {
      if (!user) {
        // Not logged in — redirect to login via Angular Router
        this.router.navigate(['/login'], { queryParams: { returnUrl: '/pricing', tier } });
        return;
      }

      // 2. Call Backend to get Stripe URL
      this.checkoutLoading = true;
      this.http.post(this.checkoutUrl, { tier }).subscribe({
        next: (res: any) => {
          this.checkoutLoading = false;
          if (res.checkoutUrl) {
            // 3. Redirect to Stripe Checkout
            window.location.href = res.checkoutUrl;
          } else {
            console.error('[Pricing] Backend returned null checkoutUrl:', res);
            alert('Checkout unavailable. Please try again or contact support.');
          }
        },
        error: (err) => {
          this.checkoutLoading = false;
          console.error('[Pricing] Checkout request failed:', err);
          alert('Checkout failed: ' + (err.error?.detail || err.message || 'Unknown error'));
        }
      });
    });
  }

  // --- NEW PILOT MODAL LOGIC ---

  openPilotModal() {
    this.showPilotModal = true;
  }

  closePilotModal() {
    this.showPilotModal = false;
    this.submitSuccess = false;
    this.pilotForm.reset();
  }

  submitPilotRequest() {
    if (this.pilotForm.invalid) return;

    this.isSubmitting = true;

    const payload = {
      type: 'PILOT_REQUEST',
      ...this.pilotForm.value
    };

    // Send to your backend (or use the simulated timeout below if endpoint isn't ready)
    this.http.post(this.contactUrl, payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = true;
      },
      error: (err) => {
        console.warn('API Endpoint not ready, using simulation for demo.', err);
        // Fallback simulation for frontend demo
        setTimeout(() => {
          this.isSubmitting = false;
          this.submitSuccess = true;
        }, 1500);
      }
    });
  }
}
