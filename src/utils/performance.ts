/**
 * 性能优化工具函数
 * Performance optimization utilities
 */

/**
 * 图片懒加载配置
 * Image lazy loading configuration
 */
export const lazyLoadConfig = {
  rootMargin: '50px', // 提前 50px 开始加载
  threshold: 0.01,
  loading: 'lazy' as const,
};

/**
 * 预加载关键资源
 * Preload critical resources
 */
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // 预加载关键字体（如果使用自定义字体）
  const criticalFonts = [
    // 添加关键字体 URL
  ];

  criticalFonts.forEach((fontUrl) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = fontUrl;
    document.head.appendChild(link);
  });
}

/**
 * 预连接到外部域名
 * Preconnect to external domains
 */
export const preconnectDomains = [
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
  'https://hm.baidu.com',
];

/**
 * DNS 预取域名
 * DNS prefetch domains
 */
export const dnsPrefetchDomains = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
];

/**
 * 防抖函数 - 优化滚动和调整大小事件
 * Debounce function for scroll and resize events
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * 节流函数 - 限制函数执行频率
 * Throttle function to limit execution frequency
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * 检测是否支持 WebP
 * Check if WebP is supported
 */
export function supportsWebP(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);

  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * 检测是否支持 AVIF
 * Check if AVIF is supported
 */
export function supportsAVIF(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);

  return new Promise((resolve) => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src =
      'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
}

/**
 * 获取优化的图片格式
 * Get optimized image format
 */
export async function getOptimizedImageFormat(): Promise<'avif' | 'webp' | 'jpg'> {
  if (await supportsAVIF()) return 'avif';
  if (await supportsWebP()) return 'webp';
  return 'jpg';
}

/**
 * 交叉观察器配置 - 用于懒加载
 * Intersection Observer configuration for lazy loading
 */
export function createLazyLoadObserver(
  callback: (entry: IntersectionObserverEntry) => void
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry);
        }
      });
    },
    {
      rootMargin: lazyLoadConfig.rootMargin,
      threshold: lazyLoadConfig.threshold,
    }
  );
}

/**
 * 资源提示类型
 * Resource hint types
 */
export type ResourceHint = 'preload' | 'prefetch' | 'preconnect' | 'dns-prefetch';

/**
 * 添加资源提示
 * Add resource hint
 */
export function addResourceHint(
  href: string,
  rel: ResourceHint,
  options?: {
    as?: string;
    type?: string;
    crossOrigin?: string;
  }
): void {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;

  if (options?.as) link.setAttribute('as', options.as);
  if (options?.type) link.setAttribute('type', options.type);
  if (options?.crossOrigin) link.setAttribute('crossorigin', options.crossOrigin);

  document.head.appendChild(link);
}

/**
 * 批量添加资源提示
 * Batch add resource hints
 */
export function addResourceHints(
  hints: Array<{
    href: string;
    rel: ResourceHint;
    as?: string;
    type?: string;
    crossOrigin?: string;
  }>
): void {
  hints.forEach((hint) => {
    addResourceHint(hint.href, hint.rel, {
      as: hint.as,
      type: hint.type,
      crossOrigin: hint.crossOrigin,
    });
  });
}
