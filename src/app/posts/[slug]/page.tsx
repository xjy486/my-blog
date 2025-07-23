import { getAllPostSlugs, getPostBySlug, getPostContent } from "@/lib/blog";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import Link from "next/link";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  try {
    const slugs = getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    
    return {
      title: `${post.title} | 我的博客`,
      description: post.excerpt,
      keywords: post.tags,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.date,
        tags: post.tags,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "文章未找到 | 我的博客",
      description: "请求的文章不存在",
    };
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  let post, content;
  
  try {
    const { slug } = await params;
    post = getPostBySlug(slug);
    content = await getPostContent(slug);
  } catch (error) {
    console.error('Error loading post:', error);
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            文章未找到
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            请求的文章不存在或已被删除。
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8"
      >
        <ArrowLeft className="mr-2" size={20} />
        返回首页
      </Link>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
          <div className="flex items-center space-x-2">
            <Calendar size={16} />
            <time dateTime={post.date}>
              {format(new Date(post.date), "yyyy年MM月dd日", { locale: zhCN })}
            </time>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={16} />
            <span>{post.readingTime}</span>
          </div>
          {post.author && (
            <span>作者: {post.author}</span>
          )}
        </div>

        {post.tags.length > 0 && (
          <div className="flex items-center flex-wrap gap-2 mb-6">
            <Tag size={16} className="text-gray-400" />
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {post.coverImage && (
          <div className="mb-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
      </header>

      {/* Article Content */}
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:mt-8
                     [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:mt-6
                     [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mb-3 [&>h3]:mt-5
                     [&>p]:mb-4 [&>p]:leading-relaxed
                     [&>ul]:mb-4 [&>ul]:pl-6
                     [&>ol]:mb-4 [&>ol]:pl-6
                     [&>li]:mb-1
                     [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-4
                     [&>pre]:bg-gray-100 [&>pre]:dark:bg-gray-800 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:my-4
                     [&>code]:bg-gray-100 [&>code]:dark:bg-gray-800 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm
                     [&>img]:rounded-lg [&>img]:shadow-md [&>img]:my-6"
        />
      </article>

      {/* Navigation to Previous/Next Posts */}
      <nav className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            返回首页
          </Link>
        </div>
      </nav>
    </div>
  );
}
