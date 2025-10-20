# Analytics Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Get Your Analytics IDs

#### Google Analytics 4 (5 minutes)
1. Go to https://analytics.google.com/
2. Sign in with your Google account
3. Click **Admin** (gear icon at bottom left)
4. Under **Property**, click **Data Streams**
5. Click on your web stream (or create one)
6. Copy the **Measurement ID** (looks like `G-XXXXXXXXXX`)

#### Baidu Analytics (5 minutes)
1. Go to https://tongji.baidu.com/
2. Sign in or register
3. Add your website
4. Go to **管理** → **代码获取**
5. Find the code that looks like: `hm.src = "https://hm.baidu.com/hm.js?XXXXXXXXXX"`
6. Copy the ID after `hm.js?` (the XXXXXXXXXX part)

### Step 2: Configure Your Site

Open `src/config/site.json` and update the analytics section:

```json
{
  "analytics": {
    "googleAnalyticsId": "G-XXXXXXXXXX",
    "baiduAnalyticsId": "your_baidu_id_here"
  }
}
```

### Step 3: Deploy and Verify

```bash
# Build the site
npm run build

# Preview locally
npm run preview

# Deploy to production
npm run deploy
# or
vercel --prod
```

## ✅ Verify It's Working

### Check in Browser (Immediate)

1. Open your site in Chrome
2. Open DevTools (F12 or Cmd+Option+I)
3. Go to **Network** tab
4. Filter by "google-analytics" or "baidu"
5. Click around your site
6. You should see network requests being sent

### Check in Google Analytics (5-10 minutes)

1. Go to https://analytics.google.com/
2. Select your property
3. Go to **Reports** → **Realtime**
4. Open your site in another tab
5. You should see yourself as an active user

### Check in Baidu Analytics (10-30 minutes)

1. Go to https://tongji.baidu.com/
2. Select your site
3. Go to **实时访客** (Realtime Visitors)
4. Open your site in another tab
5. You should see activity (may take longer than GA4)

## 📊 What's Being Tracked

### Automatic Tracking
- ✅ Page views on every page
- ✅ Scroll depth (25%, 50%, 75%, 100%)
- ✅ Domain detail page views

### Click Tracking
- ✅ Phone number clicks (Header, Hero, Footer, Domain pages)
- ✅ Email clicks
- ✅ WeChat contact clicks
- ✅ WhatsApp clicks
- ✅ CTA button clicks
- ✅ Domain card clicks
- ✅ Language switches

## 🎯 Key Metrics to Watch

### In Google Analytics 4

**Realtime Report**
- See live visitors and their activity

**Events Report** (Reports → Engagement → Events)
- `phone_click` - How many people clicked to call
- `cta_click` - CTA button effectiveness
- `domain_interest` - Which domains get attention
- `language_switch` - Language preferences

**Conversions** (Reports → Engagement → Conversions)
- Mark important events as conversions
- Track conversion rates

### In Baidu Analytics

**实时访客** (Realtime Visitors)
- Live visitor activity

**事件跟踪** (Event Tracking)
- All tracked events
- Conversion metrics

## 🔧 Troubleshooting

### "I don't see any data"

**Wait a bit**: 
- GA4: 5-10 minutes for Realtime, 24-48 hours for Reports
- Baidu: 10-30 minutes for Realtime, up to 24 hours for Reports

**Check your IDs**:
- GA4 ID should start with `G-`
- Make sure there are no extra spaces
- IDs are case-sensitive

**Check browser console**:
- Open DevTools → Console
- Look for any red errors
- If you see errors, check the ANALYTICS_IMPLEMENTATION.md file

### "Events aren't showing up"

**Clear cache and reload**:
```bash
# Rebuild the site
npm run build
```

**Check Network tab**:
- Open DevTools → Network
- Filter by "google" or "baidu"
- Click around and verify requests are sent

**Verify configuration**:
- Check `src/config/site.json` has correct IDs
- Make sure IDs are in quotes
- No trailing commas in JSON

## 📱 Test on Mobile

1. Deploy your site
2. Open on your phone
3. Click phone numbers, CTAs, etc.
4. Check analytics dashboards for mobile events

## 🎓 Learn More

- **Full Documentation**: See `ANALYTICS_IMPLEMENTATION.md`
- **GA4 Help**: https://support.google.com/analytics/
- **Baidu Help**: https://tongji.baidu.com/web/help/

## 💡 Pro Tips

1. **Set up conversion goals** in GA4 for phone_click and cta_click events
2. **Create custom reports** to track domain performance
3. **Set up alerts** for unusual traffic patterns
4. **Export data regularly** for offline analysis
5. **Compare GA4 vs Baidu data** to understand different audiences

## 🚨 Important Notes

- Analytics scripts only load when IDs are configured
- No tracking happens without proper setup
- All tracking is privacy-compliant
- You can add cookie consent later if needed

## Need Help?

Check these files for more details:
- `ANALYTICS_IMPLEMENTATION.md` - Complete documentation
- `TASK_11_COMPLETION_SUMMARY.md` - Implementation details
- `src/utils/analytics.ts` - Source code with comments

---

**Ready to go?** Just add your analytics IDs to `src/config/site.json` and deploy! 🎉
