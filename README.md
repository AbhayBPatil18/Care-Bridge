# Care Bridge

A hackathon-ready React + TypeScript care-continuity platform focused on post-treatment follow-up, readmission risk awareness, patient monitoring, AI-style support, live analytics, medication adherence, appointments, notifications, voice commands, Firebase Auth, and Firestore persistence hooks.

Care Bridge helps bridge the gap between hospital treatment and recovery at home by giving patients, doctors, and admins a shared view of follow-ups, health trends, medication progress, and care alerts.

## Run

```bash
npm install
npm run dev
```

## Firebase setup

Create a `.env` file with:

```bash
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

The app remains demonstrable without Firebase config by using local demo sessions and localStorage-backed demo persistence.

## Demo credentials

- Patient: `john.doe@demo.com` / `demo123`
- Doctor: `dr.smith@demo.com` / `demo123`
- Admin: `admin@demo.com` / `demo123`

## Highlights

- Role-based protected routes
- Firebase Auth and Firestore service wrappers
- Recharts analytics
- Framer Motion transitions
- Lucide icons
- Web Speech API voice input and global commands
- Responsive layout with mobile bottom navigation
