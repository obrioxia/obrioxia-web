import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-onboarding',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="onboarding-page">
      <div class="onboarding-header">
        <h1>🚀 Get Started with Obrioxia</h1>
        <p class="subtitle">Complete these steps to start logging tamper-proof audit decisions.</p>
      </div>

      <!-- System Health -->
      <div class="health-bar" [class.healthy]="healthStatus === 'ok'" [class.degraded]="healthStatus === 'degraded'" [class.checking]="healthStatus === 'checking'">
        <span class="health-dot"></span>
        <span>System: {{ healthStatus === 'checking' ? 'Checking...' : healthStatus === 'ok' ? 'All Systems Operational' : 'Degraded — Some features may be slow' }}</span>
      </div>

      <div class="steps-container">

        <!-- Step 1: Entitlement Status -->
        <div class="step-card" [class.done]="steps.entitlement">
          <div class="step-header">
            <span class="step-number">1</span>
            <span class="step-badge" [class.done]="steps.entitlement">{{ steps.entitlement ? '✓ Done' : 'Review' }}</span>
          </div>
          <h2>Review Your Plan</h2>
          <p>Check your current subscription, feature access, and remaining quota.</p>

          <div class="info-grid" *ngIf="entitlement">
            <div class="info-item"><span class="label">Plan</span><span class="value plan-badge">{{ entitlement.plan_id }}</span></div>
            <div class="info-item"><span class="label">Status</span><span class="value" [class.active]="entitlement.status === 'active'" [class.inactive]="entitlement.status !== 'active'">{{ entitlement.status }}</span></div>
            <div class="info-item"><span class="label">Events Remaining</span><span class="value">{{ entitlement.quota_remaining }} / {{ entitlement.monthly_event_quota }}</span></div>
            <div class="info-item"><span class="label">Rate Limit</span><span class="value">{{ entitlement.requests_per_minute }} RPM</span></div>
            <div class="info-item"><span class="label">Max Payload</span><span class="value">{{ (entitlement.max_payload_bytes / 1024) | number:'1.0-0' }} KB</span></div>
          </div>
          <div class="feature-flags" *ngIf="entitlement?.features">
            <h3>Features</h3>
            <div class="feature-list">
              <span *ngFor="let f of featureList" class="feature-tag" [class.enabled]="f.enabled" [class.disabled]="!f.enabled">
                {{ f.enabled ? '✓' : '✗' }} {{ f.name }}
              </span>
            </div>
          </div>
          <div class="loading-state" *ngIf="entitlementLoading">Loading entitlement...</div>
          <div class="upgrade-cta" *ngIf="entitlement  && entitlement.plan_id === 'free'">
            <a routerLink="/pricing" class="btn btn-upgrade">Upgrade Plan →</a>
          </div>
        </div>

        <!-- Step 2: Create API Key -->
        <div class="step-card" [class.done]="steps.apiKey">
          <div class="step-header">
            <span class="step-number">2</span>
            <span class="step-badge" [class.done]="steps.apiKey">{{ steps.apiKey ? '✓ Done' : 'Action Required' }}</span>
          </div>
          <h2>Create Your API Key</h2>
          <p>Generate a key for programmatic access. It is shown <strong>once</strong> — copy it immediately.</p>

          <button class="btn btn-primary" (click)="createApiKey()" [disabled]="apiKeyLoading" *ngIf="!apiKey">
            {{ apiKeyLoading ? 'Generating...' : '🔑 Generate API Key' }}
          </button>

          <div class="api-key-display" *ngIf="apiKey">
            <div class="key-warning">⚠️ This key will NOT be shown again. Copy it now.</div>
            <div class="key-value">
              <code id="apiKeyValue">{{ apiKey }}</code>
              <button class="btn btn-small" (click)="copyApiKey()">{{ copied ? '✓ Copied' : '📋 Copy' }}</button>
            </div>
            <div class="key-prefix">Prefix: <code>{{ apiKeyPrefix }}</code></div>
          </div>
          <div class="error-msg" *ngIf="apiKeyError">{{ apiKeyError }}</div>
        </div>

        <!-- Step 3: Send First Incident -->
        <div class="step-card" [class.done]="steps.incident">
          <div class="step-header">
            <span class="step-number">3</span>
            <span class="step-badge" [class.done]="steps.incident">{{ steps.incident ? '✓ Done' : 'Action Required' }}</span>
          </div>
          <h2>Send Your First Incident</h2>
          <p>Log a test audit decision to verify your integration works end-to-end.</p>

          <button class="btn btn-primary" (click)="sendTestIncident()" [disabled]="incidentLoading">
            {{ incidentLoading ? 'Sending...' : '📡 Send Test Incident' }}
          </button>

          <div class="result-card success" *ngIf="incidentResult">
            <div class="result-title">✓ Incident Logged</div>
            <div class="result-field"><span>Decision ID:</span> <code>{{ incidentResult.decision_id }}</code></div>
            <div class="result-field"><span>Hash:</span> <code>{{ incidentResult.entry_hash?.substring(0, 16) }}...</code></div>
            <div class="result-field"><span>Status:</span> {{ incidentResult.status }}</div>
          </div>
          <div class="error-msg" *ngIf="incidentError">{{ incidentError }}</div>
        </div>

        <!-- Step 4: View Logs -->
        <div class="step-card" [class.done]="steps.viewedLogs">
          <div class="step-header">
            <span class="step-number">4</span>
            <span class="step-badge" [class.done]="steps.viewedLogs">{{ steps.viewedLogs ? '✓ Done' : 'Next' }}</span>
          </div>
          <h2>View Your Audit Log</h2>
          <p>See your incident in the immutable ledger.</p>
          <a routerLink="/hub/logger" class="btn btn-secondary" (click)="steps.viewedLogs = true">📋 Open Logger →</a>
        </div>

        <!-- Step 5: Upgrade -->
        <div class="step-card">
          <div class="step-header">
            <span class="step-number">5</span>
            <span class="step-badge">Optional</span>
          </div>
          <h2>Upgrade for More</h2>
          <p>Unlock shredder, analytics, higher quotas, and larger payloads.</p>
          <a routerLink="/pricing" class="btn btn-upgrade">💎 View Plans →</a>
        </div>

      </div>
    </div>
  `,
    styles: [`
    .onboarding-page { max-width: 800px; margin: 0 auto; padding: 2rem 1rem; }
    .onboarding-header { text-align: center; margin-bottom: 2rem; }
    .onboarding-header h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    .subtitle { color: #94a3b8; font-size: 1.1rem; }

    .health-bar { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 2rem; font-size: 0.9rem; background: #1e293b; border: 1px solid #334155; }
    .health-bar.healthy { border-color: #22c55e40; }
    .health-bar.degraded { border-color: #eab30860; background: #431a0360; }
    .health-dot { width: 8px; height: 8px; border-radius: 50%; background: #64748b; }
    .health-bar.healthy .health-dot { background: #22c55e; box-shadow: 0 0 6px #22c55e; }
    .health-bar.degraded .health-dot { background: #eab308; box-shadow: 0 0 6px #eab308; }

    .steps-container { display: flex; flex-direction: column; gap: 1.5rem; }
    .step-card { background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 1.5rem; transition: border-color 0.3s; }
    .step-card.done { border-color: #22c55e40; }
    .step-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
    .step-number { width: 32px; height: 32px; border-radius: 50%; background: #6366f1; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; }
    .step-card.done .step-number { background: #22c55e; }
    .step-badge { font-size: 0.75rem; padding: 2px 8px; border-radius: 4px; background: #334155; color: #94a3b8; }
    .step-badge.done { background: #22c55e20; color: #22c55e; }
    .step-card h2 { font-size: 1.25rem; margin-bottom: 0.5rem; color: #f1f5f9; }
    .step-card p { color: #94a3b8; font-size: 0.95rem; margin-bottom: 1rem; }

    .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; margin-bottom: 1rem; }
    .info-item { display: flex; flex-direction: column; gap: 0.25rem; padding: 0.5rem; background: #1e293b; border-radius: 6px; }
    .label { font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
    .value { font-size: 1rem; color: #f1f5f9; font-weight: 600; }
    .value.active { color: #22c55e; }
    .value.inactive { color: #ef4444; }
    .plan-badge { color: #818cf8; }

    .feature-flags h3 { font-size: 0.9rem; color: #94a3b8; margin-bottom: 0.5rem; }
    .feature-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .feature-tag { font-size: 0.8rem; padding: 3px 10px; border-radius: 4px; }
    .feature-tag.enabled { background: #22c55e20; color: #22c55e; }
    .feature-tag.disabled { background: #ef444420; color: #ef4444; }

    .btn { display: inline-block; padding: 0.625rem 1.25rem; border-radius: 8px; border: none; cursor: pointer; font-size: 0.95rem; font-weight: 600; text-decoration: none; transition: all 0.2s; }
    .btn-primary { background: #6366f1; color: #fff; }
    .btn-primary:hover { background: #818cf8; }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-secondary { background: #1e293b; color: #f1f5f9; border: 1px solid #334155; }
    .btn-secondary:hover { border-color: #6366f1; }
    .btn-upgrade { background: linear-gradient(135deg, #6366f1, #a855f7); color: #fff; }
    .btn-upgrade:hover { filter: brightness(1.1); }
    .btn-small { padding: 0.25rem 0.75rem; font-size: 0.8rem; background: #334155; color: #f1f5f9; border: none; border-radius: 4px; cursor: pointer; }

    .api-key-display { margin-top: 1rem; }
    .key-warning { background: #eab30815; border: 1px solid #eab30840; color: #eab308; padding: 0.5rem 0.75rem; border-radius: 6px; font-size: 0.85rem; margin-bottom: 0.75rem; }
    .key-value { display: flex; align-items: center; gap: 0.75rem; background: #1e293b; padding: 0.75rem; border-radius: 6px; }
    .key-value code { font-size: 0.85rem; color: #22c55e; word-break: break-all; flex: 1; }
    .key-prefix { margin-top: 0.5rem; font-size: 0.85rem; color: #64748b; }

    .result-card { margin-top: 1rem; padding: 1rem; border-radius: 8px; }
    .result-card.success { background: #22c55e10; border: 1px solid #22c55e30; }
    .result-title { font-weight: 600; color: #22c55e; margin-bottom: 0.5rem; }
    .result-field { font-size: 0.9rem; color: #94a3b8; margin-bottom: 0.25rem; }
    .result-field code { color: #818cf8; }

    .error-msg { margin-top: 0.75rem; padding: 0.5rem 0.75rem; background: #ef444420; border: 1px solid #ef444440; border-radius: 6px; color: #ef4444; font-size: 0.9rem; }
    .loading-state { color: #64748b; font-style: italic; }
    .upgrade-cta { margin-top: 1rem; }
  `]
})
export class OnboardingComponent {
    private http = inject(HttpClient);
    private auth = inject(AuthService);
    private apiUrl = `${environment.backendUrl}/api`;

    healthStatus: 'checking' | 'ok' | 'degraded' = 'checking';
    entitlement: any = null;
    entitlementLoading = true;
    featureList: { name: string; enabled: boolean }[] = [];

    apiKey: string | null = null;
    apiKeyPrefix: string | null = null;
    apiKeyLoading = false;
    apiKeyError: string | null = null;
    copied = false;

    incidentResult: any = null;
    incidentLoading = false;
    incidentError: string | null = null;

    steps = { entitlement: false, apiKey: false, incident: false, viewedLogs: false };

    constructor() {
        this.checkHealth();
        this.loadEntitlement();
    }

    checkHealth() {
        this.http.get<any>(`${this.apiUrl}/health`).subscribe({
            next: (res) => {
                this.healthStatus = res.status === 'ok' ? 'ok' : 'degraded';
            },
            error: () => this.healthStatus = 'degraded'
        });
    }

    loadEntitlement() {
        this.http.get<any>(`${this.apiUrl}/billing/entitlement`).subscribe({
            next: (res) => {
                this.entitlement = res;
                this.entitlementLoading = false;
                this.steps.entitlement = true;
                if (res.features) {
                    this.featureList = Object.entries(res.features).map(([name, enabled]) => ({ name, enabled: !!enabled }));
                }
            },
            error: () => this.entitlementLoading = false
        });
    }

    createApiKey() {
        this.apiKeyLoading = true;
        this.apiKeyError = null;
        this.http.post<any>(`${this.apiUrl}/keys`, {}).subscribe({
            next: (res) => {
                this.apiKey = res.api_key;
                this.apiKeyPrefix = res.prefix;
                this.apiKeyLoading = false;
                this.steps.apiKey = true;
            },
            error: (err) => {
                this.apiKeyLoading = false;
                this.apiKeyError = err.error?.detail || 'Active subscription required to generate API keys';
            }
        });
    }

    copyApiKey() {
        if (this.apiKey) {
            navigator.clipboard.writeText(this.apiKey);
            this.copied = true;
            setTimeout(() => this.copied = false, 3000);
        }
    }

    sendTestIncident() {
        this.incidentLoading = true;
        this.incidentError = null;
        this.incidentResult = null;

        const payload = {
            incidentType: 'onboarding_test',
            system: 'hub_onboarding',
            message: 'First incident from onboarding wizard',
            risk: 'low',
            schema_version: '4.1-strict'
        };

        this.http.post<any>(`${this.apiUrl}/incidents`, payload).subscribe({
            next: (res) => {
                this.incidentResult = res;
                this.incidentLoading = false;
                this.steps.incident = true;
                this.loadEntitlement(); // refresh quota
            },
            error: (err) => {
                this.incidentLoading = false;
                const code = err.error?.code;
                if (code === 'QUOTA_EXCEEDED') this.incidentError = 'Quota exceeded — upgrade your plan.';
                else if (code === 'RATE_LIMITED') this.incidentError = `Rate limited — wait ${err.error?.retry_after || 60} seconds.`;
                else if (code === 'FEATURE_DISABLED') this.incidentError = 'Logger feature disabled — upgrade required.';
                else this.incidentError = err.error?.detail || 'Failed to send incident.';
            }
        });
    }
}
