"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, FileDown } from "lucide-react";
import { motion } from "framer-motion";
import { meshModels } from "./data";

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

function getSpec(
  specs: {
    parameter: string;
    min: string;
    typ: string;
    max: string;
    unit: string;
  }[],
  keyword: string,
) {
  return specs.find((s) =>
    s.parameter.toLowerCase().includes(keyword.toLowerCase()),
  );
}

export default function MeshAttenuators() {
  const [m1, m2] = meshModels;

  const m1Specs = [
    { label: "Frequency", value: m1.frequencyText },
    {
      label: "Ports/Channels",
      value:
        getSpec(m1.specifications, "Inputs/Outputs")?.typ +
        " ports / 6 Channels ",
    },
    {
      label: "Attenuation",
      value: getSpec(m1.specifications, "Attenuation Range")?.typ + " dB",
    },
    {
      label: "Step Size",
      value: getSpec(m1.specifications, "Step Size")?.typ + " dB",
    },
    {
      label: "Isolation",
      value: getSpec(m1.specifications, "Isolation")?.typ + " dB",
    },
    {
      label: "Connector",
      value: getSpec(m1.specifications, "connectors")?.typ,
    },
  ];

  const m2Specs = [
    { label: "Frequency", value: m2.frequencyText },
    {
      label: "Ports/Channels",
      value:
        getSpec(m2.specifications, "Number of RF Ports")?.typ +
        " ports / 36 Channels",
    },
    {
      label: "Attenuation",
      value: getSpec(m2.specifications, "Attenuation Range")?.typ + " dB",
    },
    {
      label: "Step Size",
      value: getSpec(m2.specifications, "Step Size")?.typ + " dB",
    },
    {
      label: "Isolation",
      value: getSpec(m2.specifications, "Isolation")?.typ + " dB",
    },
    {
      label: "Connector",
      value: getSpec(m2.specifications, "connectors")?.typ,
    },
  ];

  const compareRows = [
    { label: "Frequency Range", v1: "200 – 8000 MHz", v2: "200 – 8000 MHz" },
    {
      label: "Ports / Channels",
      v1: "4 ports / 6 channels",
      v2: "9 ports / 36 channels",
    },
    { label: "Attenuation Range", v1: "95 dB", v2: "95 dB" },
    { label: "Step Size", v1: "0.25 dB", v2: "0.25 dB" },
    { label: "Isolation", v1: "90 dB", v2: "90 dB" },
    { label: "Shielding", v1: "90 dB", v2: "90 dB" },
    { label: "Switching Speed", v1: "2 µs", v2: "2 µs" },
    { label: "Form Factor", v1: "1RU", v2: "3RU" },
    { label: "Power", v1: "Power Over Ethernet", v2: "100-240V AC, 50/60 Hz" },
    { label: "Control", v1: "USB / Ethernet", v2: "USB / Ethernet" },
    { label: "OS Support", v1: "Win / Linux / Mac", v2: "Win / Linux / Mac" },
  ];

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
              <span className="text-zinc-900">Mesh Attenuators</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-6 font-heading text-5xl font-medium leading-[1.1] tracking-tight md:text-7xl lg:text-8xl"
            >
              Mesh
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
              <h2 className="font-heading text-2xl font-medium leading-[1.4] tracking-tight text-zinc-900 md:text-3xl lg:text-4xl">
                <span className="text-zinc-400">
                  Programmable mesh attenuators designed for fully automated RF
                  testing,
                </span>{" "}
                precise signal power control, wide dynamic range, and fast
                response speeds.
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
                  Both models share the same 200 MHz – 8 GHz range
                </strong>
                , 95 dB dynamic range, and 0.25 dB resolution — fully shielded,
                PoE-powered, and programmable via browser or API. Compatible
                with Windows, Linux, and Mac OS.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-16 grid grid-cols-2 gap-8 md:mt-24 md:gap-12 lg:grid-cols-4"
            >
              {[
                { label: "Frequency", value: "200 – 8000", unit: "MHz" },
                { label: "Dynamic Range", value: "95", unit: "dB" },
                { label: "Step Size", value: "0.25", unit: "dB" },
                { label: "Models", value: "2", unit: "configs" },
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
                    <span className="font-sans text-sm font-semibold uppercase tracking-normal text-zinc-400">
                      {s.unit}
                    </span>
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Model 1: NXA-B4P — light ── */}
      <section className="border-t border-zinc-200/80">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid items-center gap-10 md:grid-cols-12 md:gap-16"
          >
            {/* content */}
            <div className="order-2 md:order-1 md:col-span-5">
              <motion.div
                variants={fadeUp}
                custom={0}
                className="mb-6 flex items-center gap-3"
              >
                <span className="inline-flex items-center rounded-full bg-[#172556] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
                  {m1.model}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                  1RU · 4 ch
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                custom={1}
                className="font-heading text-3xl font-medium tracking-tight md:text-4xl"
              >
                4 Port Mesh Attenuator
              </motion.h2>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="mt-4 text-sm leading-relaxed text-zinc-600"
              >
                {m1.overview}
              </motion.p>

              <motion.div
                variants={fadeUp}
                custom={3}
                className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-200/80"
              >
                {m1Specs.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white px-4 py-4 transition-colors hover:bg-[#f7f7f5]"
                  >
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                      {s.label}
                    </p>
                    <p className="text-sm font-medium text-zinc-900">
                      {s.value}
                    </p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={4}
                className="mt-8 flex items-center gap-4"
              >
                <Link href={`/products/mesh-attenuators/${m1.id}`}>
                  <motion.span
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#172556] px-6 py-3 text-sm font-medium text-white shadow-[0_10px_24px_-10px_rgba(23,37,86,0.5)] transition-colors hover:bg-[#1e3070]"
                  >
                    Full Specifications <ArrowUpRight className="size-4" />
                  </motion.span>
                </Link>
                <a
                  href={`/datasheet/mesh-attenuators/4/NXA-B4P.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
                >
                  <FileDown className="size-4" /> Datasheet
                </a>
              </motion.div>
            </div>

            {/* image */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="order-1 md:order-2 md:col-span-7"
            >
              <div className="overflow-hidden">
                <div className="overflow-hidden rounded-xl border border-zinc-100">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="/images/mesh4.webp"
                      alt={m1.model}
                      fill
                      sizes="(max-width:768px) 100vw, 700px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Model 2: NXA-B9P ── */}
      <section className="border-b border-zinc-200/80">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid items-center gap-10 md:grid-cols-12 md:gap-16"
          >
            {/* image */}
            <motion.div variants={fadeUp} custom={0} className="md:col-span-7">
              <div className="overflow-hidden">
                <div className="overflow-hidden rounded-xl border border-zinc-100">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="/images/mesh9.webp"
                      alt={m2.model}
                      fill
                      sizes="(max-width:768px) 100vw, 700px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* content */}
            <div className="md:col-span-5">
              <motion.div
                variants={fadeUp}
                custom={1}
                className="mb-6 flex items-center gap-3"
              >
                <span className="inline-flex items-center rounded-full bg-[#172556] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
                  {m2.model}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                  3RU · 9 ports
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                custom={2}
                className="font-heading text-3xl font-medium tracking-tight md:text-4xl"
              >
                {m2.name}
              </motion.h2>

              <motion.p
                variants={fadeUp}
                custom={3}
                className="mt-4 text-sm leading-relaxed text-zinc-600"
              >
                {m2.overview}
              </motion.p>

              <motion.div
                variants={fadeUp}
                custom={4}
                className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-200/80"
              >
                {m2Specs.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white px-4 py-4 transition-colors hover:bg-[#f7f7f5]"
                  >
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                      {s.label}
                    </p>
                    <p className="text-sm font-medium text-zinc-900">
                      {s.value}
                    </p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={5}
                className="mt-8 flex items-center gap-4"
              >
                <Link href={`/products/mesh-attenuators/${m2.id}`}>
                  <motion.span
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#172556] px-6 py-3 text-sm font-medium text-white shadow-[0_10px_24px_-10px_rgba(23,37,86,0.5)] transition-colors hover:bg-[#1e3070]"
                  >
                    Full Specifications <ArrowUpRight className="size-4" />
                  </motion.span>
                </Link>
                <a
                  href={`/datasheet/mesh-attenuators/9/NXA-B9P.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
                >
                  <FileDown className="size-4" /> Datasheet
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Side-by-side comparison ── */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Model Comparison
            </p>
            <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
              Side by Side
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            className="overflow-x-auto rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.03)]"
          >
            <div className="w-full overflow-x-auto px-1 py-1">
              <table className="w-full text-sm min-w-150">
                <thead className="border-b border-zinc-100 bg-zinc-50/80">
                  <tr>
                    <th className="w-[35%] px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                      Parameter
                    </th>
                    <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                      NXA-B4P
                      <span className="ml-2 font-normal normal-case text-zinc-300">
                        1RU · 4 ports
                      </span>
                    </th>
                    <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                      NXA-B9P
                      <span className="ml-2 font-normal normal-case text-zinc-300">
                        3RU · 9 ports
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100/80">
                  {compareRows.map((row, i) => (
                    <tr
                      key={i}
                      className="transition-colors hover:bg-zinc-50/50"
                    >
                      <td className="px-6 py-3.5 font-medium text-zinc-900">
                        {row.label}
                      </td>
                      <td className="px-6 py-3.5 text-zinc-500">{row.v1}</td>
                      <td className="px-6 py-3.5 text-zinc-500">{row.v2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* CTA below table */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link href="/contact">
              <motion.span
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#172556] px-6 py-3 text-sm font-medium text-white shadow-[0_10px_24px_-10px_rgba(23,37,86,0.5)] transition-colors hover:bg-[#1e3070]"
              >
                Talk to an engineer <ArrowUpRight className="size-4" />
              </motion.span>
            </Link>
            <a
              href="mailto:sales@wavenxt.com"
              className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
            >
              sales@wavenxt.com
            </a>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
