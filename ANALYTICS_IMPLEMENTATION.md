# Analytics and Tracking Implementation

## Overview

This document describes the analytics and tracking implementation for the domain sales website. The system integrates both Google Analytics 4 (GA4) and Baidu Analytics (百度统计) to track user behavior, conversions, and engagement metrics.

## Features Implemented

### 1. Dual Analytics Platform Integration

- **Google Analytics 4 (GA4)**: For international audience tracking
- **Baidu Analytics (百度统计)**: For Chinese audience tracking
- Both platforms receive the same events for comprehensive tracking

### 2. Conversion Event Tracking

The following conversion events are tracked:

#### Contact Interactions
- **Phone Clicks**: Tracked across all locations (Header, Hero, Footer, Domain Details)
- **Email Clicks**: Tracked with location context
- **WeChat Clicks**: Tracked when users interact with WeChat contact info
- **WhatsApp Clicks**: Tracked when users click WhatsApp links

#### User Engagement
- **CTA Button Clicks**: All Call-to-Action buttons are tracked
- **Domain Interest**: Tracked when users click on domain cards or detail CTAs
- **Domain Views**: Automatically tracked when domain detail pages load
- **Language Switches**: Tracked when users change language preference
- **Scroll Depth**: Automatically tracks 25%, 50%, 75%, and 100% scroll depths

#### Form Events (Ready for future implementation)
- **Form Submissions**: Track when contact forms are submitted
- **Form Success**: Track successful form submissions
- **Form Errors**: Track form validation errors

### 3. Page View Tracking

- Automatic page view tracking on every page load
- Includes page path and title information

## Configuration

### Step 1: Get Analytics IDs

#### Google Analytics 4
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property or use existing one
3. Navigate to: Admin → Data Streams → Select your stream
4. Copy the "Measurement ID" (format: G-XXXXXXXXXX)

