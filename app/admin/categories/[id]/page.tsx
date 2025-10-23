'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { AdminService } from '@/lib/admin'
import { Category } from '@/lib/admin'
import CategoryForm from '@/components/admin/CategoryForm'

export default function EditCategoryPage() {
  const router = useRouter()
  const params = useParams()
  const categoryId = params.id as string

  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    loadCategory()
  }, [categoryId])

  async function loadCategory() {
    try {
      const categories = await AdminService.getAllCategories()
      const categoryData = categories.find(cat => cat.id === categoryId)

      if (!categoryData) {
        router.push('/admin/categories')
        return
      }

      setCategory(categoryData)
    } catch (error) {
      console.error('加载分类失败:', error)
      router.push('/admin/categories')
    } finally {
      setInitialLoading(false)
    }
  }

  async function handleSubmit(formData: any) {
    setLoading(true)
    try {
      const result = await AdminService.updateCategory(categoryId, formData)
      if (result.success) {
        router.push('/admin/categories')
        return { success: true }
      } else {
        return { success: false, errors: result.errors }
      }
    } catch (error) {
      console.error('更新分类失败:', error)
      return { success: false, errors: ['更新分类失败'] }
    } finally {
      setLoading(false)
    }
  }

  function handleCancel() {
    router.push('/admin/categories')
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

  if (!category) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">分类不存在</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">编辑分类</h1>
        <p className="text-gray-600 mt-1">编辑分类信息</p>
      </div>

      {/* 表单 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <CategoryForm
          category={category}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </div>
  )
}