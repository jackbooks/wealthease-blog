'use client'

import { motion } from 'framer-motion'
import { Calendar, User, Tag, Share2, Bookmark, Eye } from 'lucide-react'

// 模拟文章数据
const article = {
  id: 1,
  title: '如何开始个人理财规划',
  content: `
    <p>个人理财规划是实现财务自由的第一步，也是最重要的一步。无论你的收入水平如何，制定一个合理的理财计划都能帮助你更好地管理财务，实现人生目标。</p>

    <h2>为什么要制定理财规划？</h2>
    <p>理财规划不仅仅是关于赚钱和存钱，它涉及到你生活的方方面面：</p>
    <ul>
      <li>明确财务目标</li>
      <li>建立应急基金</li>
      <li>规划退休生活</li>
      <li>管理债务</li>
      <li>实现资产增值</li>
    </ul>

    <h2>理财规划的基本步骤</h2>
    <h3>1. 评估当前财务状况</h3>
    <p>首先需要了解自己的收入、支出、资产和负债情况。制作一个详细的资产负债表，明确自己的净资产。</p>

    <h3>2. 设定明确的财务目标</h3>
    <p>将目标分为短期（1年内）、中期（1-5年）和长期（5年以上）目标。确保每个目标都是具体的、可衡量的、可实现的、相关的和有时间限制的。</p>

    <h3>3. 制定预算计划</h3>
    <p>建立月度预算，跟踪收入和支出。推荐使用50/30/20法则：50%用于必要支出，30%用于想要支出，20%用于储蓄和投资。</p>

    <h3>4. 建立应急基金</h3>
    <p>准备3-6个月的生活费用作为应急基金，存放在容易取用的账户中。</p>

    <h3>5. 开始投资</h3>
    <p>根据风险承受能力和投资目标，选择合适的投资工具。对于初学者，建议从指数基金开始。</p>

    <h2>常见的理财误区</h2>
    <p>在制定理财规划时，需要避免以下常见误区：</p>
    <ul>
      <li>过度关注短期收益</li>
      <li>忽视通货膨胀的影响</li>
      <li>没有定期检视和调整计划</li>
      <li>跟风投资，缺乏独立思考</li>
    </ul>

    <h2>总结</h2>
    <p>个人理财规划是一个持续的过程，需要定期检视和调整。记住，理财的最终目的是为了实现更好的生活质量，而不仅仅是积累财富。</p>
  `,
  excerpt: '学习如何制定个人理财计划，建立健康的财务习惯，实现财富自由的第一步。',
  date: '2024-01-15',
  category: '理财基础',
  tags: ['理财', '规划', '基础', '财务自由'],
  readTime: '5分钟',
  views: 1250,
  author: {
    name: 'WealthEase',
    bio: '财富管理爱好者，专注于分享实用的理财知识和投资策略。'
  }
}

const relatedArticles = [
  {
    id: 2,
    title: '投资组合多样化策略',
    excerpt: '了解如何通过资产配置和风险分散来构建稳健的投资组合。',
    date: '2024-01-12',
    readTime: '8分钟'
  },
  {
    id: 3,
    title: '被动收入的重要性',
    excerpt: '探讨被动收入在财富积累中的作用以及如何建立多元化的收入来源。',
    date: '2024-01-10',
    readTime: '6分钟'
  },
  {
    id: 4,
    title: '理解复利的力量',
    excerpt: '复利是财富增长的第八大奇迹，学习如何利用复利效应实现长期财富增值。',
    date: '2024-01-08',
    readTime: '7分钟'
  }
]

export default function ArticlePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 文章头部 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight"
          >
            {article.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center text-sm text-gray-500 space-x-6"
          >
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              {article.date}
            </div>
            <div className="flex items-center">
              <User size={16} className="mr-1" />
              {article.readTime}
            </div>
            <div className="flex items-center">
              <Eye size={16} className="mr-1" />
              {article.views} 阅读
            </div>
          </motion.div>
        </div>
      </div>

      {/* 主要内容 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 文章内容 */}
          <div className="lg:col-span-3">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
            >
              {/* 文章操作栏 */}
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-primary-500 transition-colors">
                    <Bookmark size={20} />
                    <span>收藏</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-primary-500 transition-colors">
                    <Share2 size={20} />
                    <span>分享</span>
                  </button>
                </div>
              </div>

              {/* 文章正文 */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900 prose-a:text-primary-500 hover:prose-a:text-primary-600"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* 标签 */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Tag size={20} className="text-gray-500" />
                  <span className="text-gray-700 font-medium">标签：</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>

            {/* 作者信息 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <User size={24} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{article.author.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{article.author.bio}</p>
                </div>
              </div>
            </motion.div>

            {/* 相关文章 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">相关文章</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((relatedArticle, index) => (
                  <motion.div
                    key={relatedArticle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 hover:text-primary-500 transition-colors">
                      <a href={`/article/${relatedArticle.id}`}>{relatedArticle.title}</a>
                    </h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{relatedArticle.date}</span>
                      <span className="mx-2">•</span>
                      <span>{relatedArticle.readTime}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 目录导航 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24"
            >
              <h4 className="font-semibold text-gray-900 mb-4">文章目录</h4>
              <nav className="space-y-2 text-sm">
                {[
                  '为什么要制定理财规划？',
                  '理财规划的基本步骤',
                  '评估当前财务状况',
                  '设定明确的财务目标',
                  '制定预算计划',
                  '建立应急基金',
                  '开始投资',
                  '常见的理财误区',
                  '总结'
                ].map((item, index) => (
                  <a
                    key={index}
                    href={`#${item}`}
                    className="block text-gray-600 hover:text-primary-500 transition-colors py-1"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </motion.div>

            {/* 订阅卡片 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl p-6 text-white"
            >
              <h4 className="font-semibold mb-2">订阅更新</h4>
              <p className="text-primary-100 text-sm mb-4">
                获取最新的财富管理知识
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="输入您的邮箱"
                  className="w-full px-3 py-2 rounded-lg bg-white/20 placeholder-primary-200 text-white border border-white/30 focus:outline-none focus:border-white text-sm"
                />
                <button className="w-full bg-white text-primary-600 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">
                  立即订阅
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}