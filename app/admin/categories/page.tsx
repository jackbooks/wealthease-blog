'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AdminService } from '@/lib/admin'
import { Category } from '@/lib/admin'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    try {
      const categoriesData = await AdminService.getAllCategories()
      setCategories(categoriesData)
    } catch (error) {
      console.error('加载分类失败:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteCategory(id: string) {
    if (!confirm('确定要删除这个分类吗？如果该分类下有文章，将无法删除。')) {
      return
    }

    try {
      const result = await AdminService.deleteCategory(id)
      if (result.success) {
        setCategories(categories.filter(category => category.id !== id))
      } else {
        alert(result.errors?.join(', '))
      }
    } catch (error) {
      console.error('删除分类失败:', error)
      alert('删除分类失败')
    }
  }

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
          <h1 className="text-2xl font-bold text-gray-900">分类管理</h1>
          <p className="text-gray-600 mt-1">管理文章分类</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center space-x-2"
        >
          <span>📂</span>
          <span>新建分类</span>
        </Link>
      </div>

      {/* 分类列表 */}
      {categories.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-6xl mb-4">📂</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">还没有分类</h3>
          <p className="text-gray-600 mb-6">创建你的第一个分类来组织文章</p>
          <Link
            href="/admin/categories/new"
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium inline-flex items-center space-x-2"
          >
            <span>📂</span>
            <span>创建第一个分类</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: `${category.color || '#3b82f6'}20`,
                    color: category.color || '#3b82f6',
                    border: `1px solid ${category.color || '#3b82f6'}40`
                  }}
                >
                  {category.name}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {category.articleCount} 篇文章
                </span>
              </div>

              {category.description && (
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>
                  创建于 {new Date(category.createdAt).toLocaleDateString('zh-CN')}
                </span>
              </div>

              <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-100">
                <Link
                  href={`/admin/categories/${category.id}`}
                  className="text-primary-600 hover:text-primary-900 text-sm font-medium"
                >
                  编辑
                </Link>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-600 hover:text-red-900 text-sm font-medium"
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}