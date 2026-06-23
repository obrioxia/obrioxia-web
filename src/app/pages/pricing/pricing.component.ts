import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pricing.component.html'
})
export class PricingComponent implements OnDestroy {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  // Backend URLs
  private contactUrl = `${environment.backendUrl}/api/contact`;

  // Contact Modal State
  showContactModal = false;
  modalEngagementType = 'pilot'; // default
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';
  cooldownRemaining = 0;
  private cooldownTimer: any = null;

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['']
    });
  }

  // --- CONTACT MODAL LOGIC ---

  openContactModal(type: string) {
    this.modalEngagementType = type;
    this.showContactModal = true;
  }

  closeContactModal() {
    this.showContactModal = false;
    this.submitSuccess = false;
    this.submitError = '';
    this.contactForm.reset();
  }

  ngOnDestroy() {
    this.clearCooldown();
  }

  private startCooldown() {
    this.cooldownRemaining = 60;
    this.clearCooldown();
    this.cooldownTimer = setInterval(() => {
      this.cooldownRemaining--;
      if (this.cooldownRemaining <= 0) {
        this.clearCooldown();
      }
    }, 1000);
  }

  private clearCooldown() {
    if (this.cooldownTimer) {
      clearInterval(this.cooldownTimer);
      this.cooldownTimer = null;
    }
    this.cooldownRemaining = 0;
  }

  getModalTitle(): string {
    switch(this.modalEngagementType) {
      case 'diagnostic': return 'Book a Discovery Call';
      case 'pilot': return 'Discuss a Pilot';
      case 'production': return 'Request a Consultation';
      default: return 'Contact Us';
    }
  }

  getModalSubtitle(): string {
    switch(this.modalEngagementType) {
      case 'diagnostic': return 'AI Evidence Diagnostic scope discussion.';
      case 'pilot': return 'Supported Pilot engagement details.';
      case 'production': return 'Production Deployment planning.';
      default: return '';
    }
  }

  submitContactRequest() {
    if (this.contactForm.invalid) return;

    this.isSubmitting = true;

    const payload = {
      type: `REQUEST_${this.modalEngagementType.toUpperCase()}`,
      ...this.contactForm.value
    };

    // Send to your backend
    this.http.post(this.contactUrl, payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.startCooldown();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.submitError = 'Something went wrong sending your request. Please email hello@obrioxia.com directly.';
        console.error('Contact form submission failed:', err);
      }
    });
  }
}
