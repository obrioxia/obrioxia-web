import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // PUBLIC ROUTES
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'features', loadComponent: () => import('./pages/features/features.component').then(m => m.FeaturesComponent) },
  { path: 'pricing', loadComponent: () => import('./pages/pricing/pricing.component').then(m => m.PricingComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'docs', loadComponent: () => import('./pages/docs/docs.component').then(m => m.DocsComponent) },

  // AUTH ROUTES
  { path: 'login', loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent) },

  // PROTECTED ROUTES (THE HUB)
  { 
    path: 'hub', 
    loadComponent: () => import('./pages/hub/hub.component').then(m => m.HubComponent),
    canActivate: [authGuard]
  },

  // INDUSTRY ROUTES
  { path: 'industries/automotive', loadComponent: () => import('./pages/industry/industry.component').then(m => m.IndustryComponent), data: { type: 'automotive' } },
  { path: 'industries/insurance', loadComponent: () => import('./pages/industry/industry.component').then(m => m.IndustryComponent), data: { type: 'insurance' } },
  { path: 'industries/healthcare', loadComponent: () => import('./pages/industry/industry.component').then(m => m.IndustryComponent), data: { type: 'healthcare' } },

  // COMPLIANCE ROUTES
  { path: 'compliance/eu-ai-act', loadComponent: () => import('./pages/compliance/compliance.component').then(m => m.ComplianceComponent), data: { type: 'eu-ai-act' } },
  { path: 'compliance/gdpr', loadComponent: () => import('./pages/compliance/compliance.component').then(m => m.ComplianceComponent), data: { type: 'gdpr' } },
  { path: 'compliance/soc2', loadComponent: () => import('./pages/compliance/compliance.component').then(m => m.ComplianceComponent), data: { type: 'soc2' } },
  { path: 'compliance/iso42001', loadComponent: () => import('./pages/compliance/compliance.component').then(m => m.ComplianceComponent), data: { type: 'iso42001' } },

  { path: '**', redirectTo: '' }
];
