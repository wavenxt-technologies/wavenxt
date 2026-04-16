"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  User,
  Tag,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Types ─── */

interface Blog {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: { asset: { _ref: string }; alt?: string };
  excerpt: string;
  category: string;
  tags?: string[];
  author: string;
  publishedAt: string;
}

type Status = "loading" | "error" | "success";

/* ─── Query ─── */

const BLOGS_QUERY = `*[_type == "blog"] | order(publishedAt desc) {
  _id, title, slug, mainImage, excerpt, category, tags, author, publishedAt
}`;

const CATEGORIES = [
  { id: "all", label: "All Posts" },
  { id: "technology", label: "Technology" },
  { id: "business", label: "Business" },
  { id: "design", label: "Design" },
  { id: "marketing", label: "Marketing" },
  { id: "other", label: "Other" },
];

/* ─── Helpers ─── */

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const fetchBlogs = useCallback(async () => {
    try {
      setStatus("loading");
      setError(null);
      const data = await client.fetch<Blog[]>(BLOGS_QUERY);
      setBlogs(data);
      setStatus("success");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load blog posts",
      );
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const filtered =
    activeCategory === "all"
      ? blogs
      : blogs.filter((b) => b.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-zinc-900">
      {/* ── Dark immersive hero ── */}
      <HeroSection />

      {/* ── Filter bar ── */}
      <FilterBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        totalCount={blogs.length}
        filteredCount={filtered.length}
      />

      {/* ── Content ── */}
      <section className="bg-[#f7f7f5]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
          {status === "loading" && <LoadingSkeleton />}
          {status === "error" && (
            <ErrorState message={error!} onRetry={fetchBlogs} />
          )}
          {status === "success" && filtered.length === 0 && (
            <EmptyState
              category={
                activeCategory !== "all"
                  ? CATEGORIES.find((c) => c.id === activeCategory)?.label
                  : undefined
              }
              onReset={
                activeCategory !== "all"
                  ? () => setActiveCategory("all")
                  : undefined
              }
            />
          )}
          {status === "success" && filtered.length > 0 && (
            <BlogGrid blogs={filtered} />
          )}
        </div>
      </section>

      {/* ── Navy CTA ── */}
      <BottomCTA />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   DARK HERO
   ═══════════════════════════════════════════════════ */

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#172556]">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-32 h-[400px] w-[400px] rounded-full bg-indigo-400/8 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-36 md:px-10 md:pb-20 md:pt-44">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-xs font-medium uppercase tracking-[0.25em] text-blue-200/60"
          >
            Resources · Blog
          </motion.p>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mt-6 max-w-4xl font-heading text-4xl font-medium leading-[1.1] tracking-tight text-white md:text-6xl"
          >
            Engineering insights
            <br />
            <span className="text-white/35">& industry updates</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-7 max-w-2xl text-base leading-relaxed text-blue-100/60 md:text-lg"
          >
            Deep dives into RF testing, wireless measurement techniques, and the
            latest from our engineering team — helping you stay ahead in
            wireless validation.
          </motion.p>

          {/* Breadcrumb */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-8 flex items-center gap-2 text-sm text-white/30"
          >
            <Link href="/" className="transition-colors hover:text-white/60">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/resources/blogs"
              className="transition-colors hover:text-white/60"
            >
              Resources
            </Link>
            <span>/</span>
            <span className="text-white/60">Blogs</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FILTER BAR
   ═══════════════════════════════════════════════════ */

function FilterBar({
  activeCategory,
  setActiveCategory,
  totalCount,
  filteredCount,
}: {
  activeCategory: string;
  setActiveCategory: (c: string) => void;
  totalCount: number;
  filteredCount: number;
}) {
  return (
    <div className="sticky top-16 z-30 border-b border-zinc-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-10">
        <div className="flex flex-wrap items-center gap-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-[#172556]"
                    : "text-zinc-400 hover:text-zinc-600",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="blog-filter-bg"
                    className="absolute inset-0 rounded-lg bg-[#172556]/[0.06]"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {totalCount > 0 && (
          <span className="hidden text-sm tabular-nums text-zinc-400 sm:inline">
            {filteredCount} {filteredCount === 1 ? "post" : "posts"}
          </span>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   BLOG GRID
   ═══════════════════════════════════════════════════ */

function BlogGrid({ blogs }: { blogs: Blog[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const [featured, ...rest] = blogs;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
    >
      {/* Featured */}
      <motion.div variants={fadeUp} custom={0}>
        <FeaturedCard blog={featured} />
      </motion.div>

      {/* Grid */}
      {rest.length > 0 && (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {rest.map((blog, i) => (
              <motion.div
                key={blog._id}
                layout
                variants={fadeUp}
                custom={i + 1}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, delay: i * 0.04, ease }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Featured Card ─── */

function FeaturedCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/resources/blogs/${blog.slug.current}`}>
      <div className="group overflow-hidden rounded-3xl border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/80 shadow-[0_1px_0_0_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-300/40">
        <div className="grid md:grid-cols-12">
          {/* Image */}
          <div className="relative md:col-span-7">
            <div className="relative aspect-[16/10] w-full md:aspect-auto md:h-full md:min-h-[440px]">
              <Image
                src={urlFor(blog.mainImage).width(900).height(600).url()}
                alt={blog.mainImage.alt || blog.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 58vw"
                priority
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-40 bg-gradient-to-l from-white to-transparent md:block" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent md:hidden" />

              {/* Badge */}
              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-[#172556] px-3.5 py-1.5 shadow-lg shadow-[#172556]/20">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                  Featured
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center px-6 py-8 md:col-span-5 md:px-10 md:py-12">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#172556]/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#172556]">
                {blog.category}
              </span>
              <span className="text-xs text-zinc-400">
                {formatDate(blog.publishedAt)}
              </span>
            </div>

            <h2 className="mt-6 font-heading text-2xl font-medium leading-tight tracking-tight text-zinc-900 md:text-3xl">
              {blog.title}
            </h2>

            <p className="mt-4 text-[15px] leading-relaxed text-zinc-500 line-clamp-3">
              {blog.excerpt}
            </p>

            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {blog.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 rounded-lg bg-zinc-100/80 px-2.5 py-1 text-[10px] font-medium text-zinc-500"
                  >
                    <Tag className="size-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 flex items-center justify-between border-t border-zinc-100 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-zinc-100 ring-2 ring-zinc-50">
                  <User className="size-3.5 text-zinc-500" />
                </div>
                <span className="text-sm font-medium text-zinc-700">
                  {blog.author}
                </span>
              </div>

              <span className="inline-flex items-center gap-2 rounded-xl bg-[#172556] px-5 py-2.5 text-xs font-semibold text-white shadow-[0_4px_12px_-4px_rgba(23,37,86,0.4)] transition-all group-hover:bg-[#1e3070]">
                Read
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Blog Card ─── */

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/resources/blogs/${blog.slug.current}`}>
      <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/80 shadow-[0_1px_0_0_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/50 hover:border-zinc-300/80">
        {/* Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
          <Image
            src={urlFor(blog.mainImage).width(600).height(375).url()}
            alt={blog.mainImage.alt || blog.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Category badge */}
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#172556] shadow-lg backdrop-blur-sm">
              {blog.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <span className="text-[11px] font-medium text-zinc-400">
            {formatDate(blog.publishedAt)}
          </span>

          <h3 className="mt-3 font-heading text-lg font-medium leading-snug tracking-tight text-zinc-900 line-clamp-2 group-hover:text-[#172556] transition-colors duration-200">
            {blog.title}
          </h3>

          <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-zinc-500 line-clamp-2">
            {blog.excerpt}
          </p>

          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {blog.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-400"
                >
                  <Tag className="size-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4">
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-full bg-zinc-100">
                <User className="size-3 text-zinc-400" />
              </div>
              <span className="text-xs font-medium text-zinc-500">
                {blog.author}
              </span>
            </div>
            <span className="flex size-8 items-center justify-center rounded-full border border-zinc-200/80 text-zinc-400 transition-all duration-300 group-hover:border-[#172556] group-hover:bg-[#172556] group-hover:text-white">
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════
   BOTTOM CTA
   ═══════════════════════════════════════════════════ */

function BottomCTA() {
  return (
    <section className="relative overflow-hidden bg-[#172556] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-indigo-400/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid gap-10 md:grid-cols-12 md:items-center"
        >
          <motion.div variants={fadeUp} custom={0} className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.2em] text-blue-200/70">
              Stay Updated
            </p>
            <h2 className="mt-4 font-heading text-3xl font-medium tracking-tight md:text-4xl">
              Want more engineering insights?
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-blue-100/60">
              Watch our live webinars and on-demand recordings on RF
              engineering, wireless testing methodologies, and product deep
              dives.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            className="flex flex-wrap gap-3 md:col-span-5 md:justify-end"
          >
            <Link href="/resources/webinars">
              <motion.span
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
              >
                Browse Webinars
                <ArrowRight className="size-4" />
              </motion.span>
            </Link>
            <Link href="/contact">
              <motion.span
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                Get in Touch
                <ArrowUpRight className="size-3.5" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   STATE COMPONENTS
   ═══════════════════════════════════════════════════ */

function LoadingSkeleton() {
  return (
    <div className="space-y-12">
      {/* Featured skeleton */}
      <div className="animate-pulse overflow-hidden rounded-3xl border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/80">
        <div className="grid md:grid-cols-12">
          <div className="aspect-[16/10] bg-zinc-100 md:col-span-7 md:aspect-auto md:min-h-[440px]" />
          <div className="flex flex-col justify-center p-8 md:col-span-5 md:p-12">
            <div className="flex gap-3">
              <div className="h-6 w-20 rounded-full bg-zinc-100" />
              <div className="h-6 w-24 rounded bg-zinc-100" />
            </div>
            <div className="mt-8 h-8 w-full rounded bg-zinc-100" />
            <div className="mt-3 h-8 w-3/4 rounded bg-zinc-100" />
            <div className="mt-6 space-y-2">
              <div className="h-4 w-full rounded bg-zinc-100" />
              <div className="h-4 w-5/6 rounded bg-zinc-100" />
            </div>
            <div className="mt-8 flex items-center gap-3 border-t border-zinc-100 pt-6">
              <div className="size-9 rounded-full bg-zinc-100" />
              <div className="h-4 w-24 rounded bg-zinc-100" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse overflow-hidden rounded-3xl border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/80"
          >
            <div className="aspect-[16/10] w-full bg-zinc-100" />
            <div className="space-y-3 p-6">
              <div className="h-3 w-20 rounded bg-zinc-100" />
              <div className="h-5 w-full rounded bg-zinc-100" />
              <div className="h-5 w-2/3 rounded bg-zinc-100" />
              <div className="h-3 w-full rounded bg-zinc-100" />
              <div className="h-3 w-3/4 rounded bg-zinc-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-28">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-red-50">
        <AlertCircle className="size-7 text-red-400" />
      </div>
      <h3 className="mt-6 font-heading text-xl font-medium text-zinc-900">
        Something went wrong
      </h3>
      <p className="mt-3 max-w-sm text-center text-sm leading-relaxed text-zinc-500">
        {message}
      </p>
      <motion.button
        onClick={onRetry}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#172556] px-6 py-3 text-sm font-medium text-white shadow-[0_10px_24px_-10px_rgba(23,37,86,0.4)] transition-all hover:bg-[#1e3070]"
      >
        <RefreshCw className="size-4" />
        Try again
      </motion.button>
    </div>
  );
}

function EmptyState({
  category,
  onReset,
}: {
  category?: string;
  onReset?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-28">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-zinc-100">
        <BookOpen className="size-7 text-zinc-400" />
      </div>
      <h3 className="mt-6 font-heading text-xl font-medium text-zinc-900">
        {category ? `No ${category} posts yet` : "No blog posts yet"}
      </h3>
      <p className="mt-3 max-w-sm text-center text-sm leading-relaxed text-zinc-500">
        {category
          ? `We haven't published any ${category.toLowerCase()} articles yet. Check back soon or browse other categories.`
          : "We're working on some great content. Check back soon for insights and updates."}
      </p>
      {onReset && (
        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 transition-all hover:border-zinc-400 hover:shadow-sm"
        >
          View all posts
        </motion.button>
      )}
    </div>
  );
}
