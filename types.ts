
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  replies?: Comment[];
  status: 'approved' | 'pending' | 'rejected';
}

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: User;
  publishedAt: string;
  categories: string[];
  tags: string[];
  comments: Comment[];
  status: PostStatus;
}

export interface ThemeSettings {
  title: string;
  description: string;
  logo: string;
  lightColors: { primary: string; background: string; text: string; };
  darkColors: { primary: string; background: string; text: string; };
  homepageLayout: 'grid' | 'list';
  footerContent: string;
}
