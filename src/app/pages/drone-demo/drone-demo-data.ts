// Auto-generated from obrioxia-drone-demo prototype output.
// Source: generate_demo_data.py → real ObrioxiaMonitor chain + verifier results.
// Do not edit manually — regenerate from the prototype.

export const DRONE_DEMO_DATA: any = {
  "generated_at": "2026-03-20T21:00:00Z",
  "engine_version": "4.3-strict",
  "source": "obrioxia-drone-demo prototype",
  "scenarios": [
    {
      "id": "gps-degradation",
      "title": "GPS Degradation → Failsafe Landing",
      "role": "Operational accountability scenario",
      "description": "A drone experiences GPS signal degradation during a mission. The accountability sidecar declares degraded navigation substrate, records the drone\u2019s autonomous failsafe landing decision, and references flight telemetry. The proof-pack is exported and verified offline.",
      "verdict_explanation": "The chain is intact and every cryptographic link verifies. However, the system declared that its navigation evidence substrate degraded during the mission \u2014 GPS quality dropped from 100% to 15%. This is an honest declaration. The record stands, with the declared loss visible.",
      "chain": [
        { "event_family": "SYNC_EVENT", "event_type": "sidecar_sync", "drone_id": "DRONE-001", "decision_id": "839e814c", "entry_hash": "add9f4fb64cb2e0b", "previous_hash": "0000000000000000" },
        { "event_family": "MISSION_EVENT", "event_type": "mission_start", "drone_id": "DRONE-001", "mission_id": "MSN-0712CF10", "operator_id": "OPS-01", "decision_id": "51b665a6", "entry_hash": "d979c398f9d1d188", "previous_hash": "add9f4fb64cb2e0b" },
        { "event_family": "STATE_EVENT", "event_type": "takeoff", "drone_id": "DRONE-001", "mission_id": "MSN-0712CF10", "altitude_m": 50.0, "gps_quality": 1.0, "battery_pct": 98.0, "decision_id": "301dd506", "entry_hash": "90dfa0d5126ddc3e", "previous_hash": "d979c398f9d1d188" },
        { "event_family": "STATE_EVENT", "event_type": "nav_mode_change", "drone_id": "DRONE-001", "mission_id": "MSN-0712CF10", "nav_mode_before": "MISSION", "nav_mode_after": "CRUISE", "heading_deg": 90.0, "gps_quality": 1.0, "decision_id": "3b14d1e9", "entry_hash": "6a651e7f771158d1", "previous_hash": "90dfa0d5126ddc3e" },
        { "event_family": "TELEMETRY_REF_EVENT", "event_type": "telemetry_window", "drone_id": "DRONE-001", "mission_id": "MSN-0712CF10", "source_uri": "file:///var/drone/DRONE-001/telem/MSN-0712CF10/cruise.bin", "content_hash": "abb8776212dbab62", "decision_id": "80ff5422", "entry_hash": "e2b21d30eb85fa1f", "previous_hash": "6a651e7f771158d1" },
        { "event_family": "LOSS_EVENT", "event_type": "gps_degradation", "drone_id": "DRONE-001", "mission_id": "MSN-0712CF10", "sensor": "gps_receiver", "quality_before": 1.0, "quality_after": 0.15, "declared_impact": "Navigation position accuracy degraded. Telemetry references from this point forward reflect reduced position confidence. GPS quality dropped from 100% to 15%.", "decision_id": "e12e0491", "entry_hash": "f33c6e4f5f37737c", "previous_hash": "e2b21d30eb85fa1f" },
        { "event_family": "DECISION_EVENT", "event_type": "failsafe_land", "drone_id": "DRONE-001", "mission_id": "MSN-0712CF10", "reason": "GPS quality below failsafe threshold", "trigger": "gps_quality < 0.2", "nav_mode_before": "CRUISE", "nav_mode_after": "FAILSAFE_LAND", "gps_quality": 0.15, "decision_id": "5b650178", "entry_hash": "74087b22da845f52", "previous_hash": "f33c6e4f5f37737c" },
        { "event_family": "STATE_EVENT", "event_type": "landing", "drone_id": "DRONE-001", "mission_id": "MSN-0712CF10", "altitude_m": 0.0, "gps_quality": 0.15, "battery_pct": 93.5, "decision_id": "07fb6f6f", "entry_hash": "4f161b25a1e0d904", "previous_hash": "74087b22da845f52" },
        { "event_family": "TELEMETRY_REF_EVENT", "event_type": "telemetry_window", "drone_id": "DRONE-001", "mission_id": "MSN-0712CF10", "source_uri": "file:///var/drone/DRONE-001/telem/MSN-0712CF10/landing.bin", "content_hash": "43d9e4343beebfc6", "decision_id": "99b7a439", "entry_hash": "c0738a2065f3aad4", "previous_hash": "4f161b25a1e0d904" },
        { "event_family": "MISSION_EVENT", "event_type": "mission_complete", "drone_id": "DRONE-001", "mission_id": "MSN-0712CF10", "outcome": "failsafe_landing_completed", "gps_quality": 0.15, "decision_id": "d095a640", "entry_hash": "b3712d5556e4e1a1", "previous_hash": "c0738a2065f3aad4" }
      ],
      "verification": {
        "verdict": "VALID_WITH_DECLARED_LOSS",
        "chain_length": 10,
        "chain_intact": true,
        "checkpoint_valid": true,
        "signatures_checked": 10,
        "signatures_valid": 10,
        "loss_events": [
          { "index": 5, "event_type": "gps_degradation", "sensor": "gps_receiver", "quality_before": 1.0, "quality_after": 0.15, "declared_impact": "Navigation position accuracy degraded. Telemetry references from this point forward reflect reduced position confidence. GPS quality dropped from 100% to 15%." }
        ],
        "evidence_refs": 2,
        "evidence_present": 2,
        "evidence_absent_declared": 0,
        "evidence_absent_undeclared": 0,
        "details": ["Chain intact. Loss events declared degraded evidence substrate. Declared loss is honest; undeclared absence would not be."]
      }
    },
    {
      "id": "tampered-record",
      "title": "Tampered Decision Record",
      "role": "Integrity failure scenario",
      "description": "The same GPS degradation scenario runs, but after the events are sealed, someone modifies the failsafe decision record \u2014 changing the reason from \u2018GPS quality below failsafe threshold\u2019 to \u2018operator_requested\u2019. The verifier detects the hash mismatch.",
      "verdict_explanation": "The verifier recomputes the SHA-256 hash of each sealed record using the same canonical JSON algorithm as the original engine. The tampered record\u2019s recomputed hash does not match the stored entry_hash. The chain is broken \u2014 the record has been altered after sealing.",
      "chain": [
        { "event_family": "SYNC_EVENT", "event_type": "sidecar_sync", "drone_id": "DRONE-002", "decision_id": "5289fc17", "entry_hash": "ebe83e4aaf7c907f", "previous_hash": "0000000000000000" },
        { "event_family": "MISSION_EVENT", "event_type": "mission_start", "drone_id": "DRONE-002", "mission_id": "MSN-ABCA985E", "decision_id": "ca81a6ab", "entry_hash": "7bb4d17c8591afd6", "previous_hash": "ebe83e4aaf7c907f" },
        { "event_family": "STATE_EVENT", "event_type": "takeoff", "drone_id": "DRONE-002", "mission_id": "MSN-ABCA985E", "altitude_m": 50.0, "decision_id": "d9f4333c", "entry_hash": "8f012a01c807a9c1", "previous_hash": "7bb4d17c8591afd6" },
        { "event_family": "STATE_EVENT", "event_type": "nav_mode_change", "drone_id": "DRONE-002", "mission_id": "MSN-ABCA985E", "nav_mode_before": "MISSION", "nav_mode_after": "CRUISE", "decision_id": "4962d9b5", "entry_hash": "abb3e4bceb58484c", "previous_hash": "8f012a01c807a9c1" },
        { "event_family": "TELEMETRY_REF_EVENT", "event_type": "telemetry_window", "drone_id": "DRONE-002", "mission_id": "MSN-ABCA985E", "content_hash": "0f78f858f80e6465", "decision_id": "2255c751", "entry_hash": "79d6a1ab10326c5e", "previous_hash": "abb3e4bceb58484c" },
        { "event_family": "LOSS_EVENT", "event_type": "gps_degradation", "drone_id": "DRONE-002", "mission_id": "MSN-ABCA985E", "sensor": "gps_receiver", "quality_before": 1.0, "quality_after": 0.15, "declared_impact": "Navigation position accuracy degraded. GPS quality dropped from 100% to 15%.", "decision_id": "afba0a9c", "entry_hash": "09c8fc1bbba0d7ba", "previous_hash": "79d6a1ab10326c5e" },
        { "event_family": "DECISION_EVENT", "event_type": "failsafe_land", "drone_id": "DRONE-002", "mission_id": "MSN-ABCA985E", "reason": "operator_requested", "trigger": "gps_quality < 0.2", "nav_mode_before": "CRUISE", "nav_mode_after": "FAILSAFE_LAND", "decision_id": "c313143c", "entry_hash": "54d2e0ea6376aaae", "previous_hash": "09c8fc1bbba0d7ba", "_tampered": true },
        { "event_family": "STATE_EVENT", "event_type": "landing", "drone_id": "DRONE-002", "mission_id": "MSN-ABCA985E", "altitude_m": 0.0, "decision_id": "ee5d3bfa", "entry_hash": "8a4ea769b8b68da0", "previous_hash": "54d2e0ea6376aaae" },
        { "event_family": "TELEMETRY_REF_EVENT", "event_type": "telemetry_window", "drone_id": "DRONE-002", "mission_id": "MSN-ABCA985E", "content_hash": "d72bea68388b8829", "decision_id": "b9be8eca", "entry_hash": "8fce624e167341d7", "previous_hash": "8a4ea769b8b68da0" },
        { "event_family": "MISSION_EVENT", "event_type": "mission_complete", "drone_id": "DRONE-002", "mission_id": "MSN-ABCA985E", "outcome": "failsafe_landing_completed", "decision_id": "b616f642", "entry_hash": "c96825df8f971469", "previous_hash": "8fce624e167341d7" }
      ],
      "verification": {
        "verdict": "INVALID",
        "chain_length": 10,
        "chain_intact": false,
        "checkpoint_valid": false,
        "signatures_checked": 0,
        "signatures_valid": 0,
        "loss_events": [],
        "evidence_refs": 0,
        "evidence_present": 0,
        "evidence_absent_declared": 0,
        "evidence_absent_undeclared": 0,
        "details": ["Hash mismatch at record 6 (decision_id=c313143c): stored hash does not match recomputed hash. The record was altered after sealing."]
      }
    },
    {
      "id": "undeclared-absence",
      "title": "Undeclared Evidence Absence",
      "role": "Evidence completeness failure scenario",
      "description": "A normal mission completes without any GPS degradation or sensor issues. The chain contains telemetry references, but the referenced evidence is not included in the proof-pack \u2014 and no LOSS_EVENT was declared. The verifier detects the gap.",
      "verdict_explanation": "The chain is cryptographically intact and all sidecar signatures verify. However, telemetry references in the chain point to evidence that is not present in the proof-pack. Because no LOSS_EVENT was declared before these references, this is an undeclared absence \u2014 evidence that should exist but doesn\u2019t, with no honest declaration explaining why. Silent absence fails verification.",
      "chain": [
        { "event_family": "SYNC_EVENT", "event_type": "sidecar_sync", "drone_id": "DRONE-003", "decision_id": "70217f5f", "entry_hash": "d25c21cbd9a20980", "previous_hash": "0000000000000000" },
        { "event_family": "MISSION_EVENT", "event_type": "mission_start", "drone_id": "DRONE-003", "mission_id": "MSN-9475DB9E", "decision_id": "2f1d8f88", "entry_hash": "b5ba5cb24cf17a2f", "previous_hash": "d25c21cbd9a20980" },
        { "event_family": "STATE_EVENT", "event_type": "takeoff", "drone_id": "DRONE-003", "mission_id": "MSN-9475DB9E", "altitude_m": 50.0, "decision_id": "cb821eab", "entry_hash": "fc3da314faa94d99", "previous_hash": "b5ba5cb24cf17a2f" },
        { "event_family": "STATE_EVENT", "event_type": "nav_mode_change", "drone_id": "DRONE-003", "mission_id": "MSN-9475DB9E", "nav_mode_before": "MISSION", "nav_mode_after": "CRUISE", "decision_id": "57480a95", "entry_hash": "cec0372f17a1750d", "previous_hash": "fc3da314faa94d99" },
        { "event_family": "TELEMETRY_REF_EVENT", "event_type": "telemetry_window", "drone_id": "DRONE-003", "mission_id": "MSN-9475DB9E", "content_hash": "7f415b7f4d0057a5", "decision_id": "2da63adb", "entry_hash": "f630e80faef9ac4e", "previous_hash": "cec0372f17a1750d", "_missing_evidence": true },
        { "event_family": "STATE_EVENT", "event_type": "landing", "drone_id": "DRONE-003", "mission_id": "MSN-9475DB9E", "altitude_m": 0.0, "decision_id": "ba0bd2a7", "entry_hash": "2d1d06028f32b0c1", "previous_hash": "f630e80faef9ac4e" },
        { "event_family": "TELEMETRY_REF_EVENT", "event_type": "telemetry_window", "drone_id": "DRONE-003", "mission_id": "MSN-9475DB9E", "content_hash": "cca0169cd56e9e12", "decision_id": "d93626f6", "entry_hash": "8fed1eed7e33c37b", "previous_hash": "2d1d06028f32b0c1", "_missing_evidence": true },
        { "event_family": "MISSION_EVENT", "event_type": "mission_complete", "drone_id": "DRONE-003", "mission_id": "MSN-9475DB9E", "outcome": "failsafe_landing_completed", "decision_id": "b39fe269", "entry_hash": "4980c007f3ef96ef", "previous_hash": "8fed1eed7e33c37b" }
      ],
      "verification": {
        "verdict": "INVALID",
        "chain_length": 8,
        "chain_intact": true,
        "checkpoint_valid": true,
        "signatures_checked": 8,
        "signatures_valid": 8,
        "loss_events": [],
        "evidence_refs": 1,
        "evidence_present": 0,
        "evidence_absent_declared": 0,
        "evidence_absent_undeclared": 1,
        "details": ["Evidence absent for telemetry reference WITHOUT prior declared loss \u2014 UNDECLARED ABSENCE"]
      }
    }
  ]
};
