"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import {
  ArrowUpRight,
  FileDown,
  Radio,
  Gauge,
  Zap,
  Globe,
  Shield,
  GitBranch,
  Clock,
  Monitor,
  Download,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/* ── Animation helpers ──────────────────────────────────────────────── */

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

/* ── Model data derived from URL id ──────────────────────────────────── */

const FREQ_MAP: Record<string, { band: string; max: string; tag: string }> = {
  8: { band: "200 – 8000 MHz", max: "8 GHz", tag: "8 GHz" },
  6: { band: "200 – 6000 MHz", max: "6 GHz", tag: "6 GHz" },
  3: { band: "200 – 3000 MHz", max: "3 GHz", tag: "3 GHz" },
};

const MODEL_IMAGES: Record<string, string> = {
  8: "/images/atten8.webp",
  4: "/images/atten4.webp",
  2: "/images/atten2.webp",
  1: "/images/atten1.webp",
};

function parseModel(id: string) {
  const upper = (id || "").toUpperCase();
  const match = upper.match(/MT(\d)(\d)A/);
  if (!match) return null;
  const [, freqTag, ch] = match;
  const freq = FREQ_MAP[freqTag];
  if (!freq) return null;
  return {
    raw: upper,
    model: `MT-${freqTag}${ch}A`,
    freqTag,
    ch,
    chNum: parseInt(ch),
    freq,
    sizeLabel: `${ch} Channel`,
    image: MODEL_IMAGES[ch] ?? MODEL_IMAGES["8"],
  };
}

/* ── Static spec table ───────────────────────────────────────────────── */

const getDatasheetRows = (freqTag: string, ch: string) => {
  const is8GHz = freqTag === "8";
  const is6GHz = freqTag === "6";
  const is3GHz = freqTag === "3";

  return [
    {
      parameter: "Impedance",
      condition: "",
      min: "",
      typ: "50",
      max: "",
      unit: "Ω",
    },
    {
      parameter: "Channels",
      condition: "",
      min: "",
      typ: ch,
      max: "",
      unit: "",
    },
    {
      parameter: "Attenuation Range",
      condition: "",
      min: "0",
      typ: "",
      max: "95",
      unit: "dB",
    },
    {
      parameter: "Shielding",
      condition: "",
      min: "",
      typ: "110",
      max: "",
      unit: "dB",
    },
    {
      parameter: "Isolation between Channels",
      condition: "",
      min: "",
      typ: "90",
      max: "",
      unit: "dB",
    },
    {
      parameter: "Step Size",
      condition: "",
      min: "",
      typ: "0.25",
      max: "",
      unit: "dB",
    },
    ...(is3GHz
      ? [
          {
            parameter: "Insertion Loss",
            condition: "< 3 GHz",
            min: "",
            typ: "4.5",
            max: "6.5",
            unit: "dB",
          },
        ]
      : [
          {
            parameter: "Insertion Loss",
            condition: "< 2.5 GHz",
            min: "",
            typ: "4.5",
            max: "6",
            unit: "dB",
          },
          {
            parameter: "Insertion Loss",
            condition: "< 6 GHz",
            min: "",
            typ: "6",
            max: "7",
            unit: "dB",
          },
          ...(is8GHz
            ? [
                {
                  parameter: "Insertion Loss",
                  condition: "< 8 GHz",
                  min: "",
                  typ: "8",
                  max: "10",
                  unit: "dB",
                },
              ]
            : []),
        ]),
    {
      parameter: "Attenuation Accuracy",
      condition: "",
      min: "",
      typ: "±0.25",
      max: "±1.5",
      unit: "dB",
    },
    {
      parameter: "Switching Speed",
      condition: "",
      min: "",
      typ: "2",
      max: "",
      unit: "µs",
    },
    {
      parameter: "Maximum Input Level",
      condition: "Operating",
      min: "",
      typ: "+28",
      max: "",
      unit: "dBm",
    },
    {
      parameter: "Maximum Input Level",
      condition: "Absolute",
      min: "",
      typ: "+33",
      max: "",
      unit: "dBm",
    },
    {
      parameter: "Input IP3",
      condition: "",
      min: "",
      typ: "58",
      max: "",
      unit: "dBm",
    },
    {
      parameter: "Operating Modes",
      condition: "",
      min: "",
      typ: "Uni / Bi-Directional",
      max: "",
      unit: "",
    },
    {
      parameter: "Control",
      condition: "",
      min: "",
      typ: "Application / REST APIs",
      max: "",
      unit: "",
    },
    {
      parameter: "Power",
      condition: "",
      min: "",
      typ: "PoE/USB",
      max: "",
      unit: "",
    },
    {
      parameter: "Operating Temperature",
      condition: "",
      min: "−30",
      typ: "",
      max: "+70",
      unit: "°C",
    },
  ];
};

