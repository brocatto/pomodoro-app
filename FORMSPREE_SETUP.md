# Formspree Setup Instructions

## How to Connect Feedback Form to Formspree

### Step 1: Create a Formspree Account
1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for a free account (allows 50 submissions/month)

### Step 2: Create a New Form
1. Once logged in, click **"New Form"**
2. Give it a name: `GettingShitDone Feedback`
3. Copy your Form ID (looks like: `xyzabc123`)

### Step 3: Update the Code
1. Open `src/Feedback.jsx`
2. Find line 6:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'
   ```
3. Replace `YOUR_FORM_ID` with your actual Form ID:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyzabc123'
   ```

### Step 4: Configure Email Notifications (Optional)
1. In Formspree dashboard, go to your form settings
2. Under **"Email Notifications"**, add your email
3. You'll receive feedback submissions directly to your inbox

### Step 5: Test the Integration
1. Build and deploy your app: `npm run build`
2. Click the feedback button (💬) in the bottom-right
3. Submit a test message
4. Check your Formspree dashboard for the submission

### Features Included:
- ✅ Email field (optional)
- ✅ Custom subject line: "New Feedback - GettingShitDone"
- ✅ Error handling with retry option
- ✅ Loading state ("Sending...")
- ✅ Success animation
- ✅ Auto-close after success

### Formspree Pricing:
- **Free**: 50 submissions/month
- **Gold**: $10/month - 1000 submissions
- **Platinum**: $40/month - Unlimited

### Alternative Services:
If you prefer a different service:
- **Web3Forms**: Similar to Formspree
- **Google Forms**: Free, unlimited (requires different integration)
- **EmailJS**: Free tier available
- **Custom Backend**: Build your own API endpoint

---

**Need help?** Check Formspree docs: https://help.formspree.io/
