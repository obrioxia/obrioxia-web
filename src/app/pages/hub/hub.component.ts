import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hub.component.html'
})
export class HubComponent {
  auth = inject(AuthService);
  route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  paymentSuccess = false;

  // billing state
  entitlement: any = null;
  entitlementLoading = true;

  // test event state
  testResult: any = null;
  testLoading = false;
  testError: string | null = null;

  // pdf state
  pdfLoading = false;

  private apiUrl = `${environment.backendUrl}/api`;

  constructor() {
    this.route.queryParams.subscribe(params => {
      if (params['payment'] === 'success') {
        this.paymentSuccess = true;
      }
    });
    this.loadEntitlement();
  }

  loadEntitlement() {
    this.http.get(`${this.apiUrl}/billing/entitlement`).subscribe({
      next: (res) => {
        this.entitlement = res;
        this.entitlementLoading = false;
      },
      error: () => this.entitlementLoading = false
    });
  }

  sendTestEvent() {
    this.testLoading = true;
    this.testError = null;
    this.testResult = null;

    const payload = {
      incidentType: "quick_test",
      system: "hub",
      message: "Customer quick test event",
      risk: "low",
      schema_version: "4.1-strict"
    };

    this.http.post(`${this.apiUrl}/incidents`, payload).subscribe({
      next: (res: any) => {
        this.testResult = res;
        this.testLoading = false;
        // Refresh usage count
        this.loadEntitlement();
      },
      error: (err) => {
        this.testLoading = false;
        if (err.status === 402) this.testError = "Upgrade Required";
        else if (err.status === 429) this.testError = "Monthly Limit Reached";
        else this.testError = "Failed to send event";
      }
    });
  }

  generatePdf() {
    if (!this.testResult?.decision_id) return;

    this.pdfLoading = true;
    this.http.post(`${this.apiUrl}/pdf/submission`,
      { decision_id: this.testResult.decision_id },
      { responseType: 'blob' }
    ).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `evidence-${this.testResult.decision_id}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.pdfLoading = false;
      },
      error: (err) => {
        this.pdfLoading = false;
        alert("Failed to generate PDF: " + (err.error?.detail || "Unknown error"));
      }
    });
  }
}
