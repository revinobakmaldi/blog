export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  readTime: string;
  url?: string;
}

export interface CompiledPost extends BlogPost {
  content: React.ReactElement;
}
