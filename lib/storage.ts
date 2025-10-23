import fs from 'fs/promises'
import path from 'path'

// 数据文件路径
const DATA_DIR = path.join(process.cwd(), 'data')
const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json')
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json')
const BACKUP_DIR = path.join(DATA_DIR, 'backup')

// 确保数据目录存在
export async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
  try {
    await fs.access(BACKUP_DIR)
  } catch {
    await fs.mkdir(BACKUP_DIR, { recursive: true })
  }
}

// 备份数据文件
async function backupFile(filePath: string) {
  const fileName = path.basename(filePath)
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupPath = path.join(BACKUP_DIR, `${fileName}.${timestamp}.backup`)

  try {
    const content = await fs.readFile(filePath, 'utf-8')
    await fs.writeFile(backupPath, content)
  } catch (error) {
    console.warn(`备份失败: ${filePath}`, error)
  }
}

// 文章数据类型
export interface Article {
  id: string
  title: string
  content: string
  excerpt: string
  date: string
  readTime: string
  category: string
  tags: string[]
  image?: string
  author?: string
  published?: boolean
  createdAt: string
  updatedAt: string
}

// 分类数据类型
export interface Category {
  id: string
  name: string
  description?: string
  color?: string
  articleCount: number
  createdAt: string
  updatedAt: string
}

// 读取文章数据
export async function getArticles(): Promise<Article[]> {
  await ensureDataDir()

  try {
    const content = await fs.readFile(ARTICLES_FILE, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    // 如果文件不存在，返回空数组
    return []
  }
}

// 保存文章数据
export async function saveArticles(articles: Article[]): Promise<void> {
  await ensureDataDir()

  // 备份原文件
  try {
    await backupFile(ARTICLES_FILE)
  } catch {
    // 如果原文件不存在，跳过备份
  }

  // 保存新数据
  await fs.writeFile(ARTICLES_FILE, JSON.stringify(articles, null, 2))
}

// 读取分类数据
export async function getCategories(): Promise<Category[]> {
  await ensureDataDir()

  try {
    const content = await fs.readFile(CATEGORIES_FILE, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    // 如果文件不存在，返回默认分类
    return [
      {
        id: 'finance-basics',
        name: '理财基础',
        description: '理财入门知识和基础概念',
        color: '#3b82f6',
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'investment-strategy',
        name: '投资策略',
        description: '投资方法和市场分析',
        color: '#10b981',
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'income-management',
        name: '收入管理',
        description: '收入来源和支出控制',
        color: '#f59e0b',
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'wealth-growth',
        name: '财富增长',
        description: '资产增值和长期规划',
        color: '#8b5cf6',
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'risk-management',
        name: '风险管理',
        description: '风险控制和保险规划',
        color: '#ef4444',
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  }
}

// 保存分类数据
export async function saveCategories(categories: Category[]): Promise<void> {
  await ensureDataDir()

  // 备份原文件
  try {
    await backupFile(CATEGORIES_FILE)
  } catch {
    // 如果原文件不存在，跳过备份
  }

  // 保存新数据
  await fs.writeFile(CATEGORIES_FILE, JSON.stringify(categories, null, 2))
}

// 生成唯一 ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// 验证文章数据
export function validateArticle(article: Partial<Article>): string[] {
  const errors: string[] = []

  if (!article.title?.trim()) {
    errors.push('标题不能为空')
  }

  if (!article.content?.trim()) {
    errors.push('内容不能为空')
  }

  if (!article.excerpt?.trim()) {
    errors.push('摘要不能为空')
  }

  if (!article.category?.trim()) {
    errors.push('分类不能为空')
  }

  return errors
}

// 验证分类数据
export function validateCategory(category: Partial<Category>): string[] {
  const errors: string[] = []

  if (!category.name?.trim()) {
    errors.push('分类名称不能为空')
  }

  return errors
}