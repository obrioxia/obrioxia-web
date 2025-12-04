import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private http = inject(HttpClient);
  private apiUrl = 'https://obrioxia-backend-pkrp.onrender.com/api/analytics';

  getKpiStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/kpi`);
  }

  getTrends(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/trends`);
  }

  getAnomalies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/anomalies`);
  }
}