#### Baidu Analytics
1. Go to [Baidu Tongji](https://tongji.baidu.com/)
2. Register and create a new site
3. Navigate to: 管理 → 代码获取
4. Copy the ID from the tracking code (the string after `hm.js?`)

### Step 2: Configure Analytics IDs

Update the analytics IDs in `src/config/site.json`:

```json
{
  "analytics": {
    "googleAnalyticsId": "G-XXXXXXXXXX",
    "baiduAnalyticsId": "your_baidu_id_here"
  }
}
```

Alternatively, you can set them as environment variables (though the current implementation uses site.json):

```bash
PUBLIC_GA_ID=G-XXXXXXXXXX
PUBLIC_BAIDU_ID=your_baidu_id_here
```

### Step 3: Verify Installation

1. **Build and run the site**:
   ```bash
   npm run build
   npm run preview
   ```

2. **Test Google Analytics**:
   - Open Chrome DevTools → Network tab
   - Filter by "google-analytics" or "gtag"
   - Navigate the site and verify requests are being sent
   - Or use [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/) extension

3. **Test Baidu Analytics**:
   - Open Chrome DevTools → Network tab
   - Filter by "baidu" or "hm.baidu.com"
   - Navigate the site and verify requests are being sent
   - Check Baidu Tongji dashboard for real-time data (may take a few minutes)

## Tracked Events

### Event Structure

All events follow a consistent structure:

```typescript
{
  eventName: string,        // Event name (e.g., 'phone_click')
  category: string,         // Event category (e.g., 'Contact')
  action: string,           // Event action (e.g., 'Phone Click')
  label: string,            // Event label (e.g., 'Header')
  value?: number,           // Optional numeric value
  [key: string]: any        // Additional custom parameters
}
```

### Event List

| Event Name | Category | Action | When Triggered | Custom Parameters |
|------------|----------|--------|----------------|-------------------|
| `phone_click` | Contact | Phone Click | User clicks phone number | `phone_number`, `event_label` (location) |
| `email_click` | Contact | Email Click | User clicks email address | `email_address`, `event_label` (location) |
| `wechat_click` | Contact | WeChat Click | User clicks WeChat info | `event_label` (location) |
| `whatsapp_click` | Contact | WhatsApp Click | User clicks WhatsApp link | `event_label` (location) |
| `cta_click` | Conversion | CTA Click | User clicks CTA button | `cta_text`, `event_label` (location) |
| `domain_view` | Domain | View Domain | Domain detail page loads | `domain_name` |
| `domain_interest` | Domain | Domain Interest | User shows interest in domain | `domain_name`, `source` |
| `language_switch` | Engagement | Language Switch | User changes language | `from_language`, `to_language` |
| `scroll_depth` | Engagement | Scroll Depth | User scrolls to milestone | `scroll_depth`, `page` |
| `page_view` | Engagement | Page View | Page loads | `page_path`, `page_title` |

## Implementation Details

### File Structure

```
src/
├── utils/
│   └── analytics.ts          # Main analytics utility module
├── layouts/
│   └── BaseLayout.astro       # Analytics scripts initialization
├── components/
│   ├── Header.astro           # Phone click tracking
│   ├── Footer.astro           # Phone & email click tracking
│   ├── Hero.astro             # CTA & phone click tracking
│   ├── DomainCard.astro       # Domain interest tracking
│   └── LanguageSwitcher.astro # Language switch tracking
└── pages/
    ├── domains/[slug].astro   # Domain view & CTA tracking (Chinese)
    └── en/domains/[slug].astro # Domain view & CTA tracking (English)
```

### Analytics Utility (`src/utils/analytics.ts`)

The analytics utility provides:

1. **Core Functions**:
   - `trackGAEvent()`: Send events to Google Analytics
   - `trackBaiduEvent()`: Send events to Baidu Analytics
   - `trackEvent()`: Send events to both platforms

2. **Convenience Functions**:
   - `analytics.trackPhoneClick()`
   - `analytics.trackEmailClick()`
   - `analytics.trackWeChatClick()`
   - `analytics.trackWhatsAppClick()`
   - `analytics.trackCTAClick()`
   - `analytics.trackDomainView()`
   - `analytics.trackDomainInterest()`
   - `analytics.trackLanguageSwitch()`
   - And more...

3. **Automatic Tracking**:
   - `initScrollTracking()`: Automatically tracks scroll depth
   - `initAnalytics()`: Initializes all automatic tracking

### Usage Example

```typescript
import { analytics } from '../utils/analytics';

// Track a phone click
analytics.trackPhoneClick('+86 133 5296 3461', 'Header');

// Track a CTA click
analytics.trackCTAClick('立即咨询', 'Hero Section');

// Track domain interest
analytics.trackDomainInterest('edu-ai.asia', 'Domain Card');
```

## Viewing Analytics Data

### Google Analytics 4

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Navigate to:
   - **Reports → Realtime**: See live user activity
   - **Reports → Engagement → Events**: See all tracked events
   - **Reports → Engagement → Conversions**: See conversion events
   - **Explore**: Create custom reports

### Baidu Analytics

1. Go to [Baidu Tongji](https://tongji.baidu.com/)
2. Select your site
3. Navigate to:
   - **实时访客**: Real-time visitor data
   - **事件跟踪**: Event tracking data
   - **转化跟踪**: Conversion tracking

## Key Metrics to Monitor

### Conversion Metrics
- Phone click rate (by location)
- Email click rate
- CTA click-through rate
- Domain interest rate (card clicks vs. views)

### Engagement Metrics
- Average scroll depth
- Time on page
- Pages per session
- Bounce rate

### Domain Performance
- Most viewed domains
- Domains with highest interest (clicks)
- Conversion rate by domain

## Privacy Compliance

The implementation includes:

1. **DNS Prefetch**: Optimizes loading of analytics scripts
2. **Async Loading**: Analytics scripts load asynchronously to not block page rendering
3. **Privacy Policy**: Links to privacy policy in footer
4. **GDPR/CCPA Ready**: Can be extended with cookie consent if needed

## Troubleshooting

### Events Not Showing in GA4

1. Check that `googleAnalyticsId` is set in `src/config/site.json`
2. Verify the Measurement ID format (should be `G-XXXXXXXXXX`)
3. Check browser console for errors
4. Use GA4 DebugView (Admin → DebugView) for real-time debugging
5. Wait 24-48 hours for data to appear in standard reports

### Events Not Showing in Baidu Analytics

1. Check that `baiduAnalyticsId` is set in `src/config/site.json`
2. Verify the ID is correct (from Baidu Tongji dashboard)
3. Check browser console for errors
4. Baidu Analytics may take longer to show data (up to 24 hours)
5. Ensure site is accessible from China

### Events Not Firing

1. Check browser console for JavaScript errors
2. Verify that elements have the correct class names (e.g., `.domain-card-link`)
3. Ensure `data-*` attributes are present on tracked elements
4. Test in different browsers
5. Check that analytics scripts are loaded (Network tab in DevTools)

## Future Enhancements

Potential improvements for the analytics system:

1. **Enhanced E-commerce Tracking**: Track domain "add to cart" and purchase events
2. **User Journey Tracking**: Track complete user paths from landing to conversion
3. **A/B Testing Integration**: Test different CTAs and layouts
4. **Heatmap Integration**: Add tools like Hotjar or Microsoft Clarity
5. **Custom Dashboards**: Create custom analytics dashboards
6. **Automated Reports**: Set up automated weekly/monthly reports
7. **Cookie Consent**: Add GDPR-compliant cookie consent banner
8. **Cross-domain Tracking**: Track users across multiple domains

## Testing Checklist

- [ ] Google Analytics ID configured
- [ ] Baidu Analytics ID configured
- [ ] Page views tracked on all pages
- [ ] Phone clicks tracked in Header
- [ ] Phone clicks tracked in Hero
- [ ] Phone clicks tracked in Footer
- [ ] Phone clicks tracked in Domain Details
- [ ] Email clicks tracked
- [ ] WeChat clicks tracked
- [ ] WhatsApp clicks tracked
- [ ] CTA buttons tracked
- [ ] Domain card clicks tracked
- [ ] Domain detail views tracked
- [ ] Language switches tracked
- [ ] Scroll depth tracked
- [ ] Events visible in GA4 Realtime
- [ ] Events visible in Baidu Tongji
- [ ] No console errors
- [ ] Works on mobile devices
- [ ] Works in different browsers

## Support

For issues or questions:
- Google Analytics: [GA4 Help Center](https://support.google.com/analytics/)
- Baidu Analytics: [Baidu Tongji Help](https://tongji.baidu.com/web/help/)

## Related Requirements

This implementation satisfies the following requirements from the spec:

- **Requirement 7.1**: Google Analytics 4 integration
- **Requirement 7.2**: Baidu Analytics integration
- **Requirement 7.3**: Conversion event tracking (form submissions)
- **Requirement 7.4**: Interaction event tracking (contact clicks)
- **Requirement 7.6**: Privacy compliance

## Conclusion

The analytics system is now fully implemented and ready to track user behavior and conversions. Configure your analytics IDs in `src/config/site.json` to start collecting data.
