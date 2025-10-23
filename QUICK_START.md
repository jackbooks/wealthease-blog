# 快速开始指南

## 🚀 立即部署 WealthEase 博客

### 步骤 1: 创建 GitHub 仓库

1. **访问 GitHub**: https://github.com/new
2. **填写仓库信息**:
   - Owner: `jackbooks`
   - Repository name: `wealthease-blog`
   - Description: `Personal blog for wealthease.top - Wealth management and investment knowledge sharing`
   - Public: ✅ 选择公开
   - Initialize with README: ❌ **不要勾选**
3. **点击 "Create repository"**

### 步骤 2: 推送代码到 GitHub

在项目目录中运行以下命令：

```bash
cd "/Users/lhl/Downloads/web"

# 添加远程仓库
git remote add origin https://github.com/jackbooks/wealthease-blog.git

# 推送到 GitHub
git push -u origin main
```

### 步骤 3: 部署到 Vercel

1. **访问 Vercel**: https://vercel.com
2. **使用 GitHub 登录**
3. **导入项目**:
   - 点击 "New Project"
   - 选择 `jackbooks/wealthease-blog` 仓库
   - 点击 "Import"
4. **配置部署**:
   - Framework Preset: Next.js (自动检测)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - 点击 "Deploy"

### 步骤 4: 配置域名

1. 在 Vercel 项目设置中找到 "Domains"
2. 添加自定义域名: `wealthease.top`
3. 按照提示配置 DNS 记录

### DNS 配置示例

```
记录类型: CNAME
名称: www
值: cname.vercel-dns.com

记录类型: A
名称: @
值: 76.76.21.21
```

## 📱 本地开发

### 启动开发服务器

```bash
cd "/Users/lhl/Downloads/web"
npm run dev
```

访问: http://localhost:3000

### 构建生产版本

```bash
npm run build
npm start
```

## 🎯 项目特色

- ✅ **现代化技术栈**: Next.js 14 + TypeScript + Tailwind CSS
- ✅ **完整博客功能**: 文章、分类、标签、搜索
- ✅ **响应式设计**: 完美适配所有设备
- ✅ **财富管理主题**: 专业的内容定位
- ✅ **部署就绪**: 一键部署到 Vercel

## 📞 技术支持

如果遇到任何问题：

1. 检查构建日志: `npm run build`
2. 查看开发服务器输出
3. 检查 GitHub 仓库是否正确创建
4. 验证 Vercel 部署配置

## 🎉 完成！

部署完成后，你的博客将可以通过以下地址访问：
- Vercel 临时域名: `https://wealthease-blog.vercel.app`
- 自定义域名: `https://wealthease.top`

开始发布你的财富管理知识吧！