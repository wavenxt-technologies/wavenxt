"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, Phone, MapPin, HeadsetIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const products = [
  { name: "Butler Matrix", href: "/products/butler-matrix" },
  { name: "Mesh Attenuators", href: "/products/mesh-attenuators" },
  { name: "Matrix Systems", href: "/products/matrix-systems" },
  { name: "Digital Attenuators", href: "/products/digital-attenuators" },
  { name: "Handover Test Systems", href: "/products/handover-test-systems" },
];

const company = [
  { name: "About Us", href: "/about-us" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
];

const resources = [
  { name: "Blogs", href: "/resources/blogs" },
  { name: "Webinars", href: "/resources/webinars" },
];

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.85, 1]);

  return (
    <footer ref={containerRef} className="relative bg-[#f7f7f5] overflow-hidden">
      {/* Faint grid — same pattern as hero dissolve */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_110%)]"
      />

      <motion.div style={{ y, scale, opacity }} className="relative">
        {/* ── CTA CARD ─────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-6 pb-0 pt-16 md:px-10 md:pt-20">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]">

            {/* RF radiation rings — top-right */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -top-4 h-[110%] w-auto opacity-[0.18]"
              viewBox="0 0 520 520"
              fill="none"
              preserveAspectRatio="xMaxYMin meet"
            >
              {[70, 140, 210, 280, 350, 420, 490].map((r) => (
                <circle
                  key={r}
                  cx="520"
                  cy="0"
                  r={r}
                  stroke="#172556"
                  strokeWidth="1"
                />
              ))}
              {/* Centre dot — signal source */}
              <circle cx="520" cy="0" r="5" fill="#172556" />
            </svg>

            {/* Measurement grid dots — bottom-left */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 opacity-[0.15]"
              viewBox="0 0 120 120"
              fill="none"
            >
              {[0, 1, 2, 3, 4].flatMap((row) =>
                [0, 1, 2, 3, 4].map((col) => (
                  <circle
                    key={`${row}-${col}`}
                    cx={12 + col * 24}
                    cy={12 + row * 24}
                    r="1.5"
                    fill="#172556"
                  />
                ))
              )}
            </svg>

            <div>
              {/* Heading + CTAs */}
              <div className="px-8 py-10 md:px-12 md:py-14">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease }}
                  className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500"
                >
                  Ready to get started?
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: 0.05, ease }}
                  className="mt-5 font-heading text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.07] tracking-tight text-zinc-900"
                >
                  Let&apos;s build something
                  <br />
                  <span className="text-zinc-400">together.</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.12, ease }}
                  className="mt-5 max-w-[48ch] text-[15px] leading-relaxed text-zinc-500"
                >
                  Whether you need a custom RF solution, technical consultation,
                  or want to discuss your test requirements — our engineering
                  team is ready to help.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.18, ease }}
                  className="mt-8 flex flex-wrap items-center gap-3"
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2.5 rounded-xl bg-[#172556] px-7 py-3.5 text-sm font-medium text-white shadow-[0_10px_24px_-10px_rgba(23,37,86,0.4)] transition-all duration-200 hover:bg-[#1e3070] hover:shadow-[0_14px_32px_-10px_rgba(23,37,86,0.5)] active:scale-[0.98]"
                  >
                    Start a conversation
                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <a
                    href="mailto:sales@wavenxt.com"
                    className="inline-flex items-center gap-2.5 rounded-xl border border-zinc-200 px-7 py-3.5 text-sm font-medium text-zinc-600 transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
                  >
                    Email us directly
                  </a>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25, ease }}
                  className="mt-6 text-xs text-zinc-400"
                >
                  Trusted by RF test labs and production facilities worldwide
                </motion.p>
              </div>

            </div>
          </div>
        </div>

        {/* ── LINKS + BOTTOM BAR ───────────────────────── */}
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-12 md:px-10 md:pb-10 md:pt-14">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">

            {/* Brand */}
            <div className="md:col-span-4">
              <Link href="/" className="inline-flex items-center transition-opacity hover:opacity-75">
                <Image
                  src="/logo.png"
                  alt="Wavenxt"
                  width={160}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-zinc-500">
                Precision RF test solutions for demanding validation
                environments. Engineered for repeatability.
              </p>
              <div className="mt-5 flex gap-2">
                <a
                  href="mailto:sales@wavenxt.com"
                  aria-label="Email us"
                  className="flex size-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-400 shadow-sm transition-all duration-150 hover:border-[#172556] hover:bg-[#172556] hover:text-white"
                >
                  <Mail className="size-3.5" aria-hidden="true" />
                </a>
                <a
                  href="tel:+918041643659"
                  aria-label="Call us"
                  className="flex size-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-400 shadow-sm transition-all duration-150 hover:border-[#172556] hover:bg-[#172556] hover:text-white"
                >
                  <Phone className="size-3.5" aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/company/wavenxttechnologies/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on LinkedIn"
                  className="flex size-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-400 shadow-sm transition-all duration-150 hover:border-[#172556] hover:bg-[#172556] hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-3.5"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Nav columns */}
            <div className="grid gap-8 sm:grid-cols-4 md:col-span-8">
              <div>
                <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Products
                </h3>
                <ul className="space-y-2.5">
                  {products.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-zinc-500 transition-colors duration-150 hover:text-zinc-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Company
                </h3>
                <ul className="space-y-2.5">
                  {company.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-zinc-500 transition-colors duration-150 hover:text-zinc-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Resources
                </h3>
                <ul className="space-y-2.5">
                  {resources.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-zinc-500 transition-colors duration-150 hover:text-zinc-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Reach us
                </h3>
                <ul className="space-y-2.5">
                  <li>
                    <a
                      href="mailto:sales@wavenxt.com"
                      className="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-[#172556]"
                    >
                      <Mail className="size-3.5 shrink-0 text-zinc-400" />
                      sales@wavenxt.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+918041643659"
                      className="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-[#172556]"
                    >
                      <HeadsetIcon className="size-3.5 shrink-0 text-zinc-400" />
                      080-4164 3659
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+917483759420"
                      className="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-[#172556]"
                    >
                      <Phone className="size-3.5 shrink-0 text-zinc-400" />
                      +91 74837 59420
                    </a>
                  </li>
                  <li>
                    <div className="flex items-start gap-2 text-sm text-zinc-500">
                      <MapPin className="mt-0.5 size-3.5 shrink-0 text-zinc-400" />
                      <address className="not-italic leading-relaxed">
                        Sahakaranagar
                        <br />
                        Bangalore 560092
                      </address>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-10 flex flex-col-reverse gap-4 border-t border-zinc-200/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-zinc-400">
              &copy; {new Date().getFullYear()} Wavenxt Technologies &middot; All rights reserved
            </p>
            <div className="flex gap-5">
              <a href="#" className="text-xs text-zinc-400 transition-colors hover:text-zinc-700">
                Privacy
              </a>
              <a href="#" className="text-xs text-zinc-400 transition-colors hover:text-zinc-700">
                Terms
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
