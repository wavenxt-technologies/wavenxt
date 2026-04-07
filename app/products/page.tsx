"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Repeat,
  Server,
  Target,
  LifeBuoy,
} from "lucide-react";

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

const products = [
  {
    num: "01",
    name: "Digital Attenuators",
    category: "Core",
    href: "/products/digital-attenuators",
    summary:
      "Precise RF signal control for Wi-Fi and cellular validation — 95 dB dynamic range with 0.25 dB resolution, PoE-powered for clean bench integration.",
    stat: "12",
    statLabel: "Variants",
    specs: ["200 – 8000 MHz", "95 dB range", "0.25 dB step"],
    image: "/images/group-atten.webp",
  },
  {
    num: "02",
    name: "Mesh Attenuators",
    category: "RF Network",
    href: "/products/mesh-attenuators",
    summary:
      "Enable precise signal control across multi-port RF networks, ensuring flexible routing, low loss, and reliable performance.",
    stat: "N×N",
    statLabel: "Config",
    specs: ["Multi-port", "High Isolation", "API Control"],
    image: "/images/mesh4.webp",
  },
  {
    num: "03",
    name: "Matrix Systems",
    category: "Routing",
    href: "/products/matrix-systems",
    summary:
      "Structured signal switching and path selection across multiple ports, ensuring controlled distribution, high isolation, and efficient RF network management.",
    stat: "M×N",
    statLabel: "Config",
    specs: ["Path Selection", "Scalable I/O", "Low Crosstalk"],
    image: "/images/matrix.webp",
  },

  {
    num: "04",
    name: "Butler Matrix",
    category: "Advanced",
    href: "/products/butler-matrix",
    summary:
      "Precise beamforming and phase control across multiple ports, ensuring efficient directional signal control and high-performance RF operation.",
    stat: "𝑛 X 𝑛",
    statLabel: "Beams",
    specs: ["Up to 8 GHz", "4×4 – 8×8", "Phase Mapping"],
    image: "/images/butler4.webp",
  },
  {
    num: "05",
    name: "Handover Test Systems",
    category: "System",
    href: "/products/handover-test-systems",
    summary:
      "Enable seamless mobility validation by simulating network transitions, ensuring reliable performance and uninterrupted connectivity across RF environments.",
    stat: "",
    statLabel: "Custom Systems",
    specs: ["Seamless Roaming", "Mobility Testing", "Latency Optimization"],
    image: "/images/handover.webp",
  },
  {
    num: "06",
    name: "Splitters",
    category: "Signal Chain",
    href: "/products/splitters",
    summary:
      "Enable precise signal division across multiple paths, ensuring balanced output, low loss, and reliable RF performance.",
    stat: "up to 18",
    statLabel: "GHz",
    specs: ["Wideband", "High Isolation", "Low Insertion Loss"],
    image: "/images/splitter.webp",
  },
];

const capabilities = [
  {
    title: "Reliable Repeatability",
    body: "Stable RF behavior across repeated lab and validation cycles, eliminating measurement drift.",
  },
  {
    title: "Deployment-Ready",
    body: "Practical interfaces and maintainable architecture designed for real lab environments from day one.",
  },
  {
    title: "Precision by Default",
    body: "Consistent and accurate signal control across the full frequency range, ensuring reliable and repeatable performance.",
  },
  {
    title: "Long-Term Support",
    body: "Dedicated engineering assistance from initial integration through production rollout.",
  },
];

const process = [
  {
    n: "Driven by precise RF system requirements",
    text: "Every solution is defined by key RF parameters to ensure accurate performance, consistency, and seamless integration.",
  },
  {
    n: "Design for performance, not assumptions",
    text: "Every system is engineered for low loss, high isolation, phase integrity, and predictable behavior under real test and deployment conditions.",
  },
  {
    n: "Deliver production-grade reliability",
    text: "From integration to final validation, we ensure each system operates with consistency, stability, and readiness for continuous use.",
  },
];

