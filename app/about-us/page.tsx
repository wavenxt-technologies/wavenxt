"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

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

// const stats = [
//   { label: "Years in RF Engineering", value: "12+" },
//   { label: "Wireless Projects Delivered", value: "300+" },
//   { label: "Countries Served", value: "18" },
//   { label: "Average Client Retention", value: "94%" },
// ];

const visionValues = [
  {
    title: "Integrity",
    description:
      "We hold ourselves to the highest ethical standards, ensuring transparency and honesty in all our dealings.",
  },
  {
    title: "Innovation",
    description:
      "We embrace change and constantly seek to push the boundaries of what's possible. Innovation drives everything we do.",
  },
  {
    title: "Excellence",
    description:
      "We strive for excellence in every aspect of our business, from product development to customer service.",
  },
  {
    title: "Sustainability",
    description:
      "We are committed to making decisions that are good for the planet and the future, working towards a sustainable and responsible business model.",
  },
];

// const milestones = [
//   {
//     step: "01",
//     year: "2014",
//     title: "Company Foundation",
//     detail:
//       "Wavenxt was founded to build compact, high-precision RF test systems tailored for modern wireless labs.",
//   },
//   {
//     step: "02",
//     year: "2018",
//     title: "System Architecture Expansion",
//     detail:
//       "Expanded into custom matrix and handover test architectures for multi-band and multi-device validation.",
//   },
//   {
//     step: "03",
//     year: "2022",
//     title: "Global Delivery Growth",
//     detail:
//       "Scaled engineering support and deployment capabilities across global partners in telecom and manufacturing.",
//   },
//   {
//     step: "04",
//     year: "Today",
//     title: "Future-Ready Platform Development",
//     detail:
//       "Building future-ready wireless measurement platforms for 5G, private networks, and next-gen mobility.",
//   },
// ];

