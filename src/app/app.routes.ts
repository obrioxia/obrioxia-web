import { Routes } from '@angular/router';

// Guards
import { authGuard } from './core/guards/auth.guard';
import { protectedRouteGuard } from './core/guards/protected-route.guard';
import { demoGuard } from './core/guards/demo.guard';

// Components
import { HomeComponent } from './pages/home/home.component';
import { FeaturesComponent } from './pages/features/features.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { HubComponent } from './pages/hub/hub.component';
import { LoggerComponent } from './pages/hub/logger/logger.component';
import { VerifierComponent } from './pages/hub/verifier/verifier.component';
import { ShredderComponent } from './pages/hub/shredder/shredder.component';
import { AnalyticsComponent } from './pages/hub/analytics/analytics.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { TrustCenterComponent } from './pages/trust-center/trust-center.component';
import { EuAiActComponent } from './pages/compliance/eu-ai-act/eu-ai-act.component';
import { Iso42001Component } from './pages/compliance/iso-42001/iso-42001.component';
import { InsuranceComponent } from './pages/compliance/insurance/insurance.component';
import { TermsComponent } from './pages/terms/terms.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { VerifyEmailComponent } from './pages/auth/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';

// Demo Components
import { DemoComponent } from './pages/demo/demo.component';
import { DemoGateComponent } from './pages/demo-gate/demo-gate.component';
import { DemoTermsComponent } from './pages/demo/demo-terms.component';
import { DemoPrivacyComponent } from './pages/demo/demo-privacy.component';
import { DemoDataDisclaimerComponent } from './pages/demo/demo-data-disclaimer.component';

export const routes: Routes = [
  // Main Public Pages
  { path: '', component: HomeComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'upgrade', component: PricingComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'trust-center', component: TrustCenterComponent },

  // Compliance Pages
  { path: 'compliance/eu-ai-act', component: EuAiActComponent },
  { path: 'compliance/iso-42001', component: Iso42001Component },
  { path: 'compliance/insurance-automotive', component: InsuranceComponent },

  // Legal
  { path: 'terms-of-service', component: TermsComponent },
  { path: 'privacy-policy', component: PrivacyComponent },

  // Auth
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  // --- DEMO ROUTES ---

  // 1. The Sign-Up Page (Public) points to Full Form
  { path: 'demo-signup', component: SignupComponent },

  // 2. The Gate (Public - Where they enter the key)
  { path: 'demo-gate', component: DemoGateComponent },

  // 3. The Actual Demo (PROTECTED by demoGuard)
  {
    path: 'demo',
    component: DemoComponent,
    canActivate: [demoGuard]
  },

  // Hub / App Routes (Protected)
  { path: 'hub', component: HubComponent, canActivate: [authGuard, protectedRouteGuard] },
  { path: 'hub/logger', component: LoggerComponent, canActivate: [authGuard, protectedRouteGuard] },
  { path: 'hub/verifier', component: VerifierComponent, canActivate: [authGuard, protectedRouteGuard] },
  { path: 'hub/shredder', component: ShredderComponent, canActivate: [authGuard, protectedRouteGuard] },
  { path: 'hub/analytics', component: AnalyticsComponent, canActivate: [authGuard, protectedRouteGuard] },

  // ✅ FIXED DASHBOARD ROUTE (The Build Saver)
  // Replaced broken module import with direct Component loading
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },

  // Demo Legal Pages
  { path: 'demo/terms', component: DemoTermsComponent, canActivate: [demoGuard] },
  { path: 'demo/privacy', component: DemoPrivacyComponent, canActivate: [demoGuard] },
  { path: 'demo/data-disclaimer', component: DemoDataDisclaimerComponent, canActivate: [demoGuard] },

  // Catch-all
  { path: '**', redirectTo: '' }
];
