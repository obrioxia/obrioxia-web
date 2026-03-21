import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DRONE_DEMO_DATA } from './drone-demo-data';

@Component({
  selector: 'app-drone-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drone-demo.component.html'
})
export class DroneDemoComponent {
  scenarios = DRONE_DEMO_DATA.scenarios;
  selectedScenarioId = signal<string>('gps-degradation');
  running = signal<boolean>(false);
  completed = signal<boolean>(false);
  revealedCount = signal<number>(0);
  showVerdict = signal<boolean>(false);
  showFullChain = signal<boolean>(false);

  selectedScenario = computed(() =>
    this.scenarios.find((s: any) => s.id === this.selectedScenarioId())
  );

  chain = computed(() => this.selectedScenario()?.chain || []);
  verification = computed(() => this.selectedScenario()?.verification);

  selectScenario(id: string) {
    if (this.running()) return;
    this.selectedScenarioId.set(id);
    this.reset();
  }

  reset() {
    this.running.set(false);
    this.completed.set(false);
    this.revealedCount.set(0);
    this.showVerdict.set(false);
    this.showFullChain.set(false);
  }

  async runDemo() {
    if (this.running()) return;
    this.reset();
    this.running.set(true);

    const total = this.chain().length;
    for (let i = 0; i < total; i++) {
      this.revealedCount.set(i + 1);
      await this.wait(500);
    }

    // Pause before verdict
    await this.wait(600);
    this.showVerdict.set(true);
    this.running.set(false);
    this.completed.set(true);
  }

  toggleFullChain() { this.showFullChain.update(v => !v); }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ── Display helpers (matching drone_summary.py terminal output) ──

  familyColor(family: string): string {
    const m: Record<string, string> = {
      'SYNC_EVENT':           'text-gray-600',
      'MISSION_EVENT':        'text-obrioxia-cyan',
      'STATE_EVENT':          'text-blue-400',
      'DECISION_EVENT':       'text-purple-400',
      'TELEMETRY_REF_EVENT':  'text-gray-500',
      'LOSS_EVENT':           'text-yellow-500',
    };
    return m[family] || 'text-gray-400';
  }

  familyIcon(family: string): string {
    const m: Record<string, string> = {
      'SYNC_EVENT': '\uD83D\uDD04', 'MISSION_EVENT': '\uD83C\uDFAF',
      'STATE_EVENT': '\uD83D\uDCE1', 'DECISION_EVENT': '\u26A1',
      'TELEMETRY_REF_EVENT': '\uD83D\uDCE6', 'LOSS_EVENT': '\u26A0\uFE0F',
    };
    return m[family] || '\u2022';
  }

  /** Left border color for the event row */
  rowBorderClass(record: any): string {
    if (record._tampered) return 'border-l-red-500';
    if (record._missing_evidence) return 'border-l-red-500';
    const f = record.event_family;
    if (f === 'LOSS_EVENT') return 'border-l-yellow-500';
    if (f === 'DECISION_EVENT') return 'border-l-purple-400';
    if (f === 'TELEMETRY_REF_EVENT') return 'border-l-gray-700';
    if (f === 'MISSION_EVENT') return 'border-l-obrioxia-cyan';
    if (f === 'STATE_EVENT') return 'border-l-blue-400/50';
    return 'border-l-gray-800';
  }

  /** Background intensity - LOSS and DECISION get stronger bg */
  rowBgClass(record: any): string {
    if (record._tampered) return 'bg-red-500/[0.06]';
    if (record._missing_evidence) return 'bg-red-500/[0.04]';
    const f = record.event_family;
    if (f === 'LOSS_EVENT') return 'bg-yellow-500/[0.06]';
    if (f === 'DECISION_EVENT') return 'bg-purple-500/[0.05]';
    return 'bg-transparent';
  }

  /** Whether this event family is a "story lead" (stronger visual) */
  isStoryLead(family: string): boolean {
    return family === 'LOSS_EVENT' || family === 'DECISION_EVENT';
  }

  /** Detail lines under an event (mirrors drone_summary.py) */
  eventDetails(record: any): string[] {
    const lines: string[] = [];
    const f = record.event_family;
    const t = record.event_type;

    if (f === 'LOSS_EVENT') {
      lines.push(`Sensor: ${record.sensor || '?'}  Quality: ${((record.quality_before || 0) * 100).toFixed(0)}% -> ${((record.quality_after || 0) * 100).toFixed(0)}%`);
      if (record.declared_impact) lines.push(record.declared_impact);
    } else if (f === 'DECISION_EVENT') {
      if (record.reason) lines.push(`Reason: ${record.reason}`);
      if (record.trigger) lines.push(`Trigger: ${record.trigger}`);
    } else if (f === 'TELEMETRY_REF_EVENT') {
      lines.push(`Evidence ref: ${(record.content_hash || '?').substring(0, 16)}...`);
    } else if (f === 'STATE_EVENT' && (t === 'takeoff' || t === 'landing')) {
      lines.push(`Altitude: ${record.altitude_m ?? '?'}m`);
    } else if (f === 'MISSION_EVENT') {
      if (record.mission_id) {
        let line = `Mission: ${record.mission_id}`;
        if (record.outcome) line += `  Outcome: ${record.outcome}`;
        lines.push(line);
      }
    } else if (f === 'STATE_EVENT' && t === 'nav_mode_change') {
      lines.push(`${record.nav_mode_before} -> ${record.nav_mode_after}`);
    }

    // Tampered / missing flags
    if (record._tampered) lines.push('TAMPERED: record modified after sealing');
    if (record._missing_evidence) lines.push('MISSING: referenced evidence not in proof-pack');

    return lines;
  }

  verdictLabel(verdict: string): string {
    if (verdict === 'VALID') return 'VALID';
    if (verdict === 'VALID_WITH_DECLARED_LOSS') return 'VALID WITH DECLARED LOSS';
    return 'INVALID';
  }

  verdictMeaning(): string {
    const m: Record<string, string> = {
      'gps-degradation': 'The record stands. The GPS loss was declared honestly before it affected downstream evidence.',
      'tampered-record': 'The record is broken. The sealed decision was modified after the fact and the verifier caught it.',
      'undeclared-absence': 'The record is broken. Evidence is missing with no explanation. Silent absence fails verification.',
    };
    return m[this.selectedScenarioId()] || m['gps-degradation'];
  }
}
