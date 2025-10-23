'use client'

import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import ArticleCard from '@/components/ArticleCard'

// 模拟文章数据
const articles = [
  {
    id: 1,
    title: '如何开始个人理财规划',
    excerpt: '学习如何制定个人理财计划，建立健康的财务习惯，实现财富自由的第一步。',
    date: '2024-01-15',
    category: '理财基础',
    tags: ['理财', '规划', '基础'],
    readTime: '5分钟'
  },
  {
    id: 2,
    title: '投资组合多样化策略',
    excerpt: '了解如何通过资产配置和风险分散来构建稳健的投资组合。',
    date: '2024-01-12',
    category: '投资策略',
    tags: ['投资', '组合', '风险'],
    readTime: '8分钟'
  },
  {
    id: 3,
    title: '被动收入的重要性',
    excerpt: '探讨被动收入在财富积累中的作用以及如何建立多元化的收入来源。',
    date: '2024-01-10',
    category: '收入管理',
    tags: ['被动收入', '财富积累', '多元化'],
    readTime: '6分钟'
  },
  {
    id: 4,
    title: '理解复利的力量',
    excerpt: '复利是财富增长的第八大奇迹，学习如何利用复利效应实现长期财富增值。',
    date: '2024-01-08',
    category: '财富增长',
    tags: ['复利', '长期投资', '财富增长'],
    readTime: '7分钟'
  },
  {
    id: 5,
    title: '股票投资入门指南',
    excerpt: '为初学者准备的股票投资基础知识，包括如何选择股票、分析公司基本面等。',
    date: '2024-01-05',
    category: '投资策略',
    tags: ['股票', '投资', '入门'],
    readTime: '10分钟'
  },
  {
    id: 6,
    title: '基金投资的优势与风险',
    excerpt: '分析基金投资的特点，帮助投资者理解基金的优势和需要注意的风险点。',
    date: '2024-01-03',
    category: '投资策略',
    tags: ['基金', '投资', '风险'],
    readTime: '9分钟'
  }
]

const categories = [
  '全部',
  '理财基础',
  '投资策略',
  '收入管理',
  '财富增长',
  '风险管理'
]

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            所有文章
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl"
          >
            探索关于财富管理、投资理财和个人成长的各种知识
          </motion.p>
        </div>
      </div>

      {/* 内容区域 */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 搜索和筛选 */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜索文章..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* 分类筛选 */}
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-500" />
              <select className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 文章列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>

        {/* 分页 */}
        <div className="flex justify-center mt-12">
          <nav className="flex items-center space-x-2">
            <button className="px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50">
              上一页
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-4 py-2 rounded-lg ${
                  page === 1
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
              下一页
            </button>
          </nav>
        </div>
      </main>
    </div>
  )
}