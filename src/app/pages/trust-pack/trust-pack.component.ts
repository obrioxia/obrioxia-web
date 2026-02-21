import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trust-pack',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="trust-pack-page">
      <header class="trust-header">
        <div class="badge">TRUST PACK</div>
        <h1>Why Obrioxia Is Trustworthy</h1>
        <p class="lead">A one-page summary for buyers, auditors, and compliance teams.</p>
      </header>

      <!-- What You Get -->
      <section class="trust-section">
        <h2>What You Get</h2>
        <ul class="check-list">
          <li>Tamper-evident audit log for every decision your system makes</li>
          <li>Immutable record with SHA-256 hash chain — no one can alter entries after the fact</li>
          <li>GDPR-compliant shredding — irreversibly redact personal data on demand</li>
          <li>PDF evidence reports for each logged decision</li>
          <li>Real-time analytics dashboard for risk and compliance monitoring</li>
          <li>API-first integration — works with any system, any language</li>
        </ul>
      </section>

      <!-- How It Proves -->
      <section class="trust-section">
        <h2>How It Proves Compliance</h2>
        <ul class="proof-list">
          <li><strong>Hash chain:</strong> Each record's fingerprint depends on the previous record. Change one, and every record after it breaks.</li>
          <li><strong>Audit trail:</strong> Every enforcement decision (allowed, denied, rate-limited) is logged permanently with a unique decision ID.</li>
          <li><strong>Billing fairness:</strong> Quota limits, rate limits, and feature gates apply equally to every customer. No bypass. If the database is down, requests are rejected — never silently allowed.</li>
          <li><strong>Shred proof:</strong> Shredded records show as <code>[SHREDDED]</code> in the ledger. The operation is irreversible at the application layer.</li>
          <li><strong>Idempotent operations:</strong> Replayed API calls return the same result without double-counting usage.</li>
        </ul>
      </section>

      <!-- When Something Breaks -->
      <section class="trust-section">
        <h2>When Something Breaks</h2>
        <p>We designed Obrioxia to be transparent when things go wrong:</p>
        <ul class="check-list">
          <li><strong>Status page</strong> at <a routerLink="/status">/status</a> — shows API and database health in real time</li>
          <li><strong>Fail-closed enforcement</strong> — if the database is unreachable, all metered requests return a clear 503 error, never proceed without checks</li>
          <li><strong>Structured error messages</strong> — every error tells you exactly what went wrong and what to do next</li>
          <li><strong>Rollback ready</strong> — enforcement can be disabled with a single code revert and auto-redeploy</li>
        </ul>
      </section>

      <!-- Data Deletion -->
      <section class="trust-section">
        <h2>Data Deletion &amp; Shredding</h2>
        <p>When you shred a record, identifying fields are permanently replaced with <code>[SHREDDED]</code>. The ledger entry remains (with its hash chain intact) but the personal data is gone.</p>
        <p>This is irreversible at the application level. While database backups may contain pre-shred snapshots within the retention window, the Obrioxia application cannot undo a shred operation.</p>
      </section>

      <!-- Proof Links -->
      <section class="trust-section proof-links">
        <h2>Technical Proof Documents</h2>
        <p>For auditors and technical teams — full test results and implementation details are available in the documentation pack.</p>
      </section>

      <footer class="trust-footer">
        <p>Questions? <a href="mailto:hello&#64;obrioxia.com">hello&#64;obrioxia.com</a></p>
      </footer>
    </div>
  `,
  styles: [`
    .trust-pack-page { max-width: 720px; margin: 0 auto; padding: 6rem 1rem 2rem; }
    .trust-header { text-align: center; margin-bottom: 2.5rem; }
    .badge { display: inline-block; background: #6366f120; color: #818cf8; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 0.75rem; }
    .trust-header h1 { font-size: 2.25rem; margin-bottom: 0.5rem; color: #f1f5f9; }
    .lead { font-size: 1.05rem; color: #94a3b8; }

    .trust-section { margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid #1e293b; }
    .trust-section:last-of-type { border-bottom: none; }
    .trust-section h2 { font-size: 1.3rem; margin-bottom: 0.75rem; color: #f1f5f9; }
    .trust-section p { color: #cbd5e1; line-height: 1.65; margin-bottom: 0.5rem; font-size: 0.95rem; }

    .check-list, .proof-list { list-style: none; padding: 0; margin: 0; }
    .check-list li, .proof-list li { padding: 0.375rem 0 0.375rem 1.5rem; position: relative; color: #cbd5e1; font-size: 0.95rem; line-height: 1.5; }
    .check-list li::before { content: '✓'; position: absolute; left: 0; color: #22c55e; font-weight: 700; }
    .proof-list li::before { content: '→'; position: absolute; left: 0; color: #818cf8; }
    .proof-list li { padding-left: 1.5rem; }

    code { background: #1e293b; padding: 0.1rem 0.35rem; border-radius: 3px; font-size: 0.85rem; color: #818cf8; }
    a { color: #818cf8; text-decoration: none; }
    a:hover { text-decoration: underline; }

    .trust-footer { text-align: center; margin-top: 2rem; color: #64748b; font-size: 0.9rem; }
  `]
})
export class TrustPackComponent { }
