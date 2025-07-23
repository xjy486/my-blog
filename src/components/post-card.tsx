import Link from 'next/link';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { PostPreview } from '@/types/blog';
import { Calendar, Clock, Tag } from 'lucide-react';

interface PostCardProps {
  post: PostPreview;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group">
      {post.coverImage && (
        <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <time dateTime={post.date}>
              {format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}
            </time>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{post.readingTime}</span>
          </div>
          {post.author && (
            <span>作者: {post.author}</span>
          )}
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <Link href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {post.tags.length > 0 && (
          <div className="flex items-center flex-wrap gap-2">
            <Tag size={14} className="text-gray-400" />
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
