const LANDING_PAGE_URL = "https://revinobakmaldi.vercel.app";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Revino B Akmaldi. All rights
            reserved.
          </p>
          <a
            href={LANDING_PAGE_URL}
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-primary transition-colors"
          >
            &larr; Back to Main Site
          </a>
        </div>
      </div>
    </footer>
  );
}
