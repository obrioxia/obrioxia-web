import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { FeaturesComponent } from './pages/features/features.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { HubComponent } from './pages/hub/hub.component';
import { LoggerComponent } from './pages/hub/logger/logger.component';
import { VerifierComponent } from './pages/hub/verifier/verifier.component';
import { ShredderComponent } from './pages/hub/shredder/shredder.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { TrustCenterComponent } from './pages/trust-center/trust-center.component';
import { EuAiActComponent } from './pages/compliance/eu-ai-act/eu-ai-act.component';
import { Iso42001Component } from './pages/compliance/iso-42001/iso-42001.component';
import { InsuranceComponent } from './pages/compliance/insurance/insurance.component';

// Auth Pages
import { SignupComponent } from './pages/auth/signup/signup.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { VerifyEmailComponent } from './pages/auth/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'trust-center', component: TrustCenterComponent },
  { path: 'compliance/eu-ai-act', component: EuAiActComponent },
  { path: 'compliance/iso-42001', component: Iso42001Component },
  { path: 'compliance/insurance-automotive', component: InsuranceComponent },
  
  // Auth Routes
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  // Protected Hub Routes
  { path: 'hub', component: HubComponent, canActivate: [authGuard] },
  { path: 'hub/logger', component: LoggerComponent, canActivate: [authGuard] },
  { path: 'hub/verifier', component: VerifierComponent, canActivate: [authGuard] },
  { path: 'hub/shredder', component: ShredderComponent, canActivate: [authGuard] },
  
  { path: '**', redirectTo: '' }
];
