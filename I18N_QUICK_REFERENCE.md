# 多语言功能快速参考

## 🚀 快速开始

```bash
# 启动开发服务器
npm run dev

# 访问测试页面
open http://localhost:4321/test-i18n
```

## 📁 关键文件

| 文件 | 说明 |
|------|------|
| `src/utils/i18n.ts` | i18n 工具函数 |
| `src/components/LanguageSwitcher.astro` | 语言切换组件 |
| `src/locales/zh/common.json` | 中文翻译 |
| `src/locales/en/common.json` | 英文翻译 |

## 🔧 核心功能

### 1. 语言切换
```astro
<LanguageSwitcher locale={locale} currentPath={Astro.url.pathname} />
```

### 2. 使用翻译
```astro
---
const translations = await import(`../locales/${locale}/common.json`);
const t = translations.default;
---

<h1>{t.site.title}</h1>
```

### 3. 语言检测
```javascript
// 自动检测浏览器语言
const lang = detectBrowserLanguage();

// 保存语言偏好
localStorage.setItem('preferred-language', 'en');

// 获取语言偏好
const savedLang = localStorage.getItem('preferred-language');
```

## 🧪 测试命令

### 浏览器控制台
```javascript
// 查看当前语言偏好
localStorage.getItem('preferred-language')

// 切换到英文
localStorage.setItem('preferred-language', 'en')
location.reload()

// 切换到中文
localStorage.setItem('preferred-language', 'zh')
location.reload()

// 清除所有数据
localStorage.clear()
sessionStorage.clear()
location.reload()
```

## 📊 测试页面

| 页面 | URL |
|------|-----|
| 中文测试页 | http://localhost:4321/test-i18n |
| 英文测试页 | http://localhost:4321/en/test-i18n |
| 中文首页 | http://localhost:4321/ |
| 英文首页 | http://localhost:4321/en/ |

## ✅ 测试检查表

- [ ] 点击语言切换按钮，URL 正确更新
- [ ] 页面内容切换到目标语言
- [ ] 刷新页面，语言保持不变
- [ ] 清除数据后，自动检测浏览器语言
- [ ] 新标签页使用保存的语言偏好
- [ ] 控制台无错误

## 🎯 语言检测优先级

1. **localStorage** 中的 `preferred-language`（最高）
2. **浏览器语言** `navigator.language`
3. **默认语言** `zh`（中文）

## 🔑 存储键名

| 键名 | 存储位置 | 说明 |
|------|---------|------|
| `preferred-language` | localStorage | 用户语言偏好 |
| `has-visited` | sessionStorage | 会话访问标记 |

## 🌐 支持的语言

| 代码 | 语言 | URL 前缀 |
|------|------|---------|
| `zh` | 中文 | `/` |
| `en` | English | `/en/` |

## 📝 翻译结构

```json
{
  "site": {
    "title": "网站标题",
    "description": "网站描述"
  },
  "nav": {
    "home": "首页",
    "about": "关于我们"
  },
  "cta": {
    "contact": "立即咨询"
  }
}
```

## 🐛 常见问题

### Q: 语言切换没反应？
```javascript
// 检查 localStorage 是否可用
console.log(typeof localStorage !== 'undefined')

// 检查是否在隐私模式
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
  console.log('localStorage 可用');
} catch (e) {
  console.log('localStorage 不可用');
}
```

### Q: 自动检测不工作？
```javascript
// 清除会话标记
sessionStorage.removeItem('has-visited')
location.reload()
```

### Q: 翻译显示为键名？
```javascript
// 检查翻译文件是否加载
console.log(t)

// 检查键名是否存在
console.log(t.site.title)
```

## 📚 详细文档

- [I18N_IMPLEMENTATION.md](./I18N_IMPLEMENTATION.md) - 完整实现文档
- [MULTILINGUAL_TEST_GUIDE.md](./MULTILINGUAL_TEST_GUIDE.md) - 详细测试指南
- [TASK_8_COMPLETION_SUMMARY.md](./TASK_8_COMPLETION_SUMMARY.md) - 任务完成总结

## 🎨 自定义事件

```javascript
// 监听语言切换
window.addEventListener('languageChanged', (e) => {
  console.log('语言切换到:', e.detail.language);
});

// 触发语言切换事件
window.dispatchEvent(new CustomEvent('languageChanged', { 
  detail: { language: 'en' } 
}));
```

## 🔗 URL 结构

| 页面类型 | 中文 URL | 英文 URL |
|---------|---------|---------|
| 首页 | `/` | `/en/` |
| 域名详情 | `/domains/[slug]` | `/en/domains/[slug]` |
| 联系页 | `/contact` | `/en/contact` |
| 测试页 | `/test-i18n` | `/en/test-i18n` |

## 💡 最佳实践

1. **始终提供翻译**: 确保所有文本都有对应的翻译键
2. **使用语义化键名**: 如 `nav.home` 而不是 `text1`
3. **保持结构一致**: 中英文翻译文件结构应该相同
4. **测试所有页面**: 确保每个页面都支持多语言
5. **提供回退**: 如果翻译缺失，显示键名而不是报错

## 🚨 注意事项

- ⚠️ 首次访问时可能有短暂的重定向
- ⚠️ 隐私模式下 localStorage 可能不可用
- ⚠️ 清除浏览器数据会重置语言偏好
- ⚠️ 不同标签页共享语言偏好

---

**快速帮助**: 如有问题，请查看详细文档或在浏览器控制台运行测试命令
