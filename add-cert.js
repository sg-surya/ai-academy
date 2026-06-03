const fs = require('fs');
const path = require('path');
const { join } = require('path');
const { homedir } = require('os');

// Read env variables from .env.local
const envPath = path.join(__dirname, '.env.local');
let envContent = '';
try {
  envContent = fs.readFileSync(envPath, 'utf-8');
} catch (e) {
  console.error('Error: Could not read .env.local file');
  process.exit(1);
}

const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    env[match[1]] = value;
  }
});

const projectId = env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const dbId = env.NEXT_PUBLIC_FIRESTORE_DATABASE_ID || '(default)';

// Config parameters from command line arguments
const certId = process.argv[2];
const studentName = process.argv[3];
const workshop = process.argv[4] || 'Learn AI From Scratch';
const date = process.argv[5] || '31 May 2026';
const issuer = process.argv[6] || 'Vasudev';
const status = 'Verified';

if (!certId || !studentName) {
  console.log(`
Usage:
  node add-cert.js <certificateId> "<studentName>" ["<workshopName>"] ["<date>"] ["<issuer>"]

Example:
  node add-cert.js VAI26-C01-999 "Nishkarsh Kumar" "Learn AI From Scratch" "31 May 2026" "Vasudev"
`);
  process.exit(1);
}

console.log(`Creating certificate:
- ID: ${certId}
- Name: ${studentName}
- Workshop: ${workshop}
- Date: ${date}
- Issuer: ${issuer}
`);

// Read firebase token
let token = null;
try {
  const configPath = join(homedir(), '.config', 'configstore', 'firebase-tools.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  token = config.tokens?.access_token || null;
} catch (e) {
  console.error('\n❌ Error: Could not read firebase-tools.json.');
  console.error('👉 Please run "npx firebase login" in your terminal first to authorize access.');
  process.exit(1);
}

if (!token) {
  console.error('\n❌ Error: Firebase login token not found. Please run "npx firebase login" first.');
  process.exit(1);
}

const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${encodeURIComponent(dbId)}/documents/certificates/${encodeURIComponent(certId)}`;

const body = {
  fields: {
    name: { stringValue: studentName },
    workshop: { stringValue: workshop },
    date: { stringValue: date },
    issuer: { stringValue: issuer },
    status: { stringValue: status }
  }
};

fetch(url, {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
})
.then(res => {
  if (res.ok) {
    console.log('\n✅ Certificate successfully saved to Firestore!');
  } else {
    res.text().then(text => {
      console.error('\n❌ Failed to save certificate:', res.status, text);
    });
  }
})
.catch(err => {
  console.error('\n❌ Network error:', err);
});
