import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// ✅ Added export so the Dashboard can find this type
export interface LogEntry {
  decision_id: string;
  timestamp_utc: string;
  ai_system: string;
  entry_hash: string;
  previous_hash: string;
  _is_encrypted: boolean;
  _decryption_status?: string;
}

// ✅ Added export so the Dashboard can find this type
export interface DashboardMetrics {
  totalRequests: number;
  totalIncidents: number;
  verificationPassRate: number;
  shreddedEvents: number;
}

@Injectable({ providedIn: 'root' })
export class AnalyticsIngestionAdapter {
  prepareForOtel(): void { console.log('Initializing OTel context...'); }
}

@Injectable({ providedIn: 'root' })
export class DashboardAnalyticsService { // ✅ Renamed to match the error's expectations
  private http = inject(HttpClient);
  private apiUrl = `${environment.backendUrl}/api/analytics`;

  getLogs(): Observable<LogEntry[]> {
    return this.http.get<LogEntry[]>(`${this.apiUrl}/logs`);
  }

  getMetrics(): Observable<DashboardMetrics> {
    return this.http.get<DashboardMetrics>(`${this.apiUrl}/kpi`);
  }

  getTrends(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/trends`);
  }

  getAnomalies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/anomalies`);
  }
}
