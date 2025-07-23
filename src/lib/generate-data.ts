import fs from 'fs';
import path from 'path';
import { getAllPosts } from './blog';

export async function generatePostsData() {
  try {
    const posts = await getAllPosts();
    const postsData = posts.map(post => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      tags: post.tags,
      readingTime: post.readingTime,
      coverImage: post.coverImage
    }));
    
    const dataDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(dataDir, 'posts.json'),
      JSON.stringify(postsData, null, 2)
    );
    
    return postsData;
  } catch (error) {
    console.error('Error generating posts data:', error);
    return [];
  }
}
