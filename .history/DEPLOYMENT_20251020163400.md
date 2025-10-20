# 部署指南

本文档介绍如何将域名销售网站部署到 Vercel。

## 前置要求

- GitHub 账号
- Vercel 账号（可以使用 GitHub 登录）
- Git 已安装并配置

## 部署步骤

### 1. 准备代码仓库

如果还没有将代码推送到 GitHub：

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Domain sales website"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/your-username/your-repo.git

# 推送到 GitHub
git push -u origin main
```

### 2. 连接 Vercel

#### 方法 1：通过 Vercel 网站部署（推荐）

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "Add New Project"
4. 选择你的 GitHub 仓库
5. Vercel 会自动检测到 Astro 项目
6. 配置环境变量（见下文）
7. 点击 "Deploy"

#### 方法 2：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 部署到生产环境
vercel --prod
```

### 3. 配置环境变量

在 Vercel 项目设置中添加以下环境变量：

#### 必需的环境变量

无（项目可以在没有环境变量的情况下运行）

#### 可选的环境变量

**邮件服务（推荐配置）：**

```
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=contact@edu-ai.asia
```

获取 Resend API Key：
1. 访问 [Resend](https://resend.com)
2. 注册账号（免费套餐每月 3000 封邮件）
3. 创建 API Key
4. 将 API Key 添加到 Vercel 环境变量

**分析工具（可选）：**

```
PUBLIC_GA_ID=G-XXXXXXXXXX
PUBLIC_BAIDU_ID=xxxxxxxxxxxxxxxx
```

### 4. 配置自定义域名

1. 在 Vercel 项目设置中，进入 "Domains"
2. 添加你的域名（如 edu-ai.asia）
3. 按照 Vercel 的指引配置 DNS 记录：
   - 添加 A 记录指向 Vercel 的 IP
   - 或添加 CNAME 记录指向 Vercel 提供的域名
4. 等待 DNS 传播（通常几分钟到几小时）

### 5. 验证部署

部署完成后，访问以下页面确认一切正常：

- 首页：`https://your-domain.com/`
- 域名详情：`https://your-domain.com/domains/edu-ai-chat`
1. 访问联系页面
2. 填写表单并提交
3. 检查 Vercel 日志查看提交记录
4. 如果配置了邮件服务，检查邮箱

## 自动部署

Vercel 会自动为你的 GitHub 仓库设置 CI/CD：

- **主分支推送**：自动部署到生产环境
- **Pull Request**：自动创建预览部署
- **其他分支**：可以手动部署

## 性能优化

部署后，检查以下性能指标：

1. **Lighthouse 分数**：
   - 在 Chrome DevTools 中运行 Lighthouse
   - 目标：Performance > 90, SEO > 90

2. **Core Web Vitals**：
   - LCP < 2.5s
   - FID < 100ms
   - CLS < 0.1

3. **Vercel Analytics**：
   - 在 Vercel 项目设置中启用 Analytics
   - 监控实际用户性能数据

## 监控和维护

### 查看日志

```bash
# 使用 Vercel CLI 查看日志
vercel logs

# 或在 Vercel 网站的项目页面查看
```

### 更新网站

```bash
# 修改代码后
git add .
git commit -m "Update: description of changes"
git push

# Vercel 会自动重新部署
```

### 回滚部署

如果新部署出现问题：

1. 在 Vercel 项目页面，进入 "Deployments"
2. 找到之前的稳定版本
3. 点击 "Promote to Production"

## 常见问题

### Q: 联系表单提交失败

**A:** 检查以下几点：
1. Vercel Functions 是否正常运行（查看 Functions 日志）
2. 环境变量是否正确配置
3. 浏览器控制台是否有错误信息

### Q: 图片加载慢

**A:** 
1. 确保图片已优化（使用 WebP 格式）
2. 使用 Vercel 的图片优化功能
3. 考虑使用 CDN

### Q: 域名配置不生效

**A:**
1. 检查 DNS 记录是否正确
2. 等待 DNS 传播（最多 48 小时）
3. 使用 `dig` 或 `nslookup` 命令检查 DNS

### Q: 构建失败

**A:**
1. 检查 Vercel 构建日志
2. 确保 `package.json` 中的依赖版本正确
3. 本地运行 `npm run build` 测试

## 成本估算

使用 Vercel 免费套餐：

- **托管**：免费
- **带宽**：100GB/月（免费）
- **构建时间**：6000 分钟/月（免费）
- **Serverless Functions**：100GB-小时/月（免费）

对于这个项目，免费套餐完全足够。

## 下一步

部署成功后：

1. ✅ 配置 Google Search Console
2. ✅ 配置百度站长工具
3. ✅ 提交 sitemap
4. ✅ 设置 Google Analytics
5. ✅ 测试所有功能
6. ✅ 监控性能和错误

## 支持

如有问题，请查看：
- [Vercel 文档](https://vercel.com/docs)
- [Astro 文档](https://docs.astro.build)
- 项目 GitHub Issues
