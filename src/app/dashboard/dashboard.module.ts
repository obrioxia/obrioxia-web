import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts'; // <--- CHANGED: Import Directive directly

import { DashboardComponent } from './dashboard.component';
import { authGuard } from '../core/guards/auth.guard'; 

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,        // Fixes *ngIf, *ngFor, date pipe, slice pipe
    BaseChartDirective,  // Fixes charts for ng2-charts v5+
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
