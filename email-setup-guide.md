# Email Collection Setup Guide

## Quick Start: Netlify Forms (Recommended)

### 1. Update Landing Page Form
Replace the current form in `landing.html` with:

```html
<form name="email-signup" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
    <input type="hidden" name="form-name" value="email-signup">
    <input type="hidden" name="bot-field">
    <div class="max-w-md mx-auto">
        <div class="flex">
            <input type="email" name="email" placeholder="Enter your email" required
                   class="flex-1 px-4 py-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <button type="submit" class="bg-blue-800 text-white px-6 py-3 rounded-r-md hover:bg-blue-900 transition duration-200">
                Get Access
            </button>
        </div>
        <p class="text-sm text-blue-200 mt-2">No spam, unsubscribe anytime</p>
    </div>
</form>
```

### 2. Add Success Page
Create `success.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You - CodeSentry</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <div class="min-h-screen flex items-center justify-center">
        <div class="text-center">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">Thank You!</h1>
            <p class="text-lg text-gray-600 mb-6">
                We've received your email and will keep you updated on CodeSentry's progress.
            </p>
            <a href="index.html" class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
                Try CodeSentry Demo
            </a>
        </div>
    </div>
</body>
</html>
```

### 3. Configure Netlify Form Settings
After deploying:
1. Go to Netlify dashboard → Forms
2. Find "email-signup" form
3. Set up notifications to your email
4. Download submissions as CSV

## Alternative: ConvertKit Integration

### 1. Create ConvertKit Account
- Sign up at convertkit.com
- Create a new form
- Get your Form ID and API key

### 2. Update JavaScript
```javascript
const subscribeToNewsletter = async (email) => {
    try {
        const response = await fetch(`https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key: 'YOUR_API_KEY',
                email: email,
                tags: ['codesentry-signup']
            })
        });
        
        if (response.ok) {
            // Success - show thank you message
            alert('Thanks for signing up! Check your email for confirmation.');
        } else {
            throw new Error('Subscription failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
};
```

## Monitoring Setup

### 1. Google Analytics
Add to all pages:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Track Email Signups
```javascript
// Add to form submission
gtag('event', 'email_signup', {
    event_category: 'engagement',
    event_label: 'landing_page'
});
```

### 3. Set Up Zapier Automation
Connect Netlify Forms → Google Sheets:
1. Create Zapier account
2. Set up trigger: New Netlify form submission
3. Set up action: Add row to Google Sheets
4. Result: Real-time email tracking

## Weekly Monitoring Routine

### Monday: Email Review
- [ ] Check new signups from weekend
- [ ] Export email list from Netlify/ConvertKit
- [ ] Send welcome emails to new subscribers
- [ ] Update email monitor dashboard

### Wednesday: Analytics Check
- [ ] Review Google Analytics for traffic sources
- [ ] Check conversion rates (visitors → signups)
- [ ] Identify top-performing pages
- [ ] Plan content based on user behavior

### Friday: Outreach
- [ ] Follow up with engaged email subscribers
- [ ] Send weekly newsletter with product updates
- [ ] Collect feedback from recent signups
- [ ] Plan next week's marketing activities

## Success Metrics to Track

### Primary KPIs
- **Email Signup Rate**: Target 3-5% of visitors
- **Email Growth**: 50+ new signups per week
- **Engagement Rate**: 25%+ email open rate
- **Conversion Rate**: 5%+ email-to-trial conversion

### Secondary Metrics
- **Traffic Sources**: Which channels drive signups
- **Page Performance**: Which pages convert best
- **User Behavior**: Time on site, bounce rate
- **Geographic Data**: Where users are located

## Email Sequence Strategy

### Welcome Series (5 emails over 7 days)
1. **Day 0**: Welcome + Demo video
2. **Day 1**: Problem explanation (AI code issues)
3. **Day 3**: Solution overview (CodeSentry features)
4. **Day 5**: Social proof (testimonials, case studies)
5. **Day 7**: Call to action (start free trial)

### Weekly Newsletter
- Product updates and new features
- Developer tips and best practices
- Customer success stories
- Industry insights and trends

## Budget Allocation

### Free Tier (Month 1)
- Netlify Forms: Free (up to 100 submissions)
- Google Analytics: Free
- Basic email tool: Free tier

### Paid Tier (Month 2+)
- ConvertKit: $29/month (up to 1,000 subscribers)
- Zapier: $20/month (for automation)
- Email design tools: $15/month

Total monthly cost: ~$65 for professional email marketing setup