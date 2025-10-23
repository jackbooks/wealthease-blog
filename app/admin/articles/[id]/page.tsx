'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { AdminService } from '@/lib/admin'
import { Article, Category } from '@/lib/admin'
import ArticleEditor from '@/components/admin/ArticleEditor'

export default function EditArticlePage() {
  const router = useRouter()
  const params = useParams()
  const articleId = params.id as string

  const [article, setArticle] = useState<Article | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [articleId])

  async function loadData() {
    try {
      const [articleData, categoriesData] = await Promise.all([
        AdminService.getArticleById(articleId),
        AdminService.getAllCategories()
      ])

      if (!articleData) {
        router.push('/admin/articles')
        return
      }

      setArticle(articleData)
      setCategories(categoriesData)
    } catch (error) {
      console.error('加载数据失败:', error)
      router.push('/admin/articles')
    } finally {
      setInitialLoading(false)
    }
  }

  async function handleSubmit(formData: any) {
    setLoading(true)
    try {
      const result = await AdminService.updateArticle(articleId, formData)
      if (result.success) {
        router.push('/admin/articles')
      } else {
        return result
      }
    } catch (error) {
      console.error('更新文章失败:', error)
      return { success: false, errors: ['更新文章失败'] }
    } finally {
      setLoading(false)
    }
  }

  function handleCancel() {
    router.push('/admin/articles')
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">文章不存在</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">编辑文章</h1>
        <p className="text-gray-600 mt-1">编辑文章内容</p>
      </div>

      {/* 编辑器 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <ArticleEditor
          article={article}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </div>
  )
}