"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowUpRight, ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "All Products", hasDropdown: true },
  { href: "/about-us", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blogs" },
];

interface SubModel {
  name: string;
  href: string;
  spec: string;
}

interface ProductItem {
  name: string;
  href: string;
  tag: string;
  desc: string;
  image: string;
  subModels: SubModel[];
}

const productItems: ProductItem[] = [
  {
    name: "Digital Attenuators",
    href: "/products/digital-attenuators",
    tag: "Core",
    desc: "Precise RF signal control for Wi-Fi and cellular validation — 95 dB dynamic range with 0.25 dB resolution across 12 models.",
    image: "/group-atten.jpg",
    subModels: [
      {
        name: "8 GHz Series",
        href: "/products/digital-attenuators",
        spec: "200–8000 MHz · 1–8 ch",
      },
      {
        name: "6 GHz Series",
        href: "/products/digital-attenuators",
        spec: "200–6000 MHz · 1–8 ch",
      },
      {
        name: "3 GHz Series",
        href: "/products/digital-attenuators",
        spec: "200–3000 MHz · 1–8 ch",
      },
    ],
  },
  {
    name: "Mesh Attenuators",
    href: "/products/mesh-attenuators",
    tag: "RF Network",
    desc: "High-density attenuation matrices for stable multi-node signal management across complex RF topologies.",
    image: "/mesh.jpg",
    subModels: [
      {
        name: "NXA-B4P",
        href: "/products/mesh-attenuators/nxa-b4p",
        spec: "4 Port · 1RU",
      },
      {
        name: "NXA-B9P",
        href: "/products/mesh-attenuators/nxa-b9p",
        spec: "9 Port · 3RU",
      },
    ],
  },
  {
    name: "Matrix Systems",
    href: "/products/matrix-systems",
    tag: "Routing",
    desc: "Flexible solid-state RF path switching across multi-device, multi-band environments with programmable routing.",
    image: "/matrix.jpg",
    subModels: [
      {
        name: "NXA-B168M",
        href: "/products/matrix-systems",
        spec: "16×8 · 200–8000 MHz",
      },
    ],
  },
  {
    name: "Butler Matrix",
    href: "/products/butler-matrix",
    tag: "Advanced",
    desc: "Passive beamforming networks for advanced antenna characterization and MIMO validation workflows.",
    image: "/group-atten1.jpg",
    subModels: [
      {
        name: "NXBM-4P67",
        href: "/products/butler-matrix/nxbm-4p67",
        spec: "4×4 · 0.6–7.125 GHz",
      },
      {
        name: "NXBM-4P28",
        href: "/products/butler-matrix/nxbm-4p28",
        spec: "4×4 · 2.4–8 GHz",
      },
      {
        name: "NXBM-8P67",
        href: "/products/butler-matrix/nxbm-8p67",
        spec: "8×8 · 0.6–7.125 GHz",
      },
      {
        name: "NXBM-8P28",
        href: "/products/butler-matrix/nxbm-8p28",
        spec: "8×8 · 2.4–8 GHz",
      },
    ],
  },
  {
    name: "Handover Test Systems",
    href: "/products/handover-test-systems",
    tag: "System",
    desc: "End-to-end integrated systems for mobility, roaming, and handover validation at production scale.",
    image: "/handover.png",
    subModels: [
      {
        name: "NXA-B88M",
        href: "/products/handover-test-systems",
        spec: "8×8 · 64 paths",
      },
      {
        name: "NXA-B168M",
        href: "/products/handover-test-systems",
        spec: "16×8 · 64 paths",
      },
      {
        name: "NXA-B328M",
        href: "/products/handover-test-systems",
        spec: "32×8 · 256 paths",
      },
      {
        name: "NXA-B648M",
        href: "/products/handover-test-systems",
        spec: "64×8 · 512 paths",
      },
    ],
  },
  {
    name: "Splitters",
    href: "/products/splitters",
    tag: "Signal Chain",
    desc: "Low-loss Wilkinson splitter/combiners engineered for balanced, repeatable signal distribution in test setups.",
    image: "/atten8.jpg",
    subModels: [],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeProduct = productItems[activeIndex];
  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled && !dropdownOpen;

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  function openDropdown() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  }

  function closeDropdown() {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
      setActiveIndex(0);
    }, 200);
  }

  useEffect(() => {
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setDropdownOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease }}
        className="fixed top-0 z-50 w-full"
      >
        {/* Main bar */}
        <div
          className={cn(
            "border-b transition-all duration-300",
            isTransparent
              ? "border-transparent bg-transparent"
              : "border-zinc-200/60 bg-[#f7f7f5]/80 backdrop-blur-xl",
          )}
        >
          <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 md:px-10">
            {/* Logo */}
            <Link
              href="/"
              className={cn(
                "relative z-10 font-heading text-lg font-semibold tracking-tight transition-colors duration-300",
                isTransparent ? "text-white" : "text-zinc-900",
              )}
            >
              Wavenxt
            </Link>

            {/* Center nav */}
            <ul className="absolute left-1/2 flex -translate-x-1/2 items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li
                    key={link.href}
                    onMouseEnter={link.hasDropdown ? openDropdown : undefined}
                    onMouseLeave={link.hasDropdown ? closeDropdown : undefined}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "relative flex items-center gap-1 rounded-lg px-6 py-2.5 transition-colors duration-300",
                        isTransparent
                          ? isActive
                            ? "font-medium text-white"
                            : "text-white/60 hover:text-white"
                          : isActive
                            ? "font-medium text-zinc-900"
                            : "text-zinc-500 hover:text-zinc-800",
                      )}
                    >
                      {link.label}
                      {link.hasDropdown && (
                        <motion.span
                          animate={{ rotate: dropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.2, ease }}
                        >
                          <ChevronDown
                            className={cn(
                              "size-3 transition-colors duration-300",
                              isTransparent ? "text-white/40" : "text-zinc-400",
                            )}
                          />
                        </motion.span>
                      )}
                      {isActive && !isTransparent && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-1.5 -bottom-[calc(0.5rem+1px)] h-0.5 bg-zinc-600"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CTA */}
            <Link
              href="/support"
              className={cn(
                "relative z-10 inline-flex items-center gap-1.5 rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300",
                isTransparent
                  ? "border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                  : "bg-[#172556] text-white hover:bg-[#1e3070]",
              )}
            >
              Let&apos;s Talk
              <ArrowUpRight className="size-3.5" />
            </Link>
          </nav>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 top-full"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease }}
                className="border-b border-zinc-200/60 bg-white shadow-[0_24px_80px_-16px_rgba(0,0,0,0.12)]"
              >
                <div className="mx-auto max-w-7xl px-6 md:px-10">
                  <div className="grid grid-cols-12">
                    {/* ── Left: product list ── */}
                    <div className="col-span-4 border-r border-zinc-100 py-6 pr-5">
                      <div className="mb-3 flex items-center justify-between px-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                          Products
                        </p>
                        <Link
                          href="/products"
                          className="text-[10px] font-semibold uppercase tracking-widest text-[#172556]/60 transition-colors hover:text-[#172556]"
                        >
                          View all
                        </Link>
                      </div>

                      <div className="flex flex-col gap-0.5">
                        {productItems.map((item, idx) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onMouseEnter={() => setActiveIndex(idx)}
                            className={cn(
                              "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200",
                              activeIndex === idx
                                ? "bg-[#f7f7f5]"
                                : "hover:bg-zinc-50/80",
                            )}
                          >
                            {/* Active indicator */}
                            <div
                              className={cn(
                                "absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-[#172556] transition-all duration-200",
                                activeIndex === idx
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />

                            <span
                              className={cn(
                                "flex size-7 shrink-0 items-center justify-center rounded-md text-[10px] font-bold tabular-nums transition-all duration-200",
                                activeIndex === idx
                                  ? "bg-[#172556] text-white shadow-sm"
                                  : "bg-zinc-100 text-zinc-400",
                              )}
                            >
                              {String(idx + 1).padStart(2, "0")}
                            </span>

                            <div className="min-w-0 flex-1">
                              <p
                                className={cn(
                                  "truncate text-[13px] font-medium transition-colors duration-200",
                                  activeIndex === idx
                                    ? "text-[#172556]"
                                    : "text-zinc-700",
                                )}
                              >
                                {item.name}
                              </p>
                            </div>

                            <ArrowRight
                              className={cn(
                                "size-3 shrink-0 transition-all duration-200",
                                activeIndex === idx
                                  ? "translate-x-0 text-[#172556] opacity-100"
                                  : "-translate-x-1 opacity-0",
                              )}
                            />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* ── Right: preview panel ── */}
                    <div className="col-span-8 py-6 pl-6">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeProduct.href}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18, ease }}
                          className="grid h-full grid-cols-2 gap-5"
                        >
                          {/* Image + info */}
                          <div className="flex flex-col">
                            <div className="overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50">
                              <div className="relative aspect-[4/3] w-full">
                                <Image
                                  src={activeProduct.image}
                                  alt={activeProduct.name}
                                  fill
                                  sizes="300px"
                                  className="object-cover"
                                />
                              </div>
                            </div>

                            <div className="mt-4 flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-heading text-base font-medium tracking-tight text-zinc-900">
                                  {activeProduct.name}
                                </h3>
                                <span className="rounded-full bg-[#172556]/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#172556]">
                                  {activeProduct.tag}
                                </span>
                              </div>
                              <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
                                {activeProduct.desc}
                              </p>
                              <Link
                                href={activeProduct.href}
                                className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-[#172556] transition-colors hover:text-[#1e3070]"
                              >
                                Overview
                                <ArrowUpRight className="size-3" />
                              </Link>
                            </div>
                          </div>

                          {/* Sub-models */}
                          <div className="flex flex-col">
                            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                              {activeProduct.subModels.length > 0
                                ? "Available Models"
                                : "Coming Soon"}
                            </p>

                            {activeProduct.subModels.length > 0 ? (
                              <div className="flex flex-col gap-2">
                                {activeProduct.subModels.map((sub) => (
                                  <Link
                                    key={sub.name}
                                    href={sub.href}
                                    className="group flex items-center justify-between rounded-xl border border-zinc-100 bg-[#f7f7f5]/80 px-4 py-3 transition-all duration-200 hover:border-zinc-200 hover:bg-white hover:shadow-sm"
                                  >
                                    <div>
                                      <p className="text-[13px] font-medium text-zinc-800 transition-colors group-hover:text-[#172556]">
                                        {sub.name}
                                      </p>
                                      <p className="mt-0.5 text-[11px] text-zinc-400">
                                        {sub.spec}
                                      </p>
                                    </div>
                                    <ArrowRight className="size-3 text-zinc-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#172556]" />
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50">
                                <p className="text-sm text-zinc-400">
                                  Product details coming soon
                                </p>
                              </div>
                            )}

                            {/* Quick contact */}
                            <div className="mt-auto pt-4">
                              <div className="rounded-xl bg-[#172556]/[0.03] p-3">
                                <p className="text-[11px] text-zinc-500">
                                  Need a custom configuration?
                                </p>
                                <Link
                                  href="/support"
                                  className="mt-1 inline-flex items-center gap-1 text-[12px] font-medium text-[#172556] transition-colors hover:text-[#1e3070]"
                                >
                                  Talk to engineering
                                  <ArrowUpRight className="size-3" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Overlay backdrop */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[2px]"
            onClick={() => setDropdownOpen(false)}
            style={{ top: "3.5rem" }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
