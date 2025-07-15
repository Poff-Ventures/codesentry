# Netlify Deployment Guide for CodeSentry

## 🚀 Quick Manual Deployment (5 minutes)

### Step 1: Access Netlify Dashboard
1. Go to: https://app.netlify.com/projects/codesentry-ai
2. You should see your "codesentry-ai" project

### Step 2: Connect GitHub Repository
1. Click **"Site configuration"** in the left sidebar
2. Click **"Build & deploy"** 
3. Click **"Link repository"**
4. Choose **"GitHub"** as your Git provider
5. Select **"Poff-Ventures/codesentry"** repository
6. Set branch to **"main"**
7. Leave build command **empty**
8. Set publish directory to **"."** (root)
9. Click **"Deploy site"**

### Step 3: Verify Deployment
- Site will be available at: **https://codesentry-ai.netlify.app**
- Build should complete in 1-2 minutes
- Check build logs for any errors

## 📋 Alternative: Drag & Drop Method

### Option A: Direct File Upload
1. Go to https://app.netlify.com/projects/codesentry-ai
2. Click **"Deploys"** tab
3. Drag the entire `/Users/xuetang/Lab/codesentry` folder to the deploy area
4. Netlify will automatically detect the forms and deploy

### Option B: Zip Upload
1. Create a zip file of your project (excluding .git)
2. Go to Netlify dashboard
3. Drag the zip file to the deploy area

## 🔧 Expected Results After Deployment

### ✅ What Will Work:
- **Landing Page**: https://codesentry-ai.netlify.app/landing.html
- **Main App**: https://codesentry-ai.netlify.app/index.html
- **Pricing Page**: https://codesentry-ai.netlify.app/pricing.html
- **Success Page**: https://codesentry-ai.netlify.app/success.html

### ✅ Forms Dashboard:
- **Access**: https://app.netlify.com/projects/codesentry-ai/forms
- **3 Forms Available**:
  - `email-signup` (landing page)
  - `demo-signup` (main app)
  - `trial-signup` (pricing page)

### ✅ Form Submissions:
- **Real-time notifications**
- **CSV export capability**
- **Spam protection built-in**
- **Success page redirects**

## 📧 Email Notifications Setup

### After Deployment:
1. Go to **Forms** tab in Netlify dashboard
2. Click **"Settings & usage"**
3. Add your email for notifications
4. Set up Slack/Discord webhooks (optional)

## 🔗 Custom Domain (Optional)

### To use codesentry.com:
1. Go to **Domain management**
2. Add custom domain
3. Update DNS records
4. Enable HTTPS

## 🔍 Troubleshooting

### If Forms Don't Work:
1. Check that `data-netlify="true"` is in form tags
2. Verify `name` attribute is set on forms
3. Check build logs for errors
4. Ensure success page exists at `/success.html`

### If Build Fails:
1. Check build logs in Netlify dashboard
2. Verify `netlify.toml` configuration
3. Ensure no syntax errors in HTML files

## 🎯 Next Steps After Deployment

1. **Test all forms** on the live site
2. **Configure email notifications**
3. **Share the live URL** for user testing
4. **Monitor form submissions** in dashboard
5. **Set up custom domain** if desired

## 📊 Success Metrics

After deployment, you'll be able to track:
- **Form submission rates**
- **Conversion funnel analytics**
- **User engagement metrics**
- **Email signup growth**

---

**Site URL**: https://codesentry-ai.netlify.app
**Admin URL**: https://app.netlify.com/projects/codesentry-ai
**Forms Dashboard**: https://app.netlify.com/projects/codesentry-ai/forms