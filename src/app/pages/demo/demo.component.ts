import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './demo.component.html'
})
export class DemoComponent {
  // Logic for the demo environment can go here later
  isLoading = false;
}
