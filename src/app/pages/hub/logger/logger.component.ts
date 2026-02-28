import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuditService, AuditLogPayload } from '../../../core/services/audit.service';
import { Router } from '@angular/router';
import { mapErrorResponse, ErrorDisplay } from '../../../core/utils/error-mapper';

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
  errorDisplay = signal<ErrorDisplay | null>(null);

  // Export bundle state
  exportLoading = signal(false);
  exportBundle = signal<any | null>(null);
  exportError = signal<string | null>(null);
  decryptPanelOpen = signal(false);
  copiedField = signal<string | null>(null);

  readonly sdkSnippet = `import { readFileSync } from 'node:fs';
import { decryptExportBundle } from '@obrioxia/client-decryptor';

const result = await decryptExportBundle({
  privateKeyPem: readFileSync('private.pem', 'utf-8'),
  bundleJson: JSON.parse(readFileSync('export.json', 'utf-8')),
});

console.log(result.decrypted_fields);
console.log(result.undecryptable_fields);`;

  formData: AuditLogPayload = {
    policyNumber: '',
    incidentType: 'AI Decision',
    claimAmount: 0,
    decisionNotes: '',
    aiConfidenceScore: 0.95,
    agentId: 'obrioxia_web_user'
  };

  /**
   * Submits event to backend.
   * Logic is now silent: UI updates via signals automatically.
   */
  onSubmit() {
    this.loading.set(true);
    this.errorDisplay.set(null);
    this.audit.submitLog(this.formData).subscribe({
      next: (res) => {
        this.receipt.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        const mapped = mapErrorResponse(err.status, err.error);
        this.errorDisplay.set(mapped);
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
      error: () => {
        this.loading.set(false);
      }
    });
  }

  /**
   * Downloads the export bundle JSON for client-side decryption.
   */
  downloadExportBundle() {
    const data = this.receipt();
    if (!data?.decision_id) return;

    this.exportLoading.set(true);
    this.exportError.set(null);
    this.exportBundle.set(null);

    this.audit.exportBundle(data.decision_id).subscribe({
      next: (bundle) => {
        this.exportBundle.set(bundle);

        // Auto-download the JSON file
        const jsonString = JSON.stringify(bundle, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `obrioxia_export_${data.decision_id}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        this.exportLoading.set(false);
      },
      error: (err) => {
        const status = err.status || 500;
        const detail = err.error?.detail || 'Failed to fetch export bundle';
        this.exportError.set(`${status}: ${detail}`);
        this.exportLoading.set(false);
      }
    });
  }

  /**
   * Copies text to clipboard with visual feedback.
   */
  copyToClipboard(text: string, fieldName: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copiedField.set(fieldName);
      setTimeout(() => this.copiedField.set(null), 2000);
    });
  }

  goBack() { this.router.navigate(['/hub']); }

  resetForm() {
    this.receipt.set(null);
    this.exportBundle.set(null);
    this.exportError.set(null);
    this.decryptPanelOpen.set(false);
    this.formData.policyNumber = '';
    this.formData.decisionNotes = '';
    this.formData.claimAmount = 0;
  }
}
