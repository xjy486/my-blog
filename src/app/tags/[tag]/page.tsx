import { getAllTags, getPostsByTag } from "@/lib/blog";
import { BlogPost } from "@/types/blog";
import Link from "next/link";
import { Tag, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  try {
    const tags = getAllTags();
    return tags.map((tag) => ({ tag: encodeURIComponent(tag) }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  
  return {
    title: `标签: ${decodedTag} | 我的博客`,
    description: `查看所有标签为 "${decodedTag}" 的文章`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  
  let posts: BlogPost[] = [];
  try {
    posts = getPostsByTag(decodedTag);
  } catch (error) {
    console.error('Error loading posts by tag:', error);
    // posts 已经初始化为空数组
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Link */}
      <Link
        href="/tags"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8"
      >
        <ArrowLeft className="mr-2" size={20} />
        返回标签页
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center mb-4">
          <Tag className="mr-3 text-blue-600 dark:text-blue-400" size={32} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {decodedTag}
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          找到 {posts.length} 篇相关文章
        </p>
      </header>

      {/* Posts List */}
      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.date}</span>
                  <span>{post.readingTime}</span>
                  {post.author && <span>作者: {post.author}</span>}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-16">
          <Tag className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            暂无相关文章
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            标签 &ldquo;{decodedTag}&rdquo; 下还没有任何文章。
          </p>
        </div>
      )}
    </div>
  );
}
