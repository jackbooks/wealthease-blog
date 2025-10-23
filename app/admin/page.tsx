'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AdminService } from '@/lib/admin'

interface Stats {
  totalArticles: number
  totalCategories: number
  publishedArticles: number
  draftArticles: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const statsData = await AdminService.getStats()
        setStats(statsData)
      } catch (error) {
        console.error('加载统计数据失败:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

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
    <div className="space-y-8">
      {/* 欢迎区域 */}
      <div className="bg-gradient-to-r from-primary-500 to-blue-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">欢迎回来！</h1>
        <p className="text-primary-100 text-lg">
          管理你的 WealthEase 博客内容
        </p>
      </div>

      {/* 统计卡片 */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                📝
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">总文章数</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalArticles}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                📂
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">分类数量</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCategories}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                ✅
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">已发布</p>
                <p className="text-2xl font-bold text-gray-900">{stats.publishedArticles}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                📋
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">草稿</p>
                <p className="text-2xl font-bold text-gray-900">{stats.draftArticles}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 快速操作 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h3>
          <div className="space-y-3">
            <Link
              href="/admin/articles/new"
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">📝</span>
                <span className="font-medium text-gray-900">新建文章</span>
              </div>
              <span className="text-gray-400">→</span>
            </Link>

            <Link
              href="/admin/categories"
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">📂</span>
                <span className="font-medium text-gray-900">管理分类</span>
              </div>
              <span className="text-gray-400">→</span>
            </Link>

            <Link
              href="/admin/articles"
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">📋</span>
                <span className="font-medium text-gray-900">查看所有文章</span>
              </div>
              <span className="text-gray-400">→</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">最近活动</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              <span className="text-lg">📝</span>
              <div>
                <p className="text-sm font-medium text-gray-900">管理后台已就绪</p>
                <p className="text-xs text-gray-500">现在可以开始管理你的博客内容了</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              <span className="text-lg">🎯</span>
              <div>
                <p className="text-sm font-medium text-gray-900">开始创作</p>
                <p className="text-xs text-gray-500">发布你的第一篇财富管理文章</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}