'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, Tag, Share2, Bookmark, Eye } from 'lucide-react'

interface Article {
  id: string
  title: string
  content: string
  excerpt: string
  date: string
  category: string
  tags: string[]
  readTime: string
  views?: number
  author?: string
  relatedArticles?: Array<{
    id: string
    title: string
    excerpt: string
    date: string
    readTime: string
  }>
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadArticle()
  }, [params.id])

  async function loadArticle() {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/articles/${params.id}`)
      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || '获取文章失败')
      }

      setArticle(result.data)
    } catch (error) {
      console.error('加载文章失败:', error)
      setError(error instanceof Error ? error.message : '加载文章失败')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">文章不存在</h3>
          <p className="text-gray-600 mb-6">{error || '无法找到该文章'}</p>
          <a
            href="/"
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium inline-flex items-center space-x-2"
          >
            <span>返回首页</span>
          </a>
        </div>
      </div>
    )
  }
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
            {article.views && (
              <div className="flex items-center">
                <Eye size={16} className="mr-1" />
                {article.views} 阅读
              </div>
            )}
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
                  <h3 className="text-lg font-semibold text-gray-900">{article.author || 'WealthEase'}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    财富管理爱好者，专注于分享实用的理财知识和投资策略。
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 相关文章 */}
            {article.relatedArticles && article.relatedArticles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">相关文章</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {article.relatedArticles.map((relatedArticle, index) => (
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
            )}
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