import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { protectedRouteGuard } from './core/guards/protected-route.guard';
import { HomeComponent } from './pages/home/home.component';
import { FeaturesComponent } from './pages/features/features.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { HubComponent } from './pages/hub/hub.component';
import { LoggerComponent } from './pages/hub/logger/logger.component';
import { VerifierComponent } from './pages/hub/verifier/verifier.component';
import { ShredderComponent } from './pages/hub/shredder/shredder.component';
import { AnalyticsComponent } from './pages/hub/analytics/analytics.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { VerifyEmailComponent } from './pages/auth/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'pricing', component: PricingComponent },
  
  // Auth Routes
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  // Hub Routes (Protected)
  { path: 'hub', component: HubComponent, canActivate: [authGuard, protectedRouteGuard] },
  { path: 'hub/logger', component: LoggerComponent, canActivate: [authGuard, protectedRouteGuard] },
  { path: 'hub/verifier', component: VerifierComponent, canActivate: [authGuard, protectedRouteGuard] },
  { path: 'hub/shredder', component: ShredderComponent, canActivate: [authGuard, protectedRouteGuard] },
  { path: 'hub/analytics', component: AnalyticsComponent, canActivate: [authGuard, protectedRouteGuard] },

  { path: '**', redirectTo: '' }
];
