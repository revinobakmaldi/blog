"use client";

import { motion } from "framer-motion";
import { PenTool, Home } from "lucide-react";
import Link from "next/link";

const LANDING_PAGE_URL = "https://revinobakmaldi.vercel.app";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-secondary">
              <PenTool className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-zinc-100 group-hover:text-primary transition-colors">
              RBA Blog
            </span>
          </Link>

          <a
            href={LANDING_PAGE_URL}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
