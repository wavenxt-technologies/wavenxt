"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  FileDown,
  Activity,
  Clock,
  ShieldCheck,
  Network,
  SlidersHorizontal,
  LayoutDashboard,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { matrixModels } from "./data";

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

const featureIcons = [
  Activity,
  Clock,
  ShieldCheck,
  Network,
  SlidersHorizontal,
  LayoutDashboard,
];

export default function MatrixSystems() {
  const model = matrixModels[0];

  const heroSpecs = [
    { label: "Frequency", value: "200 – 8000", unit: "MHz" },
    { label: "Matrix Size", value: "16×8", unit: "matrix" },
    { label: "Attenuation", value: "0 – 95", unit: "dB" },
    { label: "Step Size", value: "0.25", unit: "dB" },
    { label: "Isolation", value: "90", unit: "dB" },
    { label: "Connector", value: "SMA", unit: "Female" },
  ];

  const features = model.features.map((f) => {
    const idx = f.indexOf(":");
    return { title: f.slice(0, idx), desc: f.slice(idx + 1).trim() };
  });

  const electricalSpecs = model.specifications.filter((s) =>
    [
      "Frequency",
      "Impedance",
      "Channel",
      "Attenuation",
      "Shielding",
      "Isolation",
      "Step",
      "Insertion",
      "Accuracy",
      "Switching",
      "Input",
      "Operating modes",
      "Control",
      "Power",
    ].some((k) => s.parameter.toLowerCase().includes(k.toLowerCase())),
  );

  const mechanicalSpecs = model.environmental;

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-zinc-900">
      {/* ── Hero ── */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-36 md:px-10 md:pb-24 md:pt-40">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          {/* Breadcrumb */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500"
          >
            <Link
              href="/products"
              className="transition-colors hover:text-[#172556]"
            >
              Products
            </Link>
            <span className="h-px w-5 bg-zinc-300" />
            <span className="text-zinc-900">Matrix Systems</span>
          </motion.div>

          <div className="grid items-start gap-8 md:grid-cols-12 md:gap-12">
            {/* Left: heading + description */}
            <div className="md:col-span-7">
              <motion.div
                variants={fadeUp}
                custom={1}
                className="mb-4 flex items-center gap-3"
              >
                <span className="inline-flex items-center rounded-full border border-zinc-200/80 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#172556] shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
                  {model.model}
                </span>
                <span className="text-xs text-zinc-400">·</span>
                <span className="text-xs text-zinc-500">16×8 Matrix</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={2}
                className="font-heading text-4xl font-medium leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
              >
                Matrix Attenuator
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={3}
                className="mt-5 max-w-lg leading-relaxed text-zinc-600"
              >
                {model.overview}
              </motion.p>

              <motion.div
                variants={fadeUp}
                custom={4}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link href="/support">
                  <motion.span
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#172556] px-6 py-3 text-sm font-medium text-white shadow-[0_10px_24px_-10px_rgba(23,37,86,0.5)] transition-colors hover:bg-[#1e3070]"
                  >
                    Request a quote
                    <ArrowUpRight className="size-4" />
                  </motion.span>
                </Link>
                <a
                  href="#specs"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-500 hover:text-zinc-900"
                >
                  View specs
                </a>
              </motion.div>
            </div>

            {/* Right: product image */}
            <motion.div variants={fadeUp} custom={3} className="md:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-gradient-to-b from-zinc-100/80 to-zinc-50/80 p-1.5 shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
                <div className="overflow-hidden rounded-xl border border-zinc-100 bg-white">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="/matrix.jpg"
                      alt={model.model}
                      fill
                      sizes="(max-width:768px) 100vw, 500px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Specs row inside hero */}
          <motion.div
            variants={fadeUp}
            custom={5}
            className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          >
            {heroSpecs.map((s) => (
              <div
                key={s.label}
                className="group relative rounded-2xl border border-zinc-200/80 bg-white px-5 py-5 shadow-[0_1px_0_0_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="absolute left-5 top-0 h-0.5 w-8 rounded-full bg-[#172556]/0 transition-all duration-300 group-hover:bg-[#172556]/60 group-hover:w-10" />
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  {s.label}
                </p>
                <p className="font-heading text-2xl font-medium tracking-tight text-zinc-900">
                  {s.value}
                </p>
                {s.unit && (
                  <p className="mt-1 text-xs font-medium uppercase text-[#172556]/50">
                    {s.unit}
                  </p>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10 md:pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="mb-12">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Key Features
            </p>
            <h2 className="font-heading text-2xl font-medium tracking-tight md:text-3xl">
              Engineered for continuous use
            </h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => (
              <FeatureCard
                key={idx}
                item={item}
                index={idx}
                Icon={featureIcons[idx] || Activity}
                isWide={idx === 0 || idx === 3}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Applications — Navy ── */}
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
              Built for real-world RF validation
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-5 leading-relaxed text-blue-100/60"
            >
              The {model.model} is engineered for environments where accuracy,
              repeatability, and scale matter most to your testing methodology.
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
                Scale your lab setup <ArrowUpRight className="size-4" />
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
              {model.applications.map((app, i) => (
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

      {/* ── Technical Specs ── */}
      <section
        id="specs"
        className="scroll-mt-24 mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <motion.div variants={fadeUp} custom={0}>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Specifications
              </p>
              <h2 className="font-heading text-2xl font-medium tracking-tight md:text-3xl">
                Technical Data
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-600">
                Complete performance data for the {model.model} matrix
                attenuator.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Tables */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="space-y-8 lg:col-span-8"
            >
              {/* Electrical */}
              <div>
                <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                  <span className="h-px w-6 bg-zinc-200" /> Electrical
                  Characteristics
                </p>
                <div className="overflow-x-auto rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
                  <table className="w-full text-sm">
                    <thead className="border-b border-zinc-100 bg-zinc-50/80">
                      <tr>
                        {["Parameter", "Min", "Typ", "Max", "Unit"].map((h) => (
                          <th
                            key={h}
                            className="whitespace-nowrap px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100/80">
                      {electricalSpecs.map((row, i) => (
                        <tr
                          key={i}
                          className="transition-colors hover:bg-zinc-50/50"
                        >
                          <td className="px-5 py-3.5 font-medium text-zinc-900">
                            {row.parameter}
                          </td>
                          <td className="px-5 py-3.5 text-zinc-500">
                            {row.min || "—"}
                          </td>
                          <td className="px-5 py-3.5 text-zinc-500">
                            {row.typ || "—"}
                          </td>
                          <td className="px-5 py-3.5 text-zinc-500">
                            {row.max || "—"}
                          </td>
                          <td className="px-5 py-3.5 text-zinc-400">
                            {row.unit || "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mechanical */}
              <div>
                <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                  <span className="h-px w-6 bg-zinc-200" /> Mechanical &
                  Environmental
                </p>
                <div className="overflow-x-auto rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
                  <table className="w-full text-sm">
                    <thead className="border-b border-zinc-100 bg-zinc-50/80">
                      <tr>
                        <th className="w-1/3 px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                          Parameter
                        </th>
                        <th className="px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100/80">
                      {mechanicalSpecs.map((row, i) => (
                        <tr
                          key={i}
                          className="transition-colors hover:bg-zinc-50/50"
                        >
                          <td className="px-5 py-3.5 align-top font-medium text-zinc-900">
                            {row.parameter}
                          </td>
                          <td className="whitespace-pre-line px-5 py-3.5 leading-relaxed text-zinc-500">
                            {row.conditions}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Sticky Sidebar */}
            <motion.div variants={fadeUp} custom={3} className="lg:col-span-4">
              <div className="sticky top-28 space-y-4">
                <div className="rounded-2xl border border-zinc-200/80 bg-gradient-to-b from-zinc-100/80 to-zinc-50/80 p-7 shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
                  <h3 className="font-heading text-lg font-medium text-zinc-900">
                    Download Resources
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    Full datasheet with performance graphs, insertion loss
                    curves, and mechanical drawings.
                  </p>
                  <a
                    href="#"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200/80 bg-white px-5 py-3 text-sm font-medium text-zinc-700 shadow-[0_1px_0_0_rgba(0,0,0,0.03)] transition-all hover:shadow-sm"
                  >
                    <FileDown className="size-4 text-zinc-400" /> Download
                    Datasheet
                  </a>
                </div>

                <div className="rounded-2xl border border-[#172556]/10 bg-[#172556]/[0.04] p-7">
                  <h3 className="font-heading text-lg font-medium text-[#172556]">
                    Need a custom config?
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    We design custom matrix sizes, topologies, and control
                    interfaces to fit your lab.
                  </p>
                  <Link
                    href="/support"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#172556] px-6 py-3 text-sm font-medium text-white shadow-[0_10px_24px_-10px_rgba(23,37,86,0.5)] transition-colors hover:bg-[#1e3070]"
                  >
                    Contact engineering <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Functional Diagram ── */}
      <section className="border-t border-zinc-200/80 bg-gradient-to-b from-[#f7f7f5] to-zinc-100/60">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid items-center gap-10 md:grid-cols-12 md:gap-16"
          >
            <motion.div variants={fadeUp} custom={0} className="md:col-span-5">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Architecture
              </p>
              <h2 className="font-heading text-2xl font-medium tracking-tight md:text-3xl">
                Functional Diagram
              </h2>
              <p className="mt-4 leading-relaxed text-zinc-600">
                The 16×8 switching matrix routes any of the 16 inputs to any of
                the 8 outputs through independently controlled attenuation
                paths.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} className="md:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-gradient-to-b from-zinc-100/80 to-zinc-50/80 p-2 shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
                <div className="overflow-hidden rounded-xl border border-zinc-100 bg-white">
                  <div className="relative flex aspect-4/3 w-full items-center justify-center bg-zinc-50 text-zinc-400">
                    Diagram coming soon
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

/* ── Feature Card ── */

function FeatureCard({
  item,
  index,
  Icon,
  isWide,
}: {
  item: { title: string; desc: string };
  index: number;
  Icon: React.ComponentType<{ className?: string }>;
  isWide: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease }}
      className={isWide ? "md:col-span-2 lg:col-span-1" : ""}
    >
      <div className="group flex h-full flex-col rounded-2xl border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/80 p-7 shadow-[0_1px_0_0_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <div className="mb-6 inline-flex size-11 items-center justify-center rounded-xl border border-zinc-200/60 bg-[#f7f7f5] text-zinc-400 transition-colors duration-300 group-hover:border-[#172556]/20 group-hover:bg-[#172556]/5 group-hover:text-[#172556]">
          <Icon className="size-5" />
        </div>
        <h3 className="font-heading text-lg font-medium tracking-tight text-zinc-900 transition-colors group-hover:text-[#172556]">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}
