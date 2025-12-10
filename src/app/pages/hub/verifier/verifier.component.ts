import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuditService } from '../../../core/services/audit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verifier.component.html'
})
export class VerifierComponent {
  private audit = inject(AuditService);
  private router = inject(Router);

  hashToVerify = '';
  loading = signal(false);
  result: any = null;

  // Handle JSON File Upload
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const json = JSON.parse(e.target.result);
        if (json.current_hash) {
          this.hashToVerify = json.current_hash;
          this.verify(); // Auto-verify on upload
        } else {
          alert('Invalid Evidence File: Missing current_hash');
        }
      } catch (err) {
        alert('Error parsing JSON file');
      }
    };
    reader.readAsText(file);
  }

  verify() {
    if (!this.hashToVerify) return;
    this.loading.set(true);
    this.result = null;

    this.audit.verifyHash(this.hashToVerify.trim()).subscribe({
      next: (res) => {
        this.result = res;
        this.loading.set(false);
      },
      error: () => {
        this.result = { valid: false };
        this.loading.set(false);
      }
    });
  }

  goBack() {
    this.router.navigate(['/hub']);
  }
}
