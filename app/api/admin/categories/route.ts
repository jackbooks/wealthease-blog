import { NextRequest, NextResponse } from 'next/server'
import { getCategories, saveCategories, generateId, validateCategory } from '@/lib/storage'

export async function GET() {
  try {
    const categories = await getCategories()
    return NextResponse.json({ success: true, data: categories })
  } catch (error) {
    console.error('获取分类失败:', error)
    return NextResponse.json(
      { success: false, error: '获取分类失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 验证数据
    const errors = validateCategory(body)
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      )
    }

    const categories = await getCategories()
    const newCategory = {
      ...body,
      id: generateId(),
      articleCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const updatedCategories = [...categories, newCategory]
    await saveCategories(updatedCategories)

    return NextResponse.json({ success: true, data: newCategory })
  } catch (error) {
    console.error('创建分类失败:', error)
    return NextResponse.json(
      { success: false, error: '创建分类失败' },
      { status: 500 }
    )
  }
}