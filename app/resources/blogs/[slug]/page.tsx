import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  ArrowUpRight,
  Tag,
} from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import ReadingProgress from "@/components/reading-progress";
import TableOfContents from "@/components/blog-toc";

/* ─── Types ─── */

interface TableRow {
  _key: string;
  _type: "tableRow";
  cells: string[];
}

interface Blog {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: { asset: { _ref: string }; alt?: string };
  excerpt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  category?: string;
  tags?: string[];
  author: string;
  publishedAt: string;
}

type RelatedBlog = Pick<
  Blog,
  | "_id"
  | "title"
  | "slug"
  | "mainImage"
  | "excerpt"
  | "category"
  | "author"
  | "publishedAt"
>;

/* ─── Queries ─── */

const BLOG_QUERY = `*[_type == "blog" && slug.current == $slug][0] {
  _id, title, slug, mainImage, excerpt, body, category, tags, author, publishedAt
}`;

const RELATED_QUERY = `*[_type == "blog" && slug.current != $slug] | order(publishedAt desc) [0...3] {
  _id, title, slug, mainImage, excerpt, category, author, publishedAt
}`;

/* ─── Metadata ─── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog = await client.fetch<Blog | null>(BLOG_QUERY, { slug });
    if (!blog) return { title: "Blog Not Found" };
    return {
      title: blog.title,
      description: blog.excerpt,
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        images: [urlFor(blog.mainImage).width(1200).height(630).url()],
      },
    };
  } catch {
    return { title: "Blog" };
  }
}

/* ─── Helpers ─── */

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateShort(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function estimateReadTime(body: Blog["body"]): number {
  if (!body || !Array.isArray(body)) return 1;
  const text = body
    .filter((b) => b._type === "block")
    .map(
      (b) =>
        b.children?.map((c: { text?: string }) => c.text || "").join("") || "",
    )
    .join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 200));
}

function extractHeadings(body: Blog["body"]) {
  return body
    .filter((b) => b._type === "block" && ["h2", "h3"].includes(b.style))
    .map((b) => ({
      id: b._key as string,
      text:
        b.children?.map((c: { text?: string }) => c.text || "").join("") || "",
      level: (b.style === "h2" ? 2 : 3) as 2 | 3,
    }));
}

/* ─── Portable Text Components ─── */

