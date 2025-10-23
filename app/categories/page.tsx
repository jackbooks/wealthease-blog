'use client'

import { motion } from 'framer-motion'
import { Folder, FileText } from 'lucide-react'

const categories = [
  {
    name: '理财基础',
    description: '个人理财的基础知识和入门指南',
    articleCount: 12,
    color: 'bg-blue-500',
    recentArticles: [
      '如何开始个人理财规划',
      '建立健康的消费习惯',
      '理解资产负债表'
    ]
  },
  {
    name: '投资策略',
    description: '各种投资工具和策略的分析与应用',
    articleCount: 8,
    color: 'bg-green-500',
    recentArticles: [
      '投资组合多样化策略',
      '股票投资入门指南',
      '基金投资的优势与风险'
    ]
  },
  {
    name: '收入管理',
    description: '如何管理和增加个人收入来源',
    articleCount: 5,
    color: 'bg-purple-500',
    recentArticles: [
      '被动收入的重要性',
      '副业创收的多种方式',
      '如何谈判薪资'
    ]
  },
  {
    name: '财富增长',
    description: '长期财富积累和增值策略',
    articleCount: 7,
    color: 'bg-orange-500',
    recentArticles: [
      '理解复利的力量',
      '长期投资的价值',
      '资产配置的艺术'
    ]
  },
  {
    name: '风险管理',
    description: '投资风险识别、评估和控制',
    articleCount: 4,
    color: 'bg-red-500',
    recentArticles: [
      '投资中的风险管理',
      '如何避免常见的投资陷阱',
      '保险规划的重要性'
    ]
  },
  {
    name: '税务规划',
    description: '合法合规的税务优化策略',
    articleCount: 3,
    color: 'bg-indigo-500',
    recentArticles: [
      '个人所得税优化',
      '投资税务规划',
      '遗产税务安排'
    ]
  }
]

export default function CategoriesPage() {
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
            文章分类
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl"
          >
            按主题浏览所有文章，找到你感兴趣的内容
          </motion.p>
        </div>
      </div>

      {/* 内容区域 */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow group"
            >
              {/* 分类头部 */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                    <Folder size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">
                      <a href={`/categories/${category.name}`}>{category.name}</a>
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FileText size={14} className="mr-1" />
                      <span>{category.articleCount} 篇文章</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 分类描述 */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {category.description}
              </p>

              {/* 最新文章 */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">最新文章</h4>
                <ul className="space-y-2">
                  {category.recentArticles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-primary-500 transition-colors line-clamp-1"
                      >
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 查看全部按钮 */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <a
                  href={`/categories/${category.name}`}
                  className="text-primary-500 hover:text-primary-600 font-medium text-sm group-hover:translate-x-1 transition-transform inline-flex items-center"
                >
                  查看全部文章 →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 统计信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-white rounded-xl shadow-sm border border-gray-100 p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {categories.length}
              </div>
              <div className="text-gray-600">分类数量</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {categories.reduce((sum, cat) => sum + cat.articleCount, 0)}
              </div>
              <div className="text-gray-600">总文章数</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">6</div>
              <div className="text-gray-600">主题领域</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">累计阅读</div>
            </div>
          </div>
        </motion.div>

        {/* 订阅提示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">不想错过任何更新？</h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            订阅我们的邮件列表，第一时间获取最新的财富管理知识和投资策略
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="输入您的邮箱"
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 placeholder-primary-200 text-white border border-white/30 focus:outline-none focus:border-white"
            />
            <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors whitespace-nowrap">
              立即订阅
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}