/* ── Applications ────────────────────────────────────────────────────── */

const applications = [
  "Wi-Fi & 5G Device Characterisation",
  "Throughput vs. Range Mapping",
  "Roaming & Handover Validation",
  "Mesh & Band-Steering Tests",
  "Receiver Sensitivity Testing",
  "Device Verification Testbeds",
  "Automated Manufacturing Test",
  "MIMO & Multi-Antenna Testing",
];

/* ── Feature icons ───────────────────────────────────────────────────── */

const featureIcons = [
  Radio,
  Gauge,
  Zap,
  Globe,
  Shield,
  GitBranch,
  Clock,
  Monitor,
];

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function DigitalAttenuatorProduct() {
  const params = useParams();
  const id = params.id as string;
  const m = parseModel(id);
  if (!m) notFound();

  const heroSpecs = [
    { label: "Frequency Range", value: m.freq.band },
    { label: "Channels", value: `${m.ch} ch` },
    { label: "Dynamic Range", value: "95 dB" },
    { label: "Step Size", value: "0.25 dB" },
    { label: "Connector", value: "SMA Female" },
    { label: "Power", value: "PoE/USB" },
  ];

  const featuresData = [
    {
      title: "Broad Frequency Coverage",
      desc: `Precision attenuation from 200 MHz to ${m.freq.max} — covering 5G FR1, Wi-Fi 6/6E/7, LTE, and all major cellular bands.`,
    },
    {
      title: "95 dB Dynamic Range",
      desc: "Wide 0–95 dB attenuation range with 0.25 dB resolution for accurate, repeatable signal power control in every scenario.",
    },
    {
      title: "PoE/USB Powered",
      desc: "Power and control over a single Ethernet cable or USB — no external PSU, minimal cabling, plug-and-play in any lab rack.",
    },
    {
      title: "Browser & API Control",
      desc: "Built-in web GUI plus REST and USB APIs allow manual control or seamless integration with any automation framework.",
    },
    {
      title: "Complete RF Shielding",
      desc: "110 dB enclosure shielding and 90 dB channel isolation ensure interference-free measurements on all active paths.",
    },
    {
      title: `${m.chNum}-Channel Architecture`,
      desc: `${m.chNum} fully independent RF paths with 2 µs switching for concurrent multi-device or multi-band test setups.`,
    },
    {
      title: "24/7 Automated Operation",
      desc: "Designed for continuous unattended use in engineering characterisation and high-volume production test lines.",
    },
    {
      title: "Cross-Platform Software",
      desc: "Control GUI and APIs run natively on Windows, Linux, and Mac OS — no proprietary drivers or licence fees.",
    },
  ];

  const siblings = ["8", "4", "2", "1"]
    .filter((c) => c !== m.ch)
    .map((c) => ({
      id: `mt${m.freqTag}${c}a`,
      model: `MT-${m.freqTag}${c}A`,
      ch: parseInt(c),
      band: m.freq.band,
      image: MODEL_IMAGES[c] ?? MODEL_IMAGES["8"],
    }))
    .slice(0, 3);

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
              href="/products/digital-attenuators"
              className="transition-colors hover:text-[#172556]"
            >
              Digital Attenuators
            </Link>
            <span className="h-px w-5 bg-zinc-300" />
            <span className="text-zinc-900">{m.model}</span>
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
                  {m.model}
                </span>
                <span className="text-xs text-zinc-400">·</span>
                <span className="text-xs text-zinc-500">
                  {m.sizeLabel} · {m.freq.tag}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={2}
                className="font-heading text-4xl font-medium leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
              >
                {m.sizeLabel}
                <br />
                Digital Attenuator
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={3}
                className="mt-5 max-w-lg leading-relaxed text-zinc-600"
              >
                The {m.model} is a fully shielded, digitally controlled{" "}
                {m.chNum}-channel RF attenuator covering {m.freq.band}.
                PoE/USB-powered with browser and API control — built for
                high-accuracy automated test environments.
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
                    <Image
                      src={m.image}
                      alt={m.model}
                      fill
                      sizes="(max-width:768px) 100vw, 500px"
                      className="object-cover scale-125 transition-transform duration-700"
                      priority
                    />
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
                  Built for precision
                  <br />
                  and automation
                </h2>
                <p className="mt-6 leading-relaxed text-zinc-600">
                  Every specification is engineered for repeatable, accurate RF
                  control in demanding test environments — {m.chNum} channels,
                  95 dB range, 0.25 dB steps.
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
                  {featuresData.map((item, idx) => {
                    const Icon =
                      featureIcons[idx % featureIcons.length] || Radio;
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
                          {item.desc}
                        </p>
                      </motion.div>
                    );
                  })}
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
                From R&D characterisation to high-volume production testing —
                wherever programmable, accurate RF attenuation is needed.
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
                href={`/datasheet/digital-attenuators/${m.ch}/${m.raw}.pdf`}
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
            {applications.map((app, i) => (
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
                Complete performance data for the {m.model}.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Table */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="space-y-8 lg:col-span-8 min-w-0"
            >
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
                          {[
                            "Parameter",
                            "Condition",
                            "Min",
                            "Typ",
                            "Max",
                            "Unit",
                          ].map((h) => (
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
                        {getDatasheetRows(m.freqTag, m.ch).map((row, i) => (
                          <tr
                            key={i}
                            className="transition-colors hover:bg-zinc-50/50"
                          >
                            <td className="px-5 py-3.5 font-medium text-zinc-900">
                              {row.parameter}
                            </td>
                            <td className="px-5 py-3.5 text-xs text-zinc-500">
                              {row.condition || "—"}
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
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
                    Resources for {m.model}
                  </h3>

                  <div className="mt-5 flex flex-col gap-2.5">
                    <a
                      href={`/datasheet/digital-attenuators/${m.ch}/${m.raw}.pdf`}
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
                        <SoftwareForm product={m.model} />
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#172556]/10 bg-[#172556]/4 p-7">
                  <h3 className="font-heading text-lg font-medium text-[#172556]">
                    Need a different channel count?
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    Available in 1, 2, 4, and 8-channel configurations across
                    three frequency bands.
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

      {/* ── Other Models ── */}
      <section className="bg-[#f7f7f5]">
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
                  Same Band · Different Channel Count
                </p>
                <h3 className="font-heading text-2xl font-medium text-zinc-900">
                  Other Models
                </h3>
              </motion.div>
              <Link
                href="/products/digital-attenuators"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
              >
                View all <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((sib, idx) => {
                const chGradients: Record<string, string> = {
                  8: "bg-gradient-to-br from-indigo-500/10 to-transparent",
                  4: "bg-gradient-to-br from-blue-500/10 to-transparent",
                  2: "bg-gradient-to-br from-cyan-500/10 to-transparent",
                  1: "bg-gradient-to-br from-violet-500/10 to-transparent",
                };

                return (
                  <motion.div variants={fadeUp} custom={idx + 1} key={sib.id}>
                    <Link
                      href={`/products/digital-attenuators/${sib.id}`}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/60 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)]"
                    >
                      <div
                        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${chGradients[String(sib.ch)] || ""}`}
                      />

                      <div className="relative z-10 mb-8">
                        <span className="inline-flex items-center rounded-full bg-[#f7f7f5] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#172556] shadow-sm ring-1 ring-zinc-200/80">
                          {sib.model}
                        </span>
                      </div>

                      <div className="relative z-10">
                        <p className="font-heading text-4xl font-medium tracking-tight text-zinc-900 transition-colors group-hover:text-[#172556]">
                          {sib.ch} Ch
                        </p>
                        <p className="mt-2 text-sm text-zinc-500">{sib.band}</p>
                      </div>

                      <div className="relative z-10 mt-8 grid grid-cols-3 gap-2 border-t border-zinc-200/80 pt-6 transition-colors group-hover:border-zinc-300">
                        <div>
                          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                            Range
                          </p>
                          <p className="text-sm font-semibold text-zinc-700">
                            95 dB
                          </p>
                        </div>
                        <div>
                          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                            Step
                          </p>
                          <p className="text-sm font-semibold text-zinc-700">
                            0.25 dB
                          </p>
                        </div>
                        <div>
                          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400 transition-colors group-hover:text-[#172556]/60">
                            Power
                          </p>
                          <p className="text-sm font-semibold text-zinc-700 transition-colors group-hover:text-[#172556]">
                            PoE/USB
                          </p>
                        </div>
                      </div>

                      <div className="relative z-10 mt-6 flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-500">
                          SMA · PoE/USB · REST API
                        </span>
                        <span className="flex size-8 items-center justify-center rounded-xl bg-[#f7f7f5] text-[#172556] shadow-sm ring-1 ring-zinc-200/50 transition-colors duration-300 group-hover:bg-[#172556] group-hover:text-white group-hover:ring-[#172556]">
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
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

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
          <Shield className="size-6 text-emerald-600" />
        </div>
        <h3 className="mt-5 font-heading text-xl font-medium text-zinc-900">
          Request Submitted
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">
          We&apos;ll send the {product} software and documentation to your email
          within 24 hours.
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
            <label className="text-xs font-medium text-zinc-700">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-[#172556]/40 focus:outline-none focus:ring-2 focus:ring-[#172556]/10"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-[#172556]/40 focus:outline-none focus:ring-2 focus:ring-[#172556]/10"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-700">
            Work Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-[#172556]/40 focus:outline-none focus:ring-2 focus:ring-[#172556]/10"
            placeholder="john@company.com"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-700">
            What do you need?
          </label>
          <select
            name="requestType"
            className="w-full appearance-none rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 transition-colors focus:border-[#172556]/40 focus:outline-none focus:ring-2 focus:ring-[#172556]/10"
          >
            <option>Software GUI</option>
            <option>REST API Documentation</option>
            <option>Other Support</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-700">
            Message <span className="text-zinc-400">(optional)</span>
          </label>
          <textarea
            name="message"
            rows={3}
            className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-[#172556]/40 focus:outline-none focus:ring-2 focus:ring-[#172556]/10"
            placeholder="Anything specific about your setup or requirements..."
          />
        </div>

        <div className="mt-auto pt-4">
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#172556] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#172556]/15 transition-colors hover:bg-[#1e3070] disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Submit Request"}
            {status !== "loading" && <ArrowUpRight className="size-4" />}
          </button>
          {status === "error" && (
            <p className="mt-3 text-center text-sm text-red-500">
              Something went wrong. Please try again.
            </p>
          )}
          {status === "idle" && (
            <p className="mt-3 text-center text-[11px] text-zinc-400">
              We typically respond within 24 hours.
            </p>
          )}
        </div>
      </form>
    </>
  );
}
