"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import {
  ArrowUpRight,
  FileDown,
  Activity,
  Clock,
  ShieldCheck,
  Network,
  SlidersHorizontal,
  Zap,
  Download,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { meshModelMap, meshModels } from "../data";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  Zap,
];

function getSpec(
  specs: { parameter: string; min?: string; typ?: string; max?: string }[],
  kw: string,
) {
  return specs?.find((s) =>
    s.parameter.toLowerCase().includes(kw.toLowerCase()),
  );
}

export default function MeshAttenuatorModelPage() {
  const params = useParams();
  const id = params.id as string;
  const model = meshModelMap[id];
  if (!model) notFound();

  const others = meshModels.filter((m) => m.id !== id);

  const portsSpec =
    getSpec(model.specifications, "inputs/outputs") ??
    getSpec(model.specifications, "number of rf ports");
  const attenSpec = getSpec(model.specifications, "attenuation range");
  const stepSpec = getSpec(model.specifications, "step size");
  const isoSpec = getSpec(model.specifications, "isolation between");
  const speedSpec = getSpec(model.specifications, "switching speed");

  const sizeLabel = `${portsSpec?.typ ?? "9"} Port`;

  const heroSpecs = [
    { label: "Frequency Range", value: model.frequencyText },
    { label: "Ports", value: portsSpec?.typ ?? "—" },
    { label: "Dynamic Range", value: `${attenSpec?.typ ?? "—"} dB` },
    { label: "Step Size", value: `${stepSpec?.typ ?? "—"} dB` },
    { label: "Isolation", value: `${isoSpec?.typ ?? "—"} dB` },
    { label: "Switch Speed", value: `${speedSpec?.typ ?? "—"} µs` },
  ];

  const features = model.features.map((f: string) => {
    const idx = f.indexOf(":");
    if (idx !== -1) {
      return { title: f.slice(0, idx), desc: f.slice(idx + 1).trim() };
    }
    return { title: f, desc: "" };
  });

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-zinc-900">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#f7f7f5] pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-120 w-120 rounded-full bg-[#172556]/5 blur-3xl" />
          <div className="absolute -left-32 top-1/2 h-120 w-120 rounded-full bg-zinc-200/50 blur-3xl" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative mx-auto max-w-7xl px-6 md:px-10"
        >
          {/* Breadcrumb */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500"
          >
            <Link
              href="/products"
              className="transition-colors hover:text-[#172556]"
            >
              Products
            </Link>
            <span className="h-px w-5 bg-zinc-300" />
            <Link
              href="/products/mesh-attenuators"
              className="transition-colors hover:text-[#172556]"
            >
              Mesh Attenuators
            </Link>
            <span className="h-px w-5 bg-zinc-300" />
            <span className="text-zinc-900">{model.model}</span>
          </motion.div>

          <div className="grid items-start gap-10 md:grid-cols-12 md:gap-14">
            {/* Left */}
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
                <span className="text-xs text-zinc-500">{sizeLabel}</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={2}
                className="font-heading text-4xl font-medium leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
              >
                {sizeLabel} Mesh Attenuator
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
                <Link href="/contact">
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
              <div className="overflow-hidden">
                <div className="overflow-hidden rounded-xl border border-zinc-100">
                  <div className="relative aspect-[4/3] w-full">
                    {model.image ? (
                      <Image
                        src={model.image}
                        alt={model.model}
                        fill
                        sizes="(max-width:768px) 100vw, 500px"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        priority
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-zinc-50">
                        <Activity className="size-10 text-zinc-300" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Specs row */}
          <motion.div
            variants={fadeUp}
            custom={5}
            className="mt-14 border-t border-zinc-200/80 pt-10"
          >
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-200/80 sm:grid-cols-2 lg:grid-cols-3">
              {heroSpecs.map((s) => (
                <div key={s.label} className="bg-white px-6 py-5">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                    {s.label}
                  </p>
                  <p className="font-heading text-xl font-medium tracking-tight text-zinc-900">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Key Features ── */}
      <section className="border-t border-zinc-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <div className="mb-16 grid gap-12 md:grid-cols-12">
              <motion.div
                variants={fadeUp}
                custom={0}
                className="md:col-span-5"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#172556]/60">
                  Key Features
                </p>
                <h2 className="font-heading text-3xl font-medium tracking-tight text-zinc-900 md:text-4xl lg:text-5xl">
                  Built for continuous operation
                </h2>
                <p className="mt-6 leading-relaxed text-zinc-600">
                  The {model.model} delivers {attenSpec?.typ ?? "95"} dB of
                  programmable attenuation with {isoSpec?.typ ?? "90"} dB
                  channel isolation — engineered for 24/7 automated test
                  environments.
                </p>
                <div className="mt-10 flex flex-col gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#172556] transition-colors hover:text-blue-700"
                  >
                    Request custom configuration{" "}
                    <ArrowUpRight className="size-4" />
                  </Link>
                  <a
                    href="mailto:sales@wavenxt.com"
                    className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-800"
                  >
                    sales@wavenxt.com
                  </a>
                </div>
              </motion.div>

              <div className="md:col-span-7">
                <div className="grid gap-8 sm:grid-cols-2">
                  {features.map(
                    (item: { title: string; desc: string }, idx: number) => {
                      const Icon =
                        featureIcons[idx % featureIcons.length] || Activity;
                      return (
                        <motion.div
                          key={idx}
                          variants={fadeUp}
                          custom={idx + 1}
                          className="group"
                        >
                          <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-[#f7f7f5] text-zinc-400 transition-colors group-hover:bg-[#172556] group-hover:text-white">
                            <Icon className="size-5" />
                          </div>
                          <h3 className="font-heading text-lg font-medium text-zinc-900">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                            {item.desc ||
                              "Optimized for reliable performance in demanding RF test environments."}
                          </p>
                        </motion.div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Applications ── */}
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
          {/* Header row */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mb-14 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between"
          >
            <div className="max-w-xl">
              <motion.p
                variants={fadeUp}
                custom={0}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/70"
              >
                Target Applications
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="mt-4 font-heading text-3xl font-medium tracking-tight md:text-5xl"
              >
                Automated RF test
                <br />
                environments
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="mt-5 text-lg leading-relaxed text-blue-100/50"
              >
                The {model.model} is ideal for environments demanding precise,
                repeatable signal control across multiple concurrent devices.
              </motion.p>
            </div>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex shrink-0 items-center gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#172556] transition-colors hover:bg-blue-50"
              >
                Talk to an engineer
                <ArrowUpRight className="size-4" />
              </Link>
              <a
                href={`/datasheet/mesh-attenuators/${id === "nxa-b4p" ? "4" : "9"}/${model.model}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-medium text-white/80 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                <FileDown className="size-4" /> Datasheet
              </a>
            </motion.div>
          </motion.div>

          {/* Application cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {model.applications.map((app: string, i: number) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] px-6 py-7 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06]"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-white/[0.08] text-[11px] font-bold tabular-nums text-white/40 transition-colors group-hover:bg-white/[0.12] group-hover:text-white/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-white/[0.06]" />
                </div>
                <p className="font-heading text-[15px] font-medium leading-snug text-white/90">
                  {app}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Technical Specs ── */}
      <section
        id="specs"
        className="scroll-mt-24 border-t border-zinc-200/80 bg-white"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28"
        >
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <motion.div variants={fadeUp} custom={0}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#172556]/70">
                Specifications
              </p>
              <h2 className="font-heading text-3xl font-medium tracking-tight text-zinc-900 md:text-5xl">
                Technical Data
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-600">
                Complete performance data for the {model.model}.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Tables */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="space-y-8 lg:col-span-8 min-w-0"
            >
              {/* Electrical */}
              <div>
                <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                  <span className="h-px w-6 bg-zinc-200" /> Electrical
                  Characteristics
                </p>
                <div className="overflow-x-auto rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
                  <div className="w-full overflow-x-auto px-1 py-1">
                    <table className="w-full text-sm min-w-150">
                      <thead className="border-b border-zinc-100 bg-zinc-50/80">
                        <tr>
                          {["Parameter", "Min", "Typ", "Max", "Unit"].map(
                            (h) => (
                              <th
                                key={h}
                                className="whitespace-nowrap px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400"
                              >
                                {h}
                              </th>
                            ),
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100/80">
                        {model.specifications.map(
                          (
                            row: {
                              parameter: string;
                              min?: string;
                              typ?: string;
                              max?: string;
                              unit?: string;
                            },
                            i: number,
                          ) => (
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
                              <td className="px-5 py-3.5 text-zinc-500">
                                {row.unit || "—"}
                              </td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Environmental */}
              {model.environmental && (
                <div>
                  <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                    <span className="h-px w-6 bg-zinc-200" /> Mechanical &
                    Environmental
                  </p>
                  <div className="overflow-x-auto rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
                    <div className="w-full overflow-x-auto px-1 py-1">
                      <table className="w-full text-sm min-w-150">
                        <tbody className="divide-y divide-zinc-100/80">
                          {model.environmental.map(
                            (
                              row: { parameter: string; conditions: string },
                              i: number,
                            ) => (
                              <tr
                                key={i}
                                className="transition-colors hover:bg-zinc-50/50"
                              >
                                <td className="w-[35%] px-5 py-3.5 align-top font-medium text-zinc-900">
                                  {row.parameter}
                                </td>
                                <td className="px-5 py-3.5 whitespace-pre-line leading-relaxed text-zinc-600">
                                  {row.conditions}
                                </td>
                              </tr>
                            ),
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sticky Sidebar */}
            <motion.div variants={fadeUp} custom={3} className="lg:col-span-4">
              <div className="sticky top-28 space-y-4">
                {/* Downloads Card */}
                <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                    Downloads
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-medium text-zinc-900">
                    Resources for {model.model}
                  </h3>

                  <div className="mt-5 flex flex-col gap-2.5">
                    <a
                      href={`/datasheet/mesh-attenuators/${id === "nxa-b4p" ? "4" : "9"}/${model.model}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3.5 rounded-xl border border-zinc-100 bg-zinc-50/60 px-4 py-3.5 transition-all hover:border-zinc-200 hover:bg-white hover:shadow-sm"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#172556]/5 text-[#172556] transition-colors group-hover:bg-[#172556] group-hover:text-white">
                        <FileDown className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-zinc-800">
                          Product Datasheet
                        </p>
                        <p className="text-xs text-zinc-400">
                          Specs, graphs &amp; drawings · PDF
                        </p>
                      </div>
                    </a>

                    <Sheet>
                      <SheetTrigger
                        render={
                          <button className="group flex w-full items-center gap-3.5 rounded-xl border border-zinc-100 bg-zinc-50/60 px-4 py-3.5 text-left transition-all hover:border-zinc-200 hover:bg-white hover:shadow-sm">
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#172556]/5 text-[#172556] transition-colors group-hover:bg-[#172556] group-hover:text-white">
                              <Download className="size-4" />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-zinc-800">
                                Control Software
                              </p>
                              <p className="text-xs text-zinc-400">
                                GUI, API libraries &amp; docs
                              </p>
                            </div>
                          </button>
                        }
                      />
                      <SheetContent className="flex w-full flex-col overflow-y-auto sm:max-w-md">
                        <SoftwareForm product={model.model} />
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#172556]/10 bg-[#172556]/[0.04] p-7">
                  <h3 className="font-heading text-lg font-medium text-[#172556]">
                    Need a custom config?
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    We design custom mesh attenuator systems for specialised
                    frequency ranges and port counts.
                  </p>
                  <Link
                    href="/contact"
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
      <section className="border-y border-zinc-200/80 bg-[#f7f7f5]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="flex flex-col items-center justify-center text-center"
          >
            <motion.div variants={fadeUp} custom={0} className="max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Architecture
              </p>
              <h2 className="font-heading text-3xl font-medium tracking-tight text-zinc-900 md:text-5xl">
                Functional Diagram
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-zinc-600">
                A fully non-blocking mesh topology ensures seamless 
                multipath emulation and full interconnectivity.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={1}
              className="mt-12 w-full max-w-4xl"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white p-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]">
                <div className="relative flex aspect-[16/9] w-full items-center justify-center rounded-2xl border border-zinc-100 bg-zinc-50/50 overflow-hidden">
                  <Image
                    src={id === "nxa-b4p" ? "/diagram/mesh4.png" : "/diagram/mesh9.png"}
                    alt="Mesh Attenuator Functional Diagram"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Other Models ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <div className="mb-12 flex items-center justify-between border-b border-zinc-200/80 pb-8">
              <motion.div
                variants={fadeUp}
                custom={0}
                className="flex flex-col gap-2"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#172556]/60">
                  Capabilities
                </p>
                <h3 className="font-heading text-2xl font-medium text-zinc-900">
                  Other Models
                </h3>
              </motion.div>
              <Link
                href="/products/mesh-attenuators"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
              >
                View all <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {others.map((m: any, idx: number) => {
                const mAtten = getSpec(m.specifications, "attenuation range");
                const mPorts =
                  getSpec(m.specifications, "inputs/outputs") ??
                  getSpec(m.specifications, "number of rf ports");
                const mStep = getSpec(m.specifications, "step size");

                const gradients = [
                  "bg-gradient-to-br from-blue-500/10 to-transparent",
                  "bg-gradient-to-br from-indigo-500/10 to-transparent",
                ];

                return (
                  <motion.div variants={fadeUp} custom={idx + 1} key={m.id}>
                    <Link
                      href={`/products/mesh-attenuators/${m.id}`}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/60 bg-[#f7f7f5] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:bg-white hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)]"
                    >
                      <div
                        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${gradients[idx % gradients.length]}`}
                      />

                      <div className="relative z-10 mb-8">
                        <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#172556] shadow-sm ring-1 ring-zinc-200/80">
                          {m.model}
                        </span>
                      </div>

                      <div className="relative z-10">
                        <p className="font-heading text-3xl font-medium tracking-tight text-zinc-900 transition-colors group-hover:text-[#172556]">
                          {m.name}
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
                            {mPorts?.typ ?? "—"}
                          </p>
                        </div>
                        <div>
                          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                            Range
                          </p>
                          <p className="text-sm font-semibold text-zinc-700">
                            {mAtten?.typ ?? "—"} dB
                          </p>
                        </div>
                        <div>
                          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400 transition-colors group-hover:text-[#172556]/60">
                            Step
                          </p>
                          <p className="text-sm font-semibold text-zinc-700 transition-colors group-hover:text-[#172556]">
                            {mStep?.typ ?? "—"} dB
                          </p>
                        </div>
                      </div>

                      <div className="relative z-10 mt-6 flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-500">
                          USB / Ethernet
                        </span>
                        <span className="flex size-8 items-center justify-center rounded-xl bg-white text-[#172556] shadow-sm ring-1 ring-zinc-200/50 transition-colors duration-300 group-hover:bg-[#172556] group-hover:text-white group-hover:ring-[#172556]">
                          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ── Software Request Form (used inside Sheet) ─────────────────────── */

function SoftwareForm({ product }: { product: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/software-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          requestType: fd.get("requestType"),
          message: fd.get("message"),
          product,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center px-4">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-50">
          <ShieldCheck className="size-6 text-emerald-600" />
        </div>
        <h3 className="mt-5 font-heading text-xl font-medium text-zinc-900">Request Submitted</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">
          We&apos;ll send the {product} software and documentation to your email within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <>
      <SheetHeader>
        <div className="flex size-12 items-center justify-center rounded-2xl bg-[#172556]/5">
          <Download className="size-5 text-[#172556]" />
        </div>
        <SheetTitle className="mt-4 font-heading text-2xl font-medium tracking-tight">
          Request Software
        </SheetTitle>
        <p className="text-sm leading-relaxed text-zinc-500">
          Fill in your details and we&apos;ll send you the latest control
          software and API documentation for the {product}.
        </p>
      </SheetHeader>

      <form className="mt-6 flex flex-1 flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700">Full Name</label>
            <input name="name" type="text" required className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-[#172556]/40 focus:outline-none focus:ring-2 focus:ring-[#172556]/10" placeholder="John Doe" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700">Phone Number</label>
            <input name="phone" type="tel" className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-[#172556]/40 focus:outline-none focus:ring-2 focus:ring-[#172556]/10" placeholder="+1 (555) 000-0000" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-700">Work Email</label>
          <input name="email" type="email" required className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-[#172556]/40 focus:outline-none focus:ring-2 focus:ring-[#172556]/10" placeholder="john@company.com" />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-700">What do you need?</label>
          <select name="requestType" className="w-full appearance-none rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 transition-colors focus:border-[#172556]/40 focus:outline-none focus:ring-2 focus:ring-[#172556]/10">
            <option>Software GUI</option>
            <option>REST API Documentation</option>
            <option>Other Support</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-700">
            Message <span className="text-zinc-400">(optional)</span>
          </label>
          <textarea name="message" rows={3} className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-[#172556]/40 focus:outline-none focus:ring-2 focus:ring-[#172556]/10" placeholder="Anything specific about your setup or requirements..." />
        </div>

        <div className="mt-auto pt-4">
          <button type="submit" disabled={status === "loading"} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#172556] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#172556]/15 transition-colors hover:bg-[#1e3070] disabled:opacity-60">
            {status === "loading" ? "Sending..." : "Submit Request"}
            {status !== "loading" && <ArrowUpRight className="size-4" />}
          </button>
          {status === "error" && (
            <p className="mt-3 text-center text-sm text-red-500">Something went wrong. Please try again.</p>
          )}
          {status === "idle" && (
            <p className="mt-3 text-center text-[11px] text-zinc-400">We typically respond within 24 hours.</p>
          )}
        </div>
      </form>
    </>
  );
}
