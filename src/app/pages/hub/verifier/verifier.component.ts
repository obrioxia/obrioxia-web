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
  result = signal<any | null>(null);

  /**
   * Handles JSON Evidence file upload.
   * Silent logic: No popups, only UI state changes.
   */
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const rawContent = e.target.result as string;
      try {
        const json = JSON.parse(rawContent);
        
        let extractedHash = '';
        if (typeof json === 'string') {
          extractedHash = json;
        } else {
          extractedHash = 
            json.current_hash || 
            json.decision_id || 
            json.receipt?.current_hash || 
            json.value?.current_hash;
        }

        if (extractedHash) {
          this.hashToVerify = extractedHash;
          this.verify(); 
        }
      } catch (err) {
        // Raw string fallback
        const fallbackHash = rawContent.trim();
        if (fallbackHash.length > 10) {
          this.hashToVerify = fallbackHash;
          this.verify();
        }
      }
    };
    reader.readAsText(file);
  }

  verify() {
    if (!this.hashToVerify) return;
    this.loading.set(true);
    this.result.set(null); 
    this.audit.verifyHash(this.hashToVerify.trim()).subscribe({
      next: (res) => {
        this.result.set(res); // Success card appears in template
        this.loading.set(false);
      },
      error: (err) => {
        this.result.set({ valid: false, error: true });
        this.loading.set(false);
      }
    });
  }

  goBack() { this.router.navigate(['/hub']); }
}