/* ─── Portable Text Components ─── */

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <h2
        id={value._key}
        className="mb-8 mt-20 scroll-mt-32 font-heading text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl lg:text-[2.5rem] leading-[1.15]"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={value._key}
        className="mb-6 mt-14 scroll-mt-32 font-heading text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl"
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-4 mt-10 scroll-mt-32 font-heading text-xl font-bold text-zinc-900">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-8 text-[1.125rem] leading-[1.9] text-zinc-600/90 font-sans selection:bg-[#172556]/10 selection:text-[#172556]">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-14 overflow-hidden rounded-[2rem] bg-zinc-50/80 p-8 md:p-12 relative ring-1 ring-zinc-200/50">
        <div className="absolute left-0 top-0 h-full w-1.5 bg-[#172556] rounded-l-3xl" />
        <div className="text-xl md:text-2xl italic leading-relaxed text-zinc-800 font-medium">
          "{children}"
        </div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-10 ml-2 space-y-5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-10 ml-2 space-y-5 list-decimal list-inside">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-4 text-[1.125rem] leading-[1.9] text-zinc-600/90">
        <span className="mt-[11px] flex size-2 shrink-0 rounded-full bg-[#172556]/30 ring-4 ring-[#172556]/5" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-[1.125rem] leading-[1.9] text-zinc-600/90 pl-2">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-zinc-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-zinc-800">{children}</em>,
    code: ({ children }) => (
      <code className="rounded-md border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 font-mono text-[0.875em] text-[#172556]">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center gap-1 font-semibold text-[#172556] transition-colors hover:text-[#1e3070]"
      >
        <span className="relative">
          {children}
          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-100 bg-[#172556]/30 transition-transform group-hover:scale-x-0" />
          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-[#172556] transition-transform group-hover:scale-x-100" />
        </span>
        <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-16">
        <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] bg-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] ring-1 ring-zinc-900/5">
          <Image
            src={urlFor(value).width(1200).height(675).url()}
            alt={value.alt || "Blog image"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>
        {value.caption && (
          <figcaption className="mt-6 text-center text-sm font-medium text-zinc-400 italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    table: ({ value }) => {
      const [header, ...bodyRows] = value.rows as TableRow[];
      return (
        <div className="my-14 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm ring-1 ring-zinc-100">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              {header && (
                <thead className="bg-zinc-50/50">
                  <tr>
                    {header.cells.map((cell, i) => (
                      <th
                        key={i}
                        className="border-b border-zinc-200 px-6 py-4 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-zinc-400"
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody className="divide-y divide-zinc-100">
                {bodyRows.map((row) => (
                  <tr
                    key={row._key}
                    className="transition-colors hover:bg-zinc-50/30"
                  >
                    {row.cells.map((cell, i) => (
                      <td
                        key={i}
                        className={`px-6 py-5 text-[0.9375rem] leading-relaxed ${
                          i === 0
                            ? "font-semibold text-zinc-900"
                            : "text-zinc-600"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    },
  },
};

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let blog: Blog | null;
  try {
    blog = await client.fetch<Blog | null>(BLOG_QUERY, { slug });
  } catch {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center bg-[#f7f7f5] px-6">
        <div className="flex size-20 items-center justify-center rounded-full bg-red-50 text-red-500 mb-6 shadow-sm">
          <ArrowLeft className="size-8" />
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-zinc-900">
          Article Not Found
        </h1>
        <p className="mt-4 max-w-md text-center text-[1.125rem] leading-relaxed text-zinc-500">
          We couldn't load this post. It might have been removed or the URL is
          incorrect.
        </p>
        <Link
          href="/resources/blogs"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#172556] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-[#172556]/20 transition-all hover:-translate-y-0.5 hover:bg-[#1e3070]"
        >
          <ArrowLeft className="size-4" />
          Back to Articles
        </Link>
      </div>
    );
  }

  if (!blog) notFound();

  let related: RelatedBlog[] = [];
  try {
    related = await client.fetch<RelatedBlog[]>(RELATED_QUERY, { slug });
  } catch {
    /* non-critical */
  }

  const readTime = estimateReadTime(blog.body);
  const headings = extractHeadings(blog.body);

  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      <ReadingProgress />

      {/* ════════════════════════════════════════
          HERO — Premium Dark Editorial Layout
          ════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#172556] pt-36 pb-32 md:pt-48 md:pb-40">
        {/* Ambient Effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute -bottom-20 -left-32 h-[400px] w-[400px] rounded-full bg-indigo-400/10 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          {/* Breadcrumb & Category */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <Link 
              href="/resources/blogs"
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white/80 transition-colors"
            >
              <ArrowLeft className="size-3" />
              Articles
            </Link>
            <span className="text-white/20">/</span>
            {blog.category && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/80 ring-1 ring-white/10 backdrop-blur-sm">
                {blog.category}
              </span>
            )}
          </div>

          <h1 className="max-w-4xl font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-[5rem] text-balance">
            {blog.title}
          </h1>

          <p className="mt-8 max-w-3xl text-lg md:text-xl font-medium leading-relaxed text-white/60 text-balance">
            {blog.excerpt}
          </p>

          {/* Meta Data */}
          <div className="mt-12 flex flex-wrap items-center gap-6 md:gap-10 text-sm font-medium text-white/40">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <User className="size-4 text-white/60" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Author</p>
                <p className="text-white/80 font-semibold">{blog.author}</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10 hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <Calendar className="size-4 text-white/60" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Date</p>
                <p className="text-white/80 font-semibold">{formatDate(blog.publishedAt)}</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10 hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <Clock className="size-4 text-white/60" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Read Time</p>
                <p className="text-white/80 font-semibold">{readTime} min read</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image — Overlapping Layout */}
      <div className="relative mx-auto max-w-6xl px-6 -mt-20 z-20 mb-24 md:-mt-24 md:mb-32">
        <div className="group relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] bg-white shadow-[0_32px_80px_-16px_rgba(0,0,0,0.2)] ring-1 ring-black/5">
          <Image
            src={urlFor(blog.mainImage).width(1600).height(800).url()}
            alt={blog.mainImage.alt || blog.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-black/10 pointer-events-none" />
        </div>
      </div>

      {/* ════════════════════════════════════════
          ARTICLE CONTENT — Cardless Editorial
          ════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="xl:grid xl:grid-cols-[1fr_300px] xl:gap-20">
          <article className="min-w-0">
            <div className="prose-custom max-w-3xl">
              <PortableText
                value={blog.body}
                components={portableTextComponents}
              />
            </div>

            {/* Tags Section */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-20 flex flex-wrap gap-2 pt-10 border-t border-zinc-200">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 rounded-full bg-zinc-100 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-zinc-500 hover:bg-zinc-200 transition-colors cursor-default"
                  >
                    <Tag className="size-3.5" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Footer Card (Integrated) */}
            <div className="mt-16 flex items-center justify-between gap-6 rounded-3xl bg-white p-8 border border-zinc-200/60 shadow-sm md:p-10">
              <div className="flex items-center gap-5">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#172556]/5">
                  <User className="size-6 text-[#172556]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#172556]/40">Written by</p>
                  <p className="mt-1 font-heading text-xl font-bold text-zinc-900">{blog.author}</p>
                </div>
              </div>
              <Link
                href="/resources/blogs"
                className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-bold text-zinc-700 transition-all hover:border-[#172556]/20 hover:bg-zinc-50"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                Back to Articles
              </Link>
            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="hidden xl:block">
            <div className="sticky top-32 space-y-8">
              {headings.length > 1 && (
                <div className="rounded-3xl border border-zinc-200 bg-white/50 p-8 backdrop-blur-sm">
                  <TableOfContents headings={headings} />
                </div>
              )}

              <div className="rounded-3xl bg-[#172556] p-8 text-white relative overflow-hidden group">
                <div className="absolute -right-10 -bottom-10 size-40 bg-white/10 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-110" />
                <h4 className="relative z-10 font-heading text-lg font-bold">Have questions?</h4>
                <p className="relative z-10 mt-3 text-sm leading-relaxed text-white/70">
                  Our engineering team is here to help with your wireless testing needs.
                </p>
                <Link
                  href="/contact"
                  className="relative z-10 mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-bold text-[#172556] shadow-xl shadow-black/10 transition-all hover:bg-white/90 hover:-translate-y-0.5"
                >
                  Contact Us
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ════════════════════════════════════════
          RELATED ARTICLES — Refined Cards
          ════════════════════════════════════════ */}
      {related.length > 0 && (
        <section className="border-t border-zinc-200 bg-white pt-24 pb-32">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#172556]/50">
                  Continue Reading
                </p>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-zinc-900 md:text-5xl">
                  Related Insights
                </h2>
              </div>
              <Link
                href="/resources/blogs"
                className="hidden items-center gap-2 text-sm font-bold text-[#172556] hover:opacity-70 transition-opacity sm:inline-flex"
              >
                Browse All
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((post) => (
                <Link
                  key={post._id}
                  href={`/resources/blogs/${post.slug.current}`}
                  className="group flex flex-col h-full rounded-[2rem] border border-zinc-100 bg-[#f7f7f5] p-2 transition-all duration-500 hover:border-zinc-200 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.6rem] bg-zinc-200">
                    <Image
                      src={urlFor(post.mainImage).width(600).height(375).url()}
                      alt={post.mainImage.alt || post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {post.category && (
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#172556] shadow-sm backdrop-blur-md">
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6 pt-5">
                    <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                      <span>{formatDateShort(post.publishedAt)}</span>
                      <span className="size-1 rounded-full bg-zinc-300" />
                      <span>{post.author}</span>
                    </div>
                    <h3 className="mt-4 flex-1 font-heading text-xl font-bold leading-tight tracking-tight text-zinc-900 group-hover:text-[#172556] transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-500/90">
                      {post.excerpt}
                    </p>
                    <div className="mt-8 flex items-center justify-between border-t border-zinc-200/50 pt-5">
                      <span className="text-xs font-bold text-[#172556]/60 group-hover:text-[#172556] transition-colors">Read Article</span>
                      <div className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-zinc-200 transition-all duration-300 group-hover:bg-[#172556] group-hover:text-white group-hover:ring-[#172556]">
                        <ArrowUpRight className="size-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
