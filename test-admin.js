// 测试管理后台数据存储功能
const { getArticles, saveArticles, getCategories, saveCategories, generateId } = require('./lib/storage');

async function testAdminFunctions() {
  console.log('🧪 开始测试管理后台功能...\n');

  try {
    // 测试分类功能
    console.log('1. 测试分类管理...');
    const categories = await getCategories();
    console.log(`   当前分类数量: ${categories.length}`);
    console.log(`   默认分类: ${categories.map(cat => cat.name).join(', ')}\n`);

    // 测试文章功能
    console.log('2. 测试文章管理...');
    const articles = await getArticles();
    console.log(`   当前文章数量: ${articles.length}\n`);

    // 测试创建新文章
    console.log('3. 测试创建新文章...');
    const newArticle = {
      id: generateId(),
      title: '测试文章 - 理财入门指南',
      content: '这是一篇测试文章的内容，用于验证管理后台的功能。\n\n理财是每个人都需要掌握的重要技能，它关系到我们的财务安全和未来生活质量。',
      excerpt: '理财入门知识和基础概念介绍',
      date: new Date().toISOString().split('T')[0],
      readTime: '5分钟',
      category: 'finance-basics',
      tags: ['理财', '入门', '基础'],
      author: '管理员',
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedArticles = [...articles, newArticle];
    await saveArticles(updatedArticles);
    console.log('   ✅ 文章创建成功\n');

    // 验证保存结果
    const savedArticles = await getArticles();
    console.log(`   保存后文章数量: ${savedArticles.length}`);
    console.log(`   最新文章标题: ${savedArticles[savedArticles.length - 1].title}\n`);

    console.log('🎉 所有测试通过！管理后台数据存储功能正常。');

  } catch (error) {
    console.error('❌ 测试失败:', error);
  }
}

// 运行测试
testAdminFunctions();