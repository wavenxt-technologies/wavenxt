"use client";

import Link from "next/link";
import { ArrowUpRight, Activity, Zap, FileText } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { splitterModels } from "./data";

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

export default function PowerSplitters() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const commonFeatures = [
    {
      title: "Microstrip Design",
      desc: "Robust internal architectures ensuring phase and amplitude balance across all output ports.",
      icon: Activity,
    },
    {
      title: "High Isolation",
      desc: "Exceptional port-to-port isolation (up to 26 dB typical) to prevent feedback in test setups.",
      icon: Zap,
    },
    {
      title: "Low Insertion Loss",
      desc: "Optimized materials minimize signal degradation across 0.5 to 18 GHz wideband frequencies.",
      icon: ArrowUpRight,
    },
  ];

  const applications = [
    "ISM / Bluetooth testing",
    "Wi-Fi communication systems",
    "Satellite communication",
    "Laboratory test & measurement",
  ];

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-zinc-900 pb-20">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-48">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-120 w-120 rounded-full bg-[#172556]/5 blur-3xl" />
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
              <span>Splitters</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-6 font-heading text-5xl font-medium leading-[1.1] tracking-tight md:text-7xl lg:text-8xl"
            >
              Splitters
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-600 md:text-xl md:leading-relaxed"
            >
              Designed for precise signal distribution, ensuring balanced
              output, minimal loss, and consistent RF performance across all
              channels.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Specs Table ── */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-10 md:py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="mb-12">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Model Specifications
            </p>
            <h2 className="font-heading text-2xl font-medium tracking-tight md:text-3xl">
              Variants
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            className="overflow-x-auto rounded-3xl border border-zinc-200/80 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.02)] min-w-0"
          >
            <div className="w-full min-w-250 p-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-100 bg-zinc-50/50">
                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#172556]/60 rounded-tl-xl wrap-break-word whitespace-nowrap">
                      Model
                    </th>
                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#172556]/60 wrap-break-word whitespace-nowrap">
                      Ways
                    </th>
                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#172556]/60 wrap-break-word whitespace-nowrap">
                      Freq Range
                    </th>
                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#172556]/60 wrap-break-word whitespace-nowrap">
                      Insertion Loss
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#172556]/60 rounded-tr-xl wrap-break-word whitespace-nowrap">
                      Datasheet
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {splitterModels.map((m) => (
                    <tr
                      key={m.model}
                      className="transition-colors hover:bg-zinc-50/50"
                    >
                      <td className="px-5 py-5">
                        <span className="font-mono text-xs font-semibold uppercase text-zinc-900 border border-zinc-200/80 bg-white px-2 py-1 rounded-md">
                          {m.model}
                        </span>
                      </td>
                      <td className="px-5 py-5 font-mono text-sm font-medium text-zinc-700">
                        {m.ways}
                      </td>
                      <td className="px-5 py-5 font-mono text-sm font-medium text-zinc-700">
                        {m.frequency}
                      </td>
                      <td className="px-5 py-5 font-mono text-sm text-zinc-600">
                        {m.insertionLoss}
                      </td>
                      <td className="px-5 py-5">
                        <a
                          href={`/datasheet/splitters/${m.model}.pdf`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200/60 bg-white px-3 py-1.5 text-[11px] font-medium text-[#172556] transition-colors hover:bg-zinc-50"
                        >
                          <FileText className="size-3" />
                          PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Features & Applications ── */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-24">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid gap-12 lg:grid-cols-12"
        >
          <motion.div variants={fadeUp} custom={0} className="lg:col-span-7">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Capabilities
            </p>
            <h2 className="font-heading text-3xl font-medium tracking-tight md:text-3xl">
              Engineering & Architecture
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {commonFeatures.map((f, i) => (
                <motion.div
                  key={f.title}
                  variants={fadeUp}
                  custom={i + 1}
                  className={`group rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${i === 2 ? "sm:col-span-2" : ""}`}
                >
                  <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-[#f7f7f5] text-[#172556] ring-1 ring-zinc-100 transition-colors group-hover:bg-[#172556] group-hover:text-white">
                    <f.icon className="size-4" />
                  </div>
                  <h3 className="font-heading text-lg font-medium text-zinc-900">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={2} className="lg:col-span-5">
            <div className="h-full rounded-3xl bg-[#172556] p-8 text-white md:p-10">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-blue-200/70">
                Target Applications
              </p>
              <h2 className="font-heading text-2xl font-medium tracking-tight">
                Common use cases
              </h2>
              <p className="mt-4 leading-relaxed text-blue-100/60">
                Reliable components for diverse high-frequency lab environments.
              </p>

              <ul className="mt-10 space-y-4">
                {applications.map((app, i) => (
                  <li
                    key={i}
                    className="flex flex-wrap items-center gap-4 border-b border-white/10 pb-4 last:border-0"
                  >
                    <span className="font-mono text-xs font-semibold text-blue-300 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium leading-tight">
                      {app}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-200 transition-colors hover:text-white"
                >
                  Discuss a custom requirement{" "}
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
