# Frontend Deployment Checklist - Hirent

## ✅ Pre-Deployment Verification

### Environment Configuration
- [ ] Create `.env` file in frontend root (copy from `.env.example`)
- [ ] Set `REACT_APP_API_URL=https://hirent-2.onrender.com/api` in `.env`
- [ ] Verify `.env` is in `.gitignore` (should NOT be committed)
- [ ] Verify `netlify.toml` exists in frontend root
- [ ] Verify `public/_redirects` exists for Netlify SPA routing

### Code Verification
- [ ] All `http://localhost:5000` references removed (search entire codebase)
- [ ] All API calls use `process.env.REACT_APP_API_URL` or centralized helpers
- [ ] `src/api.js` uses environment variable with fallback
- [ ] `src/config/api.js` uses environment variable with fallback
- [ ] Google OAuth redirects use `process.env.REACT_APP_API_URL`
- [ ] No hardcoded backend URLs in components

### Files Modified
- [x] `src/api.js` - Updated to use env var
- [x] `src/config/api.js` - Updated to use env var
- [x] `src/components/forms/AuthForm.jsx` - Fixed login/signup/Google OAuth
- [x] `src/pages/auth/OwnerLogin.jsx` - Fixed Google OAuth redirect
- [x] `src/pages/auth/OwnerSignup.jsx` - Fixed Google OAuth redirect
- [x] `src/pages/auth/OwnerSetup.jsx` - Fixed profile update calls
- [x] `src/context/AuthContext.jsx` - Fixed count fetching
- [x] `src/pages/ItemDetails.jsx` - Fixed all API calls
- [x] `src/pages/owner/OwnerProfile.js` - Fixed all API calls
- [x] `src/pages/home/sidebar/Account.jsx` - Fixed all API calls
- [x] `src/components/items/BrowseItems.jsx` - Fixed all API calls
- [x] `src/components/listings/EditItemModal.jsx` - Fixed item update calls
- [x] `netlify.toml` - Created with SPA routing and API proxy
- [x] `public/_redirects` - Created for Netlify
- [x] `.env.example` - Created with correct format

---

## 🧪 Local Testing (Before Netlify Deployment)

### Setup
```bash
cd frontend
npm install
```

### Environment Setup
```bash
# Create .env from .env.example
cp .env.example .env

# Edit .env and set:
REACT_APP_API_URL=https://hirent-2.onrender.com/api
```

### Test 1: Build Verification
```bash
npm run build
```
**Expected:** Build completes without errors or warnings

### Test 2: Local Development Server
```bash
npm start
```
**Expected:** App starts on `http://localhost:3000`

### Test 3: Regular Authentication
1. Navigate to login page
2. Enter test credentials (email/password)
3. Click "Sign In"
4. **Check Network Tab:** Request should go to `https://hirent-2.onrender.com/api/auth/login`
5. **Expected:** Login succeeds, redirected to dashboard

### Test 4: Regular Registration
1. Navigate to signup page
2. Enter new credentials
3. Click "Sign Up"
4. **Check Network Tab:** Request should go to `https://hirent-2.onrender.com/api/auth/register`
5. **Expected:** Registration succeeds, redirected to login or dashboard

### Test 5: Google OAuth (Renter)
1. Navigate to login page
2. Click "Sign in with Google"
3. **Check Network Tab:** Should navigate to `https://hirent-2.onrender.com/api/auth/google`
4. **Expected:** Google consent screen appears

### Test 6: Google OAuth (Owner)
1. Navigate to owner signup page
2. Click "Sign up with Google"
3. **Check Network Tab:** Should navigate to `https://hirent-2.onrender.com/api/auth/google/owner`
4. **Expected:** Google consent screen appears

### Test 7: API Calls (Authenticated)
1. Login successfully
2. Navigate to item details page
3. **Check Network Tab:** Item fetch should go to `https://hirent-2.onrender.com/api/items/{id}`
4. Click wishlist/collection buttons
5. **Check Network Tab:** Requests should go to `https://hirent-2.onrender.com/api/wishlist/*` and `https://hirent-2.onrender.com/api/collection/*`
6. **Expected:** All requests succeed with 200 status

### Test 8: Profile Updates
1. Login as owner
2. Navigate to owner profile
3. Update profile information
4. Click "Save"
5. **Check Network Tab:** Request should go to `https://hirent-2.onrender.com/api/users/update-profile`
6. **Expected:** Profile updates successfully

### Test 9: Error Handling
1. Logout
2. Try to access protected pages (e.g., owner dashboard)
3. **Expected:** Redirected to login page
4. Make a request with invalid token
5. **Expected:** 401 error triggers logout and redirect to login

---

## 🚀 Netlify Deployment

### Step 1: Connect Repository
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Select the repository and branch (usually `main`)

