import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-docs',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="min-h-screen flex pt-20">
        
        <!-- SIDEBAR -->
        <div class="w-64 border-r border-white/5 hidden md:block fixed h-full overflow-y-auto bg-[#050B14]">
            <div class="p-6">
                <h3 class="font-orbitron text-xs font-bold text-obrioxia-cyan mb-6 tracking-widest">API REFERENCE</h3>
                <ul class="space-y-4 text-sm text-gray-400">
                    <li><a href="#" class="text-white font-bold">Introduction</a></li>
                    <li><a href="#" class="hover:text-white transition-colors">Authentication</a></li>
                    <li><a href="#" class="hover:text-white transition-colors">Log Event</a></li>
                    <li><a href="#" class="hover:text-white transition-colors">Verify Hash</a></li>
                    <li><a href="#" class="hover:text-white transition-colors">Get Receipt</a></li>
                </ul>
                <h3 class="font-orbitron text-xs font-bold text-obrioxia-cyan mt-8 mb-6 tracking-widest">SDKs</h3>
                <ul class="space-y-4 text-sm text-gray-400">
                    <li><a href="#" class="hover:text-white transition-colors">Python</a></li>
                    <li><a href="#" class="hover:text-white transition-colors">Node.js</a></li>
                    <li><a href="#" class="hover:text-white transition-colors">Go</a></li>
                </ul>
            </div>
        </div>

        <!-- MAIN CONTENT -->
        <div class="flex-1 md:ml-64 p-8 md:p-12 max-w-5xl">
            <div class="mb-12">
                <div class="inline-block px-2 py-1 mb-4 border border-obrioxia-cyan/30 rounded bg-obrioxia-cyan/5 text-[10px] text-obrioxia-cyan font-mono">v1.0.4</div>
                <h1 class="font-orbitron text-4xl text-white mb-6">Introduction</h1>
                <p class="text-obrioxia-text leading-relaxed text-lg mb-8">
                    The Obrioxia API allows you to programmatically log AI decisions to a tamper-evident ledger. All requests are cryptographically signed and timestamped upon receipt.
                </p>
                <div class="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-200 text-sm mb-8">
                    <strong>Pre-release:</strong> The API surface shown below reflects the current sandbox backend. Endpoint paths and auth requirements may change before general availability.
                </div>
            </div>

            <!-- ENDPOINT: LOG EVENT -->
            <div class="mb-16">
                <h2 class="font-orbitron text-2xl text-white mb-4 flex items-center">
                    <span class="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded mr-3 font-mono">POST</span>
                    /api/incidents
                </h2>
                <p class="text-gray-400 mb-6">Records a new decision event to the tamper-evident ledger. Returns a receipt with the current hash, previous hash, and timestamp.</p>
                
                <div class="bg-[#0d1117] rounded-xl border border-white/10 p-6 overflow-hidden">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-xs text-gray-500 font-mono">CURL REQUEST</span>
                    </div>
<pre class="font-mono text-sm text-gray-300 overflow-x-auto">
curl -X POST https://YOUR_BACKEND_URL/api/incidents \\
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{{ '{' }}
    "policyNumber": "OBX-2025-001",
    "incidentType": "Auto",
    "claimAmount": 12500,
    "decisionNotes": "Approved after manual review",
    "aiConfidenceScore": 0.87,
    "agentId": "claims-bot-01"
  {{ '}' }}'
</pre>
                </div>
            </div>

             <!-- ENDPOINT: VERIFY -->
            <div class="mb-16">
                <h2 class="font-orbitron text-2xl text-white mb-4 flex items-center">
                    <span class="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded mr-3 font-mono">POST</span>
                    /api/verify/
                </h2>
                <p class="text-gray-400 mb-6">Verifies a record hash against the tamper-evident chain. Returns the verification status and matching record details.</p>
                 <div class="bg-[#0d1117] rounded-xl border border-white/10 p-6 overflow-hidden">
<pre class="font-mono text-sm text-gray-300 overflow-x-auto">
{{ '{' }}
  "status": "VERIFIED",
  "timestamp": "2025-01-15T14:32:01Z",
  "policy_number": "OBX-2025-001",
  "is_shredded": false
{{ '}' }}
</pre>
                </div>
            </div>

        </div>
    </div>
  `
})
export class DocsComponent { }