const productFaqs = [
  {
    question:
      "How do I choose between a digital attenuator and a mesh attenuator?",
    answer:
      "Digital attenuators are ideal when you need independent channel control with 1–8 channels. Mesh attenuators are designed for multi-port topologies where every port needs to communicate with every other port — like MIMO or mesh network testing. If you're unsure, our team can recommend the right fit based on your test setup.",
  },
  {
    question: "Can I order a custom matrix size or frequency configuration?",
    answer:
      "Yes. We design custom matrix sizes, topologies, frequency bands, and control interfaces to fit your specific lab requirements. Contact our engineering team with your specifications and we'll provide a feasibility assessment.",
  },
  {
    question: "What control interfaces do your products support?",
    answer:
      "Most products support USB and Ethernet control out of the box, with a browser-based GUI and programmable APIs. We also offer custom software interfaces tailored to your automation workflow. All systems are compatible with Windows, Linux, and Mac OS.",
  },
  {
    question: "Do your products support 24/7 automated testing?",
    answer:
      "Absolutely. All our attenuators and test systems are engineered for continuous, unattended operation. They feature robust thermal design, PoE power options, and reliable solid-state switching with no mechanical wear.",
  },
  {
    question: "What is the typical lead time for standard products?",
    answer:
      "Standard configurations typically ship within 2–4 weeks. Custom configurations may take 4–8 weeks depending on complexity. Contact sales@wavenxt.com for current availability and expedited options.",
  },
  {
    question: "Do you provide calibration data and certificates?",
    answer:
      "Yes. Every unit ships factory-calibrated with measured performance data. We can also provide traceable calibration certificates upon request for compliance-critical environments.",
  },
];

