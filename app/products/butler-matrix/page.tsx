"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, FileDown } from "lucide-react";
import { motion } from "framer-motion";
import { butlerModels } from "./data";

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

const sizeGradients: Record<string, string> = {
  "8x8": "bg-linear-to-br from-indigo-500/10 to-transparent",
  "4x4": "bg-linear-to-br from-blue-500/10 to-transparent",
};

const features = [
  {
    n: "01",
    title: "Fixed Beam Patterns",
    desc: "Each input port activates a distinct, repeatable spatial beam — no active control needed.",
  },
  {
    n: "02",
    title: "Passive & Bidirectional",
    desc: "Fully passive network supporting bidirectional RF operation, ideal for test environments.",
  },
  {
    n: "03",
    title: "Defined Phase Offsets",
    desc: "Precise phase progression across antenna outputs enables accurate beam direction simulation.",
  },
  {
    n: "04",
    title: "Uniform Amplitude",
    desc: "Equal-amplitude outputs ensure consistent signal levels across all antenna ports.",
  },
  {
    n: "05",
    title: "Broadband Coverage",
    desc: "Wide frequency range supports 5G FR1, Wi-Fi 6/6E/7, and other multi-standard tests.",
  },
  {
    n: "06",
    title: "Compact & Rugged",
    desc: "Slim 10 mm form factor fits lab racks and field systems without additional hardware.",
  },
];

const applications = [
  "Multi-antenna & beamforming system evaluation",
  "MIMO and spatial channel testing",
  "Over-the-air (OTA) measurement setups",
  "Antenna and beam pattern characterisation",
  "Switched beam smart antenna systems",
  "5G / Wi-Fi 6 / Wi-Fi 7 wireless test",
  "Multipath simulation environments",
  "Phased array pattern generation",
];

