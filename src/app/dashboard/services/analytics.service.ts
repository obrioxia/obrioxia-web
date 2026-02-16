import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LogEntry, DashboardMetrics } from '../models/analytics.models';

/**
 * Future-ready hook for OpenTelemetry (OTel) context.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsIngestionAdapter {
  prepareForOtel(): void { console.log('Initializing OTel context...'); }
  setCollectorURL(url: string): void { console.log(`Collector set to ${url}`); }
}

@Injectable({ providedIn: 'root' })
export class DashboardAnalyticsService {
  private http = inject(HttpClient);
  private adapter = inject(AnalyticsIngestionAdapter);

  /**
   * ✅ FIX: Pointing to the new Python Render backend analytics module.
   */
  private apiUrl = `${environment.backendUrl}/api/analytics`;

  /**
   * Fetches all logs from the backend.
   * Replaces mock data with a live call to the Python /logs endpoint.
   */
  getLogs(): Observable<LogEntry[]> {
    // Standardizing to the backend log structure
    return this.http.get<LogEntry[]>(`${this.apiUrl}/logs`);
  }

  /**
   * Fetches the Key Performance Indicators (KPIs) for the Dashboard.
   */
  getMetrics(): Observable<DashboardMetrics> {
    return this.http.get<DashboardMetrics>(`${this.apiUrl}/kpi`);
  }

  /**
   * Fetches trend data for Chart.js visualizations.
   */
  getTrends(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/trends`);
  }

  /**
   * Fetches anomaly detection data from the Python AI engine.
   */
  getAnomalies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/anomalies`);
  }
}
