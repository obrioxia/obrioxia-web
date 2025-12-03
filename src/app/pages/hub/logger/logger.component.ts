import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuditService, AuditLogPayload } from '../../../core/services/audit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logger',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './logger.component.html'
})
export class LoggerComponent {
  private audit = inject(AuditService);
  private router = inject(Router);
  
  loading = signal(false);
  receipt: any = null;

  formData: AuditLogPayload = {
    policyNumber: '',
    incidentType: 'AI Decision',
    claimAmount: 0,
    decisionNotes: '',
    aiConfidenceScore: 0.95,
    agentId: 'obrioxia_web_user'
  };

  onSubmit() {
    this.loading.set(true);
    this.audit.submitLog(this.formData).subscribe({
      next: (res) => {
        this.receipt = res.receipt;
        this.loading.set(false);
      },
      error: (err) => {
        alert('Logging Failed: ' + err.message);
        this.loading.set(false);
      }
    });
  }

  downloadJson() {
    if (!this.receipt) return;
    const jsonString = JSON.stringify(this.receipt, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `obrioxia_evidence_${this.receipt.sequence}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  downloadPdf() {
    if (!this.receipt) return;
    this.loading.set(true); // Re-use loading state for UI feedback
    this.audit.downloadPdfEvidence(this.receipt).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `obrioxia_certificate_${this.receipt.sequence}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.loading.set(false);
      },
      error: (err) => {
        alert('PDF Generation Failed: ' + err.message);
        this.loading.set(false);
      }
    });
  }

  goBack() {
    this.router.navigate(['/hub']);
  }
}