export default function ButlerMatrix() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] text-zinc-900">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-48">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-120 w-120 rounded-full bg-[#172556]/5 blur-3xl" />
          <div className="absolute -left-32 top-1/2 h-120 w-120 rounded-full bg-zinc-200/50 blur-3xl" />
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
              <span className="text-zinc-900">Butler Matrix</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-6 font-heading text-5xl font-medium leading-[1.1] tracking-tight md:text-7xl lg:text-8xl"
            >
              Butler
              <br className="max-md:hidden" /> Matrix
            </motion.h1>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mt-16 border-t border-zinc-200/80 pt-16 md:mt-20 md:pt-20"
          >
            <motion.div variants={fadeUp} custom={2} className="max-w-5xl">
              <h2 className="font-heading text-2xl font-medium leading-[1.4] tracking-tight text-zinc-900 md:text-3xl lg:text-4xl">
                <span className="text-zinc-400">
                  Passive beamforming networks that produce fixed spatial beams
                  with defined phase progressions —
                </span>{" "}
                enabling directional antenna testing without active electronics,
                calibration overhead, or complex control systems.
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-10 flex gap-6 lg:mt-16"
            >
              <div className="w-1.5 shrink-0 rounded-full bg-[#172556]" />
              <p className="max-w-2xl text-lg leading-relaxed text-zinc-600">
                <strong className="font-medium text-zinc-900">
                  Available in 4×4 and 8×8 configurations
                </strong>{" "}
                across two frequency bands — all models are fully passive,
                bidirectional, and built with 50 Ω SMA interfaces for seamless
                integration into any RF test setup.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-16 grid grid-cols-2 gap-8 md:mt-24 md:gap-12 lg:grid-cols-4"
            >
              {[
                { label: "Matrix Sizes", value: "4×4 / 8×8", unit: "" },
                { label: "Frequency", value: "0.6 – 8", unit: "GHz" },
                { label: "Phase Balance", value: "±9", unit: "°" },
                { label: "Insertion Loss", value: "9 – 11", unit: "dB" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col justify-center border-l-[3px] border-[#172556]/10 pl-6"
                >
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#172556]/60">
                    {s.label}
                  </p>
                  <p className="flex items-baseline gap-1.5 font-heading text-3xl font-medium tracking-tight text-zinc-900">
                    {s.value}
                    {s.unit && (
                      <span className="font-sans text-sm font-semibold uppercase tracking-normal text-zinc-400">
                        {s.unit}
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Models ── */}
      <section className="border-t border-zinc-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <motion.div variants={fadeUp} custom={0}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#172556]/70">
                  Standard Models
                </p>
                <h2 className="font-heading text-3xl font-medium tracking-tight text-zinc-900 md:text-4xl">
                  Choose your configuration
                </h2>
              </motion.div>
              <motion.a
                variants={fadeUp}
                custom={1}
                href="#"
                className="inline-flex items-center justify-center gap-2 self-start rounded-2xl border border-zinc-200/80 bg-[#f7f7f5] px-6 py-3.5 text-sm font-medium text-zinc-700 transition-all hover:bg-white hover:text-[#172556] hover:shadow-sm md:self-auto"
              >
                <FileDown className="size-4" />
                Download Datasheet
              </motion.a>
            </div>

            <motion.div
              variants={fadeUp}
              custom={2}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {butlerModels.map((m) => {
                const size = m.matrix.split(" ")[0];
                return (
                  <Link
                    key={m.id}
                    href={`/products/butler-matrix/${m.id}`}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] border border-zinc-200/60 bg-[#f7f7f5] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:bg-white hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)]"
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${sizeGradients[size] || ""}`}
                    />

                    <div className="relative z-10 mb-8">
                      <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#172556] shadow-sm ring-1 ring-zinc-200/80">
                        {m.model}
                      </span>
                    </div>

                    <div className="relative z-10">
                      <p className="font-heading text-4xl font-medium tracking-tight text-zinc-900 transition-colors group-hover:text-[#172556]">
                        {size}
                      </p>
                      <p className="mt-2 text-sm text-zinc-500">
                        {m.frequencyText}
                      </p>
                    </div>

                    <div className="relative z-10 mt-8 grid grid-cols-3 gap-2 border-t border-zinc-200/80 pt-6 transition-colors group-hover:border-zinc-300">
                      <div>
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                          Ports
                        </p>
                        <p className="text-sm font-semibold text-zinc-700">
                          {m.specifications
                            .find((s) => s.parameter.includes("RF Ports"))
                            ?.typ?.match(/\d+/)?.[0] ?? "—"}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                          Loss
                        </p>
                        <p className="text-sm font-semibold text-zinc-700">
                          {m.specifications.find((s) =>
                            s.parameter.includes("Insertion"),
                          )?.typ ?? "—"}{" "}
                          dB
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400 transition-colors group-hover:text-[#172556]/60">
                          Phase
                        </p>
                        <p className="text-sm font-semibold text-zinc-700 transition-colors group-hover:text-[#172556]">
                          ±9°
                        </p>
                      </div>
                    </div>

                    <div className="relative z-10 mt-6 flex items-center justify-between">
                      <span className="text-xs font-medium text-zinc-500">
                        SMA / Passive
                      </span>
                      <span className="flex size-8 items-center justify-center rounded-xl bg-white text-[#172556] shadow-sm ring-1 ring-zinc-200/50 transition-colors duration-300 group-hover:bg-[#172556] group-hover:text-white group-hover:ring-[#172556]">
                        <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </motion.div>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="mt-8 text-center text-xs font-medium text-zinc-500"
            >
              All models are passive & bidirectional
              <span className="mx-2 opacity-50">|</span>50 Ω SMA connectors
              <span className="mx-2 opacity-50">|</span>Compact 10 mm form
              factor
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="border-t border-zinc-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} custom={0} className="mb-16">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#172556]/70">
                Key Features
              </p>
              <h2 className="font-heading text-3xl font-medium tracking-tight text-zinc-900 md:text-4xl">
                Precision passive beamforming
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {features.map((f, idx) => {
                const colSpan =
                  idx === 0 || idx === 5 ? "md:col-span-2 lg:col-span-1" : "";
                return (
                  <motion.div
                    key={f.n}
                    variants={fadeUp}
                    custom={idx + 1}
                    className={`group relative overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)] md:p-10 ${colSpan}`}
                  >
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#172556]/5 blur-3xl transition-opacity duration-500 group-hover:bg-[#172556]/10" />
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="mb-6 flex items-center justify-between">
                        <span className="inline-flex size-12 items-center justify-center rounded-[1rem] border border-zinc-200/60 bg-[#f7f7f5] text-sm font-medium tabular-nums text-zinc-400 shadow-sm">
                          {f.n}
                        </span>
                      </div>
                      <div className="mt-auto">
                        <h3 className="mb-3 font-heading text-xl font-medium tracking-tight text-zinc-900 transition-colors group-hover:text-[#172556]">
                          {f.title}
                        </h3>
                        <p className="text-base leading-relaxed text-zinc-600">
                          {f.desc}
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

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-12 md:px-10 md:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="md:col-span-5"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-xs uppercase tracking-[0.2em] text-blue-200/70"
            >
              Target Applications
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-4 font-heading text-3xl font-medium tracking-tight md:text-4xl"
            >
              Where Butler Matrix systems are used
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-5 leading-relaxed text-blue-100/60"
            >
              From R&D characterisation to high-volume production test lines,
              Butler Matrix networks deliver passive beamforming without
              calibration overhead or active components.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-10 flex flex-col gap-4"
            >
              <Link
                href="/support"
                className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-zinc-300"
              >
                Talk to an engineer <ArrowUpRight className="size-4" />
              </Link>
              <a
                href="mailto:sales@wavenxt.com"
                className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-200"
              >
                sales@wavenxt.com
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="md:col-span-7"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {applications.map((app, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors hover:bg-white/[0.08]"
                >
                  <span className="inline-flex size-9 items-center justify-center rounded-xl border border-white/10 text-xs font-semibold tabular-nums text-zinc-400 transition-colors group-hover:border-white/20 group-hover:text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-6 font-heading text-lg font-medium leading-tight text-white">
                    {app}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