export default function Products() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] text-zinc-900">
      {/* ── Hero ── */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-36 md:px-10 md:pb-24 md:pt-40">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500"
          >
            Product Catalog
          </motion.p>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mt-6 max-w-5xl font-heading text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl"
          >
            High-Performance RF Solutions for Signal Control, Routing, and
            Distribution
          </motion.h1>

          <motion.div
            variants={fadeUp}
            custom={2}
            className="mt-8 grid gap-8 md:grid-cols-1"
          >
            <p className="max-w-3xl leading-relaxed text-zinc-600">
              Delivering a comprehensive range of RF components including
              attenuators, mesh and matrix systems and Butler matrix, engineered
              for precise signal control, efficient routing, and reliable
              distribution across modern communication and testing environments.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Product Index ── */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10 md:pb-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="mb-10 flex items-end justify-between"
          >
            <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
              Product Portfolio
            </h2>
          </motion.div>
        </motion.div>

        {/* Product grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((item, idx) => (
            <ProductCard key={item.num} item={item} index={idx} />
          ))}
        </div>
        <Link
          href="/contact"
          className="hidden items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-900 md:inline-flex mt-6 justify-end w-full"
        >
          Need guidance? <ArrowUpRight className="size-3.5" />
        </Link>
      </section>

      {/* ── Capabilities ── */}
      <section className="border-y border-zinc-200/80">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} custom={0} className="mb-12 max-w-xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Why Wavenxt
              </p>
              <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
                Why Our Solutions Stand Out?
              </h2>
            </motion.div>

            <div className="grid gap-px overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-200/80 sm:grid-cols-2">
              {capabilities.map((item, idx) => {
                const Icon = [Repeat, Server, Target, LifeBuoy][idx];
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    custom={idx + 1}
                    className="group relative overflow-hidden bg-[#f7f7f5] p-8 md:p-12"
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-[#172556]/3 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative z-10">
                      <div className="mb-6 inline-flex size-12 items-center justify-center rounded-xl bg-white text-[#172556] shadow-sm ring-1 ring-zinc-200/50">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="font-heading text-xl font-medium tracking-tight text-zinc-900">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base">
                        {item.body}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Engineering Process — Navy ── */}
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mb-14 max-w-2xl"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-xs uppercase tracking-[0.2em] text-blue-200/70"
            >
              Our Approach
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-4 font-heading text-3xl font-medium tracking-tight md:text-4xl"
            >
              Engineering RF systems that perform with certainty.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-5 leading-relaxed text-blue-100/60"
            >
              From attenuation and signal routing to beamforming and mobility
              validation, every solution is built to deliver precision,
              repeatability, and uncompromised performance in real-world
              environments.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-3"
          >
            {process.map((step, i) => (
              <motion.div
                key={step.n}
                variants={fadeUp}
                custom={i}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-8 transition-colors hover:bg-white/6 backdrop-blur-sm"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-400/10 blur-2xl transition-opacity group-hover:bg-blue-300/20" />

                <span className="mb-8 block font-heading text-2xl tracking-tighter font-medium tabular-nums text-white/40 transition-colors group-hover:text-blue-200/40">
                  {step.n}
                </span>

                <p className="text-lg leading-relaxed text-blue-50/90">
                  {step.text}
                </p>

                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                  <div className="h-1 w-12 rounded-full bg-white/10 transition-all duration-300 group-hover:w-24 group-hover:bg-blue-400/50" />
                  <ArrowRight className="size-4 text-white/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-300/70" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mt-14 flex flex-wrap items-center gap-6"
          >
            <motion.div variants={fadeUp} custom={0}>
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-blue-200"
              >
                Read about us <ArrowUpRight className="size-4" />
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} custom={1}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
              >
                Talk to our team <ArrowUpRight className="size-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#f7f7f5]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} custom={0} className="max-w-xl">
              <h2 className="font-heading text-3xl font-medium leading-tight tracking-tight md:text-4xl">
                Still unsure about something?
              </h2>
              <p className="mt-6 leading-relaxed text-zinc-600">
                Common questions about our products, ordering, and custom
                configurations.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={1}
              className="mt-16 md:ml-auto md:mt-20 md:w-8/12"
            >
              <ProductFAQ />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ── Product FAQ ── */

function ProductFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="border-y border-zinc-300/70">
      {productFaqs.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="border-b border-zinc-300/70 last:border-0"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full cursor-pointer items-start justify-between gap-4 py-7 text-left transition-colors md:py-8"
            >
              <h3 className="max-w-4xl font-medium text-zinc-900 md:text-xl">
                {item.question}
              </h3>
              <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-400/50 transition-colors">
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <ChevronDown className="size-4 text-zinc-600" />
                </motion.span>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="overflow-hidden"
                >
                  <p className="max-w-4xl pb-8 leading-relaxed text-zinc-600">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ── Product Card ── */

function ProductCard({
  item,
  index,
}: {
  item: (typeof products)[number];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      className="h-full"
    >
      <Link
        href={item.href}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/80 shadow-[0_1px_0_0_rgba(0,0,0,0.03)] transition-all hover:shadow-md hover:border-zinc-300/80"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-zinc-100">
          <Image
            src={item.image}
            alt={item.name}
            fill
            quality={100}
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-difference invert"
            unoptimized={item.image.startsWith("/")}
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-medium tabular-nums text-zinc-400 transition-colors group-hover:text-zinc-500">
              {item.num}
            </span>
            <span className="flex size-8 items-center justify-center rounded-full border border-zinc-200/80 text-zinc-400 transition-all duration-300 group-hover:border-[#172556] group-hover:bg-[#172556] group-hover:text-white">
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>

          <h3 className="mt-4 font-heading text-xl font-medium tracking-tight text-zinc-900 transition-colors group-hover:text-[#172556]">
            {item.name}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">
            {item.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {item.specs.map((s) => (
              <span
                key={s}
                className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-medium text-zinc-600 transition-colors group-hover:bg-zinc-200"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-8 border-t border-zinc-200/70 pt-6">
            <div className="flex items-baseline gap-2">
              <p className="font-heading text-4xl font-medium tabular-nums leading-none text-zinc-900 transition-colors group-hover:text-[#172556]">
                {item.stat}
              </p>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                {item.statLabel}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
