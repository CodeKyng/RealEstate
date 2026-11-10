# HavenHub — Real Estate (Zillow-style)

React + TypeScript + Vite + Firebase + shadcn/ui

## Features

- **Auth**: Email/password + Google sign-in
- **Roles**: `user` → automatically becomes `landlord` on first listing; `admin` for moderation
- **Listings**: Create with photos, amenities, price, location. Status: `pending` → admin approves
- **Browse**: Search & filter (city, type, beds, price) — Zillow-inspired cards
- **Dashboard**: View your listings and status
- **Admin panel**: Approve/reject listings, handle reports, ban users, promote admins
- **Reports**: Users can report listings

## Setup

1. **Clone & install**
   ```bash
   npm install
   ```

2. **Environment**  
   Copy `.env.example` to `.env` (values are already filled for `codekyng-realestate`).

3. **Firebase Console** (required once)
   - Enable **Authentication** → Email/Password + Google
   - Create Firestore database (start in test mode, then lock down with rules)
   - Enable **Storage**
   - Deploy security rules (see below)

4. **Make yourself admin**  
   After signing up once, open Firestore → `users` → your uid → set `role` to `"admin"`.

5. **Run**
   ```bash
   npm run dev
   ```

## Suggested Firestore rules (start here, tighten later)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == uid;
      allow update: if request.auth != null && (
        request.auth.uid == uid ||
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
      );
    }
    match /listings/{id} {
      allow read: if resource.data.status == 'approved' ||
        (request.auth != null && (
          resource.data.ownerId == request.auth.uid ||
          get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
        ));
      allow create: if request.auth != null;
      allow update: if request.auth != null && (
        resource.data.ownerId == request.auth.uid ||
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
      );
    }
    match /reports/{id} {
      allow create: if request.auth != null;
      allow read, update: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Storage rules (basic)

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /listings/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId
        && request.resource.size < 5 * 1024 * 1024
        && request.resource.contentType.matches('image/.*');
    }
  }
}
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Marketing home |
| `/listings` | Browse & search |
| `/listings/:id` | Detail + report |
| `/create-listing` | New listing (auth) |
| `/dashboard` | My listings |
| `/admin` | Moderation (admin only) |
| `/login` `/signup` | Auth |
