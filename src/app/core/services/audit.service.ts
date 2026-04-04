import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Payload interface for logging events to the audit chain.
 */
export interface AuditLogPayload {
  policyNumber: string;
  incidentType: string;
  claimAmount: number;
  decisionNotes: string;
  aiConfidenceScore: number;
  agentId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  private http = inject(HttpClient);

  /**
   * ✅ FIX: Updated to the new Python Render backend.
   */
  private apiUrl = `${environment.backendUrl}/api`;

  /**
   * Logs a new event to the tamper-evident ledger.
   */
  submitLog(payload: AuditLogPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/incidents`, payload);
  }

  /**
   * Verifies an existing record using the Triple-Check logic.
   * Standardized to match the Python 'verify' endpoint structure.
   */
  verifyHash(key: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify/`, { current_hash: key });
  }

  /**
   * Authorizes the deletion of a specific subject/record.
   * Auth interceptor attaches Bearer token automatically.
   */
  shredSubject(identifier: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/shred/${identifier}`);
  }

  /**
   * Demo-scoped shred: uses x-demo-key header instead of admin auth.
   */
  demoShred(identifier: string): Observable<any> {
    const key = localStorage.getItem('demo_key') || '';
    return this.http.post(`${this.apiUrl}/demo/shred/${encodeURIComponent(identifier)}`, {}, {
      headers: { 'x-demo-key': key }
    });
  }

  /**
   * Demo-scoped lookup: finds a record by policyNumber, decision_id, or HMAC hash.
   */
  demoLookup(identifier: string): Observable<any> {
    const key = localStorage.getItem('demo_key') || '';
    return this.http.post(`${this.apiUrl}/demo/lookup/${encodeURIComponent(identifier)}`, {}, {
      headers: { 'x-demo-key': key }
    });
  }

  /**
   * Admin-scoped lookup: uses Bearer token (attached by auth interceptor).
   * Fetches the record export bundle for preview before shredding.
   */
  adminLookup(identifier: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/incidents/${encodeURIComponent(identifier)}/export`);
  }

  /**
   * Downloads the PDF evidence certificate from the ledger.
   */
  downloadPdfEvidence(receipt: any): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/pdf/submission`, receipt, {
      responseType: 'blob'
    });
  }

  /**
   * Fetches the export bundle for client-side decryption.
   * Auth interceptor attaches Bearer token automatically.
   */
  exportBundle(decisionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/incidents/${decisionId}/export`);
  }
}
