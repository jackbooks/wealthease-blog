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

// API 基础 URL
const API_BASE = '/api/admin'

// 通用请求函数
async function apiRequest<T>(url: string, options?: RequestInit): Promise<{ success: boolean; data?: T; errors?: string[]; error?: string }> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        errors: result.errors || [result.error || '请求失败'],
      }
    }

    return { success: true, data: result.data }
  } catch (error) {
    console.error('API 请求失败:', error)
    return {
      success: false,
      errors: ['网络请求失败'],
    }
  }
}

export class AdminService {
  // 文章管理
  static async getAllArticles(): Promise<Article[]> {
    const result = await apiRequest<Article[]>(`${API_BASE}/articles`)
    return result.data || []
  }

  static async getArticleById(id: string): Promise<Article | null> {
    const result = await apiRequest<Article>(`${API_BASE}/articles/${id}`)
    return result.data || null
  }

  static async createArticle(articleData: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; article?: Article; errors?: string[] }> {
    const result = await apiRequest<Article>(`${API_BASE}/articles`, {
      method: 'POST',
      body: JSON.stringify(articleData),
    })

    return {
      success: result.success,
      article: result.data,
      errors: result.errors,
    }
  }

  static async updateArticle(id: string, articleData: Partial<Article>): Promise<{ success: boolean; article?: Article; errors?: string[] }> {
    const result = await apiRequest<Article>(`${API_BASE}/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(articleData),
    })

    return {
      success: result.success,
      article: result.data,
      errors: result.errors,
    }
  }

  static async deleteArticle(id: string): Promise<{ success: boolean; errors?: string[] }> {
    const result = await apiRequest<Article>(`${API_BASE}/articles/${id}`, {
      method: 'DELETE',
    })

    return {
      success: result.success,
      errors: result.errors,
    }
  }

  // 分类管理
  static async getAllCategories(): Promise<Category[]> {
    const result = await apiRequest<Category[]>(`${API_BASE}/categories`)
    return result.data || []
  }

  static async getCategoryById(id: string): Promise<Category | null> {
    const result = await apiRequest<Category>(`${API_BASE}/categories/${id}`)
    return result.data || null
  }

  static async createCategory(categoryData: Omit<Category, 'id' | 'articleCount' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; category?: Category; errors?: string[] }> {
    const result = await apiRequest<Category>(`${API_BASE}/categories`, {
      method: 'POST',
      body: JSON.stringify(categoryData),
    })

    return {
      success: result.success,
      category: result.data,
      errors: result.errors,
    }
  }

  static async updateCategory(id: string, categoryData: Partial<Category>): Promise<{ success: boolean; category?: Category; errors?: string[] }> {
    const result = await apiRequest<Category>(`${API_BASE}/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    })

    return {
      success: result.success,
      category: result.data,
      errors: result.errors,
    }
  }

  static async deleteCategory(id: string): Promise<{ success: boolean; errors?: string[] }> {
    const result = await apiRequest<Category>(`${API_BASE}/categories/${id}`, {
      method: 'DELETE',
    })

    return {
      success: result.success,
      errors: result.errors,
    }
  }

  // 统计数据
  static async getStats(): Promise<{
    totalArticles: number
    totalCategories: number
    publishedArticles: number
    draftArticles: number
  }> {
    const [articles, categories] = await Promise.all([
      this.getAllArticles(),
      this.getAllCategories(),
    ])

    return {
      totalArticles: articles.length,
      totalCategories: categories.length,
      publishedArticles: articles.filter(article => article.published).length,
      draftArticles: articles.filter(article => !article.published).length,
    }
  }
}