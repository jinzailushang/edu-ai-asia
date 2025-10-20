# 多语言功能实现文档

## 概述

本文档描述了域名销售网站的多语言（i18n）功能实现，包括语言切换、自动检测和偏好保存。

## 功能特性

### 1. 支持的语言
- 中文 (zh) - 默认语言
- 英文 (en)

### 2. 核心功能

#### 2.1 浏览器语言自动检测
- 首次访问时自动检测浏览器语言设置
- 根据检测结果自动跳转到对应语言版本
- 检测逻辑：
  - 如果浏览器语言以 'zh' 开头 → 使用中文
  - 如果浏览器语言以 'en' 开头 → 使用英文
  - 其他情况 → 使用默认语言（中文）

#### 2.2 语言偏好保存
- 用户切换语言后，偏好自动保存到 localStorage
- 存储键名：`preferred-language`
- 可能的值：`zh` 或 `en`

#### 2.3 语言切换
- 通过 LanguageSwitcher 组件实现
- 点击语言按钮后：
  1. 保存语言偏好到 localStorage
  2. 触发 `languageChanged` 自定义事件
  3. 跳转到对应语言的页面

#### 2.4 会话管理
- 使用 sessionStorage 标记用户是否已访问
- 存储键名：`has-visited`
- 防止在同一会话中重复重定向

## 文件结构

```
src/
├── utils/
│   └── i18n.ts                    # i18n 工具函数
├── components/
│   └── LanguageSwitcher.astro     # 语言切换组件
├── locales/
│   ├── zh/
│   │   └── common.json            # 中文翻译
│   └── en/
│       └── common.json            # 英文翻译
├── pages/
│   ├── index.astro                # 中文首页
│   ├── test-i18n.astro            # 中文测试页
│   └── en/
│       ├── index.astro            # 英文首页
│       └── test-i18n.astro        # 英文测试页
└── layouts/
    └── BaseLayout.astro           # 基础布局（包含 hreflang 标签）
```

## 实现细节

### 1. i18n 工具函数 (`src/utils/i18n.ts`)

```typescript
// 支持的语言
export const languages = {
  zh: '中文',
  en: 'English',
};

// 默认语言
export const defaultLang = 'zh';

// 从 URL 获取语言
export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}

// 浏览器语言检测
export function detectBrowserLanguage(): Language {
  if (typeof window !== 'undefined') {
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && savedLang in languages) {
      return savedLang as Language;
    }
    
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.startsWith('en')) return 'en';
  }
  return defaultLang;
}

// 保存语言偏好
export function saveLanguagePreference(lang: Language): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-language', lang);
  }
}

// 构建语言切换 URL
export function buildLanguageSwitchUrl(currentPath: string, targetLang: Language): string {
  const pathWithoutLang = currentPath.replace(/^\/(zh|en)/, '') || '/';
  if (targetLang === 'zh') {
    return pathWithoutLang;
  } else {
    return `/en${pathWithoutLang}`;
  }
}
```

### 2. 语言切换组件 (`src/components/LanguageSwitcher.astro`)

组件包含以下功能：

1. **显示当前语言和切换选项**
   - 高亮显示当前语言
   - 提供切换到其他语言的链接

2. **首次访问检测和重定向**
   ```javascript
   function handleFirstVisit() {
     const hasVisited = sessionStorage.getItem('has-visited');
     if (hasVisited) return;
     
     sessionStorage.setItem('has-visited', 'true');
     
     const savedLang = localStorage.getItem('preferred-language');
     const currentLang = getCurrentLanguage();
     
     let preferredLang = savedLang || detectBrowserLanguage();
     
     if (preferredLang !== currentLang) {
       const targetUrl = buildLanguageUrl(preferredLang);
       window.location.replace(targetUrl);
     }
   }
   ```

3. **语言切换事件处理**
   ```javascript
   langLinks.forEach(link => {
     link.addEventListener('click', (e) => {
       const targetLang = link.getAttribute('data-lang');
       if (targetLang) {
         localStorage.setItem('preferred-language', targetLang);
         window.dispatchEvent(new CustomEvent('languageChanged', { 
           detail: { language: targetLang } 
         }));
       }
     });
   });
   ```

### 3. 翻译文件结构

翻译文件使用 JSON 格式，支持嵌套结构：

```json
{
  "site": {
    "title": "网站标题",
    "description": "网站描述"
  },
  "nav": {
    "home": "首页",
    "about": "关于我们"
  }
}
```

使用方式：
```astro
---
const translations = await import(`../locales/${locale}/common.json`);
const t = translations.default;
---

<h1>{t.site.title}</h1>
```

