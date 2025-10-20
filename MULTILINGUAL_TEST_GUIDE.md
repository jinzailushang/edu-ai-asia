# 多语言功能测试指南

## 快速开始

### 1. 启动开发服务器

```bash
npm run dev
```

服务器将在 `http://localhost:4321` 启动

### 2. 访问测试页面

打开浏览器访问以下页面：

- **中文测试页**: http://localhost:4321/test-i18n
- **英文测试页**: http://localhost:4321/en/test-i18n
- **中文首页**: http://localhost:4321/
- **英文首页**: http://localhost:4321/en/

## 测试清单

### ✅ 测试 1: 语言切换功能

**步骤：**
1. 访问中文首页 (http://localhost:4321/)
2. 点击右上角的 "EN" 按钮
3. 观察页面变化

**预期结果：**
- ✓ URL 变为 `/en/`
- ✓ 页面内容切换为英文
- ✓ 语言切换按钮高亮显示 "EN"
- ✓ 浏览器控制台显示：`Language preference saved: en`

**验证方法：**
```javascript
// 在浏览器控制台执行
localStorage.getItem('preferred-language') // 应该返回 "en"
```

---

### ✅ 测试 2: 语言偏好保存

**步骤：**
1. 切换到英文版本
2. 刷新页面 (F5 或 Cmd+R)

**预期结果：**
- ✓ 页面仍然显示英文版本
- ✓ URL 保持为 `/en/`
- ✓ 不会自动跳转回中文版

---

### ✅ 测试 3: 浏览器语言自动检测

**步骤：**
1. 打开浏览器控制台
2. 清除所有数据：
   ```javascript
   localStorage.clear();
   sessionStorage.clear();
   ```
3. 刷新页面或在新标签页打开首页

**预期结果：**
- ✓ 如果浏览器语言是中文 → 显示中文版
- ✓ 如果浏览器语言是英文 → 自动跳转到 `/en/`
- ✓ 其他语言 → 显示默认中文版

**查看浏览器语言：**
```javascript
// 在浏览器控制台执行
navigator.language // 例如: "zh-CN" 或 "en-US"
```

---

### ✅ 测试 4: 新标签页语言保持

**步骤：**
1. 在当前标签页切换到英文版
2. 打开新标签页
3. 访问网站首页 (http://localhost:4321/)

**预期结果：**
- ✓ 新标签页自动跳转到英文版 (`/en/`)
- ✓ 语言偏好在不同标签页间保持一致

---

### ✅ 测试 5: 跨页面语言保持

**步骤：**
1. 在英文首页点击任意域名卡片
2. 进入域名详情页

**预期结果：**
- ✓ 详情页 URL 为 `/en/domains/[slug]`
- ✓ 详情页内容显示为英文
- ✓ 语言切换器仍然高亮 "EN"

---

### ✅ 测试 6: 测试页面功能

**步骤：**
1. 访问测试页面 (http://localhost:4321/test-i18n)
2. 查看显示的信息

**预期结果：**
测试页面应该显示：
- ✓ 当前语言 (zh 或 en)
- ✓ 浏览器语言
- ✓ 保存的语言偏好
- ✓ 是否首次访问
- ✓ 所有翻译内容示例（导航、按钮、状态等）

---

## 浏览器控制台测试命令

### 查看当前状态
```javascript
// 查看保存的语言偏好
localStorage.getItem('preferred-language')

// 查看会话状态
sessionStorage.getItem('has-visited')

// 查看浏览器语言
navigator.language
```

### 手动设置语言
```javascript
// 设置为中文
localStorage.setItem('preferred-language', 'zh')
location.reload()

// 设置为英文
localStorage.setItem('preferred-language', 'en')
location.reload()
```

### 清除数据
```javascript
// 清除语言偏好
localStorage.removeItem('preferred-language')

// 清除会话标记
sessionStorage.removeItem('has-visited')

// 清除所有数据
localStorage.clear()
sessionStorage.clear()
```

### 监听语言切换事件
```javascript
window.addEventListener('languageChanged', (e) => {
  console.log('语言已切换到:', e.detail.language);
});
```

---

## 常见测试场景

### 场景 1: 首次访问用户（中文浏览器）
1. 清除所有数据
2. 浏览器语言设置为中文
3. 访问首页
4. **结果**: 显示中文版，不跳转

### 场景 2: 首次访问用户（英文浏览器）
1. 清除所有数据
2. 浏览器语言设置为英文
3. 访问首页
4. **结果**: 自动跳转到 `/en/`

### 场景 3: 回访用户（有语言偏好）
1. localStorage 中有 `preferred-language: en`
2. 访问首页
3. **结果**: 自动跳转到 `/en/`，无论浏览器语言是什么

### 场景 4: 用户主动切换语言
1. 在中文页面点击 "EN"
2. **结果**: 跳转到对应的英文页面，保存偏好
3. 后续访问都使用英文版

---

## 测试检查表

使用此检查表确保所有功能正常：

- [ ] 语言切换按钮可见且可点击
- [ ] 点击切换按钮后 URL 正确更新
- [ ] 点击切换按钮后页面内容正确切换
- [ ] 语言偏好保存到 localStorage
- [ ] 刷新页面后语言保持不变
- [ ] 新标签页打开时使用保存的语言偏好
- [ ] 首次访问时检测浏览器语言
- [ ] 清除数据后重新检测浏览器语言
- [ ] 所有页面（首页、详情页、联系页）都支持多语言
- [ ] 语言切换器在所有页面都正常工作
- [ ] 翻译内容完整且准确
- [ ] SEO 标签（hreflang）正确设置
- [ ] 控制台没有 JavaScript 错误

---

## 故障排除

### 问题 1: 点击语言切换按钮没有反应
**解决方法：**
1. 打开浏览器控制台查看错误
2. 确认 JavaScript 已加载
3. 检查 LanguageSwitcher 组件是否正确渲染

### 问题 2: 语言偏好没有保存
**解决方法：**
1. 检查浏览器是否允许 localStorage
2. 确认不在隐私/无痕模式
3. 查看控制台是否有存储相关错误

### 问题 3: 自动检测不工作
**解决方法：**
1. 确认已清除 sessionStorage
2. 检查 `has-visited` 标记
3. 验证浏览器语言设置

### 问题 4: 翻译内容显示为键名
**解决方法：**
1. 检查翻译文件路径是否正确
2. 确认翻译文件格式正确
3. 验证翻译键名是否存在

---

## 性能测试

### 测试页面加载速度
```javascript
// 在控制台执行
performance.timing.loadEventEnd - performance.timing.navigationStart
```

### 测试语言切换速度
1. 记录切换前时间
2. 点击语言切换按钮
3. 记录页面加载完成时间
4. 计算差值

**预期**: 语言切换应该在 1 秒内完成

---

## 自动化测试（可选）

如果需要自动化测试，可以使用以下工具：

### 使用 Playwright
```javascript
// test/i18n.spec.js
import { test, expect } from '@playwright/test';

test('language switcher works', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  
  // 点击英文按钮
  await page.click('a[data-lang="en"]');
  
  // 验证 URL
  await expect(page).toHaveURL(/\/en\//);
  
  // 验证 localStorage
  const lang = await page.evaluate(() => 
    localStorage.getItem('preferred-language')
  );
  expect(lang).toBe('en');
});
```

---

## 测试报告模板

完成测试后，使用此模板记录结果：

```
测试日期: [日期]
测试人员: [姓名]
浏览器: [Chrome/Safari/Firefox] [版本]
操作系统: [macOS/Windows/Linux]

测试结果:
✅ 测试 1: 语言切换功能 - 通过
✅ 测试 2: 语言偏好保存 - 通过
✅ 测试 3: 浏览器语言自动检测 - 通过
✅ 测试 4: 新标签页语言保持 - 通过
✅ 测试 5: 跨页面语言保持 - 通过
✅ 测试 6: 测试页面功能 - 通过

发现的问题:
[列出任何问题]

建议:
[列出改进建议]
```

---

## 下一步

完成测试后：

1. ✅ 标记任务 8 为完成
2. 📝 更新项目文档
3. 🚀 继续下一个任务（性能优化）

---

## 相关文档

- [I18N_IMPLEMENTATION.md](./I18N_IMPLEMENTATION.md) - 详细实现文档
- [test-i18n.html](./test-i18n.html) - 自动化测试套件
