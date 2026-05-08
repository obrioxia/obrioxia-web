import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { finalize, timeout } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center p-4 pt-28 pb-20">
      <div class="w-full max-w-2xl space-y-6">

        <!-- Explanation panel -->
        <div class="glass-panel p-6 rounded-xl border border-white/10 text-center">
          <h2 class="text-3xl text-white font-orbitron mb-3">Try the Obrioxia <span class="text-obrioxia-cyan">demo</span></h2>
          <p class="text-gray-400 text-sm mb-5">
            Create an account, then use your demo key to enter the audit environment.
          </p>
          <div class="flex flex-wrap justify-center gap-3 text-xs">
            <span class="px-3 py-1 rounded-full bg-obrioxia-cyan/10 border border-obrioxia-cyan/30 text-obrioxia-cyan font-orbitron">1. Create account</span>
            <span class="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 font-orbitron">2. Verify email if prompted</span>
            <span class="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 font-orbitron">3. Get your demo key</span>
            <span class="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 font-orbitron">4. Enter demo environment</span>
            <span class="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 font-orbitron">5. Explore the audit engine</span>
          </div>
        </div>

        <!-- Success state -->
        <div *ngIf="successMessage" class="glass-panel p-8 rounded-xl border border-green-500/30 space-y-4">
          <h3 class="text-green-400 font-orbitron text-xl text-center">Account created.</h3>

          <!-- Key received -->
          <div *ngIf="demoKey" class="space-y-4">
            <p class="text-gray-300 text-sm text-center">Your demo key is ready. Copy it and paste it on the demo access screen.</p>

            <div class="flex items-center gap-2 bg-black/50 border border-white/10 rounded p-3">
              <code class="flex-1 text-obrioxia-cyan font-mono text-lg tracking-wider text-center">{{ demoKey }}</code>
              <button (click)="copyKey()" class="px-3 py-1 bg-white/10 border border-white/20 text-white text-xs font-orbitron rounded hover:bg-white/20 transition-all">
                {{ copied ? 'COPIED' : 'COPY' }}
              </button>
            </div>

            <a href="https://demo.obrioxia.com/demo-gate" class="block w-full py-4 bg-obrioxia-cyan text-black font-bold text-center rounded hover:bg-cyan-400 transition-all font-orbitron shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              OPEN DEMO ENVIRONMENT
            </a>

            <p class="text-gray-500 text-xs text-center">Paste this key on the demo access screen to unlock the environment.</p>
          </div>

          <!-- Key not received -->
          <div *ngIf="!demoKey" class="space-y-4">
            <p class="text-gray-300 text-sm text-center">{{ successMessage }}</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a routerLink="/login" class="block py-3 bg-white/10 border border-white/20 text-white font-bold text-center rounded hover:bg-white/20 transition-all font-orbitron text-sm">
                LOG IN
              </a>
              <a href="https://demo.obrioxia.com/demo-gate" class="block py-3 bg-obrioxia-cyan text-black font-bold text-center rounded hover:bg-cyan-400 transition-all font-orbitron text-sm">
                OPEN DEMO ENVIRONMENT
              </a>
            </div>
          </div>

          <p *ngIf="emailHint" class="text-gray-500 text-xs text-center">Check your email if verification is requested.</p>
        </div>

        <!-- Signup form -->
        <div *ngIf="!successMessage" class="glass-panel p-8 rounded-xl border border-white/10">
          <form (ngSubmit)="onSubmit()" #f="ngForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-orbitron text-gray-500 mb-1">FULL NAME</label>
                <input [(ngModel)]="data.fullName" name="fullName" required class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
              </div>
              <div>
                <label class="block text-xs font-orbitron text-gray-500 mb-1">WORK EMAIL</label>
                <input [(ngModel)]="data.email" name="email" type="email" required class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-orbitron text-gray-500 mb-1">COMPANY NAME</label>
                <input [(ngModel)]="data.companyName" name="companyName" required class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
              </div>
              <div>
                <label class="block text-xs font-orbitron text-gray-500 mb-1">WEBSITE</label>
                <input [(ngModel)]="data.companyWebsite" name="companyWebsite" required class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                <label class="block text-xs font-orbitron text-gray-500 mb-1">PHONE</label>
                <input [(ngModel)]="data.phone" name="phone" class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
              </div>
              <div>
                <label class="block text-xs font-orbitron text-gray-500 mb-1">COUNTRY</label>
                <input [(ngModel)]="data.country" name="country" required class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-orbitron text-gray-500 mb-1">PASSWORD</label>
                <input [(ngModel)]="data.password" name="password" type="password" required minlength="8" class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
                <p class="text-gray-600 text-xs mt-1">Use at least 8 characters and 1 number.</p>
              </div>
              <div>
                <label class="block text-xs font-orbitron text-gray-500 mb-1">CONFIRM PASSWORD</label>
                <input [(ngModel)]="confirmPassword" name="confirmPassword" type="password" required class="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-obrioxia-cyan outline-none">
              </div>
            </div>
            
            <div class="space-y-2 pt-2">
               <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" [(ngModel)]="data.businessUseConfirmed" name="biz" required class="accent-obrioxia-cyan">
                <span class="text-xs text-gray-400">I confirm this is for business use</span>
              </label>
            </div>

            <div *ngIf="errorMessage" class="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm text-center font-bold">{{ errorMessage }}</div>

            <button type="submit" [disabled]="loading() || !f.valid" class="w-full py-4 bg-obrioxia-cyan text-black font-bold font-orbitron rounded hover:bg-obrioxia-cyan/90 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              {{ loading() ? 'INITIALIZING SECURE ACCOUNT...' : 'CREATE ACCOUNT' }}
            </button>
          </form>

          <!-- Recovery / navigation links -->
          <div class="mt-6 pt-6 border-t border-white/10 space-y-2 text-center">
            <p class="text-gray-500 text-xs">
              Already have an account? <a routerLink="/login" class="text-white hover:text-obrioxia-cyan transition-colors">Log in</a>
            </p>
            <p class="text-gray-500 text-xs">
              Forgot password? <a routerLink="/forgot-password" class="text-white hover:text-obrioxia-cyan transition-colors">Reset it</a>
            </p>
            <p class="text-gray-500 text-xs">
              Already have a demo key? <a href="https://demo.obrioxia.com/demo-gate" class="text-obrioxia-cyan hover:underline">Open demo environment</a>
            </p>
          </div>
        </div>

      </div>
    </div>
  `
})
export class SignupComponent {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private http = inject(HttpClient);

  loading = signal(false);

  data = {
    fullName: '',
    email: '',
    companyName: '',
    companyWebsite: '',
    phone: '',
    country: '',
    password: '',
    businessUseConfirmed: false
  };
  confirmPassword = '';
  successMessage = '';
  errorMessage = '';
  demoKey = '';
  emailHint = '';
  copied = false;

  copyKey() {
    if (this.demoKey) {
      navigator.clipboard.writeText(this.demoKey).then(() => {
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
      });
    }
  }

  async onSubmit() {
    // Client-side password validation
    if (this.data.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters.';
      return;
    }
    if (!/\d/.test(this.data.password)) {
      this.errorMessage = 'Password must contain at least 1 number.';
      return;
    }
    if (this.data.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.loading.set(true);
    this.errorMessage = '';

    try {
      // 1. Firebase Auth Step
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.data.email,
        this.data.password
      );

      const user = userCredential.user;

      if (user) {
        await updateProfile(user, {
          displayName: this.data.fullName
        });

        // Background save to Firestore (non-blocking)
        setDoc(doc(this.firestore, 'users', user.uid), {
          uid: user.uid,
          email: this.data.email,
          fullName: this.data.fullName,
          company: this.data.companyName,
          website: this.data.companyWebsite,
          phone: this.data.phone,
          country: this.data.country,
          createdAt: new Date().toISOString(),
          accountType: 'demo_user'
        }).catch(err => console.error("DB Background Save Error:", err));

        // 2. Get Firebase ID token for authenticated backend call
        const idToken = await user.getIdToken();

        // 3. Request demo key — send Bearer token only, never the password
        const handshakeUrl = `${environment.backendUrl}/api/demo/request-key`;

        this.http.post(handshakeUrl, {}, {
          headers: { 'Authorization': `Bearer ${idToken}` }
        })
          .pipe(
            timeout(10000),
            finalize(() => this.loading.set(false))
          )
          .subscribe({
            next: (res: any) => {
              if (res.key) {
                // Backend returned the full key
                this.demoKey = res.key;
                this.successMessage = 'Account created.';
              } else if (res.key_hint) {
                // Backend returned only a hint — key was emailed
                this.emailHint = this.data.email;
                this.successMessage = `Your demo key has been sent to ${this.data.email}. Check your inbox.`;
              } else {
                this.successMessage = 'Account created. Log in or continue to request your demo key.';
              }
            },
            error: (err) => {
              console.error("Demo key request failed:", err);
              this.successMessage = 'Account created. Log in or continue to request your demo key.';
            }
          });
      }

    } catch (err: any) {
      console.error("Registration Error:", err);
      this.loading.set(false);

      if (err.code === 'auth/email-already-in-use') {
        this.errorMessage = "This email is already registered. Try logging in instead.";
      } else if (err.code === 'auth/weak-password') {
        this.errorMessage = "Password is too weak. Use at least 8 characters and 1 number.";
      } else {
        this.errorMessage = "Registration failed: " + err.message;
      }
    }
  }
}