### 4. SEO 优化

在 `BaseLayout.astro` 中实现了完整的多语言 SEO 支持：

```html
<!-- hreflang 标签 -->
<link rel="alternate" hreflang="zh" href="https://edu-ai.asia/" />
<link rel="alternate" hreflang="en" href="https://edu-ai.asia/en/" />
<link rel="alternate" hreflang="zh-CN" href="https://edu-ai.asia/" />
<link rel="alternate" hreflang="en-US" href="https://edu-ai.asia/en/" />
<link rel="alternate" hreflang="x-default" href="https://edu-ai.asia/" />

<!-- Open Graph 语言标签 -->
<meta property="og:locale" content={locale === 'zh' ? 'zh_CN' : 'en_US'} />
<meta property="og:locale:alternate" content={locale === 'zh' ? 'en_US' : 'zh_CN'} />
```

## 测试指南

### 1. 使用测试页面

访问测试页面来验证多语言功能：
- 中文测试页：`http://localhost:4321/test-i18n`
- 英文测试页：`http://localhost:4321/en/test-i18n`

测试页面显示：
- 当前语言设置
- 浏览器语言
- 保存的语言偏好
- 是否首次访问
- 所有翻译内容示例

### 2. 使用测试套件

打开 `test-i18n.html` 文件进行自动化测试：

```bash
# 在浏览器中打开
open test-i18n.html
```

测试套件包含：
1. 浏览器语言检测测试
2. 语言偏好保存测试
3. 语言切换功能测试

### 3. 手动测试步骤

#### 测试 1: 首次访问自动检测
1. 清除浏览器的 localStorage 和 sessionStorage
2. 访问网站首页 `http://localhost:4321/`
3. 验证是否根据浏览器语言自动跳转

#### 测试 2: 语言切换
1. 访问中文首页
2. 点击右上角的 "EN" 按钮
3. 验证：
   - URL 变为 `/en/`
   - 页面内容切换为英文
   - localStorage 中保存了 `preferred-language: en`

#### 测试 3: 语言偏好保持
1. 切换到英文版本
2. 刷新页面
3. 验证页面仍然显示英文版本

#### 测试 4: 新标签页测试
1. 设置语言偏好为英文
2. 在新标签页中打开网站首页
3. 验证自动跳转到英文版本

### 4. 浏览器控制台测试

在浏览器控制台中执行以下命令进行测试：

```javascript
// 查看当前语言偏好
localStorage.getItem('preferred-language')

// 设置语言偏好
localStorage.setItem('preferred-language', 'en')

// 清除语言偏好
localStorage.removeItem('preferred-language')

// 查看会话状态
sessionStorage.getItem('has-visited')

// 清除会话状态
sessionStorage.removeItem('has-visited')

// 监听语言切换事件
window.addEventListener('languageChanged', (e) => {
  console.log('Language changed to:', e.detail.language);
});
```

## 常见问题

### Q1: 为什么首次访问没有自动跳转？
A: 检查以下几点：
- 确保 sessionStorage 中没有 `has-visited` 标记
- 确保 JavaScript 已正确加载
- 检查浏览器控制台是否有错误

### Q2: 语言偏好没有保存？
A: 检查：
- 浏览器是否允许 localStorage
- 是否在隐私模式下浏览
- 检查浏览器控制台的错误信息

### Q3: 切换语言后页面没有变化？
A: 确认：
- URL 是否正确更新
- 对应语言的页面文件是否存在
- 翻译文件是否正确加载

## 性能优化

1. **翻译文件按需加载**
   - 只加载当前语言的翻译文件
   - 使用动态 import

2. **避免重复重定向**
   - 使用 sessionStorage 标记已访问
   - 只在首次访问时检测和重定向

3. **缓存语言偏好**
   - 使用 localStorage 持久化保存
   - 减少重复检测

## 未来改进

1. **添加更多语言**
   - 日语 (ja)
   - 韩语 (ko)
   - 其他语言

2. **语言检测增强**
   - 支持地区变体（如 zh-CN, zh-TW）
   - 更智能的语言匹配

3. **翻译管理**
   - 集成翻译管理平台
   - 自动化翻译流程

4. **A/B 测试**
   - 测试不同语言版本的转化率
   - 优化多语言用户体验

## 相关资源

- [Astro i18n 文档](https://docs.astro.build/en/guides/internationalization/)
- [Web.dev i18n 最佳实践](https://web.dev/i18n/)
- [hreflang 标签指南](https://developers.google.com/search/docs/advanced/crawling/localized-versions)
