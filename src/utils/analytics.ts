/**
 * Analytics utility for tracking events in Google Analytics and Baidu Analytics
 */

// Google Analytics 4 event tracking
export function trackGAEvent(
  eventName: string,
  eventParams?: Record<string, any>
) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
}

// Baidu Analytics event tracking
export function trackBaiduEvent(
  category: string,
  action: string,
  label?: string,
  value?: number
) {
  if (typeof window !== 'undefined' && (window as any)._hmt) {
    (window as any)._hmt.push(['_trackEvent', category, action, label, value]);
  }
}

// Combined tracking function for both platforms
export function trackEvent(
  eventName: string,
  params?: {
    category?: string;
    action?: string;
    label?: string;
    value?: number;
    [key: string]: any;
  }
) {
  // Track in Google Analytics
  trackGAEvent(eventName, params);
  
  // Track in Baidu Analytics
  if (params?.category && params?.action) {
    trackBaiduEvent(
      params.category,
      params.action,
      params.label,
      params.value
    );
  }
}

// Conversion tracking functions
export const analytics = {
  // Track phone click
  trackPhoneClick: (phone: string, location: string) => {
    trackEvent('phone_click', {
      category: 'Contact',
      action: 'Phone Click',
      label: location,
      phone_number: phone,
      event_category: 'engagement',
      event_label: location,
    });
  },

  // Track email click
  trackEmailClick: (email: string, location: string) => {
    trackEvent('email_click', {
      category: 'Contact',
      action: 'Email Click',
      label: location,
      email_address: email,
      event_category: 'engagement',
      event_label: location,
    });
  },

  // Track WeChat click
  trackWeChatClick: (location: string) => {
    trackEvent('wechat_click', {
      category: 'Contact',
      action: 'WeChat Click',
      label: location,
      event_category: 'engagement',
      event_label: location,
    });
  },

  // Track WhatsApp click
  trackWhatsAppClick: (location: string) => {
    trackEvent('whatsapp_click', {
      category: 'Contact',
      action: 'WhatsApp Click',
      label: location,
      event_category: 'engagement',
      event_label: location,
    });
  },

  // Track CTA button click
  trackCTAClick: (ctaText: string, location: string) => {
    trackEvent('cta_click', {
      category: 'Conversion',
      action: 'CTA Click',
      label: `${ctaText} - ${location}`,
      event_category: 'engagement',
      event_label: location,
      cta_text: ctaText,
    });
  },

  // Track domain view
  trackDomainView: (domainName: string) => {
    trackEvent('domain_view', {
      category: 'Domain',
      action: 'View Domain',
      label: domainName,
      event_category: 'engagement',
      domain_name: domainName,
    });
  },

  // Track domain interest (when user clicks to see details)
  trackDomainInterest: (domainName: string, source: string) => {
    trackEvent('domain_interest', {
      category: 'Domain',
      action: 'Domain Interest',
      label: domainName,
      event_category: 'engagement',
      domain_name: domainName,
      source: source,
    });
  },

  // Track form submission
  trackFormSubmit: (formName: string, domainName?: string) => {
    trackEvent('form_submit', {
      category: 'Conversion',
      action: 'Form Submit',
      label: formName,
      event_category: 'conversion',
      form_name: formName,
      domain_name: domainName,
      value: 1,
    });
  },

  // Track form submission success
  trackFormSuccess: (formName: string, domainName?: string) => {
    trackEvent('form_success', {
      category: 'Conversion',
      action: 'Form Success',
      label: formName,
      event_category: 'conversion',
      form_name: formName,
      domain_name: domainName,
      value: 1,
    });
  },

  // Track form submission error
  trackFormError: (formName: string, errorMessage: string) => {
    trackEvent('form_error', {
      category: 'Error',
      action: 'Form Error',
      label: `${formName} - ${errorMessage}`,
      event_category: 'error',
      form_name: formName,
      error_message: errorMessage,
    });
  },

  // Track language switch
  trackLanguageSwitch: (fromLang: string, toLang: string) => {
    trackEvent('language_switch', {
      category: 'Engagement',
      action: 'Language Switch',
      label: `${fromLang} to ${toLang}`,
      event_category: 'engagement',
      from_language: fromLang,
      to_language: toLang,
    });
  },

  // Track social share
  trackSocialShare: (platform: string, domainName: string) => {
    trackEvent('social_share', {
      category: 'Engagement',
      action: 'Social Share',
      label: `${platform} - ${domainName}`,
      event_category: 'engagement',
      platform: platform,
      domain_name: domainName,
    });
  },

  // Track page scroll depth
  trackScrollDepth: (depth: number, page: string) => {
    trackEvent('scroll_depth', {
      category: 'Engagement',
      action: 'Scroll Depth',
      label: `${depth}% - ${page}`,
      event_category: 'engagement',
      scroll_depth: depth,
      page: page,
      value: depth,
    });
  },

  // Track outbound link click
  trackOutboundLink: (url: string, location: string) => {
    trackEvent('outbound_link', {
      category: 'Engagement',
      action: 'Outbound Link',
      label: url,
      event_category: 'engagement',
      url: url,
      location: location,
    });
  },
};

// Scroll depth tracking (automatically tracks 25%, 50%, 75%, 100%)
export function initScrollTracking() {
  if (typeof window === 'undefined') return;

  const scrollDepths = [25, 50, 75, 100];
  const trackedDepths = new Set<number>();

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;

    scrollDepths.forEach(depth => {
      if (scrolled >= depth && !trackedDepths.has(depth)) {
        trackedDepths.add(depth);
        analytics.trackScrollDepth(depth, window.location.pathname);
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

// Initialize analytics tracking
export function initAnalytics() {
  if (typeof window === 'undefined') return;

  // Initialize scroll tracking
  initScrollTracking();

  // Track page view
  trackEvent('page_view', {
    category: 'Engagement',
    action: 'Page View',
    label: window.location.pathname,
    page_path: window.location.pathname,
    page_title: document.title,
  });
}
