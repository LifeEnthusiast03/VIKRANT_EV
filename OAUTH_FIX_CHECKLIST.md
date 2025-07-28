# 🚀 Google OAuth Fix - Deployment Checklist

## ❌ The Issue
Google OAuth error: `redirect_uri=http://vikrant-ev-backend.vercel.app/auth/google/callback`
- Google is receiving `http://` instead of `https://`
- Your Google Console is configured for `https://`

## ✅ Fixes Applied

### 1. **Backend Configuration Fixed**
- ✅ Updated `callbackURL` in `passport.js` to use full HTTPS URL
- ✅ Added `BACKEND_URL` environment variable
- ✅ Set `NODE_ENV=production` for proper cookie settings
- ✅ Improved CORS configuration

### 2. **Environment Variables Updated**
```env
BACKEND_URL="https://vikrant-ev-backend.vercel.app"
NODE_ENV=production
FRONTEND_URL="https://vikrant-ev.vercel.app"
```

## 🔄 Next Steps

### 1. **Deploy Backend to Vercel**
```bash
cd Vikrant_Backend
vercel --prod
```

### 2. **Set Environment Variables in Vercel Dashboard**
Go to your Vercel dashboard → Project → Settings → Environment Variables:

```
BACKEND_URL=https://vikrant-ev-backend.vercel.app
NODE_ENV=production
MONGODB_URI=mongodb+srv://sougata21:Saha%24%23%402003@cluster0.r9oib.mongodb.net/
GOOGLE_CLIENT_ID=1010452759962-579ldprpvqvau7k3pqbpmdsmtabv6rsg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
FRONTEND_URL=https://vikrant-ev.vercel.app
SESSION_SECRET=abcederfskdjfs
GOOGLE_API_KEY=AIzaSyDDOlP5zSjlnkxEFxZf7RHGQQp8GTLG1HE
```

### 3. **Verify Google OAuth Console Settings**
Double-check in Google Cloud Console:

**Authorized JavaScript origins:**
- `https://vikrant-ev.vercel.app`
- `https://vikrant-ev-backend.vercel.app`

**Authorized redirect URIs:**
- `https://vikrant-ev-backend.vercel.app/auth/google/callback`

### 4. **Test the Flow**
1. Deploy backend
2. Try Google OAuth login
3. Should redirect properly with HTTPS

## 🐛 If Still Having Issues

### Debug Steps:
1. Check Vercel deployment logs
2. Verify environment variables are set
3. Test the callback URL directly: `https://vikrant-ev-backend.vercel.app/auth/google/callback`
4. Check browser network tab for any errors

### Common Issues:
- Environment variables not set in Vercel
- Google Console settings mismatch
- Backend not properly deployed

## 📞 Quick Test URLs
- Backend health: `https://vikrant-ev-backend.vercel.app/`
- Auth test: `https://vikrant-ev-backend.vercel.app/auth/test`
- Google OAuth start: `https://vikrant-ev-backend.vercel.app/auth/google`

After deployment, the OAuth flow should work correctly! 🎉
