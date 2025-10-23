'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AdminService } from '@/lib/admin'
import { Article } from '@/lib/admin'

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadArticles()
  }, [])

  async function loadArticles() {
    try {
      const articlesData = await AdminService.getAllArticles()
      setArticles(articlesData)
    } catch (error) {
      console.error('加载文章失败:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteArticle(id: string) {
    if (!confirm('确定要删除这篇文章吗？此操作不可撤销。')) {
      return
    }

    try {
      const result = await AdminService.deleteArticle(id)
      if (result.success) {
        setArticles(articles.filter(article => article.id !== id))
      } else {
        alert(result.errors?.join(', '))
      }
    } catch (error) {
      console.error('删除文章失败:', error)
      alert('删除文章失败')
    }
  }

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 页面标题和操作 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">文章管理</h1>
          <p className="text-gray-600 mt-1">管理你的博客文章内容</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center space-x-2"
        >
          <span>📝</span>
          <span>新建文章</span>
        </Link>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="搜索文章标题、摘要或分类..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            共 {filteredArticles.length} 篇文章
          </div>
        </div>
      </div>

      {/* 文章列表 */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">还没有文章</h3>
          <p className="text-gray-600 mb-6">创建你的第一篇文章来开始分享财富管理知识</p>
          <Link
            href="/admin/articles/new"
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium inline-flex items-center space-x-2"
          >
            <span>📝</span>
            <span>创建第一篇文章</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    文章
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    分类
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    日期
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {article.title}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {article.excerpt}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        article.published === false
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {article.published === false ? '草稿' : '已发布'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(article.date).toLocaleDateString('zh-CN')}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/articles/${article.id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          编辑
                        </Link>
                        <Link
                          href={`/article/${article.id}`}
                          target="_blank"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          预览
                        </Link>
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}