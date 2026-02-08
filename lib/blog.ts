import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { BlogPost, CompiledPost } from "@/types";
import { externalPosts } from "@/lib/data";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPosts(): BlogPost[] {
  const filenames = fs.readdirSync(postsDirectory);

  const internalPosts: BlogPost[] = filenames
    .filter((name) => name.endsWith(".mdx"))
    .map((filename, index) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        id: index + 1,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        slug,
        readTime: data.readTime,
      };
    });

  const allPosts = [...internalPosts, ...externalPosts];
  allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return allPosts;
}

export async function getPostBySlug(
  slug: string
): Promise<CompiledPost | null> {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content: rawContent } = matter(fileContents);

  const { content } = await compileMDX({
    source: rawContent,
    options: {
      mdxOptions: {
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "github-dark-default",
            },
          ],
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
      },
    },
  });

  return {
    id: 0,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    slug,
    readTime: data.readTime,
    content,
  };
}

export function getInternalSlugs(): string[] {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}
