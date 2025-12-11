import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  private fb = inject(FormBuilder);
  
  // Backend URLs
  private checkoutUrl = 'https://obrioxia-backend-pkrp.onrender.com/api/checkout';
  // Note: Replace this with your actual contact/email endpoint if different
  private contactUrl = 'https://obrioxia-backend-pkrp.onrender.com/api/contact'; 
  
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

  // --- EXISTING STRIPE LOGIC ---

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
      this.http.post(this.checkoutUrl, { 
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
