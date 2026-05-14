"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  Video,
  Calendar,
  Clock,
  Play,
  User,
  AlertCircle,
  RefreshCw,
  Radio,
  X,
  Mail,
} from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";

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

const WEBINARS_QUERY = `*[_type == "webinar" && (
  (defined(startDateTime) && dateTime(now()) < dateTime(startDateTime)) ||
  !defined(startDateTime)
)] | order(createdAt desc) {
  _id,
  "category": select(defined(startDateTime) => "live", "on-demand"),
  title, thumbnail, description, speaker,
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
  return new Date(dateStr).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
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
    <main className="min-h-screen bg-[#f7f7f5] text-zinc-900">
      {/* ── Header ── */}
      <section className="relative overflow-hidden pb-12 pt-32 md:pb-16 md:pt-48">
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
              <span>Webinars</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-heading text-5xl font-medium leading-[1.1] tracking-tight md:text-7xl lg:text-8xl"
            >
              Webinars
            </motion.h1>

            {/* Filter pills */}
            {status === "success" && webinars.length > 0 && (
              <motion.div
                variants={fadeUp}
                custom={2}
                className="mt-10 flex items-center gap-2"
              >
                {(
                  [
                    {
                      id: "all" as WebinarFilter,
                      label: "All",
                      count: webinars.length,
                    },
                    {
                      id: "live" as WebinarFilter,
                      label: "Live",
                      count: liveCount,
                      icon: Radio,
                    },
                    {
                      id: "on-demand" as WebinarFilter,
                      label: "On Demand",
                      count: onDemandCount,
                      icon: Play,
                    },
                  ] as {
                    id: WebinarFilter;
                    label: string;
                    count: number;
                    icon?: typeof Radio;
                  }[]
                ).map((f) => {
                  const isActive = filter === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setFilter(f.id)}
                      className={cn(
                        "relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-[#172556] text-white shadow-[0_4px_12px_-4px_rgba(23,37,86,0.4)]"
                          : "bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-700",
                      )}
                    >
                      {f.icon && <f.icon className="size-3.5" />}
                      {f.label}
                      <span
                        className={cn(
                          "rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-zinc-100 text-zinc-400",
                        )}
                      >
                        {f.count}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Cards ── */}
      <div className="mx-auto max-w-7xl px-6 pb-20 md:px-10 md:pb-28">
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

      {/* ── Video dialog ── */}
      <AnimatePresence>
        {activeWebinar && (
          <VideoDialog
            webinar={activeWebinar}
            onClose={() => setActiveWebinar(null)}
          />
        )}
      </AnimatePresence>
    </main>
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
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-white/60 transition-colors hover:bg-white/15 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-950 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.08]">
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
      className="flex flex-col gap-5"
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

  const imageEl = (
    <div className="relative h-full w-full overflow-hidden bg-zinc-100">
      <Image
        src={urlFor(webinar.thumbnail).width(800).height(500).url()}
        alt={webinar.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        sizes="(max-width: 768px) 100vw, 40vw"
      />
      {/* Play circle — no overlay, just the button */}
      {hasVideo && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex size-16 items-center justify-center rounded-full bg-white shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
          >
            <Play className="ml-1 size-6 fill-[#172556] text-[#172556]" />
          </motion.div>
        </div>
      )}
    </div>
  );

  return (
    <motion.div variants={cardVariant} custom={index} className="group">
      <div className="grid overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_2px_16px_-4px_rgba(0,0,0,0.07)] transition-all duration-300 hover:border-zinc-300/80 hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)] md:grid-cols-[2fr_3fr]">
        {/* ── Image ── */}
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[240px]">
          {hasVideo ? (
            <Link
              href={`/resources/webinars/${webinar._id}`}
              className="absolute inset-0"
            >
              {imageEl}
            </Link>
          ) : (
            <div className="absolute inset-0">{imageEl}</div>
          )}

          {/* Badge sits on image, white pill so it's legible without any overlay */}
          <div className="absolute left-4 top-4 z-10">
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-red-600 shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-red-500" />
                </span>
                {upcoming ? "Upcoming" : "Live"}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-700 shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                <Play className="size-2.5 fill-zinc-700" />
                On Demand
              </span>
            )}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col justify-between p-7 md:p-8">
          <div>
            {/* Date + type row */}
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  isLive ? "bg-red-500" : "bg-[#172556]",
                )}
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {isLive && webinar.startDateTime
                  ? formatDateTime(webinar.startDateTime)
                  : formatDate(webinar.createdAt)}
              </span>
            </div>

            {/* Title */}
            {hasVideo ? (
              <Link href={`/resources/webinars/${webinar._id}`}>
                <h3 className="mt-3 line-clamp-2 font-heading text-xl font-semibold leading-snug tracking-tight text-zinc-900 transition-colors duration-200 group-hover:text-[#172556] md:text-[1.35rem]">
                  {webinar.title}
                </h3>
              </Link>
            ) : (
              <h3 className="mt-3 line-clamp-2 font-heading text-xl font-semibold leading-snug tracking-tight text-zinc-900 md:text-[1.35rem]">
                {webinar.title}
              </h3>
            )}

            <p className="mt-3 line-clamp-2 text-[13.5px] leading-relaxed text-zinc-500">
              {webinar.description}
            </p>
          </div>

          {/* ── Footer ── */}
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-zinc-100 pt-5">
            <div className="flex min-w-0 items-center gap-3">
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
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#172556]/[0.07]">
                  <User className="size-3.5 text-[#172556]" />
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-zinc-900">
                  {webinar.speaker.name}
                </p>
                <p className="truncate text-[11px] text-zinc-400">
                  {webinar.speaker.designation}
                </p>
              </div>
            </div>

            {isLive && webinar.meetingLink ? (
              <a
                href={webinar.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex h-9 items-center gap-2 rounded-xl bg-[#172556] px-5 text-[13px] font-semibold text-white shadow-[0_4px_14px_-4px_rgba(23,37,86,0.4)] transition-all hover:bg-[#1e3070]"
                >
                  {upcoming ? "Register" : "Join"}
                  <ArrowUpRight className="size-3.5" />
                </motion.span>
              </a>
            ) : webinar.videoUrl ? (
              <Link
                href={`/resources/webinars/${webinar._id}`}
                className="shrink-0"
              >
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex h-9 items-center gap-2 rounded-xl bg-[#172556] px-5 text-[13px] font-semibold text-white shadow-[0_4px_14px_-4px_rgba(23,37,86,0.4)] transition-all hover:bg-[#1e3070]"
                >
                  Watch now
                  <Play className="size-3 fill-current" />
                </motion.span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   STATE COMPONENTS
   ═══════════════════════════════════════════════════ */

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse grid overflow-hidden rounded-2xl border border-zinc-200/80 bg-white md:grid-cols-[2fr_3fr]"
        >
          <div className="aspect-[4/3] bg-zinc-100 md:aspect-auto md:min-h-[240px]" />
          <div className="flex flex-col justify-between p-7 md:p-8">
            <div className="space-y-3">
              <div className="h-3 w-32 rounded bg-zinc-100" />
              <div className="h-6 w-4/5 rounded bg-zinc-100" />
              <div className="h-6 w-2/3 rounded bg-zinc-100" />
              <div className="h-4 w-full rounded bg-zinc-100" />
              <div className="h-4 w-3/4 rounded bg-zinc-100" />
            </div>
            <div className="flex items-center justify-between border-t border-zinc-100 pt-5">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-full bg-zinc-100" />
                <div className="space-y-1.5">
                  <div className="h-3 w-24 rounded bg-zinc-100" />
                  <div className="h-2.5 w-16 rounded bg-zinc-50" />
                </div>
              </div>
              <div className="h-9 w-28 rounded-xl bg-zinc-100" />
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
      title: "No live sessions scheduled",
      desc: "There are no upcoming live sessions right now. Browse our on-demand recordings instead.",
    },
    "on-demand": {
      title: "No recordings yet",
      desc: "We haven't uploaded any on-demand recordings yet. Check our live webinar schedule instead.",
    },
  };

  const { title, desc } = messages[filter];

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
          {title}
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-500 md:text-lg">
          {desc}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {onReset && (
            <motion.button
              onClick={onReset}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition-all hover:border-zinc-300"
            >
              View all webinars
            </motion.button>
          )}
          <Link href="/contact">
            <motion.span
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="inline-flex items-center gap-2 rounded-xl bg-[#172556] px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(23,37,86,0.35)]"
            >
              Get in touch
              <ArrowUpRight className="size-4" />
            </motion.span>
          </Link>
        </div>
      </div>
    </div>
  );
}
