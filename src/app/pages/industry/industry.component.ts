import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface IndustryContent {
  title: string;
  subtitle: string;
  heroBadge: string;
  challenge: string;
  solution: string;
  stat: string;
  statLabel: string;
  useCaseTitle: string;
  useCaseDesc: string;
  complianceList: string[];
}

@Component({
  selector: 'app-industry',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-obrioxia-base pt-24 pb-20 relative overflow-hidden">
        <!-- Dynamic Background -->
        <div class="absolute inset-0 z-0 opacity-20 bg-grid-pattern [background-size:40px_40px] pointer-events-none"></div>
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-obrioxia-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <!-- HERO SECTION -->
            <div class="mb-24">
                <div class="inline-block px-3 py-1 mb-6 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
                    <span class="text-white text-xs font-bold tracking-[0.2em] font-orbitron uppercase">{{ content.heroBadge }}</span>
                </div>
                <h1 class="font-orbitron text-4xl md:text-6xl text-white mb-6 max-w-4xl leading-tight">
                    {{ content.title }}
                </h1>
                <p class="text-obrioxia-text text-xl font-light max-w-2xl leading-relaxed">
                    {{ content.subtitle }}
                </p>
            </div>

            <!-- GRID SECTION -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
                
                <!-- Left: The Challenge & Solution -->
                <div>
                    <div class="mb-12">
                        <h3 class="font-orbitron text-xl text-obrioxia-muted mb-4">THE RISK</h3>
                        <p class="text-white text-lg leading-relaxed border-l-2 border-red-500/50 pl-6">
                            {{ content.challenge }}
                        </p>
                    </div>
                    <div>
                        <h3 class="font-orbitron text-xl text-obrioxia-muted mb-4">THE OBRIOXIA FIX</h3>
                        <p class="text-white text-lg leading-relaxed border-l-2 border-obrioxia-cyan pl-6">
                            {{ content.solution }}
                        </p>
                    </div>
                </div>

                <!-- Right: Stat Card & Compliance -->
                <div class="space-y-8">
                    <!-- Stat Card -->
                    <div class="glass-panel p-8 rounded-xl border border-obrioxia-cyan/30 bg-obrioxia-cyan/5">
                        <div class="font-orbitron text-5xl md:text-6xl font-bold text-white mb-2">{{ content.stat }}</div>
                        <div class="text-obrioxia-cyan text-sm tracking-widest font-bold uppercase">{{ content.statLabel }}</div>
                    </div>

                    <!-- Compliance Standards -->
                    <div class="glass-panel p-8 rounded-xl border border-white/5">
                        <h4 class="font-orbitron text-sm text-gray-400 mb-6 uppercase tracking-wider">Related Standards</h4>
                        <div class="flex flex-wrap gap-3">
                            <span *ngFor="let std of content.complianceList" class="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs text-white font-mono">
                                {{ std }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- USE CASE DEEP DIVE -->
            <div class="glass-panel p-10 rounded-2xl border border-white/5 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-obrioxia-cyan/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                <h3 class="font-orbitron text-2xl text-white mb-4">{{ content.useCaseTitle }}</h3>
                <p class="text-obrioxia-text max-w-3xl leading-relaxed mb-8">
                    {{ content.useCaseDesc }}
                </p>
                <a href="mailto:hello@obrioxia.com?subject=Industry%20Demo%20Request" class="inline-flex items-center text-obrioxia-cyan font-bold hover:text-white transition-colors cursor-pointer">
                    SCHEDULE INDUSTRY DEMO <span class="ml-2">→</span>
                </a>
            </div>

        </div>
    </div>
  `
})
export class IndustryComponent implements OnInit {
  content!: IndustryContent;

  dataMap: Record<string, IndustryContent> = {
    'automotive': {
      heroBadge: 'ISO 26262 // AUTOMOTIVE',
      title: 'Black Box Recorders for Autonomous Fleets.',
      subtitle: 'Ensure liability protection for Level 3-5 autonomous vehicles with frame-by-frame decision logging.',
      challenge: 'In the event of an accident, how do you prove your perception model identified the pedestrian correctly but the control logic failed? Without immutable logs, liability is ambiguous.',
      solution: 'Obrioxia acts as a digital Flight Data Recorder. We hash every sensor input and control output in real-time. If a crash occurs, you have a cryptographically verifiable timeline of AI cognition.',
      stat: '< 10ms',
      statLabel: 'Latency Impact',
      useCaseTitle: 'Scenario: Highway Hand-off Failure',
      useCaseDesc: 'When a Level 3 vehicle hands control back to the driver, the exact millisecond of transfer determines legal fault. Obrioxia logs the "Request to Intervene" signal and the "Driver Torque Detected" event to an immutable ledger, settling disputes instantly.',
      complianceList: ['ISO 26262', 'UN R157', 'GDPR', 'NHTSA Standing Order']
    },
    'insurance': {
      heroBadge: 'INSURANCE & FINTECH',
      title: 'Defensible AI for Claims Automation.',
      subtitle: 'Automate claims rejection with the confidence that you can explain the "Why" to regulators.',
      challenge: 'Using LLMs to deny coverage is high-risk. If a customer sues for "Algorithmic Bias" under the EU AI Act, you must produce the exact prompt and reasoning chain used to make that decision.',
      solution: 'Every claim decision generates a PDF audit receipt linked to a hash on our ledger. You can prove exactly which policy document version the AI referenced when it made the denial.',
      stat: '100%',
      statLabel: 'Audit Readiness',
      useCaseTitle: 'Scenario: Algorithmic Bias Audit',
      useCaseDesc: 'An auditor flags a spike in rejections for a specific zip code. With Obrioxia, you can query all decisions for that region and replay the exact model inference to prove the rejections were based on flood data, not demographics.',
      complianceList: ['EU AI Act Art. 12', 'Solvency II', 'FCRA', 'CPRA']
    },
    'healthcare': {
      heroBadge: 'MEDTECH',
      title: 'Clinical Decision Support You Can Trust.',
      subtitle: 'Secure event logging for SaMD (Software as a Medical Device) and diagnostic AI agents.',
      challenge: 'Doctors override AI suggestions frequently. To retrain your model effectively—and safely—you need to know exactly what the model saw versus what the doctor saw.',
      solution: 'Obrioxia logs the image hash, the model prediction, and the physician\'s final action. This creates a "Golden Dataset" for retraining while protecting data integrity.',
      stat: 'AES-256',
      statLabel: 'Encryption',
      useCaseTitle: 'Scenario: Diagnostic Disagreement',
      useCaseDesc: 'An AI Radiologist flags a tumor. The human doctor dismisses it. Obrioxia logs both events. If a dispute arises later, you can prove the AI was correct at T-0, protecting the software vendor from liability while aiding root cause analysis.',
      complianceList: ['Data Privacy', 'GDPR', 'ISO 13485', 'Audit Ready']
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      const type = data['type'] as string;
      if (this.dataMap[type]) {
        this.content = this.dataMap[type];
      } else {
        this.content = this.dataMap['automotive'];
      }
    });
  }
}


