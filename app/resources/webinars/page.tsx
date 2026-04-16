"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Video,
  Calendar,
  Clock,
  Play,
  User,
  AlertCircle,
  RefreshCw,
  Radio,
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

interface Webinar {
  _id: string;
  category: "live" | "on-demand";
  title: string;
  thumbnail: { asset: { _ref: string } };
  description: string;
  speaker: {
    name: string;
    designation: string;
    photo?: { asset: { _ref: string } };
  };
  meetingLink?: string;
  videoUrl?: string;
  startDateTime?: string;
  createdAt: string;
}

type Status = "loading" | "error" | "success";
type WebinarFilter = "all" | "live" | "on-demand";

/* ─── Query ─── */

const WEBINARS_QUERY = `*[_type == "webinar"] | order(createdAt desc) {
  _id, category, title, thumbnail, description, speaker,
  meetingLink, startDateTime, createdAt,
  "videoUrl": video.asset->url
}`;

/* ─── Helpers ─── */

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isUpcoming(dateStr?: string) {
  if (!dateStr) return false;
  return new Date(dateStr) > new Date();
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */

export default function WebinarsPage() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<WebinarFilter>("all");

  const fetchWebinars = useCallback(async () => {
    try {
      setStatus("loading");
      setError(null);
      const data = await client.fetch<Webinar[]>(WEBINARS_QUERY);
      setWebinars(data);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load webinars");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchWebinars();
  }, [fetchWebinars]);

  const filtered =
    filter === "all" ? webinars : webinars.filter((w) => w.category === filter);

  const liveCount = webinars.filter((w) => w.category === "live").length;
  const onDemandCount = webinars.filter(
    (w) => w.category === "on-demand",
  ).length;

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-zinc-900">
      {/* ── Dark immersive hero ── */}
      <HeroSection />

      {/* ── Filter bar ── */}
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        liveCount={liveCount}
        onDemandCount={onDemandCount}
        totalCount={webinars.length}
        filteredCount={filtered.length}
      />

      <section className="bg-[#f7f7f5]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
          {status === "loading" && <LoadingSkeleton />}
          {status === "error" && (
            <ErrorState message={error!} onRetry={fetchWebinars} />
          )}
          {status === "success" && filtered.length === 0 && (
            <EmptyState
              filter={filter}
              onReset={filter !== "all" ? () => setFilter("all") : undefined}
            />
          )}
          {status === "success" && filtered.length > 0 && (
            <WebinarGrid webinars={filtered} />
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
            Resources · Webinars
          </motion.p>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mt-6 max-w-4xl font-heading text-4xl font-medium leading-[1.1] tracking-tight text-white md:text-6xl"
          >
            Live sessions &
            <br />
            <span className="text-white/35">on-demand recordings</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-7 max-w-2xl text-base leading-relaxed text-blue-100/60 md:text-lg"
          >
            Join our live webinars or watch recordings on RF engineering,
            wireless testing methodologies, and product deep dives — learn
            directly from our engineering team.
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
            <span className="text-white/60">Webinars</span>
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
  filter,
  setFilter,
  liveCount,
  onDemandCount,
  totalCount,
  filteredCount,
}: {
  filter: WebinarFilter;
  setFilter: (f: WebinarFilter) => void;
  liveCount: number;
  onDemandCount: number;
  totalCount: number;
  filteredCount: number;
}) {
  const filters: {
    id: WebinarFilter;
    label: string;
    count: number;
    icon?: typeof Radio;
  }[] = [
    { id: "all", label: "All", count: totalCount },
    { id: "live", label: "Live", count: liveCount, icon: Radio },
    { id: "on-demand", label: "On Demand", count: onDemandCount, icon: Play },
  ];

  return (
    <div className="sticky top-16 z-30 border-b border-zinc-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-10">
        <div className="inline-flex items-center gap-0.5 rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-1">
          {filters.map((f) => {
            const isActive = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200",
                  isActive ? "text-white" : "text-zinc-500 hover:text-zinc-700",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="webinar-tab-bg"
                    className="absolute inset-0 rounded-lg bg-[#172556] shadow-[0_2px_8px_-2px_rgba(23,37,86,0.3)]"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {f.icon && <f.icon className="size-3.5" />}
                  {f.label}
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-zinc-200/60 text-zinc-400",
                    )}
                  >
                    {f.count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {totalCount > 0 && (
          <span className="hidden text-sm tabular-nums text-zinc-400 sm:inline">
            Showing {filteredCount} of {totalCount}
          </span>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   WEBINAR LIST
   ═══════════════════════════════════════════════════ */

function WebinarGrid({ webinars }: { webinars: Webinar[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
    >
      {/* Column header — desktop only */}
      <div className="mb-3 hidden items-center gap-6 px-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-400 md:flex">
        <span className="w-48 shrink-0 lg:w-56">Preview</span>
        <span className="flex-1">Details</span>
        <span className="w-48 shrink-0 text-right">Speaker</span>
        <span className="w-32 shrink-0 text-right">Action</span>
      </div>

      <div className="divide-y divide-zinc-200/80 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.02)]">
        <AnimatePresence mode="popLayout">
          {webinars.map((webinar, i) => (
            <motion.div
              key={webinar._id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, delay: i * 0.04, ease }}
            >
              <WebinarRow webinar={webinar} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Webinar Row ─── */

function WebinarRow({ webinar }: { webinar: Webinar }) {
  const isLive = webinar.category === "live";
  const upcoming = isLive && isUpcoming(webinar.startDateTime);

  const actionHref = isLive ? webinar.meetingLink : webinar.videoUrl;

  const RowWrapper = actionHref
    ? ({ children }: { children: React.ReactNode }) => (
        <a
          href={actionHref}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {children}
        </a>
      )
    : ({ children }: { children: React.ReactNode }) => <>{children}</>;

  return (
    <RowWrapper>
      <div className="group flex flex-col gap-4 px-5 py-5 transition-colors duration-200 hover:bg-zinc-50/80 md:flex-row md:items-center md:gap-6 md:py-4">
        {/* ── Thumbnail ── */}
        <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-zinc-100 md:aspect-[16/10] md:w-48 lg:w-56">
          <Image
            src={urlFor(webinar.thumbnail).width(400).height(250).url()}
            alt={webinar.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 224px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Category pill */}
          <div className="absolute left-2.5 top-2.5">
            {isLive ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md shadow-red-500/25">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-white" />
                </span>
                {upcoming ? "Upcoming" : "Live"}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-600 shadow-md backdrop-blur-sm">
                <Play className="size-2.5 fill-current" />
                On Demand
              </span>
            )}
          </div>

          {/* Play hover on on-demand */}
          {!isLive && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex size-10 items-center justify-center rounded-full bg-white/95 shadow-xl backdrop-blur-sm">
                <Play className="ml-0.5 size-4 fill-[#172556] text-[#172556]" />
              </div>
            </div>
          )}
        </div>

        {/* ── Content ── */}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <h3 className="font-heading text-base font-medium leading-snug tracking-tight text-zinc-900 line-clamp-1 transition-colors duration-200 group-hover:text-[#172556] md:text-lg">
            {webinar.title}
          </h3>

          <p className="text-sm leading-relaxed text-zinc-500 line-clamp-2">
            {webinar.description}
          </p>

          {/* Meta row */}
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
            {isLive && webinar.startDateTime ? (
              <span className="inline-flex items-center gap-1.5 font-medium text-zinc-500">
                <Calendar className="size-3.5" />
                {formatDateTime(webinar.startDateTime)}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {formatDate(webinar.createdAt)}
              </span>
            )}
          </div>
        </div>

        {/* ── Speaker ── */}
        <div className="flex shrink-0 items-center gap-3 md:w-48 md:justify-end">
          {webinar.speaker.photo ? (
            <div className="relative size-9 shrink-0 overflow-hidden rounded-full ring-2 ring-zinc-100">
              <Image
                src={urlFor(webinar.speaker.photo)
                  .width(72)
                  .height(72)
                  .url()}
                alt={webinar.speaker.name}
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
          ) : (
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 ring-2 ring-zinc-50">
              <User className="size-3.5 text-zinc-400" />
            </div>
          )}
          <div className="min-w-0 text-right">
            <p className="truncate text-sm font-medium text-zinc-800">
              {webinar.speaker.name}
            </p>
            <p className="truncate text-[11px] text-zinc-400">
              {webinar.speaker.designation}
            </p>
          </div>
        </div>

        {/* ── Action ── */}
        <div className="flex shrink-0 items-center md:w-32 md:justify-end">
          {isLive && webinar.meetingLink ? (
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#172556] px-5 py-2.5 text-xs font-semibold text-white shadow-[0_4px_12px_-4px_rgba(23,37,86,0.4)] transition-all hover:bg-[#1e3070]"
            >
              {upcoming ? "Register" : "Join"}
              <ArrowUpRight className="size-3" />
            </motion.span>
          ) : webinar.videoUrl ? (
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-xs font-semibold text-[#172556] transition-all hover:border-[#172556]/30 hover:bg-[#172556]/[0.03] hover:shadow-sm"
            >
              Watch
              <Play className="size-3 fill-current" />
            </motion.span>
          ) : (
            <span className="flex size-8 items-center justify-center rounded-full border border-zinc-200/80 text-zinc-400 transition-all duration-300 group-hover:border-[#172556] group-hover:bg-[#172556] group-hover:text-white">
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          )}
        </div>
      </div>
    </RowWrapper>
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
              Learn More
            </p>
            <h2 className="mt-4 font-heading text-3xl font-medium tracking-tight md:text-4xl">
              Explore our engineering blog
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-blue-100/60">
              Read in-depth articles on RF testing, wireless measurement
              techniques, and the latest industry insights from our team.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            className="flex flex-wrap gap-3 md:col-span-5 md:justify-end"
          >
            <Link href="/resources/blogs">
              <motion.span
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
              >
                Browse Blog
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
    <div className="divide-y divide-zinc-200/80 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex animate-pulse flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:gap-6 md:py-4"
        >
          {/* Thumbnail skeleton */}
          <div className="aspect-video w-full shrink-0 rounded-xl bg-zinc-100 md:aspect-[16/10] md:w-48 lg:w-56" />

          {/* Content skeleton */}
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="h-5 w-3/4 rounded bg-zinc-100" />
            <div className="h-3 w-full rounded bg-zinc-100" />
            <div className="h-3 w-2/3 rounded bg-zinc-100" />
            <div className="mt-1 h-3 w-28 rounded bg-zinc-50" />
          </div>

          {/* Speaker skeleton */}
          <div className="hidden shrink-0 items-center gap-3 md:flex md:w-48 md:justify-end">
            <div className="size-9 rounded-full bg-zinc-100" />
            <div className="space-y-1.5">
              <div className="h-3 w-20 rounded bg-zinc-100" />
              <div className="h-2.5 w-14 rounded bg-zinc-50" />
            </div>
          </div>

          {/* Action skeleton */}
          <div className="hidden shrink-0 md:flex md:w-32 md:justify-end">
            <div className="h-9 w-20 rounded-xl bg-zinc-100" />
          </div>
        </div>
      ))}
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
  filter,
  onReset,
}: {
  filter: WebinarFilter;
  onReset?: () => void;
}) {
  const messages: Record<WebinarFilter, { title: string; desc: string }> = {
    all: {
      title: "No webinars yet",
      desc: "We're planning some great sessions. Check back soon for live webinars and on-demand recordings.",
    },
    live: {
      title: "No live webinars scheduled",
      desc: "There are no upcoming live sessions right now. Browse our on-demand recordings instead.",
    },
    "on-demand": {
      title: "No recordings available",
      desc: "We haven't uploaded any on-demand recordings yet. Check our live webinar schedule instead.",
    },
  };

  const { title, desc } = messages[filter];

  return (
    <div className="flex flex-col items-center justify-center py-28">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-zinc-100">
        <Video className="size-7 text-zinc-400" />
      </div>
      <h3 className="mt-6 font-heading text-xl font-medium text-zinc-900">
        {title}
      </h3>
      <p className="mt-3 max-w-sm text-center text-sm leading-relaxed text-zinc-500">
        {desc}
      </p>
      {onReset && (
        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 transition-all hover:border-zinc-400 hover:shadow-sm"
        >
          View all webinars
        </motion.button>
      )}
    </div>
  );
}
