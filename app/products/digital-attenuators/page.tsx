"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  digitalAttenuatorCommonSpecs as commonSpecs,
  digitalAttenuatorGroups as groups,
} from "./data";

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

const channelGradients: Record<number, string> = {
  8: "bg-linear-to-br from-indigo-500/10 to-transparent",
  4: "bg-linear-to-br from-blue-500/10 to-transparent",
  2: "bg-linear-to-br from-teal-500/10 to-transparent",
  1: "bg-linear-to-br from-rose-500/10 to-transparent",
};

export default function DigitalAttenuators() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] text-zinc-900 relative">
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
              <span className="">Digital Attenuators</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-6 font-heading text-5xl font-medium leading-[1.1] tracking-tight md:text-7xl lg:text-8xl"
            >
              Digital
              <br className="max-md:hidden" /> Attenuators
            </motion.h1>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mt-16 border-t border-zinc-200/80 pt-16 md:mt-20 md:pt-20"
          >
            <motion.div variants={fadeUp} custom={2} className="max-w-5xl">
              <h2 className="font-heading text-2xl font-medium tracking-tight text-zinc-900 md:text-4xl md:leading-[1.4]">
                <span className="text-zinc-400">
                  Precise, reliable signal power control for Wi-Fi (up to
                  802.11be) and cellular technologies — GSM, UMTS, LTE, and 5G.
                </span>{" "}
                Engineered for both development labs and automated manufacturing
                lines.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-600 md:text-xl md:leading-relaxed">
                Wide 95 dB dynamic range, fine 0.25 dB resolution, low insertion
                loss — PoE-powered and programmable via browser or API. Fully
                shielded for accuracy. Compatible with Windows, Linux, and Mac
                OS.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={3} className="mt-16 md:mt-20">
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-zinc-200/80 bg-zinc-200/80 sm:grid-cols-3 xl:grid-cols-6">
                {commonSpecs.map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center justify-center bg-white p-6 text-center transition-colors hover:bg-[#f7f7f5] md:p-8"
                  >
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#172556]/50">
                      {s.label}
                    </p>
                    <p className="text-base font-medium tracking-tight text-zinc-900 md:text-lg">
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Models Grid ── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} custom={0} className="mb-12 max-w-xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#172556]/70">
                Model Matrix
              </p>
              <h2 className="font-heading text-3xl font-medium tracking-tight text-zinc-900 md:text-4xl">
                Choose your configuration
              </h2>
            </motion.div>

            {/* Table Header (Desktop) */}
            <div className="hidden md:grid grid-cols-[1.5fr_repeat(4,1fr)] gap-px py-6 border-b border-zinc-200/80">
              <div className="flex items-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#172556]/60">
                  Frequency Band
                </p>
              </div>
              {[8, 4, 2, 1].map((ch) => (
                <div key={ch} className="flex items-center justify-center">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#172556]/60">
                    {ch} Channels
                  </span>
                </div>
              ))}
            </div>

            {/* Rows */}
            <div className="flex flex-col border-b border-zinc-200/80">
              {groups.map((group, gi) => (
                <motion.div
                  key={group.band}
                  variants={fadeUp}
                  custom={gi + 1}
                  className="grid grid-cols-1 md:grid-cols-[1.5fr_repeat(4,1fr)] gap-4 md:gap-6 py-10 md:py-12 border-t border-zinc-200/80 first:border-0 items-center"
                >
                  <div className="flex flex-col justify-center pr-6 mb-6 md:mb-0">
                    <span className="inline-flex items-center self-start rounded-full bg-[#172556]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#172556] mb-3">
                      {group.tag}
                    </span>
                    <p className="font-heading text-xl font-medium text-zinc-900 tracking-tight">
                      {group.band}
                    </p>
                    <p className="text-sm text-zinc-500 mt-2 font-medium">
                      0 – 95 dB <span className="mx-1.5 opacity-40">|</span>{" "}
                      0.25 dB step
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:contents">
                    {group.models.map((m) => (
                      <Link
                        key={m.model}
                        href={`/products/digital-attenuators/${m.model.toLowerCase()}`}
                        className="group relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] border border-zinc-200/60 bg-[#f7f7f5] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:bg-white hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)] md:h-45"
                      >
                        {/* Dynamic Channel Accent Gradient */}
                        <div
                          className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${channelGradients[m.channel] || ""}`}
                        />

                        <div className="relative z-10 md:hidden mb-4">
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 transition-colors group-hover:text-zinc-600">
                            {m.channel} Channels
                          </p>
                        </div>

                        <div className="relative z-10">
                          <p className="font-heading text-2xl font-medium tracking-tight text-zinc-900 transition-colors group-hover:text-[#172556]">
                            {m.model}
                          </p>
                        </div>

                        <div className="relative z-10 mt-8 md:mt-auto flex items-end justify-between border-t border-zinc-200/60 pt-4">
                          <span className="text-xs font-medium text-zinc-500">
                            SMA / PoE
                          </span>
                          <span className="flex size-8 items-center justify-center rounded-xl bg-white text-[#172556] shadow-sm ring-1 ring-zinc-200/50 transition-colors duration-300 group-hover:bg-[#172556] group-hover:text-white group-hover:ring-[#172556]">
                            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
