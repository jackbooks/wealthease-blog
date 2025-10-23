'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Calendar, Tag, User } from 'lucide-react'

interface Article {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  tags: string[]
  readTime: string
}

interface Category {
  name: string
  count: number
}

export default function Home() {
  const [posts, setPosts] = useState<Article[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadArticles()
  }, [])

  async function loadArticles() {
    try {
      const response = await fetch('/api/articles')
      const result = await response.json()

      if (response.ok && result.success) {
        setPosts(result.data)

        // 生成分类统计
        const categoryCounts: Record<string, number> = {}
        result.data.forEach((article: Article) => {
          categoryCounts[article.category] = (categoryCounts[article.category] || 0) + 1
        })

        const categoryList = Object.entries(categoryCounts).map(([name, count]) => ({
          name,
          count: count as number
        }))

        setCategories(categoryList)
      }
    } catch (error) {
      console.error('加载文章失败:', error)
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部导航 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-bold text-gray-900">WealthEase</span>
            </motion.div>

            <nav className="hidden md:flex space-x-8">
              {['首页', '文章', '分类', '关于'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-600 hover:text-primary-500 transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <Search size={20} />
              </button>
              <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                订阅
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 英雄区域 */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            财富自由之路
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            分享财富管理、投资理财和个人成长的知识与经验，
            助你踏上财富自由之路
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium">
              开始阅读
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-primary-500 hover:text-primary-500 transition-colors font-medium">
              了解更多
            </button>
          </motion.div>
        </div>
      </section>

      {/* 主要内容区域 */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 文章列表 */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">最新文章</h2>
            {posts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">还没有文章</h3>
                <p className="text-gray-600 mb-6">稍后回来查看最新的财富管理知识</p>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <div className="flex items-center mr-4">
                        <Calendar size={16} className="mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <User size={16} className="mr-1" />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-primary-500 transition-colors">
                      <a href={`/article/${post.id}`}>{post.title}</a>
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center text-gray-500 text-sm"
                          >
                            <Tag size={14} className="mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={`/article/${post.id}`}
                        className="text-primary-500 hover:text-primary-600 font-medium text-sm"
                      >
                        阅读全文 →
                      </a>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>

          {/* 侧边栏 */}
          <div className="space-y-8">
            {/* 关于我 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">关于作者</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <User size={24} className="text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">WealthEase</h4>
                  <p className="text-sm text-gray-500">财富管理爱好者</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                专注于分享财富管理、投资理财和个人成长的知识与经验，
                帮助更多人实现财务自由。
              </p>
            </div>

            {/* 分类 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">文章分类</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <a
                    key={category.name}
                    href="#"
                    className="flex justify-between items-center py-2 text-gray-600 hover:text-primary-500 transition-colors"
                  >
                    <span>{category.name}</span>
                    <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-xs">
                      {category.count}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* 订阅 */}
            <div className="bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">订阅更新</h3>
              <p className="text-primary-100 text-sm mb-4">
                获取最新的财富管理知识和投资策略
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="输入您的邮箱"
                  className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-primary-200 text-white border border-white/30 focus:outline-none focus:border-white"
                />
                <button className="w-full bg-white text-primary-600 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  立即订阅
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <span className="text-xl font-bold">WealthEase</span>
              </div>
              <p className="text-gray-400 text-sm">
                分享财富管理知识，助力个人成长
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">快速链接</h4>
              <div className="space-y-2 text-sm text-gray-400">
                {['首页', '文章', '分类', '关于'].map((item) => (
                  <a key={item} href="#" className="block hover:text-white transition-colors">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">分类</h4>
              <div className="space-y-2 text-sm text-gray-400">
                {categories.slice(0, 5).map((category) => (
                  <a key={category.name} href="#" className="block hover:text-white transition-colors">
                    {category.name}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">联系我</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>邮箱: contact@wealthease.top</p>
                <p>微信: WealthEase_Blog</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 WealthEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}