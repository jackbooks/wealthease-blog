import { NextRequest, NextResponse } from 'next/server'
import { getArticles, getCategories } from '@/lib/storage'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const [articles, categories] = await Promise.all([
      getArticles(),
      getCategories()
    ])

    // 只返回已发布的文章
    const publishedArticles = articles.filter(article => article.published !== false)
    const article = publishedArticles.find(a => a.id === params.id)

    if (!article) {
      return NextResponse.json(
        { success: false, error: '文章不存在' },
        { status: 404 }
      )
    }

    // 获取分类名称
    const category = categories.find(cat => cat.id === article.category)
    const categoryName = category?.name || article.category

    // 获取相关文章（同分类的其他文章）
    const relatedArticles = publishedArticles
      .filter(a => a.id !== article.id && a.category === article.category)
      .slice(0, 3)
      .map(a => ({
        id: a.id,
        title: a.title,
        excerpt: a.excerpt,
        date: a.date,
        readTime: a.readTime
      }))

    // 返回文章详情和相关文章
    const articleWithDetails = {
      ...article,
      category: categoryName,
      relatedArticles
    }

    return NextResponse.json({ success: true, data: articleWithDetails })
  } catch (error) {
    console.error('获取文章详情失败:', error)
    return NextResponse.json(
      { success: false, error: '获取文章详情失败' },
      { status: 500 }
    )
  }
}