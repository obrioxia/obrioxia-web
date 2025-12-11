import { Component, OnInit } from '@angular/core';
import { DashboardAnalyticsService } from './services/analytics.service';
import { DashboardMetrics, LogEntry } from './models/analytics.models';
import { ChartConfiguration, ChartOptions, Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false // <--- THIS IS THE KEY FIX
})
export class DashboardComponent implements OnInit {
  metrics: DashboardMetrics | null = null;
  logs: LogEntry[] = [];
  isLoading = true;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Requests',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(0,0,0,0.1)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = { responsive: true };

  constructor(private analyticsService: DashboardAnalyticsService) {
    // Registers chart components to prevent blank graphs
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.analyticsService.getMetrics().subscribe({
      next: (data) => {
        this.metrics = data;
        this.isLoading = false;
      },
      error: (err) => console.error('Dashboard data load failed:', err)
    });

    this.analyticsService.getLogs().subscribe({
      next: (data) => this.logs = data
    });
  }
}
