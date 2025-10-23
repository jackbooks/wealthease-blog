import { NextRequest, NextResponse } from 'next/server'
import { getArticles, getCategories } from '@/lib/storage'

export async function GET(request: NextRequest) {
  try {
    const [articles, categories] = await Promise.all([
      getArticles(),
      getCategories()
    ])

    // 只返回已发布的文章，并按日期降序排列
    const publishedArticles = articles
      .filter(article => article.published !== false)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // 获取分类名称
    const articlesWithCategoryNames = publishedArticles.map(article => {
      const category = categories.find(cat => cat.id === article.category)
      return {
        ...article,
        category: category?.name || article.category
      }
    })

    return NextResponse.json({ success: true, data: articlesWithCategoryNames })
  } catch (error) {
    console.error('获取文章列表失败:', error)
    return NextResponse.json(
      { success: false, error: '获取文章列表失败' },
      { status: 500 }
    )
  }
}