"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  FileDown,
  Activity,
  Clock,
  ShieldCheck,
  Network,
  GitMerge,
  SlidersHorizontal,
  LayoutDashboard,
} from "lucide-react";
import { motion } from "framer-motion";

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

const features = [
  {
    title: "Extended Frequency Range",
    desc: "Operates across a broad spectrum from 200 MHz to 8 GHz, ensuring versatility for a wide array of testing applications.",
  },
  {
    title: "24/7 Operation",
    desc: "Engineered for continuous use, supporting fully automated testing workflows to maximize efficiency and reliability in mission-critical environments.",
  },
  {
    title: "Shielded and Precise",
    desc: "Complete shielding ensures highly accurate and interference-free measurements, ideal for precision testing in demanding RF environments.",
  },
  {
    title: "Customizable Topologies",
    desc: "Tailored to customer specifications, supporting multiple network topologies for enhanced flexibility and optimized test setups.",
  },
  {
    title: "512 Attenuation Paths",
    desc: "Capable of managing up to 512 unique signal paths, providing unparalleled control over complex testing scenarios.",
  },
  {
    title: "High Dynamic Range",
    desc: "Offers up to 90 dB of attenuation with fine-grain control, adjustable in 0.25 dB increments, delivering exceptional precision for signal fading and attenuation simulations.",
  },
  {
    title: "Tailored User Interface",
    desc: "Custom-designed software interfaces align with specific customer needs, providing an intuitive and efficient control experience for streamlined operations.",
  },
];

const models = [
  { model: "NXA-B88M", config: "8×8", inputs: 8, outputs: 8, paths: 64 },
  { model: "NXA-B168M", config: "16×8", inputs: 16, outputs: 8, paths: 64 },
  { model: "NXA-B248M", config: "24×8", inputs: 24, outputs: 8, paths: 192 },
  { model: "NXA-B328M", config: "32×8", inputs: 32, outputs: 8, paths: 256 },
  { model: "NXA-B648M", config: "64×8", inputs: 64, outputs: 8, paths: 512 },
  { model: "NXA-B6416M", config: "64×16", inputs: 64, outputs: 16, paths: 512 },
  { model: "NXA-B1616M", config: "16×16", inputs: 16, outputs: 16, paths: 256 },
];

const pathsGradients: Record<number, string> = {
  512: "bg-linear-to-br from-indigo-500/10 to-transparent",
  256: "bg-linear-to-br from-blue-500/10 to-transparent",
  192: "bg-linear-to-br from-teal-500/10 to-transparent",
  64: "bg-linear-to-br from-rose-500/10 to-transparent",
};

