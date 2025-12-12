import { Routes } from '@angular/router';

// Guards
import { authGuard } from './core/guards/auth.guard';
import { protectedRouteGuard } from './core/guards/protected-route.guard';

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

// NEW Component Import
import { DemoSignupComponent } from './pages/demo-signup/demo-signup.component';

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

  // --- NEW DEMO SIGN-UP ROUTE ---
  // This is the page we link to from the Header
  { path: 'demo-signup', component: DemoSignupComponent },

  // Hub / App Routes (Protected)
  { path: 'hub', component: HubComponent, canActivate: [authGuard, protectedRouteGuard] },
  { path: 'hub/logger', component: LoggerComponent, canActivate: [authGuard, protectedRouteGuard] },
  { path: 'hub/verifier', component: VerifierComponent, canActivate: [authGuard, protectedRouteGuard] },
  { path: 'hub/shredder', component: ShredderComponent, canActivate: [authGuard, protectedRouteGuard] },
  { path: 'hub/analytics', component: AnalyticsComponent, canActivate: [authGuard, protectedRouteGuard] },

  // Dashboard Module (Lazy Loaded)
  { 
    path: 'dashboard', 
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [authGuard] 
  },

  // Catch-all
  { path: '**', redirectTo: '' }
];
