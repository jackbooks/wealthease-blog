# WealthEase Blog

个人博客网站，专注于分享财富管理、投资理财和个人成长的知识与经验。

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **类型检查**: TypeScript
- **部署**: Vercel

## 功能特性

### 已实现功能
- ✅ 响应式设计，支持移动端
- ✅ 现代化UI设计
- ✅ 文章列表和详情页面
- ✅ 分类管理
- ✅ 标签系统
- ✅ 搜索功能
- ✅ 订阅功能
- ✅ 作者介绍页面

### 待开发功能
- 🔄 后台管理系统
- 🔄 评论系统
- 🔄 用户认证
- 🔄 文章收藏
- 🔄 数据统计
- 🔄 SEO优化

## 项目结构

```
wealthease-blog/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   ├── articles/          # 文章列表页
│   ├── article/[id]/      # 文章详情页
│   ├── categories/        # 分类页面
│   └── about/             # 关于页面
├── components/            # 可复用组件
│   ├── Header.tsx         # 头部导航
│   └── ArticleCard.tsx    # 文章卡片
├── public/               # 静态资源
└── package.json          # 项目依赖
```

## 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

### 启动生产服务器

```bash
npm start
# 或
yarn start
```

## 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 连接 GitHub 仓库
3. 自动部署，域名配置为 wealthease.top

### 环境变量

创建 `.env.local` 文件：

```env
# 数据库连接
DATABASE_URL=your_database_url

# 其他配置
NEXT_PUBLIC_SITE_URL=https://wealthease.top
```

## 自定义配置

### 主题颜色

在 `tailwind.config.js` 中修改主色调：

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    500: '#3b82f6',  // 修改这里
    600: '#2563eb',
    700: '#1d4ed8',
  }
}
```

### 网站信息

在 `app/layout.tsx` 中修改网站元数据：

```typescript
export const metadata: Metadata = {
  title: '你的网站标题',
  description: '你的网站描述',
  // ...
}
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License