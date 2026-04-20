// Template for environment.ts and environment.prod.ts
// These files are gitignored. Each developer must create them locally.
// Copy this file twice:
//   environment.ts        (set production: false)
//   environment.prod.ts   (set production: true)
// Then fill in the real Firebase API key.

export const environment = {
  production: false, // true for environment.prod.ts
  backendUrl: "https://obrioxia-engine.onrender.com",
  firebase: {
    apiKey: "YOUR_FIREBASE_WEB_API_KEY_HERE",
    authDomain: "obrioxia-audit-engine.firebaseapp.com",
    projectId: "obrioxia-audit-engine",
    storageBucket: "obrioxia-audit-engine.firebasestorage.app",
    messagingSenderId: "233336301606",
    appId: "1:233336301606:web:6a6305d2226511ddc61ee7"
  }
};
