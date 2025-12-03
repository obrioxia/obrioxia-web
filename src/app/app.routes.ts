import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { HubComponent } from './pages/hub/hub.component';
import { LoggerComponent } from './pages/hub/logger/logger.component';
import { VerifierComponent } from './pages/hub/verifier/verifier.component';
import { ShredderComponent } from './pages/hub/shredder/shredder.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hub', component: HubComponent, canActivate: [authGuard] },
  { path: 'hub/logger', component: LoggerComponent, canActivate: [authGuard] },
  { path: 'hub/verifier', component: VerifierComponent, canActivate: [authGuard] },
  { path: 'hub/shredder', component: ShredderComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];


