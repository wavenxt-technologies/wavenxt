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
  AlertCircle,
  RefreshCw,
  Mail,
} from "lucide-react";
import { client, urlFor } from "@/lib/sanity";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease },
  }),
};

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

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

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-zinc-900">
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-48">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-[#172556]/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-zinc-500"
            >
              <Link
                href="/resources"
                className="transition-colors hover:text-[#172556]"
              >
                Resources
              </Link>
              <div className="h-0.5 w-6 bg-zinc-300" />
              <span>Blogs</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-heading text-5xl font-medium leading-[1.1] tracking-tighter md:text-7xl lg:text-8xl"
            >
              Our Blogs
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Cards */}
      <div className="mx-auto max-w-7xl px-6 pb-20 md:px-10 md:pb-28">
        {status === "loading" && <LoadingSkeleton />}
        {status === "error" && (
          <ErrorState message={error!} onRetry={fetchBlogs} />
        )}
        {status === "success" && blogs.length === 0 && <EmptyState />}
        {status === "success" && blogs.length > 0 && (
          <BlogLayout blogs={blogs} />
        )}
      </div>
    </main>
  );
}

/* ═══════════════════════════════════════════════════
   BLOG LAYOUT
   ═══════════════════════════════════════════════════ */

function BlogLayout({ blogs }: { blogs: Blog[] }) {
  const [featured, ...rest] = blogs;

  return (
    <div className="space-y-12">
      {/* Latest — large card */}
      <FeaturedPost blog={featured} />

      {/* Remaining — smaller grid */}
      {rest.length > 0 && (
        <>
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-zinc-200" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
              More Articles
            </span>
            <div className="h-px flex-1 bg-zinc-200" />
          </div>
          <PostGrid posts={rest} />
        </>
      )}
    </div>
  );
}

/* ─── Featured / Latest Post ─── */

