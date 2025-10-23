import { NextRequest, NextResponse } from 'next/server'
import { getCategories, saveCategories, validateCategory } from '@/lib/storage'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categories = await getCategories()
    const category = categories.find(c => c.id === params.id)

    if (!category) {
      return NextResponse.json(
        { success: false, error: '分类不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: category })
  } catch (error) {
    console.error('获取分类失败:', error)
    return NextResponse.json(
      { success: false, error: '获取分类失败' },
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
    const errors = validateCategory(body)
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      )
    }

    const categories = await getCategories()
    const categoryIndex = categories.findIndex(c => c.id === params.id)

    if (categoryIndex === -1) {
      return NextResponse.json(
        { success: false, error: '分类不存在' },
        { status: 404 }
      )
    }

    const updatedCategory = {
      ...categories[categoryIndex],
      ...body,
      updatedAt: new Date().toISOString()
    }

    categories[categoryIndex] = updatedCategory
    await saveCategories(categories)

    return NextResponse.json({ success: true, data: updatedCategory })
  } catch (error) {
    console.error('更新分类失败:', error)
    return NextResponse.json(
      { success: false, error: '更新分类失败' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categories = await getCategories()
    const categoryIndex = categories.findIndex(c => c.id === params.id)

    if (categoryIndex === -1) {
      return NextResponse.json(
        { success: false, error: '分类不存在' },
        { status: 404 }
      )
    }

    const deletedCategory = categories[categoryIndex]
    const updatedCategories = categories.filter(c => c.id !== params.id)
    await saveCategories(updatedCategories)

    return NextResponse.json({ success: true, data: deletedCategory })
  } catch (error) {
    console.error('删除分类失败:', error)
    return NextResponse.json(
      { success: false, error: '删除分类失败' },
      { status: 500 }
    )
  }
}