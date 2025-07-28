# Deployment Guide - Fixing Google OAuth Issue

## The Problem
Your deployed frontend (https://vikrant-ev.vercel.app) cannot communicate with your local backend (http://localhost:5000) due to:
1. Cross-origin restrictions
2. Session cookies cannot be shared between different domains
3. HTTPS vs HTTP protocol mismatch

## Solution 1: Deploy Backend (Recommended)

### Step 1: Deploy Backend to Vercel

1. Create `vercel.json` in your backend root (already exists):
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

2. Set environment variables in Vercel:
   - `MONGODB_URI`
   - `SESSION_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `FRONTEND_URL=https://vikrant-ev.vercel.app`

3. Update Google OAuth Console:
   - Authorized origins: `https://your-backend-vercel-url.vercel.app`
   - Redirect URIs: `https://your-backend-vercel-url.vercel.app/auth/google/callback`

### Step 2: Update Frontend Configuration

Update `constants.js`:
```javascript
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-vercel-url.vercel.app' 
  : 'http://localhost:5000';
```

## Solution 2: Local Development Setup

### Step 1: Run Frontend Locally
```bash
cd Vikrant_fronted
npm run dev
```

### Step 2: Update Google OAuth Console for Local Development
- Authorized origins: `http://localhost:5173` and `http://localhost:5000`
- Redirect URIs: `http://localhost:5000/auth/google/callback`

### Step 3: Update Environment Variables
```env
FRONTEND_URL=http://localhost:5173
```

## Current Issues in Your Code

### 1. Session Cookie Configuration
Your backend session config needs domain-specific settings:

```javascript
cookie: {
  secure: process.env.NODE_ENV === 'production', // Only HTTPS in production
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' // For cross-origin
}
```

### 2. CORS Configuration
Update CORS for proper cookie handling:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Recommended Next Steps

1. **Deploy your backend to Vercel** (easiest solution)
2. **Update environment variables** in both frontend and backend
3. **Update Google OAuth console** with production URLs
4. **Test the authentication flow**

Would you like me to help you deploy the backend or set up local development?
