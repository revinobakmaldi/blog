"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, PenTool, ExternalLink } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/types";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl"
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20"
            >
              <PenTool className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Blog</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                All Articles
              </span>
            </h1>

            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Insights on data products, analytics engineering, and shipping ML
              to production
            </p>
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.map((post) => {
              const isExternal = !!post.url;

              const CardWrapper = isExternal ? "a" : Link;
              const cardProps = isExternal
                ? {
                    href: post.url!,
                    target: "_blank" as const,
                    rel: "noopener noreferrer",
                  }
                : { href: `/${post.slug}` };

              return (
                <motion.article
                  key={post.id}
                  variants={cardVariants}
                  className="group relative"
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <CardWrapper
                    {...cardProps}
                    className="relative block h-full rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 shadow-xl overflow-hidden"
                  >
                    {/* Gradient Header */}
                    <div className="relative h-40 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/40 to-accent/40" />
                      <div className="absolute inset-0 opacity-30">
                        <motion.div
                          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                            backgroundSize: "24px 24px",
                          }}
                        />
                      </div>

                      {/* Date badge */}
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 backdrop-blur-sm shadow-lg">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          <span className="text-xs font-medium text-zinc-300">
                            {formatDate(post.date)}
                          </span>
                        </div>
                      </div>

                      {/* Read time badge */}
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 backdrop-blur-sm shadow-lg">
                          <Clock className="w-3.5 h-3.5 text-accent" />
                          <span className="text-xs font-medium text-zinc-300">
                            {post.readTime}
                          </span>
                        </div>
                      </div>

                      {/* External badge */}
                      {isExternal && (
                        <div className="absolute bottom-4 left-4">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/90 backdrop-blur-sm shadow-lg">
                            <ExternalLink className="w-3 h-3 text-white" />
                            <span className="text-xs font-semibold text-white">
                              Read on LinkedIn
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-zinc-100 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="pt-4 border-t border-zinc-800">
                        <span className="flex items-center gap-2 text-sm font-semibold text-primary">
                          <span>
                            {isExternal ? "Read on LinkedIn" : "Read More"}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </CardWrapper>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
