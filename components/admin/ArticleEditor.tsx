'use client'

import { useState, useEffect } from 'react'
import { Article, Category } from '@/lib/admin'

interface ArticleEditorProps {
  article?: Article
  categories: Category[]
  onSubmit: (data: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) => Promise<{ success: boolean; errors?: string[] }>
  onCancel: () => void
  loading?: boolean
}

export default function ArticleEditor({
  article,
  categories,
  onSubmit,
  onCancel,
  loading = false
}: ArticleEditorProps) {
  const [formData, setFormData] = useState({
    title: article?.title || '',
    content: article?.content || '',
    excerpt: article?.excerpt || '',
    date: article?.date || new Date().toISOString().split('T')[0],
    readTime: article?.readTime || '5分钟',
    category: article?.category || categories[0]?.name || '',
    tags: article?.tags?.join(', ') || '',
    image: article?.image || '',
    author: article?.author || 'WealthEase',
    published: article?.published !== false
  })

  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        content: article.content,
        excerpt: article.excerpt,
        date: article.date,
        readTime: article.readTime,
        category: article.category,
        tags: article.tags?.join(', ') || '',
        image: article.image || '',
        author: article.author || 'WealthEase',
        published: article.published !== false
      })
    }
  }, [article])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])

    const submitData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      published: formData.published
    }

    const result = await onSubmit(submitData)
    if (!result.success && result.errors) {
      setErrors(result.errors)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 错误提示 */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-red-800 mb-2">请修正以下错误：</h4>
          <ul className="text-sm text-red-700 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 基本信息 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            文章标题 *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="输入文章标题"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            分类 *
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 文章内容 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          文章内容 *
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
          rows={12}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
          placeholder="输入文章内容（支持 Markdown 格式）"
          required
        />
      </div>

      {/* 摘要 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          文章摘要 *
        </label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => handleChange('excerpt', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="输入文章摘要（50-150字）"
          required
        />
      </div>

      {/* 其他信息 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            发布日期
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            阅读时间
          </label>
          <input
            type="text"
            value={formData.readTime}
            onChange={(e) => handleChange('readTime', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="例如：5分钟"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            作者
          </label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => handleChange('author', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="作者姓名"
          />
        </div>
      </div>

      {/* 标签和图片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            标签
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => handleChange('tags', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="用逗号分隔标签，例如：理财, 投资, 基础"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            封面图片 URL
          </label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => handleChange('image', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      {/* 发布状态 */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) => handleChange('published', e.target.checked)}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
          立即发布文章
        </label>
      </div>

      {/* 操作按钮 */}
      <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          disabled={loading}
        >
          取消
        </button>
        <button
          type="submit"
          className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center space-x-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          <span>{article ? '更新文章' : '创建文章'}</span>
        </button>
      </div>
    </form>
  )
}