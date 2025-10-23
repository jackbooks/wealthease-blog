'use client'

import { motion } from 'framer-motion'
import { Calendar, User, Tag } from 'lucide-react'

interface Article {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  tags: string[]
  readTime: string
  image?: string
}

interface ArticleCardProps {
  article: Article
  index: number
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow group"
    >
      {/* 文章元信息 */}
      <div className="flex items-center text-sm text-gray-500 mb-3">
        <div className="flex items-center mr-4">
          <Calendar size={16} className="mr-1" />
          {article.date}
        </div>
        <div className="flex items-center">
          <User size={16} className="mr-1" />
          {article.readTime}
        </div>
      </div>

      {/* 文章标题 */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-500 transition-colors">
        <a href={`/article/${article.id}`}>{article.title}</a>
      </h3>

      {/* 文章摘要 */}
      <p className="text-gray-600 mb-4 leading-relaxed">
        {article.excerpt}
      </p>

      {/* 分类和标签 */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
            {article.category}
          </span>
          {article.tags.slice(0, 2).map((tag) => (
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
          href={`/article/${article.id}`}
          className="text-primary-500 hover:text-primary-600 font-medium text-sm group-hover:translate-x-1 transition-transform"
        >
          阅读全文 →
        </a>
      </div>
    </motion.article>
  )
}