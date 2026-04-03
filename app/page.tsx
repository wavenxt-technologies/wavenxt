"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Radio,
  Cpu,
  Network,
  Zap,
  Shield,
  Gauge,
  Headphones,
  Mail,
  Phone,
  MapPin,
  Satellite,
  Car,
  Smartphone,
  Building2,
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

/* ─────────────────────────────── data ─────────────────────────────── */

const allProducts = [
  {
    name: "Digital Attenuators",
    tag: "Core",
    href: "/products/digital-attenuators",
    image: "/group-atten.jpg",
    stat: "12",
    statLabel: "Models",
    freq: "200 – 8000 MHz",
    desc: "Precise RF signal control for Wi-Fi and cellular validation — 95 dB dynamic range with 0.25 dB resolution.",
  },
  {
    name: "Mesh Attenuators",
    tag: "RF Network",
    href: "/products/mesh-attenuators",
    image: "/mesh.jpg",
    stat: "36",
    statLabel: "Paths",
    freq: "Multi-port",
    desc: "High-density attenuation matrices for stable multi-node signal management across complex RF topologies.",
  },
  {
    name: "Matrix Systems",
    tag: "Routing",
    href: "/products/matrix-systems",
    image: "/matrix.jpg",
    stat: "16×8",
    statLabel: "Config",
    freq: "200 – 8000 MHz",
    desc: "Flexible solid-state RF path switching across multi-device, multi-band environments with programmable routing.",
  },
  {
    name: "Butler Matrix",
    tag: "Advanced",
    href: "/products/butler-matrix",
    image: "/group-atten1.jpg",
    stat: "8×8",
    statLabel: "Beams",
    freq: "0.6 – 7.125 GHz",
    desc: "Passive beamforming networks for advanced antenna characterization and MIMO validation workflows.",
  },
  {
    name: "Handover Test Systems",
    tag: "System",
    href: "/products/handover-test-systems",
    image: "/handover.png",
    stat: "512",
    statLabel: "Paths",
    freq: "200 – 8000 MHz",
    desc: "End-to-end integrated systems for mobility, roaming, and handover validation at production scale.",
  },
  {
    name: "Splitters",
    tag: "Signal Chain",
    href: "/products/splitters",
    image: "/atten8.jpg",
    stat: "18",
    statLabel: "GHz",
    freq: "Wideband",
    desc: "Low-loss Wilkinson splitter/combiners engineered for balanced, repeatable signal distribution in test setups.",
  },
];