export default function HandoverTestSystems() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] text-zinc-900 pb-20">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-48">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-120 w-120 rounded-full bg-[#172556]/5 blur-3xl" />
          <div className="absolute top-1/2 -left-32 h-120 w-120 rounded-full bg-zinc-200/50 blur-3xl" />
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
                href="/products"
                className="transition-colors hover:text-[#172556]"
              >
                Products
              </Link>
              <div className="h-0.5 w-6 bg-zinc-300" />
              <span className="text-zinc-900">Handover Test Systems</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-6 font-heading text-5xl font-medium leading-[1.1] tracking-tight md:text-7xl lg:text-8xl"
            >
              Handover
              <br className="max-md:hidden" /> Test Systems
            </motion.h1>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mt-16 border-t border-zinc-200/80 pt-16 md:mt-20 md:pt-20"
          >
            <div className="max-w-5xl">
              <motion.div variants={fadeUp} custom={2}>
                <h2 className="font-heading text-2xl font-medium tracking-tight text-zinc-900 md:text-3xl lg:text-4xl leading-[1.4]">
                  <span className="text-zinc-400">
                    Integrates precise attenuators, splitter/combiner units, and
                    RF switch systems into a single compact solution.
                  </span>{" "}
                  Replacing the racks of instruments traditionally needed to
                  cover broad test scenarios.
                </h2>

                <div className="mt-10 flex gap-6 lg:mt-16">
                  <div className="w-1.5 shrink-0 rounded-full bg-[#172556]" />
                  <p className="text-lg leading-relaxed text-zinc-600 max-w-2xl">
                    <strong className="font-medium text-zinc-900">
                      Traditional approaches require multiple instruments
                    </strong>
                    , extensive racks, or separate devices. WaveNxt handover
                    systems streamline these setups into versatile,
                    space-efficient configurations — delivering flexibility and
                    precision where it counts most.
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-16 md:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
            >
              {[
                { label: "Frequency", value: "200 – 8000", unit: "MHz" },
                { label: "Attenuation", value: "Up to 90", unit: "dB" },
                { label: "Step Size", value: "0.25", unit: "dB" },
                { label: "Max Paths", value: "512", unit: "paths" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="border-l-[3px] border-[#172556]/10 pl-6 flex flex-col justify-center"
                >
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#172556]/60">
                    {s.label}
                  </p>
                  <p className="font-heading text-3xl font-medium tracking-tight text-zinc-900 flex items-baseline gap-1.5">
                    {s.value}
                    <span className="text-sm font-semibold text-zinc-400 font-sans tracking-normal uppercase">
                      {s.unit}
                    </span>
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Features — numbered rows ── */}
      <section className="border-t border-zinc-200/80 bg-[#f7f7f5]">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="py-20 md:py-28"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-16">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#172556]/70">
                Key Features
              </p>
              <h2 className="font-heading text-3xl font-medium tracking-tight text-zinc-900 md:text-4xl">
                Built for mission-critical reliability
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((item, idx) => {
                // Create a bento layout pattern
                // Colspans: 0 -> 2, cols, 1 -> 1, 2 -> 1, 3 -> 1, 4 -> 1, 5 -> 2, 6 -> 1
                let colSpan = "col-span-1";
                if (idx === 0 || idx === 5) {
                  colSpan = "md:col-span-2";
                }

                const icons = [
                  Activity,
                  Clock,
                  ShieldCheck,
                  Network,
                  GitMerge,
                  SlidersHorizontal,
                  LayoutDashboard,
                ];
                const Icon = icons[idx];

                return (
                  <motion.div
                    key={idx}
                    variants={fadeUp}
                    custom={idx + 1}
                    className={`group relative overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white p-8 md:p-10 transition-all duration-300 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1 ${colSpan}`}
                  >
                    {idx === 0 && (
                      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#172556]/5 blur-3xl transition-opacity duration-500 group-hover:bg-[#172556]/10" />
                    )}
                    {idx === 5 && (
                      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl transition-opacity duration-500 group-hover:bg-blue-500/10" />
                    )}

                    <div className="relative z-10 flex h-full flex-col">
                      <div className="mb-6 flex items-center justify-between">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[#f7f7f5] text-sm tabular-nums text-zinc-400 border border-zinc-200/60 shadow-sm transition-colors duration-500 group-hover:bg-[#172556] group-hover:text-white group-hover:border-[#172556]">
                          <Icon className="size-5 transition-transform duration-500 group-hover:scale-110" />
                        </span>
                        <span className="text-[#172556]/0 transition-colors duration-300 group-hover:text-[#172556]/60">
                          <ArrowUpRight className="size-5" />
                        </span>
                      </div>
                      <div className="mt-auto">
                        <h3 className="font-heading text-xl font-medium tracking-tight text-zinc-900 transition-colors group-hover:text-[#172556] mb-3">
                          {item.title}
                        </h3>
                        <p className="text-base leading-relaxed text-zinc-600">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Standard Models ── */}
      <section className="bg-white text-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <motion.div variants={fadeUp} custom={0}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#172556]/70">
                  Standard Models
                </p>
                <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl text-zinc-900">
                  Choose your configuration
                </h2>
              </motion.div>
              <motion.a
                variants={fadeUp}
                custom={1}
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#f7f7f5] border border-zinc-200/80 px-6 py-3.5 text-sm font-medium text-zinc-700 transition-all hover:bg-white hover:text-[#172556] hover:shadow-sm self-start md:self-auto"
              >
                <FileDown className="size-4" />
                Download Datasheet
              </motion.a>
            </div>

            {/* model cards grid */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {models.map((m) => (
                <div
                  key={m.model}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] border border-zinc-200/60 bg-[#f7f7f5] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:bg-white hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)]"
                >
                  {/* Dynamic Gradient matched to number of internal hardware paths */}
                  <div
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${pathsGradients[m.paths] || "bg-linear-to-br from-zinc-200/10 to-transparent"}`}
                  />

                  <div className="relative z-10 mb-8">
                    <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#172556] shadow-sm ring-1 ring-zinc-200/80">
                      {m.model}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <p className="font-heading text-4xl font-medium tracking-tight text-zinc-900 transition-colors group-hover:text-[#172556]">
                      {m.config}
                    </p>
                  </div>
                  <div className="relative z-10 mt-8 grid grid-cols-3 gap-2 border-t border-zinc-200/80 pt-6 transition-colors group-hover:border-zinc-300">
                    <div>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">
                        In
                      </p>
                      <p className="text-sm font-semibold text-zinc-700">
                        {m.inputs}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">
                        Out
                      </p>
                      <p className="text-sm font-semibold text-zinc-700">
                        {m.outputs}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1 transition-colors group-hover:text-[#172556]/60">
                        Paths
                      </p>
                      <p className="text-sm font-semibold text-zinc-700 transition-colors group-hover:text-[#172556]">
                        {m.paths}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* final cell — contact card */}
              <div className="group flex flex-col justify-between overflow-hidden rounded-[1.5rem] border border-[#172556]/10 bg-[#172556]/5 p-8 transition-all hover:bg-[#172556]/10 lg:col-span-1">
                <p className="text-lg leading-relaxed text-[#172556] font-medium">
                  Need a topology not listed?{" "}
                  <span className="text-zinc-600 block mt-2 text-base font-normal">
                    We build custom configurations to spec.
                  </span>
                </p>
                <Link
                  href="/support"
                  className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#172556] px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#1e3070]"
                >
                  Talk to engineers <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </motion.div>

            {/* table legend */}
            <motion.p
              variants={fadeUp}
              custom={3}
              className="mt-8 text-xs font-medium text-zinc-500 text-center"
            >
              All models operate from 200 MHz to 8 GHz{" "}
              <span className="mx-2 opacity-50">|</span> 0.25 dB step size{" "}
              <span className="mx-2 opacity-50">|</span> Up to 90 dB attenuation{" "}
              <span className="mx-2 opacity-50">|</span> SMA female connectors
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Block Diagram ── */}
      <section className="border-t border-zinc-200/80 bg-[#f7f7f5]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid md:grid-cols-12 gap-12 md:gap-16 md:items-center"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="md:col-span-5 relative z-10"
            >
              <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#172556]">
                Block Diagram
              </p>
              <h2 className="font-heading text-3xl font-medium tracking-tight text-zinc-900 md:text-5xl md:leading-[1.1]">
                8×8 Handover Test System
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-zinc-600">
                The NXA-B88M block diagram illustrates the internal signal
                routing architecture — 8 inputs routed through an attenuator
                matrix to 8 outputs, with full shielding across all paths.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-medium text-zinc-900 shadow-sm ring-1 ring-zinc-200/80 transition-all hover:bg-zinc-50 hover:shadow-md"
                >
                  <FileDown className="size-4 text-zinc-500" />
                  Download Datasheet
                </a>
                <Link
                  href="/support"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 hover:bg-zinc-200/50"
                >
                  Request custom topology
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} className="md:col-span-7">
              <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white p-2 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]">
                <div className="rounded-[1.5rem] bg-zinc-50 p-2 md:p-4 border border-zinc-100">
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-white outline outline-zinc-200/60">
                    <Image
                      src="/handover.png"
                      alt="NXA-B88M — 8×8 Block Diagram"
                      fill
                      unoptimized
                      className="object-contain p-8"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
