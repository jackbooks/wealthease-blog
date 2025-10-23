const fs = require('fs/promises');
const path = require('path');

// 需要修复的文件列表
const filesToFix = [
  'components/admin/ArticleEditor.tsx',
  'app/admin/categories/page.tsx',
  'components/admin/CategoryForm.tsx',
  'app/admin/categories/[id]/page.tsx',
  'app/admin/articles/page.tsx',
  'app/admin/articles/[id]/page.tsx',
  'app/admin/articles/new/page.tsx'
];

async function fixImports() {
  console.log('🔧 开始修复导入...\n');

  for (const filePath of filesToFix) {
    try {
      const fullPath = path.join(__dirname, filePath);
      const content = await fs.readFile(fullPath, 'utf-8');

      // 替换导入
      const newContent = content.replace(
        /import\s*\{[^}]*\}\s*from\s*['"]@\/lib\/storage['"]/g,
        match => {
          // 如果只导入了类型，就替换为 admin
          if (match.includes('Article') || match.includes('Category')) {
            return match.replace('@/lib/storage', '@/lib/admin');
          }
          return match;
        }
      );

      if (content !== newContent) {
        await fs.writeFile(fullPath, newContent);
        console.log(`✅ 已修复: ${filePath}`);
      } else {
        console.log(`ℹ️ 无需修复: ${filePath}`);
      }

    } catch (error) {
      console.error(`❌ 修复失败: ${filePath}`, error.message);
    }
  }

  console.log('\n🎉 导入修复完成！');
}

// 运行修复
fixImports();