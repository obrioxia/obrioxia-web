import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
   * ✅ The Master API Key for Administrative tasks.
   * Ensure this matches the BACKEND_API_KEY in your Render environment variables.
   */
  private masterApiKey = 'c919848182e3e4250082ea7bacd14e170';

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
   * 🧨 THE SHREDDER HANDSHAKE
   * Authorizes the deletion of a specific subject/record.
   */
  shredSubject(identifier: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': this.masterApiKey
    });

    // Pointed to the new admin/shred path on Render
    return this.http.delete(`${this.apiUrl}/admin/shred/${identifier}`, { headers });
  }

  /**
   * Downloads the PDF evidence certificate from the ledger.
   */
  downloadPdfEvidence(receipt: any): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/pdf/submission`, receipt, {
      responseType: 'blob'
    });
  }
}
