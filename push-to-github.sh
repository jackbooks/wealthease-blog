#!/bin/bash

# WealthEase 博客项目 GitHub 推送脚本

echo "🚀 开始推送到 GitHub..."

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

# 检查 Git 状态
echo "📊 检查 Git 状态..."
git status

echo ""
echo "📝 提交信息："
git log -1 --oneline

echo ""
echo "🔗 当前远程仓库配置："
git remote -v

echo ""
echo "📋 下一步操作："
echo "1. 请先在 GitHub 上创建仓库：https://github.com/new"
echo "2. 仓库名称：wealthease-blog"
echo "3. 描述：Personal blog for wealthease.top - Wealth management and investment knowledge sharing"
echo "4. 选择 Public"
echo "5. 不要勾选 'Initialize this repository with a README'"
echo "6. 点击 'Create repository'"
echo ""
echo "📤 创建完成后，运行以下命令推送代码："
echo "git remote add origin https://github.com/jackbooks/wealthease-blog.git"
echo "git push -u origin main"
echo ""
echo "✅ 推送成功后，就可以在 Vercel 部署了！"