import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-status',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="status-page">
      <div class="status-header">
        <h1>System Status</h1>
        <p class="subtitle">Obrioxia platform health at a glance</p>
      </div>

      <div class="status-card" [class.ok]="apiStatus === 'ok'" [class.degraded]="apiStatus === 'degraded'" [class.checking]="apiStatus === 'checking'">
        <div class="status-row">
          <span class="status-label">API Health</span>
          <span class="status-value">
            <span class="dot" [class.green]="apiStatus === 'ok'" [class.yellow]="apiStatus === 'degraded'" [class.gray]="apiStatus === 'checking'"></span>
            {{ apiStatus === 'checking' ? 'Checking...' : apiStatus === 'ok' ? 'Operational' : 'Degraded' }}
          </span>
        </div>
        <div class="status-row">
          <span class="status-label">Database (MongoDB)</span>
          <span class="status-value">
            <span class="dot" [class.green]="mongoStatus === 'ok'" [class.yellow]="mongoStatus === 'degraded'" [class.gray]="mongoStatus === 'checking'"></span>
            {{ mongoStatus === 'checking' ? 'Checking...' : mongoStatus === 'ok' ? 'Connected' : 'Unreachable' }}
          </span>
        </div>
        <div class="status-row">
          <span class="status-label">Last Checked</span>
          <span class="status-value timestamp">{{ lastChecked || 'Checking...' }}</span>
        </div>
        <div class="status-row">
          <span class="status-label">Auto-refresh</span>
          <span class="status-value timestamp">Every 30 seconds</span>
        </div>
      </div>

      <div class="status-footer">
        <p>This page uses <code>GET /api/health</code> which probes MongoDB connectivity.</p>
        <p>No authentication or secrets required.</p>
      </div>
    </div>
  `,
    styles: [`
    .status-page { max-width: 600px; margin: 0 auto; padding: 6rem 1rem 2rem; }
    .status-header { text-align: center; margin-bottom: 2rem; }
    .status-header h1 { font-size: 2rem; color: #f1f5f9; }
    .subtitle { color: #94a3b8; }

    .status-card { background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 1.5rem; }
    .status-card.ok { border-color: #22c55e40; }
    .status-card.degraded { border-color: #eab30860; }

    .status-row { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid #1e293b; }
    .status-row:last-child { border-bottom: none; }
    .status-label { color: #94a3b8; font-size: 0.95rem; }
    .status-value { color: #f1f5f9; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; }
    .status-value.timestamp { color: #64748b; font-weight: 400; font-family: monospace; font-size: 0.85rem; }

    .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
    .dot.green { background: #22c55e; box-shadow: 0 0 8px #22c55e; }
    .dot.yellow { background: #eab308; box-shadow: 0 0 8px #eab308; }
    .dot.gray { background: #64748b; }

    .status-footer { margin-top: 2rem; text-align: center; color: #64748b; font-size: 0.85rem; }
    .status-footer code { background: #1e293b; padding: 0.125rem 0.375rem; border-radius: 3px; color: #818cf8; }
  `]
})
export class StatusComponent implements OnInit, OnDestroy {
    private http = inject(HttpClient);
    private apiUrl = `${environment.backendUrl}/api`;
    private intervalId: any;

    apiStatus: 'checking' | 'ok' | 'degraded' = 'checking';
    mongoStatus: 'checking' | 'ok' | 'degraded' = 'checking';
    lastChecked: string | null = null;

    ngOnInit() {
        this.check();
        this.intervalId = setInterval(() => this.check(), 30000);
    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
    }

    check() {
        this.http.get<any>(`${this.apiUrl}/health`).subscribe({
            next: (res) => {
                this.apiStatus = res.status === 'ok' ? 'ok' : 'degraded';
                this.mongoStatus = res.mongo === 'ok' ? 'ok' : 'degraded';
                this.lastChecked = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
            },
            error: () => {
                this.apiStatus = 'degraded';
                this.mongoStatus = 'degraded';
                this.lastChecked = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
            }
        });
    }
}
