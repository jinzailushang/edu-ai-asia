export const languages = {
  zh: '中文',
  en: 'English',
};

export const defaultLang = 'zh';

export type Language = keyof typeof languages;

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}

/**
 * 获取翻译函数
 * @param lang 语言代码
 * @param translations 翻译对象
 */
export function useTranslations(lang: Language, translations: any) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key} for language: ${lang}`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  }
}

/**
 * 从浏览器检测用户首选语言
 * 优先级：localStorage > navigator.language > defaultLang
 */
export function detectBrowserLanguage(): Language {
  // 1. 检查 localStorage
  if (typeof window !== 'undefined') {
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && savedLang in languages) {
      return savedLang as Language;
    }
    
    // 2. 检查浏览器语言
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) {
      return 'zh';
    } else if (browserLang.startsWith('en')) {
      return 'en';
    }
  }
  
  // 3. 返回默认语言
  return defaultLang;
}

/**
 * 保存用户语言偏好到 localStorage
 */
export function saveLanguagePreference(lang: Language): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-language', lang);
  }
}

/**
 * 获取当前语言的替代语言
 */
export function getAlternateLanguage(currentLang: Language): Language {
  return currentLang === 'zh' ? 'en' : 'zh';
}

/**
 * 构建语言切换的 URL
 */
export function buildLanguageSwitchUrl(currentPath: string, targetLang: Language): string {
  // 移除当前语言前缀
  const pathWithoutLang = currentPath.replace(/^\/(zh|en)/, '') || '/';
  
  // 添加目标语言前缀（中文不需要前缀）
  if (targetLang === 'zh') {
    return pathWithoutLang;
  } else {
    return `/en${pathWithoutLang}`;
  }
}
