// 测试数据存储功能
const fs = require('fs/promises');
const path = require('path');

// 数据文件路径
const DATA_DIR = path.join(__dirname, 'data');
const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');

// 确保数据目录存在
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// 生成唯一 ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

async function testStorage() {
  console.log('🧪 开始测试数据存储功能...\n');

  try {
    await ensureDataDir();
    console.log('✅ 数据目录检查通过\n');

    // 测试分类文件
    console.log('1. 测试分类数据...');
    try {
      const categoriesContent = await fs.readFile(CATEGORIES_FILE, 'utf-8');
      const categories = JSON.parse(categoriesContent);
      console.log(`   分类数量: ${categories.length}`);
      console.log(`   分类名称: ${categories.map(cat => cat.name).join(', ')}\n`);
    } catch (error) {
      console.log('   ℹ️ 分类文件不存在，将创建默认分类\n');

      const defaultCategories = [
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
        }
      ];

      await fs.writeFile(CATEGORIES_FILE, JSON.stringify(defaultCategories, null, 2));
      console.log('   ✅ 默认分类创建成功\n');
    }

    // 测试文章文件
    console.log('2. 测试文章数据...');
    try {
      const articlesContent = await fs.readFile(ARTICLES_FILE, 'utf-8');
      const articles = JSON.parse(articlesContent);
      console.log(`   文章数量: ${articles.length}\n`);
    } catch (error) {
      console.log('   ℹ️ 文章文件不存在，将创建示例文章\n');

      const sampleArticle = {
        id: generateId(),
        title: '理财入门指南',
        content: '这是一篇关于理财入门的示例文章。理财是每个人都需要掌握的重要技能，它关系到我们的财务安全和未来生活质量。\n\n## 理财的重要性\n\n理财不仅仅是关于赚钱，更重要的是关于如何合理规划和使用我们的资金。通过科学的理财规划，我们可以：\n\n- 实现财务自由\n- 应对突发风险\n- 实现人生目标\n- 提高生活质量\n\n## 理财的基本原则\n\n1. **收入大于支出** - 这是理财的基础\n2. **建立紧急备用金** - 应对突发情况\n3. **合理规划投资** - 让资金增值\n4. **控制债务** - 避免过度负债\n\n希望这篇文章能帮助你开始理财之旅！',
        excerpt: '理财入门知识和基础概念介绍，帮助你开始理财之旅',
        date: new Date().toISOString().split('T')[0],
        readTime: '5分钟',
        category: 'finance-basics',
        tags: ['理财', '入门', '基础'],
        author: '管理员',
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await fs.writeFile(ARTICLES_FILE, JSON.stringify([sampleArticle], null, 2));
      console.log('   ✅ 示例文章创建成功\n');
    }

    // 验证文件创建
    console.log('3. 验证文件创建...');
    const categoriesStats = await fs.stat(CATEGORIES_FILE);
    const articlesStats = await fs.stat(ARTICLES_FILE);

    console.log(`   分类文件大小: ${categoriesStats.size} 字节`);
    console.log(`   文章文件大小: ${articlesStats.size} 字节\n`);

    console.log('🎉 数据存储功能测试完成！');
    console.log('📁 数据文件位置:', DATA_DIR);

  } catch (error) {
    console.error('❌ 测试失败:', error);
  }
}

// 运行测试
testStorage();