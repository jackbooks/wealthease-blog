# 部署指南

## 部署到 Vercel

### 步骤 1: 准备代码

1. 确保所有代码已提交到 Git
2. 检查 `package.json` 中的依赖是否正确
3. 运行 `npm run build` 确保构建成功

### 步骤 2: 连接到 Vercel

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 导入你的 GitHub 仓库

### 步骤 3: 配置项目

在 Vercel 部署界面中：

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 步骤 4: 配置域名

1. 在项目设置中找到 "Domains"
2. 添加自定义域名 `wealthease.top`
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

## 环境变量配置

在 Vercel 项目设置中添加环境变量：

```env
NEXT_PUBLIC_SITE_URL=https://wealthease.top
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## 自动部署

Vercel 会自动在以下情况下触发部署：
- 推送到 `main` 分支
- 创建 Pull Request
- 手动触发部署

## 监控和日志

- 在 Vercel 仪表板查看部署状态
- 查看构建日志和错误信息
- 监控网站性能和访问统计

## 故障排除

### 构建失败

1. 检查 `npm run build` 在本地是否成功
2. 查看 Vercel 构建日志中的具体错误
3. 确保所有依赖都正确安装

### 域名无法访问

1. 检查 DNS 配置是否正确
2. 确认域名已在 Vercel 中验证
3. 等待 DNS 传播（最多 24 小时）

### 样式问题

1. 检查 Tailwind CSS 配置
2. 确保所有样式文件正确导入
3. 清除浏览器缓存

## 性能优化建议

1. 启用 Vercel 的 Edge Network
2. 配置图片优化
3. 使用 Next.js 的静态生成
4. 启用缓存策略

## 备份策略

1. 定期备份代码到 GitHub
2. 导出数据库备份（如果使用数据库）
3. 保存重要的环境变量