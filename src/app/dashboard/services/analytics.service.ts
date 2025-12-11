import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LogEntry, DashboardMetrics } from '../models/analytics.models';

// Future-ready hook for OTel
@Injectable({ providedIn: 'root' })
export class AnalyticsIngestionAdapter {
  prepareForOtel(): void { console.log('Initializing OTel context...'); }
  setCollectorURL(url: string): void { console.log(`Collector set to ${url}`); }
}

@Injectable({ providedIn: 'root' })
export class DashboardAnalyticsService {

  constructor(private adapter: AnalyticsIngestionAdapter) {}

  // Mocks backend 'get_all_logs' behavior for the new Dashboard
  getLogs(): Observable<LogEntry[]> {
    const mockData: LogEntry[] = [
      {
        decision_id: '550e8400-e29b-41d4-a716-446655440000',
        timestamp_utc: new Date().toISOString(),
        ai_system: 'obrioxia_core',
        entry_hash: 'a1b2c3d4...', 
        previous_hash: '000000...', 
        _is_encrypted: false
      },
      {
        decision_id: '550e8400-e29b-41d4-a716-446655440001',
        timestamp_utc: new Date(Date.now() - 3600000).toISOString(),
        ai_system: 'obrioxia_core',
        entry_hash: 'e5f6g7h8...',
        previous_hash: 'a1b2c3d4...',
        _is_encrypted: true,
        _decryption_status: 'SHREDDED_OR_MISSING'
      }
    ];
    return of(mockData).pipe(delay(800));
  }

  getMetrics(): Observable<DashboardMetrics> {
    return of({
      totalRequests: 1250,
      totalIncidents: 3,
      verificationPassRate: 99.8, 
      shreddedEvents: 12          
    }).pipe(delay(500));
  }
}
