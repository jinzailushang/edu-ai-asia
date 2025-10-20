# 快速测试指南
## Quick Testing Guide

这是一个快速参考指南，帮助你立即开始测试网站。

---

## 🚀 快速开始

### 1. 运行自动化测试（推荐）

```bash
# 运行完整的自动化测试套件
./test-website.sh
```

**预期结果:**
```
✅ Passed: 34
❌ Failed: 0
⚠️  Warnings: 0
All critical tests passed!
```

---

### 2. 手动测试网站

#### 启动预览服务器
```bash
# 构建网站
npm run build

# 启动预览服务器
npm run preview
```

#### 在浏览器中打开
```
http://localhost:4321
```

---

## ✅ 5分钟测试清单

### 首页测试
- [ ] 打开 http://localhost:4321
- [ ] 页面加载正常
- [ ] 点击"EN"切换到英文
- [ ] 点击"中文"切换回中文
- [ ] 点击一个域名卡片
- [ ] 点击"立即咨询"按钮
- [ ] 点击电话号码

### 域名详情页测试
- [ ] 查看域名信息完整
- [ ] 面包屑导航显示
- [ ] 点击"首页"返回
- [ ] 切换语言查看英文版

### 移动端测试
- [ ] 按F12打开开发者工具
- [ ] 点击设备模拟图标
- [ ] 选择iPhone或Android设备
- [ ] 测试触摸交互
- [ ] 测试语言切换

---

## 🎯 关键功能验证

### ✅ 多语言切换
```
1. 点击右上角"EN"
2. URL变为 /en/
3. 内容变为英文
4. 点击"中文"
5. URL变为 /
6. 内容变为中文
```

### ✅ 域名筛选
```
1. 滚动到"全部域名"区域
2. 点击"AI教育"按钮
3. 只显示AI教育类域名
4. 点击"全部"
5. 显示所有域名
```

### ✅ 联系功能
```
1. 点击电话号码链接
2. 应该打开拨号应用
3. 点击邮箱链接
4. 应该打开邮件客户端
```

---

## 📊 性能测试（可选）

### 运行Lighthouse测试
```bash
# 安装Lighthouse（如果还没安装）
npm install -g lighthouse

# 运行测试脚本
./lighthouse-test.sh
```

### 或使用Chrome DevTools
```
1. 打开网站
2. 按F12打开开发者工具
3. 点击"Lighthouse"标签
4. 选择所有类别
5. 点击"Generate report"
```

**目标分数:**
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 🔍 SEO验证

### 检查Meta标签
```bash
# 查看首页的meta标签
curl http://localhost:4321 | grep -i "meta"
```

### 检查Sitemap
```
打开: http://localhost:4321/sitemap.xml
验证: 包含所有主要页面
```

### 检查结构化数据
```
1. 打开网站
2. 右键 → 查看源代码
3. 搜索 "application/ld+json"
4. 验证JSON格式正确
```

---

## 🌐 跨浏览器测试

### Chrome/Edge
```
✅ 已测试 - 主要开发浏览器
```

### Firefox
```
1. 在Firefox中打开网站
2. 测试所有功能
3. 检查控制台无错误
```

### Safari
```
1. 在Safari中打开网站
2. 测试移动端视图
3. 验证iOS兼容性
```

---

## 📱 移动设备测试

### 使用设备模拟器
```
1. Chrome DevTools (F12)
2. 点击设备图标 (Ctrl+Shift+M)
3. 选择设备:
   - iPhone 13 Pro
   - iPad Air
   - Samsung Galaxy S21
4. 测试所有功能
```

### 在真实设备上测试
```bash
# 获取本地IP地址
# macOS:
ipconfig getifaddr en0

# Linux:
hostname -I

# 在手机浏览器中访问:
# http://YOUR_IP:4321
```

---

## 🐛 常见问题排查

### 问题: 页面不显示
```bash
# 检查是否已构建
ls dist/

# 如果没有，运行构建
npm run build
```

### 问题: 语言切换不工作
```
1. 打开浏览器控制台 (F12)
2. 检查是否有JavaScript错误
3. 检查localStorage:
   localStorage.getItem('preferred-language')
```

### 问题: 样式不正确
```bash
# 清除缓存并重新构建
rm -rf dist/
npm run build
npm run preview
```

---

## 📋 测试报告

### 查看详细报告
- **完整测试报告:** `QA_TEST_REPORT.md`
- **浏览器测试指南:** `BROWSER_TESTING_GUIDE.md`
- **任务完成总结:** `TASK_15_COMPLETION_SUMMARY.md`

### 测试结果
```
✅ 自动化测试: 34/34 通过
✅ 构建测试: 通过
✅ 页面生成: 11个页面
✅ SEO元素: 完整
✅ 多语言: 正常
✅ 可访问性: 达标
```

---

## 🚀 准备部署

### 部署前检查清单
- [x] 所有测试通过
- [x] 构建成功
- [x] SEO元素完整
- [x] 多语言正常
- [ ] Lighthouse分数达标（运行lighthouse-test.sh）
- [ ] 跨浏览器测试完成
- [ ] 移动设备测试完成

### 部署命令
```bash
# 查看部署指南
cat DEPLOYMENT.md

# 或使用快速部署脚本
./deploy.sh
```

---

## 💡 提示

### 快速测试技巧
1. **使用自动化测试** - 最快速的验证方法
2. **测试关键路径** - 首页 → 域名详情 → 联系
3. **测试语言切换** - 最重要的功能之一
4. **检查控制台** - 确保无JavaScript错误
5. **测试移动端** - 使用设备模拟器

### 测试优先级
1. 🔴 **高优先级:** 页面加载、语言切换、联系功能
2. 🟡 **中优先级:** 域名筛选、导航、SEO元素
3. 🟢 **低优先级:** 动画效果、悬停状态、细节优化

---

## 📞 需要帮助？

如果遇到问题：
1. 查看 `QA_TEST_REPORT.md` 了解详细测试结果
2. 查看 `BROWSER_TESTING_GUIDE.md` 了解测试步骤
3. 检查浏览器控制台的错误信息
4. 联系开发团队

---

**祝测试顺利！** 🎉
