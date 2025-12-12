import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demo-gate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-obrioxia-base flex items-center justify-center p-4 pt-20">
      <div class="w-full max-w-md">
        
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-obrioxia-cyan/10 rounded-xl border border-obrioxia-cyan/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
            <svg class="w-8 h-8 text-obrioxia-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
          </div>
          <h1 class="text-3xl text-white font-orbitron mb-2">Live Demo <span class="text-obrioxia-cyan">Access</span></h1>
          <p class="text-gray-400 text-sm">Enter your credentials to access the sandbox environment.</p>
        </div>

        <div class="glass-panel p-8 rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-sm shadow-2xl">
          <form [formGroup]="gateForm" (ngSubmit)="onSubmit()" class="space-y-5">
            
            <div>
              <label class="block text-xs text-gray-400 font-orbitron uppercase tracking-wider mb-2">Full Name</label>
              <input formControlName="fullName" type="text" 
                class="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-obrioxia-cyan focus:ring-1 focus:ring-obrioxia-cyan focus:outline-none transition-all placeholder-gray-600"
                placeholder="Ex. Sarah Connor">
            </div>

            <div>
              <label class="block text-xs text-gray-400 font-orbitron uppercase tracking-wider mb-2">Company Name</label>
              <input formControlName="company" type="text" 
                class="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-obrioxia-cyan focus:ring-1 focus:ring-obrioxia-cyan focus:outline-none transition-all placeholder-gray-600"
                placeholder="Ex. Cyberdyne Systems">
            </div>

            <div>
              <label class="block text-xs text-gray-400 font-orbitron uppercase tracking-wider mb-2">Work Email</label>
              <input formControlName="email" type="email" 
                class="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-obrioxia-cyan focus:ring-1 focus:ring-obrioxia-cyan focus:outline-none transition-all placeholder-gray-600"
                placeholder="name@company.com">
            </div>

            <div>
              <label class="block text-xs text-gray-400 font-orbitron uppercase tracking-wider mb-2">Phone Number</label>
              <input formControlName="phone" type="tel" 
                class="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-obrioxia-cyan focus:ring-1 focus:ring-obrioxia-cyan focus:outline-none transition-all placeholder-gray-600"
                placeholder="+1 (555) 000-0000">
            </div>

            <div class="flex items-start pt-2">
              <div class="flex items-center h-5">
                <input formControlName="consent" id="consent" type="checkbox" 
                  class="w-4 h-4 rounded border-gray-700 bg-gray-800 text-obrioxia-cyan focus:ring-obrioxia-cyan focus:ring-offset-gray-900">
              </div>
              <div class="ml-3 text-sm">
                <label for="consent" class="text-gray-400">I agree to receive communications regarding the Obrioxia demo and platform updates.</label>
              </div>
            </div>

            <button type="submit" 
              [disabled]="gateForm.invalid"
              class="w-full py-4 mt-6 bg-obrioxia-cyan text-black font-bold font-orbitron rounded-lg hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide">
              Initialize Session
            </button>

          </form>
        </div>

        <p class="text-center text-gray-500 text-xs mt-8">
          Secured by Obrioxia Audit Engine v3.9
        </p>

      </div>
    </div>
  `
})
export class DemoGateComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  gateForm: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    company: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    consent: [false, Validators.requiredTrue]
  });

  onSubmit() {
    if (this.gateForm.valid) {
      // 1. Set the access flag in LocalStorage
      localStorage.setItem('obrioxia_demo_access_granted', 'true');

      // 2. Redirect to the Demo environment
      this.router.navigate(['/demo']);
    }
  }
}