function FeaturedPost({ blog }: { blog: Blog }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.75, ease }}
    >
      <Link href={`/resources/blogs/${blog.slug.current}`}>
        <article className="group grid overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] transition-all duration-500 hover:border-zinc-300/80 hover:shadow-[0_8px_48px_-8px_rgba(0,0,0,0.11)] md:grid-cols-[3fr_2fr]">
          {/* Image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 md:aspect-auto md:min-h-[460px]">
            <Image
              src={urlFor(blog.mainImage).width(1000).height(700).url()}
              alt={blog.mainImage.alt || blog.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent md:hidden" />
            {/* Latest badge */}
            <div className="absolute left-5 top-5">
              <span className="rounded-full bg-[#172556] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#172556]/20">
                Latest
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between p-8 md:p-10">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {formatDate(blog.publishedAt)}
              </span>

              <h2 className="mt-3 font-heading text-2xl font-semibold leading-snug tracking-tight text-zinc-900 transition-colors duration-200 group-hover:text-[#172556] md:text-[1.65rem]">
                {blog.title}
              </h2>

              <p className="mt-4 text-[14px] leading-relaxed text-zinc-500 line-clamp-4">
                {blog.excerpt}
              </p>

              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {blog.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-zinc-100 pt-6">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-full bg-[#172556]/[0.07]">
                  <User className="size-3.5 text-[#172556]" />
                </div>
                <span className="text-sm font-medium text-zinc-700">
                  {blog.author}
                </span>
              </div>
              <span className="inline-flex items-center gap-2 rounded-lg bg-[#172556] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_14px_-4px_rgba(23,37,86,0.38)] transition-all duration-300 group-hover:bg-[#1e3070] group-hover:shadow-[0_6px_20px_-4px_rgba(23,37,86,0.48)]">
                Read
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

/* ─── Post Grid ─── */

function PostGrid({ posts }: { posts: Blog[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {posts.map((post, i) => (
          <motion.div
            key={post._id}
            layout
            variants={fadeUp}
            custom={i}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, delay: i * 0.05, ease }}
          >
            <PostCard blog={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Post Card ─── */

function PostCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/resources/blogs/${blog.slug.current}`}>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300/80 hover:shadow-[0_8px_28px_-6px_rgba(0,0,0,0.09)]">
        {/* Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
          <Image
            src={urlFor(blog.mainImage).width(600).height(375).url()}
            alt={blog.mainImage.alt || blog.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
            {formatDate(blog.publishedAt)}
          </span>

          <h3 className="mt-2 line-clamp-2 font-heading text-[1.05rem] font-semibold leading-snug tracking-tight text-zinc-900 transition-colors duration-200 group-hover:text-[#172556]">
            {blog.title}
          </h3>

          <p className="mt-1.5 flex-1 line-clamp-2 text-[13px] leading-relaxed text-zinc-500">
            {blog.excerpt}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-full bg-zinc-100">
                <User className="size-2.5 text-zinc-400" />
              </div>
              <span className="text-xs font-medium text-zinc-500">
                {blog.author}
              </span>
            </div>
            <span className="flex size-7 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition-all duration-300 group-hover:border-[#172556] group-hover:bg-[#172556] group-hover:text-white">
              <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════
   STATE COMPONENTS
   ═══════════════════════════════════════════════════ */

function LoadingSkeleton() {
  return (
    <div className="space-y-12">
      <div className="animate-pulse overflow-hidden rounded-2xl border border-zinc-200/80 bg-white md:grid md:grid-cols-[3fr_2fr]">
        <div className="aspect-[16/10] bg-zinc-100 md:min-h-[460px]" />
        <div className="flex flex-col justify-between p-8 md:p-10">
          <div className="space-y-3">
            <div className="h-3 w-24 rounded bg-zinc-100" />
            <div className="h-6 w-full rounded bg-zinc-100" />
            <div className="h-6 w-4/5 rounded bg-zinc-100" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full rounded bg-zinc-100" />
              <div className="h-4 w-5/6 rounded bg-zinc-100" />
              <div className="h-4 w-4/6 rounded bg-zinc-100" />
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-zinc-100 pt-6">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-full bg-zinc-100" />
              <div className="h-4 w-24 rounded bg-zinc-100" />
            </div>
            <div className="h-9 w-24 rounded-lg bg-zinc-100" />
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse overflow-hidden rounded-2xl border border-zinc-200/80 bg-white"
          >
            <div className="aspect-[16/10] bg-zinc-100" />
            <div className="space-y-3 p-5">
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
      <div className="flex size-14 items-center justify-center rounded-2xl bg-red-50">
        <AlertCircle className="size-6 text-red-400" />
      </div>
      <h3 className="mt-6 font-heading text-xl font-semibold text-zinc-900">
        Something went wrong
      </h3>
      <p className="mt-2 max-w-sm text-center text-sm leading-relaxed text-zinc-500">
        {message}
      </p>
      <motion.button
        onClick={onRetry}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#172556] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(23,37,86,0.4)]"
      >
        <RefreshCw className="size-4" />
        Try again
      </motion.button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="relative overflow-hidden py-28 md:py-40">
      {/* Ghost text */}
      <span className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-heading text-[18vw] font-black leading-none tracking-tighter text-zinc-900/[0.03]">
        Coming Soon
      </span>

      <div className="relative flex flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
          Stay tuned
        </p>
        <h2 className="mt-5 font-heading text-4xl font-medium leading-tight tracking-tight text-zinc-900 md:text-6xl">
          No articles yet
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-500 md:text-lg">
          We&apos;re working on some great content. Check back soon for
          engineering insights and updates.
        </p>
        <Link href="/contact">
          <motion.span
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-[#172556] px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(23,37,86,0.35)]"
          >
            Get in touch
            <ArrowUpRight className="size-4" />
          </motion.span>
        </Link>
      </div>
    </div>
  );
}
