const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} 分钟阅读`;
}

async function generatePostsData() {
  console.log('开始生成文章数据...');
  
  try {
    const postsDirectory = path.join(process.cwd(), 'posts');
    
    // 检查posts目录是否存在
    if (!fs.existsSync(postsDirectory)) {
      console.log('posts目录不存在，创建空数据文件');
      const dataDir = path.join(process.cwd(), 'src', 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(
        path.join(dataDir, 'posts.json'),
        JSON.stringify([], null, 2)
      );
      return;
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = [];

    for (const fileName of fileNames) {
      if (!fileName.endsWith('.md')) continue;
      
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      const postData = {
        slug,
        title: matterResult.data.title || slug,
        excerpt: matterResult.data.excerpt || '',
        date: matterResult.data.date || new Date().toISOString(),
        tags: matterResult.data.tags || [],
        readingTime: calculateReadingTime(matterResult.content),
        author: matterResult.data.author || null,
        coverImage: matterResult.data.coverImage || null
      };

      allPostsData.push(postData);
    }

    // 按日期排序
    allPostsData.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 确保data目录存在
    const dataDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(
      path.join(dataDir, 'posts.json'),
      JSON.stringify(allPostsData, null, 2)
    );

    console.log(`成功生成 ${allPostsData.length} 篇文章的数据`);
  } catch (error) {
    console.error('生成文章数据时出错:', error);
    // 创建空数据文件，避免构建失败
    const dataDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(dataDir, 'posts.json'),
      JSON.stringify([], null, 2)
    );
  }
}

generatePostsData();
