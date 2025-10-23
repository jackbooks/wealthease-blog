'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminService } from '@/lib/admin'
import { Category } from '@/lib/admin'
import ArticleEditor from '@/components/admin/ArticleEditor'

export default function NewArticlePage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    try {
      const categoriesData = await AdminService.getAllCategories()
      setCategories(categoriesData)
    } catch (error) {
      console.error('加载分类失败:', error)
    }
  }

  async function handleSubmit(formData: any) {
    setLoading(true)
    try {
      const result = await AdminService.createArticle(formData)
      if (result.success) {
        router.push('/admin/articles')
        return { success: true }
      } else {
        return { success: false, errors: result.errors }
      }
    } catch (error) {
      console.error('创建文章失败:', error)
      return { success: false, errors: ['创建文章失败'] }
    } finally {
      setLoading(false)
    }
  }

  function handleCancel() {
    router.push('/admin/articles')
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">新建文章</h1>
        <p className="text-gray-600 mt-1">创建新的财富管理文章</p>
      </div>

      {/* 编辑器 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <ArticleEditor
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </div>
  )
}