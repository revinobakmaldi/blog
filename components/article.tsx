"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ArticleProps {
  title: string;
  date: string;
  readTime: string;
  children: React.ReactNode;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function Article({
  title,
  date,
  readTime,
  children,
}: ArticleProps) {
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
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </Link>

          {/* Article header */}
          <header className="mb-12 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {title}
              </span>
            </h1>

            <div className="flex items-center gap-4 text-sm text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{formatDate(date)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent" />
                <span>{readTime}</span>
              </div>
            </div>
          </header>

          {/* Article content */}
          <article className="prose prose-invert prose-lg max-w-none prose-headings:bg-gradient-to-r prose-headings:from-zinc-100 prose-headings:to-zinc-300 prose-headings:bg-clip-text prose-headings:text-transparent prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-emerald-400 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-strong:text-zinc-200 prose-li:marker:text-primary">
            {children}
          </article>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 pt-8 border-t border-zinc-800"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-secondary via-accent to-primary text-white font-semibold shadow-xl shadow-secondary/25 hover:shadow-2xl hover:shadow-secondary/40 transition-all"
            >
              <span>Back to All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
