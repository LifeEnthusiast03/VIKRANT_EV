# Backend Deployment to Vercel

## Quick Setup Script

### 1. Install Vercel CLI (if not already installed)
```bash
npm i -g vercel
```

### 2. Deploy Backend
```bash
cd Vikrant_Backend
vercel
```

### 3. Set Environment Variables in Vercel Dashboard
After deployment, go to your Vercel dashboard and set these environment variables:

```
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=https://vikrant-ev.vercel.app
```

### 4. Update Google OAuth Console
- Go to Google Cloud Console
- Navigate to APIs & Services > Credentials
- Update your OAuth 2.0 client:
  - Authorized origins: Add `https://your-backend-domain.vercel.app`
  - Redirect URIs: Add `https://your-backend-domain.vercel.app/auth/google/callback`

### 5. Update Frontend Constants
After backend deployment, update `Vikrant_fronted/src/utils/constants.js`:

```javascript
export const API_BASE_URL = 'https://your-backend-domain.vercel.app';
```

### 6. Redeploy Frontend
```bash
cd Vikrant_fronted
vercel --prod
```

## Alternative: Local Development

If you prefer to test locally first:

### 1. Run Frontend Locally
```bash
cd Vikrant_fronted
npm run dev
```

### 2. Update constants.js for local development:
```javascript
export const API_BASE_URL = 'http://localhost:5000';
```

### 3. Update your .env in backend:
```
FRONTEND_URL=http://localhost:5173
```

### 4. Update Google OAuth for localhost:
- Authorized origins: `http://localhost:5173`
- Redirect URIs: `http://localhost:5000/auth/google/callback`

## Why This Fixes Your Issue

1. **Same Origin**: Both frontend and backend will be on HTTPS domains
2. **Proper Cookies**: Session cookies will work across the same domain structure
3. **CORS**: Properly configured for production environments
4. **OAuth URLs**: Google OAuth will redirect to the correct domains

Choose the approach that works best for your development workflow!
