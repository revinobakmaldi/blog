import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/posts");
const outputDir = path.join(process.cwd(), "public/api");

// External posts (same as lib/data.ts — single source for the script)
const externalPosts = [
  {
    id: 100,
    title:
      "Unveiling the Future: Data-Driven Technology Trends Shaping Tomorrow",
    excerpt:
      "Exploring five pivotal data-centric technology trends — from big data analytics and IoT to edge computing, data privacy, and AI-powered personalization.",
    date: "2023-07-26",
    slug: "data-driven-technology-trends",
    readTime: "6 min read",
    url: "https://www.linkedin.com/pulse/unveiling-future-data-driven-technology-trends-revino-b-akmaldi/",
  },
];

// Read MDX frontmatter
const filenames = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

const internalPosts = filenames.map((filename, index) => {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(postsDir, filename), "utf8");
  const { data } = matter(raw);
  return {
    id: index + 1,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    slug,
    readTime: data.readTime,
  };
});

const allPosts = [...internalPosts, ...externalPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(
  path.join(outputDir, "posts.json"),
  JSON.stringify(allPosts, null, 2)
);

console.log(`Generated posts.json with ${allPosts.length} posts`);
