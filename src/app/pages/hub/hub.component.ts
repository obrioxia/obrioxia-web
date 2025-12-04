import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hub.component.html'
})
export class HubComponent {
  auth = inject(AuthService);
  route = inject(ActivatedRoute);
  
  paymentSuccess = false;

  constructor() {
    this.route.queryParams.subscribe(params => {
      if (params['payment'] === 'success') {
        this.paymentSuccess = true;
      }
    });
  }
}
