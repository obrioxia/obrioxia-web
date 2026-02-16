import { Component, inject, OnInit, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardAnalyticsService, DashboardMetrics } from '../../../core/services/analytics.service';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

// Registers Chart.js components once at the module level
Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html'
})
export class AnalyticsComponent implements OnInit {
  // ✅ Explicitly typed to resolve TS2571
  private analytics = inject(DashboardAnalyticsService);
  private router = inject(Router);

  @ViewChild('trendChart') trendChartRef!: ElementRef;
  
  loading = signal(true);
  kpi: any = null;
  anomalies: any[] = [];
  chart: any;

  ngOnInit() {
    this.loadData();
  }

  /**
   * ✅ FIXED: Added explicit types (data: any, err: any) to resolve TS7006 errors
   * found in the production build log.
   */
  loadData() {
    this.loading.set(true);
    
    // Fetch live KPIs
    this.analytics.getMetrics().subscribe({
      next: (data: DashboardMetrics) => this.kpi = data,
      error: (err: any) => {
        console.error('KPI load failed:', err);
        this.kpi = { status: 'Error', verificationPassRate: 0, totalRequests: 0, shreddedEvents: 0 };
      }
    });

    // Fetch AI anomaly data
    this.analytics.getAnomalies().subscribe({
      next: (data: any[]) => this.anomalies = data,
      error: (err: any) => {
        console.error('Anomalies load failed:', err);
        this.anomalies = [];
      }
    });

    // Fetch trend data
    this.analytics.getTrends().subscribe({
      next: (data: any[]) => {
        this.renderChart(data);
        this.loading.set(false);
      },
      error: (err: any) => {
        console.error('Trends load failed:', err);
        this.loading.set(false);
      }
    });
  }

  /**
   * Renders the dual-axis chart.
   * Parameter 'data' explicitly typed as any[] to satisfy compiler.
   */
  renderChart(data: any[]) {
    if (this.chart) this.chart.destroy();
    if (!this.trendChartRef) return;

    const labels = data.map((d: any) => d.date);
    const confidenceValues = data.map((d: any) => d.value);
    const volumeValues = data.map((d: any) => d.volume);

    const ctx = this.trendChartRef.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Avg Confidence Score',
            data: confidenceValues,
            borderColor: '#22d3ee', 
            backgroundColor: 'rgba(34, 211, 238, 0.1)',
            tension: 0.4,
            yAxisID: 'y',
          },
          {
            label: 'Decision Volume',
            data: volumeValues,
            borderColor: '#6b7280',
            backgroundColor: 'rgba(107, 114, 128, 0.4)',
            yAxisID: 'y1',
            type: 'bar',
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { labels: { color: '#fff', font: { family: 'Orbitron' } } }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            min: 0,
            max: 1,
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#9ca3af' }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: { color: '#4b5563' }
          },
          x: {
            ticks: { color: '#9ca3af' },
            grid: { display: false }
          }
        }
      }
    });
  }

  goBack() {
    this.router.navigate(['/hub']);
  }
}
