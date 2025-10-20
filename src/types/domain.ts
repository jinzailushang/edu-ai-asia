export type DomainStatus = 'available' | 'sold' | 'reserved';
export type Language = 'zh' | 'en';

export interface DomainContent {
  tagline: string;
  description: string;
  fullDescription: string;
  useCases: string[];
  features: string[];
  valueProposition: string;
}

export interface Domain {
  id: string;
  name: string;
  status: DomainStatus;
  featured: boolean;
  
  content: {
    zh: DomainContent;
    en: DomainContent;
  };
  
  seo: {
    keywords: string[];
    ogImage?: string;
  };
  
  category: string;
  tags: string[];
  
  priceRange?: string;
  registrationDate?: string;
  expirationDate?: string;
}

export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  defaultLocale: Language;
  
  contact: {
    phone: string;
    email: string;
    wechat?: string;
    whatsapp?: string;
  };
  
  seo: {
    defaultTitle: {
      zh: string;
      en: string;
    };
    defaultDescription: {
      zh: string;
      en: string;
    };
    keywords: string[];
  };
  
  analytics: {
    googleAnalyticsId?: string;
    baiduAnalyticsId?: string;
  };
  
  social?: {
    twitter?: string;
    linkedin?: string;
  };
}
