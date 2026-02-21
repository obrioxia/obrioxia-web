import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ErrorDisplay } from '../../utils/error-mapper';

@Component({
    selector: 'app-error-banner',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="error-banner" *ngIf="display" [class]="'error-banner ' + display.type" [@fadeIn]>
      <div class="banner-content">
        <span class="banner-icon">
          <span *ngIf="display.type === 'quota'">⚠️</span>
          <span *ngIf="display.type === 'feature'">🔒</span>
          <span *ngIf="display.type === 'rate_limit'">⏱️</span>
          <span *ngIf="display.type === 'unavailable'">🔧</span>
          <span *ngIf="display.type === 'unknown'">❌</span>
        </span>
        <span class="banner-msg">{{ countdown !== null ? 'Retry in ' + countdown + 's' : display.message }}</span>
        <a *ngIf="display.showUpgrade" [routerLink]="display.upgradeUrl" class="upgrade-btn">Upgrade →</a>
        <button class="dismiss-btn" (click)="dismiss()">✕</button>
      </div>
    </div>
  `,
    styles: [`
    .error-banner { padding: 0.625rem 1rem; border-radius: 8px; margin-bottom: 1rem; animation: slideDown 0.3s ease; }
    @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
    .error-banner.quota { background: #eab30815; border: 1px solid #eab30840; }
    .error-banner.feature { background: #ef444410; border: 1px solid #ef444430; }
    .error-banner.rate_limit { background: #6366f110; border: 1px solid #6366f130; }
    .error-banner.unavailable { background: #f9731610; border: 1px solid #f9731630; }
    .error-banner.unknown { background: #ef444410; border: 1px solid #ef444430; }
    .banner-content { display: flex; align-items: center; gap: 0.5rem; }
    .banner-msg { flex: 1; color: #f1f5f9; font-size: 0.9rem; }
    .upgrade-btn { background: linear-gradient(135deg, #6366f1, #a855f7); color: #fff; padding: 0.25rem 0.75rem; border-radius: 4px; text-decoration: none; font-size: 0.8rem; font-weight: 600; white-space: nowrap; }
    .dismiss-btn { background: none; border: none; color: #64748b; cursor: pointer; font-size: 1rem; padding: 0; }
  `]
})
export class ErrorBannerComponent implements OnInit, OnDestroy {
    @Input() display: ErrorDisplay | null = null;
    countdown: number | null = null;
    private timer: any;

    ngOnInit() {
        if (this.display?.retryAfter) {
            this.countdown = this.display.retryAfter;
            this.timer = setInterval(() => {
                if (this.countdown !== null && this.countdown > 0) {
                    this.countdown--;
                } else {
                    clearInterval(this.timer);
                    this.countdown = null;
                }
            }, 1000);
        }
    }

    ngOnDestroy() {
        clearInterval(this.timer);
    }

    dismiss() {
        this.display = null;
        this.countdown = null;
    }
}