const milestones = [
  {
    year: "2014",
    title: "Founded",
    detail:
      "Started building compact, high-precision RF test systems for modern wireless labs.",
  },
  {
    year: "2018",
    title: "Expansion",
    detail:
      "Expanded into custom matrix and handover test architectures for multi-band validation.",
  },
  {
    year: "2022",
    title: "Global Scale",
    detail:
      "Scaled engineering support and deployment across global telecom and manufacturing partners.",
  },
  {
    year: "Now",
    title: "Next-Gen",
    detail:
      "Building future-ready measurement platforms for 5G, private networks, and next-gen mobility.",
  },
];

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] text-zinc-900">
      <Hero />
      <WhoWeAre />
      <OurServices />
      <IndustriesWeServe />
      <NumbersAndCapabilities />
      <JourneyTimeline />
      <ValuesManifesto />
      <TechnologiesSection />
      <GlobalPresence />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   1 · HERO — full-screen video, left-aligned content
   ═══════════════════════════════════════════════════ */

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
      className="relative flex min-h-screen items-end overflow-hidden bg-zinc-900"
    >
      {/* Video background */}
      <motion.div style={{ scale: videoScale }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(to top, #f7f7f5 0%, rgba(247,247,245,0.6) 40%, rgba(247,247,245,0) 100%)",
        }}
      />

      {/* Content — left aligned */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-36 pt-48 md:px-10 md:pb-44">
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            {/* Badge */}
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
                Trusted by RF labs in 18 countries
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-8 max-w-3xl font-heading text-[clamp(2.5rem,5.8vw,5rem)] font-medium leading-[1.05] tracking-tight text-white"
            >
              Precision RF test
              <br />
              solutions, built
              <br />
              <span className="text-white/40">to measure.</span>
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
              <Link href="/support">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.06] px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
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
              className="mt-14 flex flex-wrap items-center gap-8"
            >
              {[
                { icon: Radio, value: "200 – 8000 MHz" },
                { icon: Cpu, value: "Solid-State" },
                { icon: Network, value: "API Controlled" },
              ].map((item) => (
                <div
                  key={item.value}
                  className="flex items-center gap-2.5 text-sm text-white/50"
                >
                  <item.icon className="size-4 text-white/30" />
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
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-zinc-200">
                <Image
                  src="/atten2.jpg"
                  alt="Wavenxt engineering lab"
                  fill
                  sizes="(max-width:768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              {/* Overlapping accent card */}
              <div className="absolute -bottom-6 -right-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-lg md:-right-8">
                <p className="font-heading text-3xl font-medium tabular-nums text-[#172556]">
                  2014
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-500">
                  Founded
                </p>
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
              We design dependable wireless test systems for teams that cannot
              afford uncertainty.
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

            {/* Inline stats row */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-10 grid grid-cols-3 gap-6 border-t border-zinc-200/80 pt-8"
            >
              {[
                { v: "12+", l: "Years" },
                { v: "300+", l: "Projects" },
                { v: "18", l: "Countries" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-heading text-3xl font-medium tabular-nums text-zinc-900 md:text-4xl">
                    {s.v}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">{s.l}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} custom={5} className="mt-8">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#172556] transition-colors hover:text-[#1e3070]"
              >
                Read our full story
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
   4 · OUR SERVICES
   ═══════════════════════════════════════════════════ */

function OurServices() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const services = [
    {
      title: "Custom RF Engineering",
      desc: "From schematic capture to full-scale fabrication, our RF engineering team designs custom high-frequency pathways and solid-state switching matrices. We tailor every architecture to minimize insertion loss, maximize isolation, and precisely fit your unique lab environment setup.",
      icon: Cpu,
    },
    {
      title: "System Integration",
      desc: "We seamlessly combine disparate hardware modules into unified, cohesive testing platforms. Our automated integration sequences are backed by full REST API support, ensuring your new equipment drops into existing automated testing pipelines instantly.",
      icon: Network,
    },
    {
      title: "Calibration & Certification",
      desc: "Accuracy is non-negotiable. Every unit undergoes rigorous factory calibration using NIST-traceable equipment. We provide detailed performance characterization, ensuring absolute measurement precision and verifiable compliance with global telecom standards.",
      icon: Shield,
    },
    {
      title: "Consulting & Support",
      desc: "Our commitment extends beyond delivery. You receive dedicated engineering assistance directly from the teams who built your equipment. Whether debugging complex measurement setups or scaling lab infrastructure, we are your long-term partners.",
      icon: Headphones,
    },
  ];

  return (
    <section className="overflow-hidden border-t border-zinc-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500"
            >
              Our Services
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-4 max-w-xl font-heading text-3xl font-medium tracking-tight md:text-4xl text-zinc-900"
            >
              Comprehensive solutions from concept to lab deployment
            </motion.h2>
          </div>
          <motion.div
            variants={fadeUp}
            custom={2}
            className="hidden items-center gap-2 text-sm font-medium text-zinc-400 md:flex"
          >
            Drag to explore <ArrowRight className="size-4" />
          </motion.div>
        </motion.div>

        <div className="relative -mx-6 px-6 md:-mx-10 md:px-10">
          <div className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-12 pt-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1, ease }}
                className="group relative flex w-[85vw] shrink-0 snap-center flex-col overflow-hidden rounded-[2.5rem] border border-zinc-200/60 bg-[#f7f7f5] p-10 transition-all hover:-translate-y-2 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50 sm:w-[50vw] md:w-[450px]"
              >
                <div className="mb-10 flex items-center justify-between">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-white text-[#172556] shadow-sm transition-colors group-hover:bg-[#172556] group-hover:text-white">
                    <service.icon className="size-6" />
                  </div>
                  <span className="font-heading text-4xl font-light text-zinc-200 transition-colors group-hover:text-zinc-300">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="mb-4 font-heading text-2xl font-medium text-zinc-900">
                  {service.title}
                </h3>
                <p className="flex-1 leading-relaxed text-zinc-500">
                  {service.desc}
                </p>
                <div className="mt-8 flex items-center gap-2 text-sm font-medium text-[#172556] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Explore Service <ArrowRight className="size-4" />
                </div>
              </motion.div>
            ))}
            <div className="w-1 shrink-0 snap-center md:w-4" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   4.1 · INDUSTRIES WE SERVE
   ═══════════════════════════════════════════════════ */

function IndustriesWeServe() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const industries = [
    {
      name: "Telecommunications",
      icon: Smartphone,
      image:
        "https://images.unsplash.com/photo-1591808216268-ce0b82787efe?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "5G & 6G network validations and base station functional testing.",
    },
    {
      name: "Aerospace & Defense",
      icon: Satellite,
      image: "/handover.png",
      desc: "High-reliability precision matrices for radar and telemetry.",
    },
    {
      name: "Automotive IoT",
      icon: Car,
      image: "/group-atten.jpg",
      desc: "V2X communication testing and connected vehicle systems.",
    },
    {
      name: "Enterprise Networking",
      icon: Building2,
      image: "/matrix.jpg",
      desc: "Wi-Fi 7 access point compliance and heavily dense scale evaluations.",
    },
  ];

  return (
    <section className="border-t border-zinc-200/80 bg-[#f7f7f5] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10 text-center">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="mx-auto mb-16 max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500"
          >
            Industries We Serve
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-4 font-heading text-3xl font-medium tracking-tight md:text-4xl text-zinc-900"
          >
            Empowering next-generation connectivity across sectors
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left">
          {industries.map((ind, idx) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1, ease }}
              className="group flex flex-col overflow-hidden rounded-[2rem] border border-zinc-200/60 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/50"
            >
              <div className="p-2">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-zinc-100">
                  <Image
                    src={ind.image}
                    alt={ind.name}
                    fill
                    sizes="(max-width:768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col px-6 pb-8 pt-6">
                <span className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-[#f7f7f5] text-[#172556] ring-1 ring-zinc-100 transition-colors group-hover:bg-[#172556] group-hover:text-white">
                  <ind.icon className="size-5" />
                </span>
                <h3 className="font-heading text-xl font-medium text-zinc-900">
                  {ind.name}
                </h3>
                <p className="mt-3 leading-relaxed text-zinc-500 text-sm">
                  {ind.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
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

  const techList = [
    {
      title: "Wireless Tech",
      tag: "Connectivity",
      image:
        "https://images.unsplash.com/photo-1683322499436-f4383dd59f5a?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "Accelerating deployment of private networks and complex multi-antenna arrays addressing real-world challenges.",
      icon: Radio,
    },
    {
      title: "Silicon Design",
      tag: "Architecture",
      image:
        "https://images.unsplash.com/photo-1760842543713-108c3cadbba1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "Custom silicon architectures pushing the boundary of performance.",
      icon: Cpu,
    },
    {
      title: "Networking",
      tag: "Infrastructure",
      image:
        "https://images.unsplash.com/photo-1691435828932-911a7801adfb?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "Robust communication layers ensuring seamless resilient routing protocols.",
      icon: Network,
    },
    {
      title: "Hardware Design",
      tag: "Engineering",
      image: "/group-atten.jpg",
      desc: "High-frequency PCB and module engineering tailored for extreme RF environments.",
      icon: Zap,
    },
    {
      title: "Testing",
      tag: "Validation",
      image:
        "https://images.unsplash.com/photo-1618389041494-8fab89c3f22b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "Advanced QA sequences and rigorous validation ensuring flawless production runs.",
      icon: Gauge,
    },
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
          <motion.div
            variants={fadeUp}
            custom={0}
            className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Technologies that power us
              </p>
              <h2 className="mt-4 max-w-2xl font-heading text-3xl font-medium tracking-tight md:text-4xl text-zinc-900">
                We leverage state-of-the-art wireless, networking, and testing
                technologies
              </h2>
            </div>
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#172556] transition-colors hover:text-[#1e3070]"
            >
              Learn more about us
              <ArrowUpRight className="size-3.5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Ultra-Clean Light Premium Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:auto-rows-[420px]">
          {techList.map((tech, idx) => {
            const layoutClass = idx === 0 ? "md:col-span-2" : "md:col-span-1";

            return (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * idx, ease }}
                className={`group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-zinc-200/80 bg-[#f8f8f8] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-2xl hover:shadow-zinc-200/50 ${layoutClass} h-[450px] md:h-auto`}
              >
                {idx === 0 ? (
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="z-10 flex w-full flex-col justify-center p-8 md:w-[50%] md:p-12">
                      <div className="mb-6 flex items-center gap-3">
                        <span className="flex size-14 items-center justify-center rounded-2xl bg-white text-[#172556] shadow-sm ring-1 ring-zinc-200/50 transition-colors group-hover:bg-[#172556] group-hover:text-white">
                          <tech.icon className="size-6" />
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                          {tech.tag}
                        </span>
                      </div>
                      <h3 className="mb-4 font-heading text-3xl font-medium text-zinc-900 md:text-4xl">
                        {tech.title}
                      </h3>
                      <p className="leading-relaxed text-zinc-500 text-[15px]">
                        {tech.desc}
                      </p>
                    </div>
                    <div className="relative h-64 w-full overflow-hidden md:h-full md:w-[50%] border-t md:border-t-0 md:border-l border-zinc-200/80 bg-zinc-100">
                      <Image
                        src={tech.image}
                        alt={tech.title}
                        fill
                        sizes="(max-width:768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col">
                    {idx % 2 !== 0 ? (
                      <>
                        <div className="relative h-[45%] w-full overflow-hidden border-b border-zinc-200/80 bg-zinc-100">
                          <Image
                            src={tech.image}
                            alt={tech.title}
                            fill
                            sizes="(max-width:768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        </div>
                        <div className="z-10 flex flex-1 flex-col justify-end p-8 pb-10">
                          <div className="mb-5 flex items-center gap-3">
                            <span className="flex size-12 items-center justify-center rounded-xl bg-white text-[#172556] shadow-sm ring-1 ring-zinc-200/50 transition-colors group-hover:bg-[#172556] group-hover:text-white">
                              <tech.icon className="size-5" />
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                              {tech.tag}
                            </span>
                          </div>
                          <h3 className="mb-3 font-heading text-2xl font-medium text-zinc-900">
                            {tech.title}
                          </h3>
                          <p className="line-clamp-3 text-sm leading-relaxed text-zinc-500">
                            {tech.desc}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="z-10 flex flex-1 flex-col justify-start p-8 pt-10">
                          <div className="mb-5 flex items-center gap-3">
                            <span className="flex size-12 items-center justify-center rounded-xl bg-white text-[#172556] shadow-sm ring-1 ring-zinc-200/50 transition-colors group-hover:bg-[#172556] group-hover:text-white">
                              <tech.icon className="size-5" />
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                              {tech.tag}
                            </span>
                          </div>
                          <h3 className="mb-3 font-heading text-2xl font-medium text-zinc-900">
                            {tech.title}
                          </h3>
                          <p className="line-clamp-3 text-sm leading-relaxed text-zinc-500">
                            {tech.desc}
                          </p>
                        </div>
                        <div className="relative h-[45%] w-full overflow-hidden border-t border-zinc-200/80 bg-zinc-100">
                          <Image
                            src={tech.image}
                            alt={tech.title}
                            fill
                            sizes="(max-width:768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   5 · NUMBERS + CAPABILITIES — large number grid
       with animated count + inline capabilities
   ═══════════════════════════════════════════════════ */

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 50, damping: 20 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      setDisplay(Math.round(v).toString());
    });
    return unsub;
  }, [spring]);

  return <span ref={ref}>{display}</span>;
}

function NumbersAndCapabilities() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const capabilities = [
    {
      icon: Zap,
      title: "Reliable Repeatability",
      body: "Stable RF behavior across repeated lab and validation cycles, eliminating measurement drift and ensuring confidence in every test run.",
    },
    {
      icon: Shield,
      title: "Deployment-Ready Systems",
      body: "Practical interfaces and maintainable architecture designed for real lab environments from day one. PoE-powered for clean bench integration.",
    },
    {
      icon: Gauge,
      title: "Precision by Default",
      body: "Factory-calibrated attenuation accuracy across the full operating frequency range. Every unit ships with measured performance data.",
    },
    {
      icon: Headphones,
      title: "End-to-End Support",
      body: "Dedicated engineering assistance from initial integration through production rollout, with troubleshooting for deployed test setups.",
    },
  ];

  return (
    <section className="bg-[#f7f7f5]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        {/* Big numbers row */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500"
          >
            The numbers
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-4 font-heading text-3xl font-medium tracking-tight md:text-4xl"
          >
            Built on a decade of engineering focus
          </motion.h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            {
              num: 12,
              suffix: "+",
              label: "Years of RF\nEngineering",
              color: "bg-[#172556]",
              text: "text-white",
            },
            {
              num: 300,
              suffix: "+",
              label: "Wireless Projects\nDelivered",
              color: "bg-white",
              text: "text-zinc-900",
            },
            {
              num: 18,
              suffix: "",
              label: "Countries\nServed",
              color: "bg-white",
              text: "text-zinc-900",
            },
            {
              num: 94,
              suffix: "%",
              label: "Average Client\nRetention",
              color: "bg-[#172556]",
              text: "text-white",
            },
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.1, ease }}
              className={`relative overflow-hidden rounded-3xl ${item.color} ${
                item.color === "bg-white"
                  ? "border border-zinc-200/80 shadow-[0_1px_0_0_rgba(0,0,0,0.03)]"
                  : "shadow-lg shadow-[#172556]/20"
              } p-6 md:p-8`}
            >
              {item.color === "bg-[#172556]" && (
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-400/10 blur-2xl" />
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                </div>
              )}
              <div className="relative">
                <p
                  className={`font-heading text-4xl font-medium tabular-nums tracking-tight md:text-5xl lg:text-6xl ${item.text}`}
                >
                  <AnimatedNumber value={item.num} />
                  {item.suffix}
                </p>
                <p
                  className={`mt-3 whitespace-pre-line text-sm leading-snug ${
                    item.color === "bg-[#172556]"
                      ? "text-blue-100/60"
                      : "text-zinc-500"
                  }`}
                >
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Capabilities — horizontal flowing cards */}
        <div className="mt-20">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500"
            >
              Why Wavenxt
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-4 max-w-2xl font-heading text-3xl font-medium tracking-tight md:text-4xl"
            >
              Engineered for teams that measure what matters
            </motion.h2>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {capabilities.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.1, ease }}
                className="group relative rounded-2xl border border-zinc-200/80 bg-white p-7 transition-all duration-300 hover:border-zinc-300 hover:shadow-md md:p-8"
              >
                <div className="flex items-start gap-5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#172556]/[0.06] text-[#172556] transition-colors group-hover:bg-[#172556] group-hover:text-white">
                    <item.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-medium tracking-tight text-zinc-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                      {item.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   6 · JOURNEY TIMELINE — horizontal scrolling
   ═══════════════════════════════════════════════════ */

function JourneyTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative overflow-hidden bg-[#172556] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-indigo-400/10 blur-3xl" />
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
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-xs uppercase tracking-[0.2em] text-blue-200/70"
          >
            Our Journey
          </motion.p>
          <motion.div
            variants={fadeUp}
            custom={1}
            className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <h2 className="max-w-lg font-heading text-3xl font-medium tracking-tight md:text-4xl">
              A decade of building precision
            </h2>
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-200/70 transition-colors hover:text-white"
            >
              Full story <ArrowUpRight className="size-3.5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Horizontal timeline */}
        <div className="mt-14">
          {/* Timeline line */}
          <div className="relative">
            <div className="absolute left-0 right-0 top-5 h-px bg-white/10" />
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {milestones.map((m, idx) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.12, ease }}
                  className="relative pt-12"
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-0 top-0">
                    <div className="relative flex size-10 items-center justify-center">
                      <span className="absolute size-10 rounded-full border border-white/10 bg-white/[0.04]" />
                      <span className="relative size-3 rounded-full bg-blue-400" />
                    </div>
                  </div>

                  <p className="font-heading text-2xl font-medium tabular-nums text-white md:text-3xl">
                    {m.year}
                  </p>
                  <p className="mt-2 text-sm font-medium text-blue-100/80">
                    {m.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-blue-100/40">
                    {m.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
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
      detail:
        "We hold ourselves to the highest ethical standards, ensuring transparency and honesty in all our dealings.",
    },
    {
      word: "Innovation",
      detail:
        "We embrace change and constantly seek to push the boundaries of what's possible in wireless measurement.",
    },
    {
      word: "Excellence",
      detail:
        "We strive for excellence in every aspect — from product development to customer service.",
    },
    {
      word: "Sustainability",
      detail:
        "We are committed to building responsibly, making decisions that are good for the planet and the future.",
    },
  ];

  return (
    <section className="bg-[#f7f7f5]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500"
          >
            Our Values
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-4 max-w-lg font-heading text-3xl font-medium tracking-tight md:text-4xl"
          >
            Principles that shape every decision
          </motion.h2>
        </motion.div>

        <div className="mt-14 space-y-0 border-t border-zinc-200/80">
          {values.map((v, idx) => (
            <motion.div
              key={v.word}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.1, ease }}
              className="group grid items-baseline gap-4 border-b border-zinc-200/80 py-8 md:grid-cols-12 md:gap-8 md:py-10"
            >
              <div className="md:col-span-1">
                <span className="text-xs font-bold tabular-nums text-zinc-300">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-heading text-2xl font-medium tracking-tight text-zinc-900 transition-colors group-hover:text-[#172556] md:text-3xl">
                  {v.word}
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className="max-w-lg leading-relaxed text-zinc-600">
                  {v.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
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
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
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
                precision RF test systems across 18 countries — helping teams
                validate faster with better repeatability.
              </p>
              <div className="mt-8">
                <Link
                  href="/support"
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
                  icon: Phone,
                  label: "Phone",
                  value: "080-4164 3659",
                  href: "tel:08041643659",
                  sub: "Monday – Friday",
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
                  <Link href="/support">
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
