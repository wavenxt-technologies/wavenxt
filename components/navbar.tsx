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
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  BookOpen,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ─── Nav data ─── */

type DropdownType = "products" | "resources";

interface NavLink {
  href: string;
  label: string;
  dropdownType?: DropdownType;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "All Products", dropdownType: "products" },
  { href: "/resources", label: "Resources", dropdownType: "resources" },
  { href: "/about-us", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const resourceItems = [
  {
    name: "Blogs",
    href: "/resources/blogs",
    icon: BookOpen,
    desc: "Articles and insights on RF engineering, wireless testing, and industry trends",
  },
  {
    name: "Webinars",
    href: "/resources/webinars",
    icon: Video,
    desc: "Live sessions and on-demand recordings from our engineering experts",
  },
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
    tag: "Programmable",
    desc: "Precise RF signal control for Wi-Fi and cellular validation — 95 dB dynamic range with 0.25 dB resolution across 12 models.",
    image: "/images/group-atten2.webp",
    subModels: [
      {
        name: "8 GHz Series",
        href: "/products/digital-attenuators/mt88a",
        spec: "200–8000 MHz · 1–8 ch",
      },
      {
        name: "6 GHz Series",
        href: "/products/digital-attenuators/mt68a",
        spec: "200–6000 MHz · 1–8 ch",
      },
      {
        name: "3 GHz Series",
        href: "/products/digital-attenuators/mt38a",
        spec: "200–3000 MHz · 1–8 ch",
      },
    ],
  },
  {
    name: "Mesh Attenuators",
    href: "/products/mesh-attenuators",
    tag: "RF Network",
    desc: "High-density attenuation matrices for stable multi-node signal management across complex RF topologies.",
    image: "/images/mesh4.webp",
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
    name: "Butler Matrix",
    href: "/products/butler-matrix",
    tag: "Beamforming",
    desc: "Passive beamforming networks for advanced antenna characterization and MIMO validation workflows.",
    image: "/images/butler4.webp",
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
    tag: "Cellular & Connectivity",
    desc: "End-to-end integrated systems for mobility, roaming, and handover validation at production scale.",
    image: "/images/handover.webp",
    subModels: [],
  },
  {
    name: "Matrix Systems",
    href: "/products/matrix-systems",
    tag: "Routing",
    desc: "Flexible solid-state RF path switching across multi-device, multi-band environments with programmable routing.",
    image: "/images/matrix.webp",
    subModels: [
      {
        name: "NXA-B168M",
        href: "/products/matrix-systems",
        spec: "16×8 · 200–8000 MHz",
      },
    ],
  },
  {
    name: "Splitters",
    href: "/products/splitters",
    tag: "Signal Chain",
    desc: "Low-loss Wilkinson splitter/combiners engineered for balanced, repeatable signal distribution in test setups.",
    image: "/images/splitter.webp",
    subModels: [],
  },
];

/* ═══════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════ */

export default function Navbar() {
  const pathname = usePathname();

  return <NavbarContent key={pathname} pathname={pathname} />;
}

