# 快速部署指南

## 🚀 5分钟部署到 Vercel

### 步骤 1：准备 GitHub 仓库

```bash
# 如果还没有初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Ready for deployment"

# 创建 GitHub 仓库后，添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 推送代码
git push -u origin main
```

### 步骤 2：部署到 Vercel

#### 选项 A：通过网站部署（最简单）

1. 访问 https://vercel.com
2. 点击 "Sign Up" 或 "Log In"（使用 GitHub 账号登录）
3. 点击 "Add New..." → "Project"
4. 选择你的 GitHub 仓库
5. Vercel 会自动检测到 Astro 项目
6. 点击 "Deploy"
7. 等待 2-3 分钟，部署完成！

#### 选项 B：使用 CLI 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署到生产环境
vercel --prod
```

### 步骤 3：配置环境变量（可选）

如果你想启用邮件通知功能：

1. 注册 [Resend](https://resend.com)（免费）
2. 获取 API Key
3. 在 Vercel 项目设置中添加环境变量：
   - `RESEND_API_KEY`: 你的 Resend API Key
   - `CONTACT_EMAIL`: 接收邮件的地址

### 步骤 4：配置自定义域名（可选）

1. 在 Vercel 项目设置中，进入 "Domains"
2. 添加你的域名（如 edu-ai.asia）
3. 按照提示配置 DNS：
   - 添加 A 记录：`76.76.21.21`
   - 或 CNAME 记录：`cname.vercel-dns.com`
4. 等待 DNS 生效（几分钟到几小时）

### 步骤 5：验证部署

访问你的网站：
- Vercel 提供的域名：`https://your-project.vercel.app`
- 或你的自定义域名：`https://your-domain.com`

测试以下页面：
- ✅ 首页
- ✅ 域名详情页
- ✅ 联系页面
- ✅ 提交联系表单

## 🎉 完成！

你的域名销售网站现在已经上线了！

## 📊 下一步

1. **SEO 优化**
   - 提交 sitemap 到 Google Search Console
   - 提交到百度站长工具
   - 配置 Google Analytics

2. **内容更新**
   - 修改 `src/config/site.json` 中的联系信息
   - 在 `src/data/domains.json` 中添加更多域名
   - 更新网站文案

3. **监控**
   - 启用 Vercel Analytics
   - 查看访问日志
   - 监控表单提交

## ❓ 遇到问题？

### 构建失败
```bash
# 本地测试构建
npm run build

# 查看错误信息
```

### 表单不工作
- 检查 Vercel Functions 日志
- 查看浏览器控制台错误

### 域名配置问题
```bash
# 检查 DNS 配置
dig your-domain.com

# 或
nslookup your-domain.com
```

## 📞 需要帮助？

查看完整文档：[DEPLOYMENT.md](./DEPLOYMENT.md)
