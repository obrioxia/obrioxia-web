import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface ComplianceData {
    title: string;
    badge: string;
    description: string;
    keyRequirement: string;
    ourSolution: string;
    checklist: string[];
}

@Component({
    selector: 'app-compliance',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="min-h-screen pt-24 pb-20 relative">
        <div class="fixed inset-0 z-0 opacity-20 bg-grid-pattern [background-size:40px_40px] pointer-events-none"></div>

        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <!-- HEADER -->
            <div class="mb-16">
                <a routerLink="/pricing" class="text-obrioxia-muted hover:text-white text-sm mb-6 inline-block">&larr; Back to Pricing</a>
                <div class="inline-block px-3 py-1 mb-4 border border-obrioxia-cyan/30 rounded bg-obrioxia-cyan/5">
                    <span class="text-obrioxia-cyan text-xs font-bold font-orbitron">{{ content.badge }}</span>
                </div>
                <h1 class="font-orbitron text-4xl md:text-5xl text-white mb-6">{{ content.title }}</h1>
                <p class="text-xl text-obrioxia-text leading-relaxed">{{ content.description }}</p>
            </div>

            <!-- COMPARISON GRID -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div class="glass-panel p-8 rounded-xl border border-red-500/20">
                    <h3 class="font-orbitron text-red-400 mb-4 text-sm tracking-widest uppercase">The Requirement</h3>
                    <p class="text-white text-lg font-light">{{ content.keyRequirement }}</p>
                </div>
                <div class="glass-panel p-8 rounded-xl border border-obrioxia-green/20">
                    <h3 class="font-orbitron text-obrioxia-green mb-4 text-sm tracking-widest uppercase">The Obrioxia Solution</h3>
                    <p class="text-white text-lg font-light">{{ content.ourSolution }}</p>
                </div>
            </div>

            <!-- CHECKLIST -->
            <div class="glass-panel p-10 rounded-2xl border border-white/5">
                <h3 class="font-orbitron text-white text-xl mb-8">Compliance Mapping</h3>
                <div class="grid grid-cols-1 gap-4">
                    <div *ngFor="let item of content.checklist" class="flex items-start p-4 bg-white/5 rounded-lg border border-white/5">
                        <div class="min-w-[24px] h-6 rounded-full bg-obrioxia-green/20 flex items-center justify-center text-obrioxia-green text-xs mr-4 mt-0.5">✓</div>
                        <span class="text-gray-300 text-sm">{{ item }}</span>
                    </div>
                </div>
                <div class="mt-8 pt-8 border-t border-white/10 text-center">
                    <a routerLink="/contact" class="inline-block px-8 py-3 bg-obrioxia-cyan text-obrioxia-base font-orbitron font-bold rounded hover:bg-[#80F7FF] transition-colors">
                        DOWNLOAD FULL REPORT
                    </a>
                </div>
            </div>

        </div>
    </div>
  `
})
export class ComplianceComponent implements OnInit {
    content!: ComplianceData;

    dataMap: Record<string, ComplianceData> = {
        'eu-ai-act': {
            title: 'Article 12 Readiness',
            badge: 'REGULATION (EU) 2024/1689',
            description: 'The world\'s first comprehensive AI law classifies systems by risk. Obrioxia automates Article 12 "Record-Keeping" obligations for High-Risk AI systems.',
            keyRequirement: 'Article 12: "High-risk AI systems shall technically allow for the automatic recording of events (logs) over their lifetime... to ensure traceability of the system’s functioning."',
            ourSolution: 'Obrioxia provides "Readiness-in-a-Box" for Article 12. We auto-log every inference with millisecond timestamps and hash-chaining to evidence traceability without human intervention.',
            checklist: [
                'Automatic recording of events (logs) while the high-risk AI system is operating',
                'Identification of situations that may result in the AI system presenting a risk',
                'Substantial modification detection via hash-chain verification',
                '7-Year Retention Policy (configurable via Enterprise settings)'
            ]
        },
        'gdpr': {
            title: 'GDPR & Right to Explanation',
            badge: 'DATA PRIVACY',
            description: 'Under GDPR, automated decision-making requires meaningful information about the logic involved. You cannot explain what you did not record.',
            keyRequirement: 'Article 22 & Recital 71: The data subject has the right to obtain an explanation of the decision reached after automated processing.',
            ourSolution: 'Our ledger records the state of the AI agent at the moment of decision. By logging the prompt context and model version, you can reproduce the output to satisfy Data Subject Access Requests (DSARs).',
            checklist: [
                'Article 13-15: Right to access information about logic involved',
                'Article 30: Records of processing activities',
                'Data Minimization: We hash sensitive PII before storage where possible',
                'Tamper-Evident Audit Trail for Consent Management'
            ]
        },
        'soc2': {
            title: 'SOC 2 Type II',
            badge: 'SECURITY AUDIT',
            description: 'Service Organization Control (SOC) 2 requires companies to establish and follow strict information security policies.',
            keyRequirement: 'Common Criteria 3.2: The entity monitors internal and external system components to identify anomalies that are indicative of unauthorized access.',
            ourSolution: 'Obrioxia acts as your external monitor. Our tamper-evident logs provide the evidentiary trail required by auditors to prove that your AI systems were not tampered with during the audit window.',
            checklist: [
                'CC2.1: System description and boundaries verified by logs',
                'CC5.2: Anomaly detection alerts sent to Slack/Email',
                'CC6.1: Logical access security logs',
                'Change Management tracking for Model Weights'
            ]
        },
        'iso42001': {
            title: 'ISO/IEC 42001',
            badge: 'AI MANAGEMENT SYSTEM',
            description: 'The international standard for Artificial Intelligence Management Systems (AIMS).',
            keyRequirement: 'Control A.9.2: Data Management. You must ensure the quality, integrity, and provenance of data used by AI systems.',
            ourSolution: 'We provide cryptographic provenance. You can evidence exactly which data inputs led to which model outputs, ensuring end-to-end traceability from training to inference.',
            checklist: [
                'A.4.2: AI Impact Assessment logging',
                'A.9.2: Data lineage and integrity verification',
                'A.6.1: Risk management documentation',
                'Continuous monitoring of system performance'
            ]
        }
    };

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            const type = data['type'] as string;
            this.content = this.dataMap[type] || this.dataMap['eu-ai-act'];
        });
    }
}

