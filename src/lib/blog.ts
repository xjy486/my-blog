import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost, PostFrontmatter } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''));
}

export function getPostBySlug(slug: string): BlogPost {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const frontmatter = data as PostFrontmatter;
  
  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    excerpt: frontmatter.excerpt,
    content,
    tags: frontmatter.tags || [],
    readingTime: `${readingTime} min read`,
    author: frontmatter.author,
    coverImage: frontmatter.coverImage,
  };
}

export async function getPostContent(slug: string): Promise<string> {
  const post = getPostBySlug(slug);
  const processedContent = await remark().use(html).process(post.content);
  return processedContent.toString();
}

export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter((post) => 
    post.tags.some((postTag) => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  );
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  
  return Array.from(tagSet).sort();
}

export function searchPosts(query: string): BlogPost[] {
  const posts = getAllPosts();
  const searchTerm = query.toLowerCase();
  
  return posts.filter((post) => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );
}
