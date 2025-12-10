import { Component, inject, OnInit, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html'
})
export class AnalyticsComponent implements OnInit {
  private analytics = inject(AnalyticsService);
  private router = inject(Router);

  @ViewChild('trendChart') trendChartRef!: ElementRef;
  
  loading = signal(true);
  kpi: any = null;
  anomalies: any[] = [];
  chart: any;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading.set(true);
    
    this.analytics.getKpiStats().subscribe({
      next: (data) => this.kpi = data,
      error: () => this.kpi = { status: 'Error', average_confidence: 0, total_decisions: 0, anomaly_count: 0 }
    });

    this.analytics.getAnomalies().subscribe({
      next: (data) => this.anomalies = data,
      error: () => this.anomalies = []
    });

    this.analytics.getTrends().subscribe({
      next: (data) => {
        this.renderChart(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  renderChart(data: any[]) {
    if (this.chart) this.chart.destroy();
    if (!this.trendChartRef) return;

    const labels = data.map(d => d.date);
    const confidenceValues = data.map(d => d.value);
    const volumeValues = data.map(d => d.volume);

    const ctx = this.trendChartRef.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Avg Confidence Score',
            data: confidenceValues,
            borderColor: '#00f0ff',
            backgroundColor: 'rgba(0, 240, 255, 0.1)',
            tension: 0.4,
            yAxisID: 'y',
          },
          {
            label: 'Decision Volume',
            data: volumeValues,
            borderColor: '#6b7280',
            yAxisID: 'y1',
            type: 'bar',
          }
        ]
      },
      options: {
        responsive: true,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { labels: { color: '#fff' } }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            min: 0,
            max: 1,
            grid: { color: 'rgba(255,255,255,0.1)' },
            ticks: { color: '#ccc' }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: { color: '#666' }
          },
          x: {
            ticks: { color: '#ccc' },
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
