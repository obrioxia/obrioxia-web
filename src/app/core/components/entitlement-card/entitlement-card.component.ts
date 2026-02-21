import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-entitlement-card',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="ent-card" *ngIf="loaded" [class.degraded]="error">
      <div class="ent-row" *ngIf="!error">
        <span class="plan-pill">{{ entitlement?.plan_id || 'free' }}</span>
        <span class="status-dot" [class.active]="entitlement?.status === 'active'"></span>
        <span class="quota">{{ entitlement?.quota_remaining ?? '—' }} left</span>
        <span class="rpm">{{ entitlement?.requests_per_minute ?? '—' }} RPM</span>
        <span class="features-summary">
          <span *ngFor="let f of featureTags" class="ftag" [class.on]="f.on" [title]="f.name">{{ f.label }}</span>
        </span>
        <a routerLink="/pricing" class="upgrade-link" *ngIf="entitlement?.plan_id === 'free' || !entitlement?.plan_id">↑</a>
      </div>
      <div class="ent-row error-row" *ngIf="error">
        <span class="error-text">⚠ Service degraded</span>
        <button class="retry-btn" (click)="load()">Retry</button>
      </div>
    </div>
  `,
    styles: [`
    .ent-card { background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 0.375rem 0.75rem; margin: 0; font-size: 0.75rem; }
    .ent-card.degraded { border-color: #eab30840; }
    .ent-row { display: flex; align-items: center; gap: 0.625rem; flex-wrap: wrap; }
    .plan-pill { background: #6366f120; color: #818cf8; padding: 1px 6px; border-radius: 3px; font-weight: 700; text-transform: uppercase; font-size: 0.7rem; }
    .status-dot { width: 6px; height: 6px; border-radius: 50%; background: #ef4444; }
    .status-dot.active { background: #22c55e; box-shadow: 0 0 4px #22c55e; }
    .quota { color: #94a3b8; }
    .rpm { color: #64748b; }
    .features-summary { display: flex; gap: 3px; }
    .ftag { padding: 1px 4px; border-radius: 2px; font-size: 0.65rem; font-weight: 600; }
    .ftag.on { background: #22c55e15; color: #22c55e; }
    .ftag:not(.on) { background: #33415520; color: #475569; }
    .upgrade-link { color: #818cf8; text-decoration: none; font-weight: 700; }
    .error-text { color: #eab308; }
    .retry-btn { background: #334155; color: #f1f5f9; border: none; border-radius: 4px; padding: 2px 8px; font-size: 0.7rem; cursor: pointer; }
    .error-row { justify-content: center; }
  `]
})
export class EntitlementCardComponent implements OnInit, OnDestroy {
    private http = inject(HttpClient);
    private apiUrl = `${environment.backendUrl}/api`;
    private intervalId: any;

    entitlement: any = null;
    loaded = false;
    error = false;

    featureTags: { name: string; label: string; on: boolean }[] = [];

    private featureLabels: Record<string, string> = {
        logger: 'L',
        shredder: 'S',
        analytics: 'A',
        pdf_evidence: 'P'
    };

    ngOnInit() {
        this.load();
        this.intervalId = setInterval(() => this.load(), 60000);
    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
    }

    load() {
        this.http.get<any>(`${this.apiUrl}/billing/entitlement`).subscribe({
            next: (res) => {
                this.entitlement = res;
                this.loaded = true;
                this.error = false;
                this.featureTags = Object.entries(this.featureLabels).map(([name, label]) => ({
                    name,
                    label,
                    on: !!res.features?.[name]
                }));
            },
            error: (err) => {
                this.loaded = true;
                this.error = true;
            }
        });
    }
}
