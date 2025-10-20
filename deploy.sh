#!/bin/bash

# 域名销售网站部署脚本
# 使用方法: ./deploy.sh

set -e  # 遇到错误立即退出

echo "🚀 开始部署域名销售网站..."
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 检查 Node.js
echo "📦 检查 Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ 未找到 Node.js，请先安装 Node.js${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js 版本: $(node -v)${NC}"
echo ""

# 检查 npm
echo "📦 检查 npm..."
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ 未找到 npm${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm 版本: $(npm -v)${NC}"
echo ""

# 安装依赖
echo "📦 安装依赖..."
npm install
echo -e "${GREEN}✅ 依赖安装完成${NC}"
echo ""

# 构建项目
echo "🔨 构建项目..."
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 构建成功${NC}"
else
    echo -e "${RED}❌ 构建失败${NC}"
    exit 1
fi
echo ""

# 检查 Git 状态
echo "📝 检查 Git 状态..."
if [ -d .git ]; then
    if [ -n "$(git status --porcelain)" ]; then
        echo -e "${YELLOW}⚠️  有未提交的更改${NC}"
        echo ""
        git status --short
        echo ""
        read -p "是否提交这些更改？(y/n) " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            read -p "请输入提交信息: " commit_message
            git add .
            git commit -m "$commit_message"
            echo -e "${GREEN}✅ 更改已提交${NC}"
        fi
    else
        echo -e "${GREEN}✅ 没有未提交的更改${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  未初始化 Git 仓库${NC}"
    read -p "是否初始化 Git 仓库？(y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git init
        git add .
        read -p "请输入初始提交信息: " commit_message
        git commit -m "$commit_message"
        echo -e "${GREEN}✅ Git 仓库已初始化${NC}"
    fi
fi
echo ""

# 检查 Vercel CLI
echo "🔍 检查 Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  未找到 Vercel CLI${NC}"
    read -p "是否安装 Vercel CLI？(y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm install -g vercel
        echo -e "${GREEN}✅ Vercel CLI 已安装${NC}"
    else
        echo -e "${YELLOW}跳过 Vercel 部署${NC}"
        echo ""
        echo "你可以手动部署："
        echo "1. 访问 https://vercel.com"
        echo "2. 导入你的 GitHub 仓库"
        echo "3. 点击部署"
        exit 0
    fi
fi
echo ""

# 部署到 Vercel
echo "🚀 部署到 Vercel..."
read -p "是否部署到生产环境？(y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    vercel --prod
    echo -e "${GREEN}✅ 部署完成！${NC}"
else
    vercel
    echo -e "${GREEN}✅ 预览部署完成！${NC}"
fi
echo ""

echo "🎉 部署流程完成！"
echo ""
echo "下一步："
echo "1. 访问你的网站验证功能"
echo "2. 配置环境变量（如果需要）"
echo "3. 配置自定义域名（如果需要）"
echo "4. 提交 sitemap 到搜索引擎"
echo ""
echo "查看完整部署指南: DEPLOYMENT.md"
