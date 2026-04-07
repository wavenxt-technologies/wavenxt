"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Radio,
  Cpu,
  Network,
  Zap,
  Shield,
  Gauge,
  Mail,
  Phone,
  MapPin,
  Lightbulb,
  Award,
  Leaf,
  Users,
  Eye,
  Headset,
} from "lucide-react";

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

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] text-zinc-900">
      <Hero />
      <WhoWeAre />
      <CoreProducts />
      <ValuesManifesto />
      <TechnologiesSection />
      <GlobalPresence />
    </div>
  );
}

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-zinc-900"
    >
      {/* Video background */}
      <motion.div style={{ scale: videoScale }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="h-full w-full object-cover"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Smooth uniform translucent overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-10"
        style={{
          background:
            "linear-gradient(to top, #f7f7f5 0%, rgba(247,247,245,0.6) 40%, rgba(247,247,245,0) 100%)",
        }}
      />

      {/* Content — left aligned but vertically centered */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:px-10 flex flex-col justify-center">
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 backdrop-blur-md"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-white/70">
                Chosen by global RF engineers
              </span>
            </motion.div>
            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-8 max-w-5xl font-heading text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[1.05] tracking-tight text-white"
            >
              RF test solutions engineered
              <br />
              <span className="text-white/40">for absolute accuracy</span>
            </motion.h1>
            {/* Description */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-7 max-w-lg text-base leading-relaxed text-white/90 md:text-lg"
            >
              From programmable attenuators to complete handover test systems —
              engineered for absolute certainty in every measurement cycle.
            </motion.p>
            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link href="/products">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-zinc-900 transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]"
                >
                  Explore Products
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </motion.span>
              </Link>
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/6 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
                >
                  Get in Touch
                  <ArrowUpRight className="size-3.5" />
                </motion.span>
              </Link>
            </motion.div>
            {/* Specs strip */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-10 flex flex-wrap items-center gap-8"
            >
              {[
                { icon: Radio, value: "200 – 8000 MHz" },
                { icon: Cpu, value: "Solid-State" },
                { icon: Network, value: "API Controlled" },
              ].map((item) => (
                <div
                  key={item.value}
                  className="flex items-center gap-2.5 text-sm text-white"
                >
                  <item.icon className="size-4 text-white" />
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   3 · WHO WE ARE — asymmetric split with image
   ═══════════════════════════════════════════════════ */

function WhoWeAre() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={containerRef} className="bg-[#f7f7f5]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid items-center gap-12 md:grid-cols-12 md:gap-16"
        >
          {/* Image side */}
          <motion.div variants={fadeUp} custom={0} className="md:col-span-5">
            <motion.div style={{ y: imgY }} className="relative">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/group-atten.webp"
                  alt="Wavenxt engineering lab"
                  fill
                  quality={100}
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <div className="md:col-span-7">
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500"
            >
              About Wavenxt
            </motion.p>

            <motion.h2
              variants={fadeUp}
              custom={2}
              className="mt-5 font-heading text-3xl font-medium leading-[1.15] tracking-tight md:text-4xl lg:text-5xl"
            >
              We design wireless test systems that ensure confidence in every RF
              measurement.
            </motion.h2>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-8 space-y-5 text-base leading-relaxed text-zinc-600"
            >
              <p>
                Wavenxt Technologies helps engineering teams validate RF
                performance faster, with less setup complexity and better
                repeatability. From attenuator modules to complete handover test
                systems, every solution is designed to be practical in real lab
                environments.
              </p>
              <p>
                We are a focused engineering company working at the intersection
                of wireless measurement, system integration, and reliability.
                Our team combines RF expertise with product thinking, so
                customers get solutions that are both technically precise and
                operationally easy.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={5} className="mt-8">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#172556] transition-colors hover:text-[#1e3070]"
              >
                Know about us
                <ArrowUpRight className="size-3.5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   3.5 · CORE PRODUCTS — flagship product showcase
   ═══════════════════════════════════════════════════ */

function CoreProducts() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="border-t border-zinc-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
        >
          {/* Section header */}
          <div className="mb-16 md:mb-20">
            <motion.div variants={fadeUp} custom={0} className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Flagship Products
              </p>
              <h2 className="mt-4 font-heading text-3xl font-medium leading-[1.15] tracking-tight md:text-4xl lg:text-5xl">
                The heart of every
                <br />
                reliable RF test setup
              </h2>
              <p className="mt-5 text-base leading-relaxed text-zinc-500">
                Two product lines engineered to anchor your entire wireless
                validation workflow — from single-channel attenuation to
                full-scale handover testing.
              </p>
            </motion.div>
          </div>

          {/* ────────────────────────────────────────────
              PRODUCT 1 — MT-88A Digital Attenuator
              Full-width card with image hero + content
              ──────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="group relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-[#f7f7f5] transition-shadow duration-500 hover:shadow-2xl hover:shadow-zinc-300/40"
          >
            <div className="grid md:grid-cols-12">
              <div className="relative md:col-span-7">
                <div className="relative aspect-[4/3] w-full md:aspect-auto md:h-full md:min-h-[520px]">
                  <Image
                    src="/images/atten8.webp"
                    alt="MT-88A 8 Channel Digital Attenuator"
                    fill
                    quality={100}
                    priority
                    sizes="100vw"
                    className="object-cover"
                  />
                  {/* Gradient fade to content side */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-32 bg-gradient-to-l from-[#f7f7f5] to-transparent md:block" />
                  {/* Bottom gradient for mobile */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#f7f7f5] to-transparent md:hidden" />
                </div>

                {/* Floating badge on image */}
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 shadow-lg shadow-black/5 backdrop-blur-sm">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-[#172556]">
                    MT-88A
                  </span>
                  <span className="h-3 w-px bg-zinc-300" />
                  <span className="text-[10px] font-semibold text-zinc-500">
                    8 Channel
                  </span>
                </div>
              </div>

              {/* Content side */}
              <div className="flex flex-col justify-center px-6 py-8 md:col-span-5 md:px-10 md:py-12">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] font-medium tabular-nums text-zinc-300">
                    01
                  </span>
                  <span className="h-px w-8 bg-zinc-300" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#172556]">
                    Attenuator
                  </span>
                </div>

                <h3 className="mt-5 font-heading text-2xl font-medium leading-tight tracking-tight text-zinc-900 md:text-3xl">
                  8 Channel Digital Attenuator
                </h3>

                <p className="mt-4 text-[15px] leading-relaxed text-zinc-500">
                  Our most versatile attenuator — 8 fully independent channels
                  covering 200 MHz to 8 GHz with 0.25 dB precision. PoE-powered,
                  API-controlled, and built for 24/7 automated operation.
                </p>

                {/* Inline specs */}
                <div className="mt-6 space-y-3">
                  {[
                    { label: "Frequency Range", value: "200 – 8000 MHz" },
                    { label: "Dynamic Range", value: "95 dB" },
                    { label: "Step Resolution", value: "0.25 dB" },
                    { label: "Power", value: "PoE" },
                    { label: "Interface", value: "REST API + APPLICATION" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center justify-between border-b border-zinc-200/60 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-[13px] text-zinc-400">
                        {s.label}
                      </span>
                      <span className="font-mono text-[13px] font-medium text-zinc-800">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <Link
                    href="/products/digital-attenuators/mt88a"
                    className="group/btn inline-flex items-center gap-2.5 rounded-xl bg-[#172556] px-6 py-3 text-sm font-medium text-white shadow-[0_10px_24px_-10px_rgba(23,37,86,0.4)] transition-all hover:bg-[#1e3070] hover:shadow-[0_14px_32px_-10px_rgba(23,37,86,0.5)]"
                  >
                    Explore MT-88A
                    <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Spacer ── */}
          <div className="my-10 md:my-14" />

          {/* ────────────────────────────────────────────
              PRODUCT 2 — Handover Test Systems
              Dark immersive card for contrast
              ──────────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="group relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-[#f7f7f5] transition-shadow duration-500 hover:shadow-2xl hover:shadow-zinc-300/40"
            >
              <div className="grid md:grid-cols-12">
                {/* Content side — left for alternating layout */}
                <div className="order-2 flex flex-col justify-center px-6 py-8 md:order-1 md:col-span-5 md:px-10 md:py-12">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-medium tabular-nums text-zinc-300">
                      02
                    </span>
                    <span className="h-px w-8 bg-zinc-300" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#172556]">
                      System
                    </span>
                  </div>

                  <h3 className="mt-5 font-heading text-2xl font-medium leading-tight tracking-tight text-zinc-900 md:text-3xl">
                    Handover Test Systems
                  </h3>

                  <p className="mt-4 text-[15px] leading-relaxed text-zinc-500">
                    End-to-end integrated systems for mobility, roaming, and
                    handover validation at production scale. Combine
                    programmable attenuators and RF switching matrices into a
                    unified, API-controlled platform.
                  </p>

                  {/* Configuration pills */}
                  <div className="mt-7">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      Configurations
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { model: "NXA-B88M", spec: "8×8", paths: "64" },
                        { model: "NXA-B168M", spec: "16×8", paths: "64" },
                        { model: "NXA-B328M", spec: "32×8", paths: "256" },
                        { model: "NXA-B648M", spec: "64×8", paths: "512" },
                      ].map((cfg) => (
                        <div
                          key={cfg.model}
                          className="rounded-xl border border-zinc-200/80 bg-white px-3.5 py-3 transition-colors duration-200 hover:border-zinc-300"
                        >
                          <p className="font-mono text-[12px] font-semibold text-zinc-800">
                            {cfg.model}
                          </p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-[10px] text-zinc-400">
                              {cfg.spec} matrix
                            </span>
                            <span className="h-2.5 w-px bg-zinc-200" />
                            <span className="text-[10px] font-medium text-[#172556]/60">
                              {cfg.paths} paths
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      href="/products/handover-test-systems"
                      className="group/btn inline-flex items-center gap-2.5 rounded-xl bg-[#172556] px-6 py-3 text-sm font-medium text-white shadow-[0_10px_24px_-10px_rgba(23,37,86,0.4)] transition-all hover:bg-[#1e3070] hover:shadow-[0_14px_32px_-10px_rgba(23,37,86,0.5)]"
                    >
                      Explore Systems
                      <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
                    >
                      Request a quote
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Image side — right */}
                <div className="relative order-1 md:order-2 md:col-span-7">
                  <div className="relative aspect-[4/3] w-full md:aspect-auto md:h-full md:min-h-[520px]">
                    <Image
                      src="/images/handover.webp"
                      alt="Handover Test Systems"
                      fill
                      quality={100}
                      priority
                      sizes="100vw"
                      className="object-contain"
                    />
                    {/* Gradient fade to content side */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-[#f7f7f5] to-transparent md:block" />
                    {/* Bottom gradient for mobile */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#f7f7f5] to-transparent md:hidden" />
                  </div>

                  {/* Floating badge on image */}
                  <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 shadow-lg shadow-black/5 backdrop-blur-sm">
                    <span className="font-mono text-[10px] font-bold tracking-widest text-[#172556]">
                      Up to 512 paths
                    </span>
                    <span className="h-3 w-px bg-zinc-300" />
                    <span className="text-[10px] font-semibold text-zinc-500">
                      64×8
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   4.2 · TECHNOLOGIES THAT POWER US
   ═══════════════════════════════════════════════════ */

function TechnologiesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="border-t border-zinc-200/80 bg-[#f7f7f5]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="mb-14 grid gap-6 md:grid-cols-12 md:items-end"
          >
            <div className="md:col-span-7">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Technologies that power us
              </p>
              <h2 className="mt-4 font-heading text-3xl font-medium leading-[1.15] tracking-tight text-zinc-900 md:text-4xl lg:text-5xl">
                State-of-the-art wireless,
                <br />
                networking & testing
              </h2>
            </div>
            <div className="md:col-span-5 md:text-right">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#172556] transition-colors hover:text-[#1e3070]"
              >
                Learn more about us
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid gap-3 md:grid-cols-12 md:gap-4">
          {/* ── Row 1: Hero card (8 cols) + Tall card (4 cols) ── */}

          {/* Wireless Tech — large horizontal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="group overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-zinc-200/50 md:col-span-8 md:row-span-2"
          >
            <div className="flex h-full flex-col md:flex-row">
              <div className="flex w-full flex-col justify-center p-8 md:w-[48%] md:p-10 lg:p-12">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-[#f7f7f5] text-[#172556] ring-1 ring-zinc-100 transition-colors duration-300 group-hover:bg-[#172556] group-hover:text-white group-hover:ring-[#172556]">
                    <Radio className="size-5" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    Connectivity
                  </span>
                </div>
                <h3 className="font-heading text-2xl font-medium tracking-tight text-zinc-900 md:text-3xl">
                  Wireless Technology
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-zinc-500">
                  Accelerating deployment of private networks and complex
                  multi-antenna arrays addressing real-world challenges in 5G,
                  Wi-Fi 7, and next-generation IoT connectivity.
                </p>
              </div>
              <div className="relative h-64 w-full overflow-hidden border-t border-zinc-200/80 bg-zinc-100 md:h-auto md:w-[52%] md:border-l md:border-t-0">
                <Image
                  src="https://images.unsplash.com/photo-1767884162181-68267b807b40?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Wireless Technology"
                  fill
                  sizes="(max-width:768px) 100vw, 52vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </motion.div>

          {/* Silicon Design — tall vertical */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="group flex flex-col overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-zinc-200/50 md:col-span-4 md:row-span-2"
          >
            <div className="relative min-h-44 w-full flex-1 overflow-hidden border-b border-zinc-200/80 bg-zinc-100">
              <Image
                src="https://images.unsplash.com/photo-1613616631374-121ea711cc3d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Silicon Design"
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="shrink-0 p-7 md:p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-[#f7f7f5] text-[#172556] ring-1 ring-zinc-100 transition-colors duration-300 group-hover:bg-[#172556] group-hover:text-white group-hover:ring-[#172556]">
                  <Cpu className="size-5" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Architecture
                </span>
              </div>
              <h3 className="font-heading text-xl font-medium tracking-tight text-zinc-900">
                Silicon Design
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                Custom silicon architectures pushing the boundary of RF
                performance in attenuators and switching matrices.
              </p>
            </div>
          </motion.div>

          {/* ── Row 2: Three equal cards ── */}

          {/* Networking */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="group overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-zinc-200/50 md:col-span-4"
          >
            <div className="relative h-44 w-full overflow-hidden border-b border-zinc-200/80 bg-zinc-100">
              <Image
                src="https://images.unsplash.com/photo-1591808216268-ce0b82787efe?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Networking"
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-[#f7f7f5] text-[#172556] ring-1 ring-zinc-100 transition-colors duration-300 group-hover:bg-[#172556] group-hover:text-white group-hover:ring-[#172556]">
                  <Network className="size-5" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Infrastructure
                </span>
              </div>
              <h3 className="font-heading text-xl font-medium tracking-tight text-zinc-900">
                Networking
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                Robust communication layers ensuring seamless, resilient routing
                protocols for high-availability test environments.
              </p>
            </div>
          </motion.div>

          {/* Hardware Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4, ease }}
            className="group overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-zinc-200/50 md:col-span-4"
          >
            <div className="relative h-44 w-full overflow-hidden border-b border-zinc-200/80 bg-zinc-100">
              <Image
                src="https://images.unsplash.com/photo-1562408590-e32931084e23?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hardware Design"
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-[#f7f7f5] text-[#172556] ring-1 ring-zinc-100 transition-colors duration-300 group-hover:bg-[#172556] group-hover:text-white group-hover:ring-[#172556]">
                  <Zap className="size-5" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Engineering
                </span>
              </div>
              <h3 className="font-heading text-xl font-medium tracking-tight text-zinc-900">
                Hardware Design
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                High-frequency PCB and module engineering tailored for extreme
                RF environments and production-grade reliability.
              </p>
            </div>
          </motion.div>

          {/* Testing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5, ease }}
            className="group overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-zinc-200/50 md:col-span-4"
          >
            <div className="relative h-44 w-full overflow-hidden border-b border-zinc-200/80 bg-zinc-100">
              <Image
                src="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Testing"
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-[#f7f7f5] text-[#172556] ring-1 ring-zinc-100 transition-colors duration-300 group-hover:bg-[#172556] group-hover:text-white group-hover:ring-[#172556]">
                  <Gauge className="size-5" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Validation
                </span>
              </div>
              <h3 className="font-heading text-xl font-medium tracking-tight text-zinc-900">
                Testing & QA
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                Advanced validation sequences and rigorous QA ensuring flawless
                production runs across every product line.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   7 · VALUES MANIFESTO — large typography layout
   ═══════════════════════════════════════════════════ */

function ValuesManifesto() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const values = [
    {
      word: "Integrity",
      icon: Shield,
      detail:
        "No hidden trade-offs, no inflated claims. What we publish is what you measure — honest specs, honest support.",
      gradient:
        "bg-linear-to-br from-emerald-500/10 via-emerald-500/5 to-transparent",
    },
    {
      word: "Innovation",
      icon: Lightbulb,
      detail:
        "Every product generation is shaped by real lab feedback. We solve problems engineers actually face, not theoretical ones.",
      gradient:
        "bg-linear-to-br from-blue-500/10 via-blue-500/5 to-transparent",
    },
    {
      word: "Excellence",
      icon: Award,
      detail:
        "From component selection to final calibration — built to perform flawlessly in 24/7 automated environments.",
      gradient:
        "bg-linear-to-br from-teal-500/10 via-teal-500/5 to-transparent",
    },
    {
      word: "Sustainability",
      icon: Leaf,
      detail:
        "PoE-powered, solid-state designs engineered for longevity — reducing waste and total cost of ownership.",
      gradient:
        "bg-linear-to-br from-rose-500/10 via-rose-500/5 to-transparent",
    },
    {
      word: "Customer Focus",
      icon: Users,
      detail:
        "Direct access to our RF engineering team. Custom configurations when standard models don't fit your workflow.",
      gradient:
        "bg-linear-to-br from-indigo-500/10 via-indigo-500/5 to-transparent",
    },
    {
      word: "Transparency",
      icon: Eye,
      detail:
        "Full datasheets with real measured data, open REST APIs, complete documentation, and honest lead times.",
      gradient:
        "bg-linear-to-br from-violet-500/10 via-violet-500/5 to-transparent",
    },
  ];

  /* Grid spans: row1 = 4·5·3, row2 = 3·5·4 (mirrored rhythm) */
  const gridSpans = [
    "md:col-span-4",
    "md:col-span-5",
    "md:col-span-3",
    "md:col-span-3",
    "md:col-span-5",
    "md:col-span-4",
  ];

  return (
    <section className="border-t border-zinc-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
        >
          {/* Header */}
          <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
            <motion.div variants={fadeUp} custom={0} className="md:col-span-7">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Our Values
              </p>
              <h2 className="mt-4 font-heading text-3xl font-medium leading-[1.15] tracking-tight md:text-4xl lg:text-5xl">
                Principles that shape
                <br />
                every decision
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="md:col-span-5">
              <p className="max-w-md text-base leading-relaxed text-zinc-500">
                The standards we hold ourselves to — in engineering, in
                partnerships, and in the way we build products that labs depend
                on every day.
              </p>
            </motion.div>
          </div>

          {/* Compact bento grid */}
          <div className="grid gap-3 md:grid-cols-12">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.word}
                  variants={fadeUp}
                  custom={i + 2}
                  className={`group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white transition-all duration-300 hover:border-[#172556]/20 hover:shadow-lg hover:shadow-zinc-200/60 ${gridSpans[i]}`}
                >
                  {/* Subtle Gradient matched to the value */}
                  <div
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-60 group-hover:opacity-100 ${v.gradient}`}
                  />

                  {/* Hover accent — top border glow */}
                  <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#172556]/0 to-transparent transition-all duration-500 group-hover:via-[#172556]/40" />

                  <div className="relative z-10 flex h-full flex-col p-6">
                    {/* Top row: icon + number */}
                    <div className="mb-4 flex items-center justify-between">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-white text-[#172556] ring-1 ring-zinc-200/80 transition-all duration-300 group-hover:bg-[#172556] group-hover:text-white group-hover:ring-[#172556] group-hover:shadow-md group-hover:shadow-[#172556]/20">
                        <Icon className="size-[18px]" />
                      </span>
                      <span className="font-mono text-[10px] font-medium tabular-nums text-zinc-300 transition-colors duration-300 group-hover:text-[#172556]/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-lg font-medium tracking-tight text-zinc-900">
                      {v.word}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-[13px] leading-relaxed text-zinc-600">
                      {v.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   8 · GLOBAL PRESENCE + CONTACT CTA
   ═══════════════════════════════════════════════════ */

function GlobalPresence() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="border-t border-zinc-200/80 bg-[#f7f7f5]">
      <div className="mx-auto max-w-7xl px-6 pt-20 md:px-10 md:pt-28">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
        >
          {/* Top: global reach intro */}
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <motion.div variants={fadeUp} custom={0} className="md:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Global Reach
              </p>
              <h2 className="mt-4 font-heading text-3xl font-medium tracking-tight md:text-4xl">
                Trusted by RF test labs and production facilities worldwide
              </h2>
              <p className="mt-5 leading-relaxed text-zinc-600">
                From our engineering hub in Bangalore, we deliver and support
                precision RF test systems across many countries — helping teams
                validate faster with better repeatability.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#172556] transition-colors hover:text-[#1e3070]"
                >
                  Talk to our engineering team
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Contact cards */}
            <motion.div
              variants={fadeUp}
              custom={1}
              className="grid gap-4 sm:grid-cols-2 md:col-span-7"
            >
              {[
                {
                  icon: Mail,
                  label: "Sales Inquiries",
                  value: "sales@wavenxt.com",
                  href: "mailto:sales@wavenxt.com",
                },
                {
                  icon: Mail,
                  label: "Technical Support",
                  value: "support@wavenxt.com",
                  href: "mailto:support@wavenxt.com",
                },
                {
                  icon: Headset,
                  label: "Landline Number",
                  value: "080-4164 3659",
                  href: "tel:08041643659",
                  sub: "Monday - Friday",
                },
                {
                  icon: Phone,
                  label: "Mobile Number",
                  value: "+91 74837 59420",
                  href: "tel:+917483759420",
                  sub: "Monday - Friday",
                },
                {
                  icon: MapPin,
                  label: "Office",
                  value: "#847 2nd Floor A block",
                  sub: "Sahakaranagar, Bangalore 560092",
                },
              ].map((item) => {
                const Content = (
                  <div className="group flex items-start gap-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-5 transition-all duration-200 hover:border-zinc-300 hover:bg-white hover:shadow-sm">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#172556]/[0.06] text-[#172556] transition-colors group-hover:bg-[#172556] group-hover:text-white">
                      <item.icon className="size-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                        {item.label}
                      </p>
                      <p className="mt-1.5 text-sm font-medium text-zinc-900">
                        {item.value}
                      </p>
                      {item.sub && (
                        <p className="mt-0.5 text-xs text-zinc-500">
                          {item.sub}
                        </p>
                      )}
                    </div>
                  </div>
                );

                return item.href ? (
                  <a key={item.label} href={item.href}>
                    {Content}
                  </a>
                ) : (
                  <div key={item.label}>{Content}</div>
                );
              })}
            </motion.div>
          </div>

          {/* Bottom CTA bar */}
          <motion.div variants={fadeUp} custom={2} className="mt-16">
            <div className="relative overflow-hidden rounded-3xl bg-[#172556] p-8 md:p-12">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-indigo-400/10 blur-3xl" />
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
              </div>

              <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                <div>
                  <h3 className="font-heading text-2xl font-medium tracking-tight text-white md:text-3xl">
                    Ready to build your next test setup?
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-blue-100/60">
                    Whether you need a custom RF solution, technical
                    consultation, or want to discuss your test requirements —
                    our engineering team is ready to help.
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-3">
                  <Link href="/contact">
                    <motion.span
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-medium text-zinc-900 shadow-lg transition-colors hover:bg-zinc-100"
                    >
                      Start a conversation
                      <ArrowRight className="size-4" />
                    </motion.span>
                  </Link>
                  <motion.a
                    href="mailto:sales@wavenxt.com"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                  >
                    Email us
                    <Mail className="size-3.5" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
