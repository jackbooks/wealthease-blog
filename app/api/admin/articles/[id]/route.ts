import { NextRequest, NextResponse } from 'next/server'
import { getArticles, saveArticles, validateArticle } from '@/lib/storage'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const articles = await getArticles()
    const article = articles.find(a => a.id === params.id)

    if (!article) {
      return NextResponse.json(
        { success: false, error: '文章不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: article })
  } catch (error) {
    console.error('获取文章失败:', error)
    return NextResponse.json(
      { success: false, error: '获取文章失败' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    // 验证数据
    const errors = validateArticle(body)
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      )
    }

    const articles = await getArticles()
    const articleIndex = articles.findIndex(a => a.id === params.id)

    if (articleIndex === -1) {
      return NextResponse.json(
        { success: false, error: '文章不存在' },
        { status: 404 }
      )
    }

    const updatedArticle = {
      ...articles[articleIndex],
      ...body,
      updatedAt: new Date().toISOString()
    }

    articles[articleIndex] = updatedArticle
    await saveArticles(articles)

    return NextResponse.json({ success: true, data: updatedArticle })
  } catch (error) {
    console.error('更新文章失败:', error)
    return NextResponse.json(
      { success: false, error: '更新文章失败' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const articles = await getArticles()
    const articleIndex = articles.findIndex(a => a.id === params.id)

    if (articleIndex === -1) {
      return NextResponse.json(
        { success: false, error: '文章不存在' },
        { status: 404 }
      )
    }

    const deletedArticle = articles[articleIndex]
    const updatedArticles = articles.filter(a => a.id !== params.id)
    await saveArticles(updatedArticles)

    return NextResponse.json({ success: true, data: deletedArticle })
  } catch (error) {
    console.error('删除文章失败:', error)
    return NextResponse.json(
      { success: false, error: '删除文章失败' },
      { status: 500 }
    )
  }
}