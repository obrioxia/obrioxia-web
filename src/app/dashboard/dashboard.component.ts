import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';
import { Firestore, collection, collectionData, query, orderBy, limit } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// ✅ NEW FIX: Import 'BaseChartDirective' instead of 'NgChartsModule'
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, Chart, registerables } from 'chart.js';

// Register Chart components
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // ✅ NEW FIX: Use BaseChartDirective here
  imports: [CommonModule, RouterLink, BaseChartDirective], 
  template: `
    <div class="dashboard-container p-6 bg-black min-h-screen text-white">
      <header class="mb-8 border-b border-white/10 pb-4">
        <h1 class="text-3xl font-orbitron text-obrioxia-cyan">OBRIOXIA ANALYTICS</h1>
        <p class="text-gray-400 font-mono text-sm">System Monitor v3.9</p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="p-4 bg-white/5 border border-white/10 rounded-xl">
          <h5 class="text-gray-400 text-xs font-mono mb-2">Total Requests</h5>
          <h2 class="text-4xl font-bold font-orbitron">1,204</h2>
        </div>
        <div class="p-4 bg-white/5 border border-white/10 rounded-xl">
          <h5 class="text-gray-400 text-xs font-mono mb-2">Incidents</h5>
          <h2 class="text-4xl font-bold font-orbitron text-red-500">0</h2>
        </div>
        <div class="p-4 bg-white/5 border border-white/10 rounded-xl">
          <h5 class="text-gray-400 text-xs font-mono mb-2">Chain Integrity</h5>
          <h2 class="text-4xl font-bold font-orbitron text-green-500">100%</h2>
        </div>
        <div class="p-4 bg-white/5 border border-white/10 rounded-xl">
          <h5 class="text-gray-400 text-xs font-mono mb-2">Shredded Events</h5>
          <h2 class="text-4xl font-bold font-orbitron text-gray-500">12</h2>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div class="col-span-2 bg-white/5 border border-white/10 rounded-xl p-6">
          <h4 class="font-orbitron mb-4 text-lg">Request Timeline</h4>
          <div style="display: block; height: 250px;">
            <canvas baseChart
              [type]="'line'"
              [data]="lineChartData"
              [options]="lineChartOptions">
            </canvas>
          </div>
        </div>
        
        <div class="bg-white/5 border border-white/10 rounded-xl p-6">
          <h4 class="font-orbitron mb-4 text-lg">Recent Decisions</h4>
          <ul class="space-y-3">
            <li class="flex justify-between items-center border-b border-white/5 pb-2" *ngFor="let log of logs$ | async">
              <small class="text-gray-500 font-mono">{{ log.timestamp ? (log.timestamp | date:'shortTime') : 'Just now' }}</small>
              <div class="text-right">
                <strong class="text-obrioxia-cyan text-sm block">ID: {{ log.decision_id ? (log.decision_id | slice:0:8) : 'Verifying' }}...</strong>
                <span *ngIf="log._is_encrypted" class="text-[10px] bg-gray-800 text-gray-400 px-1 rounded border border-gray-600">Encrypted</span>
              </div>
            </li>
            <li *ngIf="(logs$ | async)?.length === 0" class="text-center text-gray-500 py-4 font-mono text-xs">
               Connecting to ledger...
            </li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  private firestore = inject(Firestore);
  logs$: Observable<any[]>;

  // Chart Config
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'System Requests',
        fill: true,
        tension: 0.4,
        borderColor: '#22d3ee',
        backgroundColor: 'rgba(34, 211, 238, 0.1)'
      }
    ]
  };
  
  public lineChartOptions: ChartOptions<'line'> = { 
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#888' } },
        x: { grid: { display: false }, ticks: { color: '#888' } }
    }
  };

  constructor() {
    const logsCollection = collection(this.firestore, 'audit_logs');
    const q = query(logsCollection, orderBy('timestamp', 'desc'), limit(10));
    this.logs$ = collectionData(q, { idField: 'id' });
  }
}
