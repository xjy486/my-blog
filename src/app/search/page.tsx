'use client';

import { useState, useEffect } from "react";
import PostCard from "@/components/post-card";
import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PostPreview } from "@/types/blog";
import postsData from "@/data/posts.json";

// 客户端搜索函数
function searchPosts(posts: PostPreview[], query: string): PostPreview[] {
  const searchTerm = query.toLowerCase();
  
  return posts.filter((post) => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 直接使用静态数据
    setPosts(postsData as PostPreview[]);
  }, []);  const results = query && posts.length > 0 ? searchPosts(posts, query) : [];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">加载中...</p>
        </div>
      </div>
    );
  }

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
          <Search className="mr-3 text-blue-600 dark:text-blue-400" size={32} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            搜索结果
          </h1>
        </div>
        {query && (
          <p className="text-gray-600 dark:text-gray-300">
            搜索 &ldquo;{query}&rdquo; 找到 {results.length} 篇文章
          </p>
        )}
      </header>

      {/* Search Results */}
      {query ? (
        results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              未找到相关文章
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              尝试使用不同的关键词进行搜索。
            </p>
          </div>
        )
      ) : (
        <div className="text-center py-16">
          <Search className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            请输入搜索关键词
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            在上方搜索框中输入关键词来搜索文章。
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">搜索中...</p>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
