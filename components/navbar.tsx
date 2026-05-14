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
    image: "/images/group-atten.webp",
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
    null,
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
              : "border-zinc-200/60 bg-[#f7f7f5]",
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
                className="h-7 w-auto object-contain transition-all duration-300"
                priority
              />
            </Link>

            {/* Center nav */}
            <ul className="hidden md:flex absolute text-sm left-1/2 -translate-x-1/2 items-center gap-0.5">
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
                    className={link.dropdownType ? "relative" : ""}
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
                        isActive
                          ? "font-medium text-zinc-900"
                          : "text-zinc-500 hover:text-zinc-800",
                      )}
                    >
                      {link.label}
                      {hasChevron && (
                        <motion.span
                          animate={{ rotate: isThisDropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.2, ease }}
                        >
                          <ChevronDown className="size-3 text-zinc-400 transition-colors duration-300" />
                        </motion.span>
                      )}
                      {isActive && (
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
                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                            transition={{ duration: 0.2, ease }}
                            className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4"
                          >
                            <div className="w-[300px] overflow-hidden rounded-2xl border border-zinc-200/70 bg-white p-1.5 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.16),0_0_0_1px_rgba(0,0,0,0.03)]">
                              {resourceItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setActiveDropdown(null)}
                                    className="group flex items-start gap-3 rounded-xl px-3.5 py-3.5 transition-colors duration-150 hover:bg-zinc-50"
                                  >
                                    <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#172556]/[0.06] text-[#172556] transition-all duration-150 group-hover:bg-[#172556] group-hover:text-white">
                                      <Icon className="size-3.5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center justify-between gap-2">
                                        <span className="text-[14px] font-medium text-zinc-700 transition-colors duration-150 group-hover:text-zinc-900">
                                          {item.name}
                                        </span>
                                        <ArrowUpRight className="size-3.5 shrink-0 text-zinc-300 opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:text-[#172556]" />
                                      </div>
                                      <p className="mt-0.5 text-[12px] leading-relaxed text-zinc-400">
                                        {item.desc}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}

                    {/* ── Products dropdown (inline in li) ── */}
                    {link.dropdownType === "products" && (
                      <AnimatePresence>
                        {activeDropdown === "products" && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                            transition={{ duration: 0.2, ease }}
                            className="fixed left-1/2 top-16 z-50 -translate-x-1/2 pt-4"
                          >
                            <div className="w-[980px] overflow-hidden rounded-2xl border border-zinc-200/70 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.16),0_0_0_1px_rgba(0,0,0,0.03)]">
                              <div className="flex">
                                {/* Dark navy sidebar */}
                                <div className="relative w-[30%] shrink-0 overflow-hidden bg-[#111e3d] px-8 py-8">
                                  <svg
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 opacity-[0.09]"
                                    viewBox="0 0 200 200"
                                    fill="none"
                                  >
                                    {[28, 56, 84, 112, 140, 168].map((r) => (
                                      <circle
                                        key={r}
                                        cx="200"
                                        cy="200"
                                        r={r}
                                        stroke="white"
                                        strokeWidth="1"
                                      />
                                    ))}
                                    <circle
                                      cx="200"
                                      cy="200"
                                      r="3"
                                      fill="white"
                                      fillOpacity="0.4"
                                    />
                                  </svg>

                                  <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-white/30">
                                    Products
                                  </p>

                                  <div className="flex flex-col">
                                    {productItems.map((item, idx) => (
                                      <Link
                                        key={item.href}
                                        href={item.href}
                                        onMouseEnter={() => setActiveIndex(idx)}
                                        onClick={() => setActiveDropdown(null)}
                                        className="group flex items-center gap-3 border-b border-white/[0.06] py-[11px] last:border-0 transition-all duration-150"
                                      >
                                        <span
                                          className={cn(
                                            "w-5 shrink-0 font-mono text-[10px] tabular-nums transition-colors duration-150",
                                            activeIndex === idx
                                              ? "text-white/40"
                                              : "text-white/15",
                                          )}
                                        >
                                          {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <span
                                          className={cn(
                                            "flex-1 font-heading text-[15px] font-medium tracking-tight transition-colors duration-150",
                                            activeIndex === idx
                                              ? "text-white"
                                              : "text-white/45 group-hover:text-white/70",
                                          )}
                                        >
                                          {item.name}
                                        </span>
                                        <ArrowRight
                                          className={cn(
                                            "size-3.5 shrink-0 transition-all duration-150",
                                            activeIndex === idx
                                              ? "text-white/45 opacity-100"
                                              : "opacity-0",
                                          )}
                                        />
                                      </Link>
                                    ))}
                                  </div>

                                  <div className="mt-5 border-t border-white/[0.07] pt-5">
                                    <Link
                                      href="/products"
                                      onClick={() => setActiveDropdown(null)}
                                      className="group inline-flex items-center gap-1.5 text-[11px] font-medium text-white/35 transition-colors hover:text-white/65"
                                    >
                                      Browse all products
                                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                                    </Link>
                                  </div>
                                </div>

                                {/* White detail panel */}
                                <div className="flex-1 bg-white">
                                  <AnimatePresence mode="wait">
                                    <motion.div
                                      key={activeProduct.href}
                                      initial={{ opacity: 0, x: 10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0 }}
                                      transition={{
                                        duration: 0.18,
                                        ease: [0.16, 1, 0.3, 1],
                                      }}
                                      className="flex h-full"
                                    >
                                      {/* Image */}
                                      <div className="relative w-[50%] shrink-0 flex items-center justify-center bg-[#f6f6f4] p-5">
                                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.75)_0%,transparent_70%)]" />
                                        <motion.div
                                          initial={{ opacity: 0, scale: 0.93 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{
                                            duration: 0.35,
                                            ease: [0.16, 1, 0.3, 1],
                                          }}
                                          className="relative w-full aspect-square"
                                        >
                                          <Image
                                            src={activeProduct.image}
                                            alt={activeProduct.name}
                                            fill
                                            sizes="20vw"
                                            className="object-cover drop-shadow-xl"
                                            priority
                                          />
                                        </motion.div>
                                      </div>

                                      {/* Details */}
                                      <div className="flex flex-1 flex-col justify-between p-8">
                                        <div>
                                          <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.06 }}
                                            className="inline-flex rounded-md bg-[#172556]/[0.07] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#172556]"
                                          >
                                            {activeProduct.tag}
                                          </motion.span>

                                          <motion.h3
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="mt-3 font-heading text-xl font-medium tracking-tight text-zinc-900"
                                          >
                                            {activeProduct.name}
                                          </motion.h3>

                                          <motion.p
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.14 }}
                                            className="mt-2 text-[13px] leading-relaxed text-zinc-500"
                                          >
                                            {activeProduct.desc}
                                          </motion.p>

                                          {activeProduct.subModels.length >
                                            0 && (
                                            <motion.div
                                              initial={{ opacity: 0 }}
                                              animate={{ opacity: 1 }}
                                              transition={{ delay: 0.18 }}
                                              className="mt-4"
                                            >
                                              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-300">
                                                Available Series
                                              </p>
                                              <div className="flex flex-col gap-1">
                                                {activeProduct.subModels.map(
                                                  (sub) => (
                                                    <Link
                                                      key={sub.name}
                                                      href={sub.href}
                                                      onClick={() =>
                                                        setActiveDropdown(null)
                                                      }
                                                      className="group/sub flex items-center justify-between rounded-lg border border-transparent bg-zinc-50 px-3 py-2 transition-all duration-150 hover:border-[#172556]/12 hover:bg-[#172556]/[0.04]"
                                                    >
                                                      <div className="flex items-center gap-2">
                                                        <span className="text-[12px] font-semibold text-zinc-700 transition-colors duration-150 group-hover/sub:text-[#172556]">
                                                          {sub.name}
                                                        </span>
                                                        <span className="h-2.5 w-px bg-zinc-200" />
                                                        <span className="font-mono text-[10px] text-zinc-400">
                                                          {sub.spec}
                                                        </span>
                                                      </div>
                                                      <ArrowRight className="size-3 text-zinc-300 transition-all duration-150 group-hover/sub:translate-x-0.5 group-hover/sub:text-[#172556]" />
                                                    </Link>
                                                  ),
                                                )}
                                              </div>
                                            </motion.div>
                                          )}

                                          {activeProduct.subModels.length ===
                                            0 && (
                                            <motion.p
                                              initial={{ opacity: 0 }}
                                              animate={{ opacity: 1 }}
                                              transition={{ delay: 0.18 }}
                                              className="mt-3 text-[12px] text-zinc-400"
                                            >
                                              Multiple configurations available
                                              — visit the product page.
                                            </motion.p>
                                          )}
                                        </div>

                                        <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ delay: 0.22 }}
                                          className="pt-4"
                                        >
                                          <Link
                                            href={activeProduct.href}
                                            onClick={() =>
                                              setActiveDropdown(null)
                                            }
                                            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#172556] transition-colors hover:text-[#1e3070]"
                                          >
                                            View full details
                                            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                          </Link>
                                        </motion.div>
                                      </div>
                                    </motion.div>
                                  </AnimatePresence>
                                </div>
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
                className="md:hidden p-2 -mr-2 text-zinc-900 transition-colors duration-300"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile menu"
              >
                <Menu className="size-6" />
              </button>
            </div>
          </nav>
        </div>

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
    </>
  );
}
