import { NextRequest, NextResponse } from 'next/server'
import { getArticles, saveArticles, generateId, validateArticle } from '@/lib/storage'

export async function GET() {
  try {
    const articles = await getArticles()
    return NextResponse.json({ success: true, data: articles })
  } catch (error) {
    console.error('获取文章失败:', error)
    return NextResponse.json(
      { success: false, error: '获取文章失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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
    const newArticle = {
      ...body,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const updatedArticles = [...articles, newArticle]
    await saveArticles(updatedArticles)

    return NextResponse.json({ success: true, data: newArticle })
  } catch (error) {
    console.error('创建文章失败:', error)
    return NextResponse.json(
      { success: false, error: '创建文章失败' },
      { status: 500 }
    )
  }
}