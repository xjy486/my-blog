import { getAllTags, getAllPosts } from "@/lib/blog";
import { BlogPost } from "@/types/blog";
import Link from "next/link";
import { Tag, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "所有标签 | 我的博客",
  description: "浏览博客的所有标签分类",
};

export default function TagsPage() {
  let tags: string[] = [];
  let posts: BlogPost[] = [];

  try {
    tags = getAllTags();
    posts = getAllPosts();
  } catch (error) {
    console.error('Error loading tags and posts:', error);
    // 变量已经初始化为空数组
  }

  // 计算每个标签的文章数量
  const tagCounts = tags.map((tag) => ({
    name: tag,
    count: posts.filter((post) => post.tags.includes(tag)).length,
  }));

  // 按文章数量排序
  tagCounts.sort((a, b) => b.count - a.count);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8"
      >
        <ArrowLeft className="mr-2" size={20} />
        返回首页
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center mb-4">
          <Tag className="mr-3 text-blue-600 dark:text-blue-400" size={32} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            所有标签
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          共有 {tags.length} 个标签，覆盖 {posts.length} 篇文章
        </p>
      </header>

      {/* Tags Grid */}
      {tags.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tagCounts.map(({ name, count }) => (
            <Link
              key={name}
              href={`/tags/${encodeURIComponent(name)}`}
              className="group bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Tag className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" size={20} />
                  <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {name}
                  </h3>
                </div>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm px-2 py-1 rounded-full">
                  {count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Tag className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            暂无标签
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            还没有创建任何标签，请先发布一些文章。
          </p>
        </div>
      )}

      {/* Tag Cloud */}
      {tags.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            标签云
          </h2>
          <div className="flex flex-wrap gap-3">
            {tagCounts.map(({ name, count }) => {
              // 根据文章数量确定标签大小
              const sizeClass = count >= 5 ? 'text-xl' : count >= 3 ? 'text-lg' : 'text-base';
              const opacityClass = count >= 5 ? 'opacity-100' : count >= 3 ? 'opacity-80' : 'opacity-60';
              
              return (
                <Link
                  key={name}
                  href={`/tags/${encodeURIComponent(name)}`}
                  className={`${sizeClass} ${opacityClass} px-3 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 rounded-full hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-800 dark:hover:to-purple-800 transition-all duration-200 hover:scale-105`}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
