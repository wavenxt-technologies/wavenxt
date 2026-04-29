import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Play,
  ArrowUpRight,
} from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import { VideoGate } from "./VideoGate";

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

type RelatedWebinar = Pick<
  Webinar,
  | "_id"
  | "title"
  | "thumbnail"
  | "description"
  | "speaker"
  | "createdAt"
  | "videoUrl"
>;

/* ─── Queries ─── */

const WEBINAR_QUERY = `*[_type == "webinar" && _id == $id][0] {
  _id, category, title, thumbnail, description, speaker,
  meetingLink, startDateTime, createdAt,
  "videoUrl": video.asset->url
}`;

const RELATED_QUERY = `*[_type == "webinar" && category == "on-demand" && _id != $id] | order(createdAt desc) [0...3] {
  _id, title, thumbnail, description, speaker, createdAt,
  "videoUrl": video.asset->url
}`;

/* ─── Metadata ─── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const webinar = await client.fetch<Webinar | null>(WEBINAR_QUERY, { id });
    if (!webinar) return { title: "Webinar Not Found" };
    return {
      title: webinar.title,
      description: webinar.description,
      openGraph: {
        title: webinar.title,
        description: webinar.description,
        images: [urlFor(webinar.thumbnail).width(1200).height(630).url()],
      },
    };
  } catch {
    return { title: "Webinar" };
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

function getEmbedSrc(url: string): { type: "iframe" | "video"; src: string } {
  if (url.includes("youtube.com/watch")) {
    try {
      const vid = new URL(url).searchParams.get("v");
      return {
        type: "iframe",
        src: `https://www.youtube.com/embed/${vid}?rel=0`,
      };
    } catch {
      return { type: "iframe", src: url };
    }
  }
  if (url.includes("youtu.be/")) {
    const vid = url.split("youtu.be/")[1]?.split("?")[0];
    return {
      type: "iframe",
      src: `https://www.youtube.com/embed/${vid}?rel=0`,
    };
  }
  if (url.includes("vimeo.com/")) {
    const vid = url.split("vimeo.com/")[1]?.split(/[/?]/)[0];
    return { type: "iframe", src: `https://player.vimeo.com/video/${vid}` };
  }
  return { type: "video", src: url };
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */

