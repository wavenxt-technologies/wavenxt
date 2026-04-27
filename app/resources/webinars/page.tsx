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
  X,
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

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease },
  }),
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

function getEmbedSrc(url: string): { type: "iframe" | "video"; src: string } {
  if (url.includes("youtube.com/watch")) {
    try {
      const id = new URL(url).searchParams.get("v");
      return {
        type: "iframe",
        src: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
      };
    } catch {
      return { type: "iframe", src: url };
    }
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return {
      type: "iframe",
      src: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
    };
  }
  if (url.includes("vimeo.com/")) {
    const id = url.split("vimeo.com/")[1]?.split(/[/?]/)[0];
    return {
      type: "iframe",
      src: `https://player.vimeo.com/video/${id}?autoplay=1`,
    };
  }
  return { type: "video", src: url };
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */

export default function WebinarsPage() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<WebinarFilter>("all");
  const [activeWebinar, setActiveWebinar] = useState<Webinar | null>(null);

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
      <HeroSection />

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
            <WebinarGrid webinars={filtered} onWatch={setActiveWebinar} />
          )}
        </div>
      </section>

      <BottomCTA />

      <AnimatePresence>
        {activeWebinar && (
          <VideoDialog
            webinar={activeWebinar}
            onClose={() => setActiveWebinar(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VIDEO DIALOG
   ═══════════════════════════════════════════════════ */

function VideoDialog({
  webinar,
  onClose,
}: {
  webinar: Webinar;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const url = webinar.videoUrl ?? "";
  const { type, src } = getEmbedSrc(url);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ duration: 0.3, ease }}
        className="relative w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Top bar ── */}
        <div className="mb-3 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
              Now Playing
            </p>
            <h2 className="mt-1 line-clamp-2 text-base font-medium leading-snug text-white md:text-lg">
              {webinar.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white/60 transition-colors hover:bg-white/15 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* ── Video ── */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-950 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.8)] ring-1 ring-white/8">
          {type === "iframe" ? (
            <iframe
              src={src}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
            />
          ) : (
            <video
              src={src}
              controls
              autoPlay
              className="absolute inset-0 h-full w-full"
            />
          )}
        </div>

        {/* ── Footer ── */}
        <div className="mt-4 flex items-center gap-3">
          {webinar.speaker.photo ? (
            <div className="relative size-8 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
              <Image
                src={urlFor(webinar.speaker.photo).width(64).height(64).url()}
                alt={webinar.speaker.name}
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
          ) : (
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10">
              <User className="size-3.5 text-white/50" />
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white/80">
              {webinar.speaker.name}
            </p>
            <p className="truncate text-xs text-white/40">
              {webinar.speaker.designation}
            </p>
          </div>
          <p className="ml-auto text-xs text-white/25">
            Press{" "}
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/40">
              ESC
            </kbd>{" "}
            to close
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   DARK HERO
   ═══════════════════════════════════════════════════ */

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#172556]">
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
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
   WEBINAR GRID
   ═══════════════════════════════════════════════════ */

function WebinarGrid({
  webinars,
  onWatch,
}: {
  webinars: Webinar[];
  onWatch: (w: Webinar) => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className="grid grid-cols-1 gap-8 md:grid-cols-2"
    >
      <AnimatePresence mode="popLayout">
        {webinars.map((webinar, i) => (
          <WebinarCard
            key={webinar._id}
            webinar={webinar}
            index={i}
            onWatch={onWatch}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Webinar Card ─── */

function WebinarCard({
  webinar,
  index,
  onWatch,
}: {
  webinar: Webinar;
  index: number;
  onWatch: (w: Webinar) => void;
}) {
  const isLive = webinar.category === "live";
  const upcoming = isLive && isUpcoming(webinar.startDateTime);
  const hasVideo = !isLive && !!webinar.videoUrl;

  return (
    <motion.div variants={cardVariant} custom={index} className="group flex">
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white transition-all duration-300 hover:border-zinc-300 hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.10)]">
        {/* ── Thumbnail ── */}
        <div
          className={cn(
            "relative aspect-[16/10] overflow-hidden bg-zinc-100",
            hasVideo && "cursor-pointer",
          )}
          onClick={hasVideo ? () => onWatch(webinar) : undefined}
        >
          <Image
            src={urlFor(webinar.thumbnail).width(960).height(600).url()}
            alt={webinar.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 120vw, 60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Category badge */}
          <div className="absolute left-3 top-3">
            {isLive ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-red-500/30">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-white" />
                </span>
                {upcoming ? "Upcoming" : "Live"}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                <Play className="size-2.5 fill-current" />
                On Demand
              </span>
            )}
          </div>

          {/* Play button overlay */}
          {hasVideo && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.93 }}
                className="flex size-14 items-center justify-center rounded-full border border-white/30 bg-white/20 shadow-2xl backdrop-blur-md"
              >
                <Play className="ml-0.5 size-5 fill-white text-white" />
              </motion.div>
            </div>
          )}
        </div>

        {/* ── Body ── */}
        <div className="flex flex-1 flex-col p-5">
          <h3
            className={cn(
              "line-clamp-2 font-heading text-[15px] font-semibold leading-snug tracking-tight text-zinc-900 transition-colors duration-200 md:text-base",
              hasVideo && "cursor-pointer group-hover:text-[#172556]",
            )}
            onClick={hasVideo ? () => onWatch(webinar) : undefined}
          >
            {webinar.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-500">
            {webinar.description}
          </p>

          {/* Date */}
          <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-400">
            {isLive && webinar.startDateTime ? (
              <>
                <Calendar className="size-3 shrink-0" />
                <span className="font-medium text-zinc-500">
                  {formatDateTime(webinar.startDateTime)}
                </span>
              </>
            ) : (
              <>
                <Clock className="size-3 shrink-0" />
                <span>{formatDate(webinar.createdAt)}</span>
              </>
            )}
          </div>

          <div className="my-4 border-t border-zinc-100" />

          {/* ── Speaker + CTA ── */}
          <div className="mt-auto flex items-center gap-3">
            {webinar.speaker.photo ? (
              <div className="relative size-9 shrink-0 overflow-hidden rounded-full ring-2 ring-zinc-100">
                <Image
                  src={urlFor(webinar.speaker.photo).width(72).height(72).url()}
                  alt={webinar.speaker.name}
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
            ) : (
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-zinc-100">
                <User className="size-3.5 text-zinc-400" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-zinc-800">
                {webinar.speaker.name}
              </p>
              <p className="truncate text-[11px] text-zinc-400">
                {webinar.speaker.designation}
              </p>
            </div>

            {isLive && webinar.meetingLink ? (
              <a
                href={webinar.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#172556] px-4 py-2 text-xs font-semibold text-white shadow-[0_4px_12px_-4px_rgba(23,37,86,0.35)] hover:bg-[#1e3070]"
                >
                  {upcoming ? "Register" : "Join"}
                  <ArrowUpRight className="size-3" />
                </motion.span>
              </a>
            ) : webinar.videoUrl ? (
              <motion.button
                onClick={() => onWatch(webinar)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#172556] px-4 py-2 text-xs font-semibold text-white shadow-[0_4px_12px_-4px_rgba(23,37,86,0.35)] hover:bg-[#1e3070]"
              >
                Watch
                <Play className="size-3 fill-current" />
              </motion.button>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
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
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-2xl border border-zinc-200/80 bg-white"
        >
          <div className="aspect-[16/10] bg-zinc-100" />
          <div className="p-5 space-y-3">
            <div className="h-5 w-4/5 rounded bg-zinc-100" />
            <div className="h-4 w-full rounded bg-zinc-100" />
            <div className="h-4 w-3/4 rounded bg-zinc-100" />
            <div className="h-3 w-28 rounded bg-zinc-50" />
            <div className="border-t border-zinc-100 pt-4 flex items-center gap-3">
              <div className="size-9 shrink-0 rounded-full bg-zinc-100" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-24 rounded bg-zinc-100" />
                <div className="h-2.5 w-16 rounded bg-zinc-50" />
              </div>
              <div className="h-8 w-20 rounded-xl bg-zinc-100" />
            </div>
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
