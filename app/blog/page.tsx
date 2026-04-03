"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const CATEGORIES = [
  "All",
  "Wireless Tech",
  "Hardware Engineering",
  "Networking",
  "Testing",
];

const FEATURED_POST = {
  id: "featured-1",
  title: "The Future of Sub-6GHz 5G Deployments in Industrial Automation",
  excerpt:
    "Explore how next-generation Sub-6GHz private networks are enabling ultra-reliable low-latency communication on factory floors, driving the Fourth Industrial Revolution forward.",
  category: "Wireless Tech",
  date: "Oct 24, 2026",
  readTime: "8 min read",
  image:
    "https://images.unsplash.com/photo-1620825937374-87fc1d6aafc1?q=80&w=1543&auto=format&fit=crop",
  author: {
    name: "Dr. Elena Rostova",
    role: "Lead RF Architect",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop",
  },
};

const POSTS = [
  {
    id: "post-1",
    title: "Designing High-Speed Mixed-Signal PCBs: Common Pitfalls",
    excerpt:
      "A deep dive into cross-talk mitigation, impedance control, and optimal layer stackup strategies for multi-gigabit hardware.",
    category: "Hardware Engineering",
    date: "Oct 18, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "post-2",
    title: "Resilient Networking Topologies for Edge IoT Devices",
    excerpt:
      "How to design self-healing mesh networks that maintain connection integrity even in extreme RF-congested environments.",
    category: "Networking",
    date: "Oct 10, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1691435828932-911a7801adfb?q=80&w=1632&auto=format&fit=crop",
  },
  {
    id: "post-3",
    title: "Silicon Validation Methodologies using AI Generation",
    excerpt:
      "Leveraging large logic models to auto-generate intricate test vectors and edge-case simulations for rapid SoC signoff.",
    category: "Testing",
    date: "Sep 28, 2026",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1618389041494-8fab89c3f22b?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "post-4",
    title: "Advancements in Custom RF Transceiver Architectures",
    excerpt:
      "An analysis of novel software-defined radio configurations breaking the boundaries of multi-band tunability.",
    category: "Wireless Tech",
    date: "Sep 15, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1470&auto=format&fit=crop",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] pb-20 pt-36 md:pb-28 md:pt-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-16 max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500"
          >
            Insights & Engineering
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mb-6 font-heading text-4xl font-medium leading-[1.1] tracking-tight text-zinc-900 md:text-6xl"
          >
            Engineering the future of connectivity.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg leading-relaxed text-zinc-600"
          >
            Deep technical dives, architectural patterns, and industry insights
            from the team building next-generation wireless systems.
          </motion.p>
        </motion.div>

        {/* Categories Bar */}
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3, duration: 0.5 }}
           className="mb-12 flex flex-wrap items-center gap-3"
        >
          {CATEGORIES.map((cat, idx) => (
            <button
              key={cat}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                idx === 0
                  ? "border-[#172556] bg-[#172556] text-white"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="group relative mb-20 flex flex-col overflow-hidden rounded-[2.5rem] border border-zinc-200/80 bg-white transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-zinc-200/50 md:flex-row md:h-[500px]"
        >
          <div className="relative h-72 w-full md:h-full md:w-[55%]">
            <Image
              src={FEATURED_POST.image}
              alt={FEATURED_POST.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex w-full flex-col justify-center p-8 md:w-[45%] md:p-14">
            <div className="mb-6 flex items-center gap-4">
              <span className="rounded-lg bg-[#f7f7f5] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#172556] shadow-sm ring-1 ring-zinc-200/50">
                {FEATURED_POST.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                <Clock className="size-3.5" />
                {FEATURED_POST.readTime}
              </div>
            </div>
            
            <Link href={`/blog/${FEATURED_POST.id}`} className="block">
              <h2 className="mb-4 font-heading text-3xl font-medium text-zinc-900 transition-colors group-hover:text-[#172556] md:text-4xl leading-tight">
                {FEATURED_POST.title}
              </h2>
            </Link>
            <p className="mb-8 leading-relaxed text-zinc-500">
              {FEATURED_POST.excerpt}
            </p>

            <div className="mt-auto flex items-center justify-between border-t border-zinc-200/80 pt-6">
              <div className="flex items-center gap-3">
                <Image
                  src={FEATURED_POST.author.avatar}
                  alt={FEATURED_POST.author.name}
                  width={40}
                  height={40}
                  className="rounded-full bg-zinc-200 object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    {FEATURED_POST.author.name}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {FEATURED_POST.author.role}
                  </p>
                </div>
              </div>
              <Link href={`/blog/${FEATURED_POST.id}`} className="flex size-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-400 transition-all group-hover:border-[#172556] group-hover:bg-[#172556] group-hover:text-white">
                 <ArrowUpRight className="size-5" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + 0.1 * idx, duration: 0.5 }}
              className="group flex flex-col overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/50"
            >
              <Link href={`/blog/${post.id}`} className="relative h-64 w-full overflow-hidden bg-zinc-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col p-8 lg:p-10">
                <div className="mb-5 flex items-center gap-4">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#172556]">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-medium text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
                <Link href={`/blog/${post.id}`} className="block">
                  <h3 className="mb-3 font-heading text-2xl font-medium text-zinc-900 transition-colors group-hover:text-[#172556]">
                    {post.title}
                  </h3>
                </Link>
                <p className="mb-6 line-clamp-2 text-[15px] leading-relaxed text-zinc-500">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-6 flex items-center">
                  <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 transition-colors group-hover:text-[#172556]">
                    Read Article <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}