### Step 2: Build Configuration
Netlify should auto-detect:
- **Build command:** `npm run build`
- **Publish directory:** `build`

If not, set manually in Site Settings → Build & Deploy → Build Settings

### Step 3: Environment Variables
1. Go to Site Settings → Build & Deploy → Environment
2. Click "Edit variables"
3. Add:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://hirent-2.onrender.com/api`
4. Save and redeploy

### Step 4: Deploy
1. Click "Deploy site"
2. Wait for build to complete (should take 2-5 minutes)
3. Once deployed, you'll get a Netlify URL (e.g., `https://hirent-xyz.netlify.app`)

---

## ✅ Post-Deployment Verification (Netlify)

### Test 1: Site Loads
1. Visit your Netlify URL
2. **Expected:** App loads without errors

### Test 2: SPA Routing
1. Navigate to different pages (e.g., `/login`, `/owner/dashboard`)
2. Refresh the page
3. **Expected:** Page loads correctly (no 404 errors)

### Test 3: API Calls
1. Login with test credentials
2. **Check Network Tab:** Requests should go to `https://hirent-2.onrender.com/api/*`
3. **Expected:** All API calls succeed

### Test 4: Google OAuth Flow
1. Click "Sign in with Google"
2. **Check Network Tab:** Should navigate to `https://hirent-2.onrender.com/api/auth/google`
3. Complete Google authentication
4. **Expected:** Redirected back to app with token in URL

### Test 5: Full User Journey
1. **Renter Flow:**
   - Sign up with Google (renter)
   - Browse items
   - Add to wishlist/collection
   - View profile
   - Logout

2. **Owner Flow:**
   - Sign up with Google (owner)
   - Complete owner setup
   - View owner dashboard
   - Create/edit listings
   - View earnings
   - Logout

### Test 6: Error Scenarios
1. Try to access protected routes without login
   - **Expected:** Redirected to login
2. Make API request with expired token
   - **Expected:** 401 error, logout, redirect to login
3. Network error during API call
   - **Expected:** Error message displayed, user can retry

---

## 🔐 Security Checklist

### Before Going Live
- [ ] No hardcoded secrets in code (API keys, tokens, etc.)
- [ ] `.env` file is in `.gitignore`
- [ ] No console.log statements with sensitive data
- [ ] CORS is properly configured on backend
- [ ] JWT tokens are stored securely (localStorage is acceptable for this app)
- [ ] HTTPS is enforced (Netlify provides this by default)
- [ ] Google OAuth credentials are correct in Google Cloud Console

### Secrets Rotation (IMPORTANT)
⚠️ **WARNING:** If any secrets were exposed in git history:
1. Rotate all exposed secrets immediately:
   - Google OAuth Client Secret
   - JWT Secret
   - Database credentials
   - PayMongo API keys
   - Email credentials
   - Cloudinary credentials

2. Update environment variables on:
   - Render (backend)
   - Netlify (frontend, if applicable)
   - Google Cloud Console (if needed)

---

## 📋 Troubleshooting

### Issue: "API calls still going to localhost"
**Solution:**
1. Check `.env` file has correct `REACT_APP_API_URL`
2. Rebuild: `npm run build`
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check Network tab to verify actual request URL

### Issue: "Google OAuth not working"
**Solution:**
1. Verify backend callback URL matches Google Cloud Console
2. Check `GOOGLE_REDIRECT_URI` on backend is set correctly
3. Verify frontend redirects to correct OAuth endpoint
4. Check browser console for errors

### Issue: "CORS errors"
**Solution:**
1. Verify backend CORS allows Netlify domain
2. Check `credentials: 'include'` is set in fetch calls
3. Verify `withCredentials: true` in axios calls
4. Check backend allows your Netlify domain in CORS origins

### Issue: "401 Unauthorized errors"
**Solution:**
1. Verify JWT token is stored in localStorage
2. Check Authorization header is being sent
3. Verify token is not expired
4. Check backend JWT_SECRET matches

### Issue: "Build fails on Netlify"
**Solution:**
1. Check build logs in Netlify dashboard
2. Verify `npm run build` works locally
3. Check all dependencies are in `package.json`
4. Verify environment variables are set in Netlify

---

## 📞 Support Resources

- **Netlify Docs:** https://docs.netlify.com/
- **React Docs:** https://react.dev/
- **Axios Docs:** https://axios-http.com/
- **Render Docs:** https://render.com/docs

---

## Final Notes

✅ **All frontend code has been updated to use the deployed backend at `https://hirent-2.onrender.com`**

✅ **No hardcoded localhost URLs remain in the codebase**

✅ **All configuration files are in place for Netlify deployment**

✅ **Environment variables are properly configured**

Ready for Netlify deployment! 🚀
