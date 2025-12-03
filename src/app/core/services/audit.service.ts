import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  
  // v3.9 Backend URL
  private apiUrl = 'https://obrioxia-backend-pkrp.onrender.com';
  
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': 'admin-secret-key' 
    });
  }

  // 1. Submit Data
  submitLog(data: AuditLogPayload): Observable<any> {
    const payload = {
      policyNumber: data.policyNumber,
      incidentType: data.incidentType,
      claimAmount: data.claimAmount,
      decisionNotes: data.decisionNotes,
      aiConfidenceScore: data.aiConfidenceScore,
      agentId: data.agentId
    };
    return this.http.post(`${this.apiUrl}/api/incidents`, payload, { headers: this.getHeaders() });
  }

  // 2. Generate PDF Evidence
  downloadPdfEvidence(receipt: any): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/api/pdf/submission`, receipt, {
      headers: this.getHeaders(),
      responseType: 'blob'
    });
  }

  // 3. Verify Integrity
  verifyHash(hash: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/verify`, { current_hash: hash }, { headers: this.getHeaders() });
  }

  // 4. Crypto-Shred User
  shredSubject(subjectId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/admin/shred/${subjectId}`, { headers: this.getHeaders() });
  }
}
