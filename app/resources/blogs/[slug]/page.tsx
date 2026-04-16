import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import { ArrowLeft, Calendar, User, Tag, Clock } from "lucide-react";
import { client, urlFor } from "@/lib/sanity";

/* ─── Types ─── */

interface Blog {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: { asset: { _ref: string }; alt?: string };
  excerpt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  category: string;
  tags?: string[];
  author: string;
  publishedAt: string;
}

type RelatedBlog = Pick<
  Blog,
  "_id" | "title" | "slug" | "mainImage" | "excerpt" | "category" | "author" | "publishedAt"
>;

/* ─── Queries ─── */

const BLOG_QUERY = `*[_type == "blog" && slug.current == $slug][0] {
  _id, title, slug, mainImage, excerpt, body, category, tags, author, publishedAt
}`;

const RELATED_QUERY = `*[_type == "blog" && slug.current != $slug && category == $category] | order(publishedAt desc) [0...3] {
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
    .filter((block) => block._type === "block")
    .map(
      (block) =>
        block.children
          ?.map((child: { text?: string }) => child.text || "")
          .join("") || ""
    )
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/* ─── Portable Text Components ─── */

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 font-heading text-2xl font-medium tracking-tight text-zinc-900 md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 mb-3 font-heading text-xl font-medium tracking-tight text-zinc-900 md:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 mb-3 font-heading text-lg font-medium text-zinc-900">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-5 text-[16px] leading-[1.85] text-zinc-600">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-[3px] border-[#172556] bg-[#172556]/[0.03] py-5 pl-6 pr-5 rounded-r-xl text-[16px] italic leading-relaxed text-zinc-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 ml-1 space-y-2.5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 ml-1 space-y-2.5 list-decimal list-inside">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-[16px] leading-[1.85] text-zinc-600">
        <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-[#172556]/40" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-[16px] leading-[1.85] text-zinc-600">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-zinc-800">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    code: ({ children }) => (
      <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-[14px] text-zinc-800">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#172556] underline decoration-[#172556]/30 underline-offset-2 transition-colors hover:text-[#1e3070] hover:decoration-[#172556]/60"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-10">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-zinc-200/80">
          <Image
            src={urlFor(value).width(1200).height(675).url()}
            alt={value.alt || "Blog image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>
        {value.caption && (
          <figcaption className="mt-3 text-center text-sm text-zinc-400">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
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
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f7f5] px-6">
        <h1 className="font-heading text-2xl font-medium text-zinc-900">
          Unable to load this article
        </h1>
        <p className="mt-3 max-w-md text-center text-sm leading-relaxed text-zinc-500">
          We ran into an issue fetching this blog post. Please try refreshing
          the page or come back later.
        </p>
        <Link
          href="/resources/blogs"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#172556] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#1e3070]"
        >
          <ArrowLeft className="size-4" />
          Back to Blogs
        </Link>
      </div>
    );
  }

  if (!blog) notFound();

  let related: RelatedBlog[] = [];
  try {
    related = await client.fetch<RelatedBlog[]>(RELATED_QUERY, {
      slug,
      category: blog.category,
    });
  } catch {
    // Silently fail — related posts are non-critical
  }

  const readTime = estimateReadTime(blog.body);

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-zinc-900">
      {/* Hero image */}
      <div className="relative h-[50vh] min-h-[360px] w-full bg-zinc-900 md:h-[60vh]">
        <Image
          src={urlFor(blog.mainImage).width(1600).height(900).url()}
          alt={blog.mainImage.alt || blog.title}
          fill
          className="object-cover opacity-60"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f7f7f5] via-[#f7f7f5]/20 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 md:px-10">
        {/* Article header */}
        <div className="-mt-36 mb-12 md:-mt-44">
          <Link
            href="/resources/blogs"
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-zinc-500 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-zinc-800 hover:shadow-md"
          >
            <ArrowLeft className="size-3.5" />
            All blogs
          </Link>

          <span className="block rounded-full bg-white/90 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#172556] shadow-sm backdrop-blur-sm w-fit">
            {blog.category}
          </span>

          <h1 className="mt-5 font-heading text-3xl font-medium leading-[1.12] tracking-tight text-zinc-900 md:text-4xl lg:text-[2.75rem]">
            {blog.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <User className="size-3.5" />
              {blog.author}
            </span>
            <span className="h-3.5 w-px bg-zinc-300" />
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {formatDate(blog.publishedAt)}
            </span>
            <span className="h-3.5 w-px bg-zinc-300" />
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {readTime} min read
            </span>
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-lg bg-zinc-100/80 px-3 py-1 text-[11px] font-medium text-zinc-500"
                >
                  <Tag className="size-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Article body */}
        <article className="pb-16">
          <PortableText
            value={blog.body}
            components={portableTextComponents}
          />
        </article>

        {/* Divider */}
        <div className="border-t border-zinc-200/80" />
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">
              Related articles
            </h2>
            <Link
              href="/resources/blogs"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#172556] transition-colors hover:text-[#1e3070]"
            >
              View all
              <ArrowLeft className="size-3.5 rotate-180" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((post) => (
              <Link
                key={post._id}
                href={`/resources/blogs/${post.slug.current}`}
              >
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/50">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={urlFor(post.mainImage)
                        .width(600)
                        .height(375)
                        .url()}
                      alt={post.mainImage.alt || post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute left-3.5 top-3.5">
                      <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#172556] shadow-sm backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-[11px] font-medium text-zinc-400">
                      {formatDateShort(post.publishedAt)}
                    </span>
                    <h3 className="mt-2 font-heading text-base font-medium leading-snug tracking-tight text-zinc-900 line-clamp-2 group-hover:text-[#172556] transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-zinc-500 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
