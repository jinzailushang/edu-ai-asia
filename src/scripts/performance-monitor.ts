/**
 * 性能监控和优化脚本
 * Performance monitoring and optimization script
 */

/**
 * 初始化性能监控
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  // 监控 Core Web Vitals
  monitorCoreWebVitals();

  // 初始化懒加载
  initLazyLoading();

  // 优化第三方脚本加载
  optimizeThirdPartyScripts();
}

/**
 * 监控 Core Web Vitals
 * Monitor Core Web Vitals
 */
function monitorCoreWebVitals() {
  // LCP - Largest Contentful Paint
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        
        // 发送到分析平台
        if (window.gtag) {
          window.gtag('event', 'LCP', {
            value: Math.round(lastEntry.renderTime || lastEntry.loadTime),
            event_category: 'Web Vitals',
            non_interaction: true,
          });
        }
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP monitoring not supported');
    }

    // FID - First Input Delay
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (window.gtag) {
            window.gtag('event', 'FID', {
              value: Math.round(entry.processingStart - entry.startTime),
              event_category: 'Web Vitals',
              non_interaction: true,
            });
          }
        });
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID monitoring not supported');
    }

    // CLS - Cumulative Layout Shift
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // 在页面卸载时发送 CLS
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden' && window.gtag) {
          window.gtag('event', 'CLS', {
            value: Math.round(clsValue * 1000),
            event_category: 'Web Vitals',
            non_interaction: true,
          });
        }
      });
    } catch (e) {
      console.warn('CLS monitoring not supported');
    }
  }
}

/**
 * 初始化图片懒加载
 * Initialize image lazy loading
 */
function initLazyLoading() {
  // 现代浏览器原生支持 loading="lazy"
  // 这里添加 IntersectionObserver 作为增强
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            
            // 如果有 data-src，则加载图片
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            
            // 如果有 data-srcset，则加载 srcset
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
              img.removeAttribute('data-srcset');
            }
            
            imageObserver.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    // 观察所有带有 data-src 的图片
    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

/**
 * 优化第三方脚本加载
 * Optimize third-party script loading
 */
function optimizeThirdPartyScripts() {
  // 延迟加载非关键第三方脚本
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      loadNonCriticalScripts();
    });
  } else {
    // 降级方案：使用 setTimeout
    setTimeout(loadNonCriticalScripts, 2000);
  }
}

/**
 * 加载非关键脚本
 * Load non-critical scripts
 */
function loadNonCriticalScripts() {
  // 这里可以添加需要延迟加载的脚本
  // 例如：社交媒体插件、聊天工具等
}

/**
 * 预取下一页资源
 * Prefetch next page resources
 */
export function prefetchNextPage(url: string) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });
  }
}

/**
 * 优化字体加载
 * Optimize font loading
 */
export function optimizeFontLoading() {
  if ('fonts' in document) {
    // 预加载关键字体
    document.fonts.ready.then(() => {
      // 字体加载完成后的回调
      document.body.classList.add('fonts-loaded');
    });
  }
}

/**
 * 防抖函数
 * Debounce function
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
 * 节流函数
 * Throttle function
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

// 类型声明
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    requestIdleCallback?: (callback: () => void) => void;
  }
}

// 自动初始化
if (typeof window !== 'undefined') {
  // 等待 DOM 加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPerformanceMonitoring);
  } else {
    initPerformanceMonitoring();
  }
}
