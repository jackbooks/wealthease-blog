'use client'

import { useState, useEffect } from 'react'
import { Category } from '@/lib/admin'

interface CategoryFormProps {
  category?: Category
  onSubmit: (data: Omit<Category, 'id' | 'articleCount' | 'createdAt' | 'updatedAt'>) => Promise<{ success: boolean; errors?: string[] }>
  onCancel: () => void
  loading?: boolean
}

export default function CategoryForm({
  category,
  onSubmit,
  onCancel,
  loading = false
}: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || '',
    color: category?.color || '#3b82f6'
  })

  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || '',
        color: category.color || '#3b82f6'
      })
    }
  }, [category])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])

    const result = await onSubmit(formData)
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

  const colorOptions = [
    { value: '#3b82f6', label: '蓝色', bg: 'bg-blue-500' },
    { value: '#10b981', label: '绿色', bg: 'bg-green-500' },
    { value: '#f59e0b', label: '黄色', bg: 'bg-yellow-500' },
    { value: '#8b5cf6', label: '紫色', bg: 'bg-purple-500' },
    { value: '#ef4444', label: '红色', bg: 'bg-red-500' },
    { value: '#06b6d4', label: '青色', bg: 'bg-cyan-500' },
    { value: '#f97316', label: '橙色', bg: 'bg-orange-500' },
    { value: '#84cc16', label: '青绿色', bg: 'bg-lime-500' },
  ]

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
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          分类名称 *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="输入分类名称"
          required
        />
      </div>

      {/* 描述 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          分类描述
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="输入分类描述"
        />
      </div>

      {/* 颜色选择 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          分类颜色
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {colorOptions.map((color) => (
            <div key={color.value} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => handleChange('color', color.value)}
                className={`w-8 h-8 rounded-full border-2 ${
                  formData.color === color.value
                    ? 'border-gray-900 ring-2 ring-gray-300'
                    : 'border-gray-300 hover:border-gray-400'
                } ${color.bg}`}
                title={color.label}
              />
              <span className="text-xs text-gray-600 mt-1">{color.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 预览 */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">预览</h4>
        <div className="flex items-center space-x-3">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
            style={{
              backgroundColor: `${formData.color}20`,
              color: formData.color,
              border: `1px solid ${formData.color}40`
            }}
          >
            {formData.name || '分类名称'}
          </span>
          {formData.description && (
            <span className="text-sm text-gray-600">{formData.description}</span>
          )}
        </div>
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
          <span>{category ? '更新分类' : '创建分类'}</span>
        </button>
      </div>
    </form>
  )
}