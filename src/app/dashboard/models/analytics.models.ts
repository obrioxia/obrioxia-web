export interface LogEntry {
  decision_id: string;      // Matches UUID generation
  timestamp_utc: string;    // Matches ISO format
  ai_system: string;        // Matches system name
  entry_hash: string;       // SHA256 hash
  previous_hash: string;    // Blockchain link
  _is_encrypted?: boolean;  // v3.9 Metadata
  _decryption_status?: 'SHREDDED_OR_MISSING' | 'ERROR' | 'SUCCESS';
  [key: string]: any;       // Allow flexible payload fields
}

export interface DashboardMetrics {
  totalRequests: number;
  totalIncidents: number;
  verificationPassRate: number; // Derived from verify_log_chain logic
  shreddedEvents: number;       // Tracks GDPR erasure events
}