function NavbarContent({ pathname }: { pathname: string }) {
  const [activeDropdown, setActiveDropdown] = useState<DropdownType | null>(
    null
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeProduct = productItems[activeIndex];
  const isHome = pathname === "/";
  const isTransparent =
    isHome && !scrolled && !activeDropdown && !mobileMenuOpen;

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  function handleDropdownEnter(type: DropdownType) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(type);
  }

  function handleDropdownLeave() {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveIndex(0);
    }, 200);
  }

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveDropdown(null);
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
              : "border-zinc-200/60 bg-[#f7f7f5]"
          )}
        >
          <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 flex items-center transition-opacity duration-300 hover:opacity-80"
            >
              <Image
                src="/logo.png"
                alt="Wavenxt"
                width={160}
                height={40}
                className={cn(
                  "h-7 w-auto object-contain transition-all duration-300",
                  isTransparent && "brightness-0 invert"
                )}
                priority
              />
            </Link>

            {/* Center nav */}
            <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                const hasChevron = !!link.dropdownType;
                const isThisDropdownOpen = activeDropdown === link.dropdownType;

                return (
                  <li
                    key={link.href}
                    className={
                      link.dropdownType === "resources" ? "relative" : ""
                    }
                    onMouseEnter={
                      link.dropdownType
                        ? () => handleDropdownEnter(link.dropdownType!)
                        : undefined
                    }
                    onMouseLeave={
                      link.dropdownType ? handleDropdownLeave : undefined
                    }
                  >
                    <Link
                      href={
                        link.dropdownType === "resources"
                          ? "/resources/blogs"
                          : link.href
                      }
                      className={cn(
                        "relative flex items-center gap-1 rounded-lg px-6 py-2.5 transition-colors duration-300",
                        isTransparent
                          ? isActive
                            ? "font-medium text-white"
                            : "text-white/60 hover:text-white"
                          : isActive
                            ? "font-medium text-zinc-900"
                            : "text-zinc-500 hover:text-zinc-800"
                      )}
                    >
                      {link.label}
                      {hasChevron && (
                        <motion.span
                          animate={{ rotate: isThisDropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.2, ease }}
                        >
                          <ChevronDown
                            className={cn(
                              "size-3 transition-colors duration-300",
                              isTransparent ? "text-white/40" : "text-zinc-400"
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

                    {/* ── Resources dropdown (inline in li) ── */}
                    {link.dropdownType === "resources" && (
                      <AnimatePresence>
                        {activeDropdown === "resources" && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.18, ease }}
                            className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
                          >
                            <div className="w-[480px] overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_20px_60px_-16px_rgba(0,0,0,0.15)]">
                              {/* Main resource links */}
                              <div className="grid grid-cols-2 gap-0 divide-x divide-zinc-100">
                                {resourceItems.map((item) => {
                                  const Icon = item.icon;
                                  return (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      onClick={() => setActiveDropdown(null)}
                                      className="group flex flex-col gap-4 p-5 transition-all duration-200 hover:bg-zinc-50/80 first:rounded-tl-2xl last:rounded-tr-2xl"
                                    >
                                      <span className="flex size-11 items-center justify-center rounded-xl bg-[#172556]/[0.06] text-[#172556] ring-1 ring-zinc-100 transition-all duration-200 group-hover:bg-[#172556] group-hover:text-white group-hover:ring-[#172556] group-hover:shadow-lg group-hover:shadow-[#172556]/20">
                                        <Icon className="size-5" />
                                      </span>
                                      <div>
                                        <div className="flex items-center gap-1.5">
                                          <p className="text-[15px] font-semibold text-zinc-900 transition-colors group-hover:text-[#172556]">
                                            {item.name}
                                          </p>
                                          <ArrowUpRight className="size-3.5 text-zinc-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#172556]" />
                                        </div>
                                        <p className="mt-1.5 text-[12px] leading-relaxed text-zinc-400">
                                          {item.desc}
                                        </p>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>

                              {/* Bottom accent strip */}
                              <div className="bg-[#172556] px-5 py-4 flex items-center justify-between">
                                <div>
                                  <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-200/60">
                                    Stay Updated
                                  </p>
                                  <p className="mt-0.5 text-[13px] font-medium text-white/90">
                                    Get the latest from our engineering team
                                  </p>
                                </div>
                                <Link
                                  href="/contact"
                                  onClick={() => setActiveDropdown(null)}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-3.5 py-2 text-[12px] font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/25"
                                >
                                  Contact Us
                                  <ArrowUpRight className="size-3" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="relative z-10 flex items-center gap-4">
              <button
                className={cn(
                  "md:hidden p-2 -mr-2 transition-colors duration-300",
                  isTransparent ? "text-white" : "text-zinc-900"
                )}
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile menu"
              >
                <Menu className="size-6" />
              </button>
            </div>
          </nav>
        </div>

        {/* Products mega menu */}
        <AnimatePresence>
          {activeDropdown === "products" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 top-full hidden md:block"
              onMouseEnter={() => handleDropdownEnter("products")}
              onMouseLeave={handleDropdownLeave}
            >
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease }}
                className="border-b border-zinc-100 bg-white shadow-[0_16px_48px_-12px_rgba(0,0,0,0.08)]"
              >
                <div className="mx-auto max-w-7xl px-6 md:px-10">
                  <div className="grid grid-cols-12 gap-0">
                    {/* ── Left: product list ── */}
                    <div className="col-span-3 border-r border-zinc-100 py-5 pr-4">
                      <div className="flex flex-col gap-0.5">
                        {productItems.map((item, idx) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onMouseEnter={() => setActiveIndex(idx)}
                            className={cn(
                              "group flex items-center gap-3.5 rounded-lg px-3 py-3 transition-all duration-150",
                              activeIndex === idx
                                ? "bg-zinc-50"
                                : "hover:bg-zinc-50/60"
                            )}
                          >
                            <div
                              className={cn(
                                "relative size-10 shrink-0 overflow-hidden rounded-lg border transition-all duration-150",
                                activeIndex === idx
                                  ? "border-zinc-200 shadow-sm"
                                  : "border-zinc-100"
                              )}
                            >
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                quality={100}
                                priority
                                sizes="100vw"
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p
                                className={cn(
                                  "truncate text-sm font-medium transition-colors duration-150",
                                  activeIndex === idx
                                    ? "text-zinc-900"
                                    : "text-zinc-600"
                                )}
                              >
                                {item.name}
                              </p>
                              <p className="truncate text-xs text-zinc-400">
                                {item.tag}
                              </p>
                            </div>
                            <ChevronDown
                              className={cn(
                                "size-3.5 -rotate-90 shrink-0 transition-all duration-150",
                                activeIndex === idx
                                  ? "text-zinc-400 opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </Link>
                        ))}
                      </div>

                      <div className="mt-3 border-t border-zinc-100 pt-3 px-3">
                        <Link
                          href="/products"
                          className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-zinc-400 transition-colors hover:text-[#172556]"
                        >
                          View all products
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>

                    {/* ── Right: detail panel ── */}
                    <div className="col-span-9 py-5 pl-6">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeProduct.href}
                          initial={{ opacity: 0, x: 4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -4 }}
                          transition={{ duration: 0.15, ease }}
                          className="grid h-full grid-cols-9 gap-6"
                        >
                          {/* Image + overview */}
                          <div className="col-span-6 flex flex-col">
                            <div className="overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50">
                              <div className="relative aspect-[4/3] w-full">
                                <Image
                                  src={activeProduct.image}
                                  alt={activeProduct.name}
                                  fill
                                  sizes="280px"
                                  className="object-cover"
                                  priority
                                />
                              </div>
                            </div>
                            <div className="mt-3.5 flex-1">
                              <p className="text-[13px] leading-relaxed text-zinc-500">
                                {activeProduct.desc}
                              </p>
                              <Link
                                href={activeProduct.href}
                                className="mt-2.5 inline-flex items-center gap-1 text-[13px] font-semibold text-[#172556] transition-colors hover:text-[#1e3070]"
                              >
                                View product
                                <ArrowUpRight className="size-3.5" />
                              </Link>
                            </div>
                          </div>

                          {/* Sub-models / details */}
                          <div className="col-span-3 flex flex-col">
                            <div className="mb-3.5 flex items-center justify-between">
                              <h3 className="font-heading text-base font-semibold text-zinc-900">
                                {activeProduct.name}
                              </h3>
                              <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                                {activeProduct.tag}
                              </span>
                            </div>

                            {activeProduct.subModels.length > 0 ? (
                              <div className="flex flex-col gap-2">
                                {activeProduct.subModels.map((sub) => (
                                  <Link
                                    key={sub.name}
                                    href={sub.href}
                                    className="group flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50/50 px-4 py-3 transition-all duration-150 hover:border-zinc-200 hover:bg-white hover:shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                                  >
                                    <div>
                                      <p className="text-sm font-medium text-zinc-800 transition-colors group-hover:text-[#172556]">
                                        {sub.name}
                                      </p>
                                      <p className="mt-0.5 text-xs text-zinc-400">
                                        {sub.spec}
                                      </p>
                                    </div>
                                    <ArrowRight className="size-3.5 text-zinc-300 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-[#172556]" />
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <div className="flex flex-1 flex-col justify-center rounded-xl bg-zinc-50/80 px-5 py-6">
                                <p className="text-sm leading-relaxed text-zinc-500">
                                  Multiple configurations available. Visit the
                                  product page for full specifications and
                                  ordering options.
                                </p>
                                <Link
                                  href={activeProduct.href}
                                  className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#172556] transition-colors hover:text-[#1e3070]"
                                >
                                  See all configurations
                                  <ArrowRight className="size-3.5" />
                                </Link>
                              </div>
                            )}

                            {/* Contact nudge */}
                            <div className="mt-auto pt-3">
                              <Link
                                href="/contact"
                                className="flex items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 transition-all duration-150 hover:bg-[#172556]/[0.04]"
                              >
                                <span className="text-[13px] text-zinc-500">
                                  Need a custom configuration?
                                </span>
                                <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#172556]">
                                  Let&apos;s talk
                                  <ArrowUpRight className="size-3" />
                                </span>
                              </Link>
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease }}
              className="fixed inset-0 z-100 flex flex-col bg-white md:hidden"
            >
              {/* Mobile Menu Header */}
              <div className="flex h-14 shrink-0 items-center justify-between px-6 border-b border-zinc-100">
                <Link
                  href="/"
                  className="font-heading text-lg font-semibold tracking-tight text-zinc-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Wavenxt
                </Link>
                <button
                  className="p-2 -mr-2 text-zinc-500 hover:text-zinc-900 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close mobile menu"
                >
                  <X className="size-6" />
                </button>
              </div>

              {/* Mobile Menu Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <div key={link.href} className="flex flex-col">
                      {link.dropdownType === "products" ? (
                        <>
                          <div className="flex items-center justify-between py-2 text-xl font-medium text-zinc-900">
                            {link.label}
                          </div>
                          <div className="mt-4 flex flex-col gap-4 pl-4 border-l-2 border-zinc-100">
                            {productItems.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-base text-zinc-600 font-medium transition-colors hover:text-[#172556]"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </>
                      ) : link.dropdownType === "resources" ? (
                        <>
                          <div className="flex items-center justify-between py-2 text-xl font-medium text-zinc-900">
                            {link.label}
                          </div>
                          <div className="mt-4 flex flex-col gap-4 pl-4 border-l-2 border-zinc-100">
                            {resourceItems.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-3 text-base text-zinc-600 font-medium transition-colors hover:text-[#172556]"
                              >
                                <item.icon className="size-4" />
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-2 text-xl font-medium text-zinc-900 transition-colors hover:text-[#172556]"
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Menu Footer CTA */}
              <div className="shrink-0 p-6 border-t border-zinc-100 bg-zinc-50/50">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#172556] px-6 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90"
                >
                  Let&apos;s Talk
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Overlay backdrop — products mega menu only */}
      <AnimatePresence>
        {activeDropdown === "products" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[2px]"
            onClick={() => setActiveDropdown(null)}
            style={{ top: "3.5rem" }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
