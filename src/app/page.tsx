import { getAllPosts, getAllTags } from "@/lib/blog";
import PostCard from "@/components/post-card";
import Link from "next/link";
import { Search, BookOpen, Tag } from "lucide-react";
import { BlogPost } from "@/types/blog";

export default function Home() {
  let posts: BlogPost[] = [];
  let tags: string[] = [];
  let featuredPosts: BlogPost[] = [];
  
  try {
    posts = getAllPosts();
    tags = getAllTags();
    featuredPosts = posts.slice(0, 6); // 显示最新的6篇文章
  } catch (error) {
    console.error('Error loading posts:', error);
    // 变量已经初始化为空数组
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          欢迎来到我的博客
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          分享技术知识、编程经验和生活感悟的个人空间
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/posts"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <BookOpen className="mr-2" size={20} />
            浏览所有文章
          </Link>
          <Link
            href="/tags"
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Tag className="mr-2" size={20} />
            查看标签
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {posts.length}
          </div>
          <div className="text-gray-600 dark:text-gray-300">篇文章</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            {tags.length}
          </div>
          <div className="text-gray-600 dark:text-gray-300">个标签</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {posts.reduce((total, post) => {
              const time = parseInt(post.readingTime.split(' ')[0]);
              return total + (isNaN(time) ? 0 : time);
            }, 0)}
          </div>
          <div className="text-gray-600 dark:text-gray-300">分钟阅读</div>
        </div>
      </section>

      {/* Latest Posts */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            最新文章
          </h2>
          {posts.length > 6 && (
            <Link
              href="/posts"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              查看全部 →
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <Search className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              暂无文章
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              还没有发布任何文章，请稍后再来查看。
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Popular Tags */}
      {tags.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            热门标签
          </h2>
          <div className="flex flex-wrap gap-3">
            {tags.slice(0, 10).map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