export default function AboutUs() {
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
            About Wavenxt
          </motion.p>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mt-6 max-w-4xl font-heading text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl"
          >
            We build reliable wireless test systems where performance cannot be
            left to chance.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-8 max-w-3xl leading-relaxed text-zinc-600"
          >
            Wavenxt Technologies designs high-performance RF test systems that
            enable accurate, repeatable wireless validation with reduced
            complexity. Our solutions integrate seamlessly into lab
            environments, supporting everything from precise signal control to
            advanced RF testing
          </motion.p>
        </motion.div>
      </section>

      {/* ── Who / What ── */}
      <section className="border-y border-zinc-200/80">
        <div className="mx-auto grid max-w-7xl gap-px bg-zinc-200/80 md:grid-cols-2">
          <WhoWhatCard
            index={0}
            title="Who we are"
            text="We are a focused engineering company working at the intersection of wireless measurement, system integration, and reliability. Our team combines RF expertise with product thinking, so customers get solutions that are both technically precise and operationally easy."
          />
          <WhoWhatCard
            index={1}
            title="What we do"
            text="We build and deliver Digital Attenuators, Matrix Systems, Butler Matrix and Custom Handover Test Systems. We also support planning, integration, and optimization to ensure smooth deployment in production and validation workflows."
          />
        </div>
      </section>

      {/* ── Stats ── */}
      {/* <section className="">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((item, idx) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                custom={idx}
                className="group relative py-14 md:py-20"
              >
                {idx > 0 && (
                  <span className="absolute left-0 top-6 bottom-6 hidden w-px bg-zinc-200/80 lg:block" />
                )}
                {idx === 2 && (
                  <span className="absolute left-0 top-6 bottom-6 block w-px bg-zinc-200/80 lg:hidden" />
                )}

                <div className="px-2 md:px-6">
                  <p className="font-heading text-5xl font-medium tracking-tight text-[#172556] md:text-6xl">
                    {item.value}
                  </p>
                  <p className="mt-3 text-sm text-zinc-500">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* ── Vision & Values ── */}
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

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-12 md:px-10 md:py-28">
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
              Our Vision
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-4 font-heading text-3xl font-medium tracking-tight md:text-4xl"
            >
              Built on values that shape every decision.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-5 leading-relaxed text-blue-100/60"
            >
              These principles guide how we design products, support clients,
              and grow as a company.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="md:col-span-7"
          >
            <div className="divide-y divide-white/10 border-y border-white/10">
              {visionValues.map((item, idx) => (
                <motion.article
                  key={item.title}
                  variants={fadeUp}
                  custom={idx}
                  className="group grid gap-4 py-8 md:grid-cols-2 md:gap-8 md:py-10"
                >
                  <h3 className="font-heading text-2xl font-medium tracking-tight transition-colors md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-blue-100/70">
                    {item.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* <section className="bg-gradient-to-b from-[#f7f7f5] to-zinc-100/80">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} custom={0} className="max-w-2xl">
              <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
                Milestones
              </h2>
              <p className="mt-4 leading-relaxed text-zinc-600">
                A clear timeline of how we evolved from focused RF specialists
                to a trusted engineering partner for advanced wireless
                validation.
              </p>
            </motion.div>
          </motion.div>

          <div className="relative mt-14 md:mt-16">
            <div className="absolute bottom-0 left-5 top-0 w-px bg-zinc-300/80 md:left-5" />

            <div className="space-y-6 md:space-y-8">
              {milestones.map((item, idx) => (
                <MilestoneCard key={item.step} item={item} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* ── CTA ── */}
      {/* <section className="bg-zinc-200/80">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#172556] p-8 md:p-14"
            >
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

              <div className="relative">
                <p className="text-xs uppercase tracking-[0.2em] text-blue-200/70">
                  Let&apos;s build together
                </p>
                <h2 className="mt-4 max-w-2xl font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
                  Planning a wireless test setup or upgrading an existing one?
                </h2>
                <p className="mt-5 max-w-2xl leading-relaxed text-blue-100/60">
                  We can help you choose the right architecture and deliver a
                  system that performs consistently from day one.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <motion.a
                    href="/products"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
                  >
                    View Products
                  </motion.a>
                  <Link href="/support">
                    <motion.span
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                    >
                      Get in Touch
                      <ArrowRight className="size-4" />
                    </motion.span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section> */}

      {/* ── Looking to the Future ── */}
      <section className="bg-[#f7f7f5]">
        <div className="mx-auto max-w-7xl px-6 pt-20 md:px-10 md:pt-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid gap-y-8 md:grid-cols-12 md:gap-14"
          >
            <motion.div variants={fadeUp} custom={0} className="md:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-zinc-500">
                Next Chapter
              </p>
              <h2 className="mt-6 font-heading text-3xl font-medium tracking-tight md:text-5xl">
                Looking to the
                <br />
                Future
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} className="md:col-span-7">
              <div className="space-y-6 text-base leading-relaxed text-zinc-600">
                <p className="">
                  As we continue to grow and evolve, our focus remains on
                  innovation, customer satisfaction, and making a positive
                  impact. We believe the future holds endless possibilities, and
                  we&apos;re excited to take this journey with you. Together,
                  we&apos;ll create a better tomorrow.
                </p>
                <p>
                  Thank you for being a part of our story. Whether you&apos;re a
                  customer, partner, or just stopping by, we appreciate your
                  support and interest in what we do.
                </p>
                <p>
                  Let&apos;s build the future together. Feel free to explore our
                  blogs or contact us to learn more about how we can work
                  together.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <motion.span
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                >
                  <Link
                    href="/support"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#172556] px-6 py-3 text-sm font-medium text-white shadow-[0_10px_24px_-10px_rgba(23,37,86,0.5)] transition-colors hover:bg-[#1e3070]"
                  >
                    Our Blogs
                    <ArrowRight className="size-4" />
                  </Link>
                </motion.span>
                <motion.a
                  href="/support"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="inline-flex items-center rounded-xl border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-500 hover:text-zinc-900"
                >
                  Contact Us
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function WhoWhatCard({
  title,
  text,
  index,
}: {
  title: string;
  text: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease }}
      className="bg-[#f7f7f5] p-8 md:p-12"
    >
      <h2 className="font-heading text-3xl font-medium tracking-tight">
        {title}
      </h2>
      <p className="mt-5 leading-relaxed text-zinc-600">{text}</p>
    </motion.div>
  );
}

// function MilestoneCard({
//   item,
//   index,
// }: {
//   item: (typeof milestones)[number];
//   index: number;
// }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-40px" });

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, x: -20 }}
//       animate={inView ? { opacity: 1, x: 0 } : {}}
//       transition={{ duration: 0.6, delay: index * 0.12, ease }}
//       className="relative"
//     >
//       {/* Step circle */}
//       <span className="absolute left-0 top-7 z-10 grid h-10 w-10 place-items-center rounded-full border border-zinc-300/80 bg-white text-xs font-semibold tracking-[0.12em] text-zinc-500">
//         {item.step}
//       </span>

//       {/* Card */}
//       <motion.article
//         whileHover={{ y: -3 }}
//         transition={{ duration: 0.25, ease }}
//         className="ml-16 rounded-2xl border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/80 p-6 shadow-[0_1px_0_0_rgba(0,0,0,0.03)] transition-shadow hover:shadow-md md:p-7"
//       >
//         <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
//           {item.year}
//         </p>
//         <h3 className="mt-2 font-heading text-xl font-medium tracking-tight md:text-2xl">
//           {item.title}
//         </h3>
//         <p className="mt-3 max-w-3xl leading-relaxed text-zinc-600">
//           {item.detail}
//         </p>
//       </motion.article>
//     </motion.div>
//   );
// }
