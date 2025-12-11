# Frontend Deployment Instructions - Hirent

## 📦 What Was Done

All hardcoded `http://localhost:5000` references have been removed from the frontend. The application now uses environment variables for the backend URL, making it production-ready for Netlify deployment.

**Total Changes:** 23 localhost:5000 occurrences fixed across 12 files + 3 new configuration files created.

---

## 🚀 Quick Start - Local Testing

### 1. Setup Environment
```bash
cd frontend
cp .env.example .env
```

### 2. Edit `.env`
```
REACT_APP_API_URL=https://hirent-2.onrender.com/api
```

### 3. Install & Run
```bash
npm install
npm start
```

### 4. Test in Browser
- Open `http://localhost:3000`
- Open DevTools → Network tab
- Login/signup and verify requests go to `https://hirent-2.onrender.com/api/*`
- Test Google OAuth (should redirect to `https://hirent-2.onrender.com/api/auth/google`)

---

## 🌐 Netlify Deployment

### Step 1: Connect to Netlify
1. Go to https://app.netlify.com
2. Click "New site from Git"
3. Select your GitHub repository
4. Select branch (usually `main`)

### Step 2: Configure Build Settings
Netlify should auto-detect:
- **Build command:** `npm run build`
- **Publish directory:** `build`

If not, set manually in Site Settings → Build & Deploy → Build Settings

### Step 3: Set Environment Variables
1. Go to Site Settings → Build & Deploy → Environment
2. Click "Edit variables"
3. Add new variable:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://hirent-2.onrender.com/api`
4. Save

### Step 4: Deploy
1. Click "Deploy site"
2. Wait for build to complete (2-5 minutes)
3. Get your Netlify URL (e.g., `https://hirent-xyz.netlify.app`)

---

## ✅ Post-Deployment Testing

### Test 1: Site Loads
Visit your Netlify URL → App should load

### Test 2: SPA Routing
- Navigate to `/login`
- Refresh page → Should load correctly (no 404)

### Test 3: API Calls
- Login with test credentials
- Open DevTools → Network tab
- Verify requests go to `https://hirent-2.onrender.com/api/*`

### Test 4: Google OAuth
- Click "Sign in with Google"
- Should redirect to `https://hirent-2.onrender.com/api/auth/google`
- Complete authentication flow

### Test 5: Full User Journey
- Sign up (renter or owner)
- Browse items
- Add to wishlist/collection
- Update profile
- Logout

---

## 📋 Files Changed

| File | Changes |
|------|---------|
| `src/api.js` | Updated baseURL to use env var |
| `src/config/api.js` | Updated API_URL to use env var |
| `src/components/forms/AuthForm.jsx` | Fixed login/signup/Google OAuth |
| `src/pages/auth/OwnerLogin.jsx` | Fixed Google OAuth redirect |
| `src/pages/auth/OwnerSignup.jsx` | Fixed Google OAuth redirect |
| `src/pages/auth/OwnerSetup.jsx` | Fixed profile update calls |
| `src/context/AuthContext.jsx` | Fixed count fetching |
| `src/pages/ItemDetails.jsx` | Fixed all API calls |
| `src/pages/owner/OwnerProfile.js` | Fixed all API calls |
| `src/pages/home/sidebar/Account.jsx` | Fixed all API calls |
| `src/components/items/BrowseItems.jsx` | Fixed all API calls |
| `src/components/listings/EditItemModal.jsx` | Fixed item update |
| `netlify.toml` | **Created** - SPA routing & API proxy |
| `public/_redirects` | **Created** - Netlify redirects |
| `.env.example` | **Created** - Environment template |

---

## 🔐 Security Notes

### Secrets Rotation
If any secrets were exposed in git history, rotate immediately:
- Google OAuth Client Secret
- JWT Secret
- Database credentials
- PayMongo API keys
- Email credentials
- Cloudinary credentials

Update in:
1. Render (backend environment variables)
2. Google Cloud Console (if needed)

---

## 🐛 Troubleshooting

### "API calls still going to localhost"
1. Check `.env` has correct `REACT_APP_API_URL`
2. Run `npm run build` to rebuild
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check Network tab for actual request URL

### "Google OAuth not working"
1. Verify backend callback URL in Google Cloud Console
2. Check `GOOGLE_REDIRECT_URI` on backend
3. Verify frontend redirects to correct endpoint
4. Check browser console for errors

### "CORS errors"
1. Verify backend CORS allows your Netlify domain
2. Check `credentials: 'include'` in fetch calls
3. Check `withCredentials: true` in axios calls

### "Build fails on Netlify"
1. Check build logs in Netlify dashboard
2. Verify `npm run build` works locally
3. Check all dependencies in `package.json`
4. Verify environment variables are set

---

## 📞 Support

- **Netlify Docs:** https://docs.netlify.com/
- **React Docs:** https://react.dev/
- **Render Docs:** https://render.com/docs

---

## ✨ You're All Set!

Frontend is ready for production deployment. 🚀