export default async function WebinarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let webinar: Webinar | null;
  try {
    webinar = await client.fetch<Webinar | null>(WEBINAR_QUERY, { id });
  } catch {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f7f5] px-6">
        <h1 className="font-heading text-2xl font-medium text-zinc-900">
          Unable to load this webinar
        </h1>
        <p className="mt-3 max-w-md text-center text-sm leading-relaxed text-zinc-500">
          We ran into an issue fetching this webinar. Please try refreshing the
          page or come back later.
        </p>
        <Link
          href="/resources/webinars"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#172556] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#1e3070]"
        >
          <ArrowLeft className="size-4" />
          Back to Webinars
        </Link>
      </div>
    );
  }

  if (!webinar) notFound();

  let related: RelatedWebinar[] = [];
  try {
    related = await client.fetch<RelatedWebinar[]>(RELATED_QUERY, { id });
  } catch {
    // non-critical
  }

  const hasVideo = !!webinar.videoUrl;
  const embed = hasVideo ? getEmbedSrc(webinar.videoUrl!) : null;

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-zinc-900">
      {/* ── Dark hero ── */}
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

        <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-white/30">
            <Link href="/" className="transition-colors hover:text-white/60">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/resources/webinars"
              className="transition-colors hover:text-white/60"
            >
              Webinars
            </Link>
            <span>/</span>
            <span className="line-clamp-1 text-white/60">{webinar.title}</span>
          </div>

          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white/70 backdrop-blur-md ring-1 ring-white/10">
            <Play className="size-3 fill-current" />
            On Demand
          </span>

          {/* Title */}
          <h1 className="mt-5 max-w-3xl font-heading text-3xl font-medium leading-[1.1] tracking-tight text-white md:text-5xl">
            {webinar.title}
          </h1>

          {/* Meta row */}
          <div className="mt-7 flex flex-wrap items-center gap-5 text-sm text-white/40">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {formatDate(webinar.createdAt)}
            </span>
            <span className="h-3.5 w-px bg-white/15" />
            <div className="flex items-center gap-2.5">
              {webinar.speaker.photo ? (
                <div className="relative size-7 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
                  <Image
                    src={urlFor(webinar.speaker.photo)
                      .width(56)
                      .height(56)
                      .url()}
                    alt={webinar.speaker.name}
                    fill
                    className="object-cover"
                    sizes="28px"
                  />
                </div>
              ) : (
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <User className="size-3.5 text-white/50" />
                </div>
              )}
              <span>
                <span className="text-white/70">{webinar.speaker.name}</span>
                {" · "}
                {webinar.speaker.designation}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Video gate / player ── */}
      <div className="relative z-10 mx-auto -mt-8 max-w-5xl px-6 md:px-10">
        {hasVideo && embed ? (
          <VideoGate
            webinarId={id}
            embedType={embed.type}
            embedSrc={embed.src}
            poster={urlFor(webinar.thumbnail).width(1280).height(720).url()}
            title={webinar.title}
          />
        ) : (
          /* No video yet — simple thumbnail placeholder */
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-[0_32px_80px_-16px_rgba(0,0,0,0.25)] ring-1 ring-black/10">
            <Image
              src={urlFor(webinar.thumbnail).width(1280).height(720).url()}
              alt={webinar.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 960px"
              priority
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/30 backdrop-blur-[2px]">
              <div className="flex size-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20">
                <Clock className="size-6 text-white/60" />
              </div>
              <p className="text-sm font-medium text-white/60">
                Recording coming soon
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Description */}
          <div>
            <h2 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">
              About this webinar
            </h2>
            <p className="mt-5 text-[16px] leading-[1.85] text-zinc-600">
              {webinar.description}
            </p>

            <Link
              href="/resources/webinars"
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-600 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md"
            >
              <ArrowLeft className="size-3.5" />
              Back to all webinars
            </Link>
          </div>

          {/* Speaker card */}
          <div className="h-fit rounded-2xl border border-zinc-200/80 bg-white p-7 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Speaker
            </p>

            <div className="mt-5 flex items-center gap-4">
              {webinar.speaker.photo ? (
                <div className="relative size-14 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-sm border border-zinc-100">
                  <Image
                    src={urlFor(webinar.speaker.photo)
                      .width(112)
                      .height(112)
                      .url()}
                    alt={webinar.speaker.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
              ) : (
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-zinc-100 border border-zinc-200/50">
                  <User className="size-5 text-zinc-400" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-base font-semibold text-zinc-900">
                  {webinar.speaker.name}
                </p>
                <p className="mt-0.5 text-[13px] text-zinc-500">
                  {webinar.speaker.designation}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-zinc-100 pt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Published</span>
                <span className="font-medium text-zinc-700">
                  {formatDate(webinar.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related webinars ── */}
      {related.length > 0 && (
        <div className="border-t border-zinc-200/80 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl font-medium tracking-tight text-zinc-900">
                More on-demand webinars
              </h2>
              <Link
                href="/resources/webinars"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#172556] transition-colors hover:text-[#1e3070]"
              >
                View all
                <ArrowLeft className="size-3.5 rotate-180" />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((w) => (
                <Link key={w._id} href={`/resources/webinars/${w._id}`}>
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-[#f7f7f5] transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300/80 hover:shadow-xl hover:shadow-zinc-200/60">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={urlFor(w.thumbnail).width(640).height(400).url()}
                        alt={w.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute left-3 top-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-black/40 border border-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                          <Play className="size-2.5 fill-current" />
                          On Demand
                        </span>
                      </div>
                      {w.videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <div className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur-md">
                            <Play className="ml-0.5 size-5 fill-white text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="text-[11px] font-medium text-zinc-400">
                        {formatDateShort(w.createdAt)}
                      </span>
                      <h3 className="mt-2 font-heading text-base font-medium leading-snug tracking-tight text-zinc-900 line-clamp-2 group-hover:text-[#172556] transition-colors duration-200">
                        {w.title}
                      </h3>
                      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-zinc-500 line-clamp-2">
                        {w.description}
                      </p>
                      <div className="mt-4 flex items-center gap-2.5">
                        {w.speaker.photo ? (
                          <div className="relative size-7 shrink-0 overflow-hidden rounded-full ring-1 ring-zinc-200">
                            <Image
                              src={urlFor(w.speaker.photo)
                                .width(56)
                                .height(56)
                                .url()}
                              alt={w.speaker.name}
                              fill
                              className="object-cover"
                              sizes="28px"
                            />
                          </div>
                        ) : (
                          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-zinc-200">
                            <User className="size-3 text-zinc-400" />
                          </div>
                        )}
                        <p className="truncate text-[12px] font-medium text-zinc-500">
                          {w.speaker.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom CTA ── */}
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
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-blue-200/70">
                More resources
              </p>
              <h2 className="mt-3 font-heading text-2xl font-medium tracking-tight md:text-3xl">
                Browse all webinars
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-blue-100/60">
                Explore our full library of live sessions and on-demand
                recordings covering RF engineering, wireless testing, and more.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link href="/resources/webinars">
                <span className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100">
                  All Webinars
                  <ArrowLeft className="size-3.5 rotate-180" />
                </span>
              </Link>
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10">
                  Get in Touch
                  <ArrowUpRight className="size-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
