export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  readingTime: string;
  author?: string;
  coverImage?: string;
}

export interface PostPreview {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  author?: string;
  coverImage?: string | null;
}

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author?: string;
  coverImage?: string;
}
