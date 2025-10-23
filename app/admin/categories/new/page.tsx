'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminService } from '@/lib/admin'
import CategoryForm from '@/components/admin/CategoryForm'

export default function NewCategoryPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: any): Promise<{ success: boolean; errors?: string[] }> {
    setLoading(true)
    try {
      const result = await AdminService.createCategory(formData)
      if (result.success) {
        router.push('/admin/categories')
        return { success: true }
      } else {
        return { success: false, errors: result.errors }
      }
    } catch (error) {
      console.error('创建分类失败:', error)
      return { success: false, errors: ['创建分类失败'] }
    } finally {
      setLoading(false)
    }
  }

  function handleCancel() {
    router.push('/admin/categories')
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">新建分类</h1>
        <p className="text-gray-600 mt-1">创建新的文章分类</p>
      </div>

      {/* 表单 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <CategoryForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </div>
  )
}