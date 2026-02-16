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
  receipt = signal<any | null>(null);

  formData: AuditLogPayload = {
    policyNumber: '',
    incidentType: 'AI Decision',
    claimAmount: 0,
    decisionNotes: '',
    aiConfidenceScore: 0.95,
    agentId: 'obrioxia_web_user'
  };

  /**
   * Submits event to Python backend.
   * Logic is now silent: UI updates via signals automatically.
   */
  onSubmit() {
    this.loading.set(true);
    this.audit.submitLog(this.formData).subscribe({
      next: (res) => {
        this.receipt.set(res); 
        this.loading.set(false);
        // ✅ Success Alert Removed
      },
      error: (err) => {
        console.error('❌ Logging Failure:', err);
        // Errors remain as alerts to ensure the user knows if the ledger is unreachable
        alert('Logging Failed: ' + (err.error?.detail || err.message));
        this.loading.set(false);
      }
    });
  }

  downloadJson() {
    const rawData = this.receipt();
    if (!rawData) return;

    const evidenceData = typeof rawData === 'string' 
      ? { current_hash: rawData, decision_id: rawData, exported_at: new Date().toISOString() }
      : { ...rawData, exported_at: new Date().toISOString() };

    const jsonString = JSON.stringify(evidenceData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    const id = evidenceData.sequence || evidenceData.decision_id || Date.now();
    a.download = `obrioxia_evidence_${id}.json`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  downloadPdf() {
    const data = this.receipt();
    if (!data) return;
    this.loading.set(true);
    this.audit.downloadPdfEvidence(data).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const id = data.sequence || Date.now();
        a.download = `obrioxia_certificate_${id}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
      }
    });
  }

  goBack() { this.router.navigate(['/hub']); }
  
  resetForm() {
    this.receipt.set(null);
    this.formData.policyNumber = '';
    this.formData.decisionNotes = '';
    this.formData.claimAmount = 0;
  }
}
