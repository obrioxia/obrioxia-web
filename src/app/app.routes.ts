import { Routes } from '@angular/router';
import { protectedRouteGuard } from './core/guards/protected-route.guard';
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
import { LoginComponent } from './pages/auth/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'upgrade', component: PricingComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'trust-center', component: TrustCenterComponent },
  { path: 'compliance/eu-ai-act', component: EuAiActComponent },
  { path: 'compliance/iso-42001', component: Iso42001Component },
  { path: 'compliance/insurance-automotive', component: InsuranceComponent },
  
  // Auth
  { path: 'login', component: LoginComponent },

  // 🔒 Protected Routes (Requires Firebase Auth + Whitelist)
  { 
    path: 'hub', 
    component: HubComponent, 
    canActivate: [protectedRouteGuard] 
  },
  { 
    path: 'hub/logger', 
    component: LoggerComponent, 
    canActivate: [protectedRouteGuard] 
  },
  { 
    path: 'hub/verifier', 
    component: VerifierComponent, 
    canActivate: [protectedRouteGuard] 
  },
  { 
    path: 'hub/shredder', 
    component: ShredderComponent, 
    canActivate: [protectedRouteGuard] 
  },
  
  { path: '**', redirectTo: '' }
];
