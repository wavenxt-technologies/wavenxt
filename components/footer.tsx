"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, Phone, MapPin, HeadsetIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

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
];

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.7, 1]);

  return (
    <footer
      ref={containerRef}
      className="relative overflow-hidden bg-[#f7f7f5]"
    >
      {/* Animated grid background */}
      <motion.div
        style={{ y: y1, opacity }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </motion.div>

      {/* Floating orbs */}
      <motion.div
        style={{ y: y2 }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-zinc-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-zinc-300/30 blur-3xl" />
      </motion.div>

      {/* Main content */}
      <motion.div style={{ y: y3, scale, opacity }} className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-12 pt-24 md:px-10 md:pb-16 md:pt-32">
          {/* Hero CTA section */}
          <div className="mb-20 md:mb-32">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Ready to get started?
                </p>
                <h2 className="mt-6 font-heading text-5xl font-medium tracking-tight text-zinc-900 md:text-7xl lg:text-8xl">
                  Let&apos;s build something together
                </h2>
                <p className="mt-8 text-lg leading-relaxed text-zinc-600 md:text-xl">
                  Whether you need a custom RF solution, technical consultation,
                  or want to discuss your test requirements — our engineering
                  team is ready to help.
                </p>
                <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 rounded-full bg-[#172556] px-10 py-5 text-base font-medium text-white shadow-[0_20px_60px_-15px_rgba(23,37,86,0.4)] transition-all hover:scale-105 hover:bg-[#1e3070] hover:shadow-[0_20px_60px_-10px_rgba(23,37,86,0.5)]"
                  >
                    Start a conversation <ArrowUpRight className="size-5" />
                  </Link>
                  <a
                    href="mailto:sales@wavenxt.com"
                    className="inline-flex items-center gap-3 rounded-full border-2 border-zinc-300 px-10 py-5 text-base font-medium text-zinc-700 transition-all hover:border-[#172556] hover:bg-[#172556] hover:text-white"
                  >
                    Email us directly
                  </a>
                </div>
                <p className="mt-8 text-sm text-zinc-500">
                  Trusted by RF test labs and production facilities worldwide
                </p>
              </motion.div>
            </div>
          </div>

          {/* Links grid */}
          <div className="grid gap-16 border-t border-zinc-200/80 pt-16 md:grid-cols-12 md:gap-8 lg:gap-16 md:pt-20">
            {/* Brand column */}
            <div className="md:col-span-4 lg:col-span-4">
              <Link href="/" className="group inline-flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Wavenxt"
                  width={180}
                  height={48}
                  className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </Link>
              <p className="mt-5 max-w-65 text-sm leading-relaxed text-zinc-500">
                Precision RF test solutions for demanding validation
                environments. Engineered for repeatability.
              </p>
              <div className="mt-8 flex gap-3">
                <Link
                  href="mailto:sales@wavenxt.com"
                  aria-label="Email us at sales@wavenxt.com"
                  className="group flex size-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-[0_1px_0_0_rgba(0,0,0,0.03)] transition-all hover:border-[#172556] hover:bg-[#172556] hover:text-white hover:shadow-md"
                >
                  <Mail className="size-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                </Link>
                <Link
                  href="tel:08041643659"
                  aria-label="Call us at 080 4164 3659"
                  className="group flex size-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-[0_1px_0_0_rgba(0,0,0,0.03)] transition-all hover:border-[#172556] hover:bg-[#172556] hover:text-white hover:shadow-md"
                >
                  <Phone className="size-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Links columns */}
            <div className="grid gap-12 sm:grid-cols-3 md:col-span-8 lg:col-span-8 lg:gap-8">
              {/* Products */}
              <div>
                <h3 className="mb-6 font-heading text-sm font-semibold tracking-wide text-zinc-900">
                  Products
                </h3>
                <ul className="space-y-3.5">
                  {products.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex items-center gap-2.5 text-sm font-medium text-zinc-500 transition-all hover:text-[#172556]"
                      >
                        <span className="h-px w-2 bg-zinc-300 transition-all group-hover:w-4 group-hover:bg-[#172556]" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="mb-6 font-heading text-sm font-semibold tracking-wide text-zinc-900">
                  Company
                </h3>
                <ul className="space-y-3.5">
                  {company.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex items-center gap-2.5 text-sm font-medium text-zinc-500 transition-all hover:text-[#172556]"
                      >
                        <span className="h-px w-2 bg-zinc-300 transition-all group-hover:w-4 group-hover:bg-[#172556]" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reach us */}
              <div>
                <h3 className="mb-6 font-heading text-sm font-semibold tracking-wide text-zinc-900">
                  Reach us
                </h3>
                <ul className="space-y-5">
                  <li>
                    <a
                      href="mailto:sales@wavenxt.com"
                      className="group flex items-start gap-3 text-sm text-zinc-500 transition-colors hover:text-[#172556]"
                    >
                      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-zinc-200/80 bg-white text-zinc-400 shadow-sm transition-colors group-hover:border-[#172556]/20 group-hover:bg-[#172556]/5 group-hover:text-[#172556]">
                        <Mail className="size-3.5" />
                      </div>
                      <span className="font-medium leading-relaxed">
                        sales@wavenxt.com
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:08041643659"
                      className="group flex items-start gap-3 text-sm text-zinc-500 transition-colors hover:text-[#172556]"
                    >
                      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-zinc-200/80 bg-white text-zinc-400 shadow-sm transition-colors group-hover:border-[#172556]/20 group-hover:bg-[#172556]/5 group-hover:text-[#172556]">
                        <HeadsetIcon className="size-3.5" />
                      </div>
                      <span className="flex flex-col">
                        <span className="font-medium leading-relaxed">
                          080-4164 3659
                        </span>
                        <span className="text-xs text-zinc-400">Landline</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+917483759420"
                      className="group flex items-start gap-3 text-sm text-zinc-500 transition-colors hover:text-[#172556]"
                    >
                      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-zinc-200/80 bg-white text-zinc-400 shadow-sm transition-colors group-hover:border-[#172556]/20 group-hover:bg-[#172556]/5 group-hover:text-[#172556]">
                        <Phone className="size-3.5" />
                      </div>
                      <span className="flex flex-col">
                        <span className="font-medium leading-relaxed">
                          +91 74837 59420
                        </span>
                        <span className="text-xs text-zinc-400">Mobile</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <div className="flex items-start gap-3 text-sm text-zinc-500 group cursor-default">
                      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-zinc-200/80 bg-white text-zinc-400 shadow-sm transition-colors group-hover:border-zinc-300 group-hover:text-zinc-600">
                        <MapPin className="size-3.5" />
                      </div>
                      <span className="font-medium leading-relaxed">
                        #847 2nd Floor A block
                        <br />
                        Sahakaranagar
                        <br />
                        Bangalore 560092
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-20 flex flex-col-reverse gap-6 border-t border-zinc-200/80 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-zinc-500">
              &copy; {new Date().getFullYear()} Wavenxt · All rights reserved
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-xs text-zinc-500 transition-colors hover:text-zinc-900"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-xs text-zinc-500 transition-colors hover:text-zinc-900"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
