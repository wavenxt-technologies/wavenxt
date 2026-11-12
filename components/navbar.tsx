"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type Variants,
} from "framer-motion";
import {
  CaretDown,
  CaretRight,
  Play,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const ease = [0.32, 0.72, 0, 1] as [number, number, number, number];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b3d91]";

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

// Order of the flyout triggers, used to slide content in the right direction
const dropdownOrder: Record<DropdownType, number> = {
  products: 0,
  resources: 1,
};

const resourceItems = [
  {
    name: "Blogs",
    href: "/resources/blogs",
    desc: "Articles and insights on RF engineering, wireless testing, and industry trends",
  },
  {
    name: "Webinars",
    href: "/resources/webinars",
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
        spec: "200–8000 MHz · 1–24 ch",
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

function isLinkActive(link: NavLink, pathname: string) {
  if (link.href === "/") return pathname === "/";
  if (link.dropdownType === "resources")
    return pathname.startsWith("/resources");
  return pathname.startsWith(link.href);
}

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
  const [direction, setDirection] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const openTimer = useRef<NodeJS.Timeout | null>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const dur = (seconds: number) => (reduceMotion ? 0 : seconds);

  const isHome = pathname === "/";
  const isTransparent =
    isHome && !scrolled && !activeDropdown && !mobileMenuOpen;

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
  });

  function clearTimers() {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  function openDropdown(type: DropdownType) {
    clearTimers();
    if (activeDropdown === type) return;
    // Switch instantly between flyouts; a short intent delay on first open
    // keeps the menu from flashing when the pointer sweeps across the bar.
    if (activeDropdown) {
      setDirection(
        dropdownOrder[type] > dropdownOrder[activeDropdown] ? 1 : -1,
      );
      setActiveDropdown(type);
      return;
    }
    openTimer.current = setTimeout(() => {
      setDirection(0);
      setActiveDropdown(type);
    }, 90);
  }

  function closeDropdown(delay = 180) {
    clearTimers();
    closeTimer.current = setTimeout(() => setActiveDropdown(null), delay);
  }

  function closeNow() {
    clearTimers();
    setActiveDropdown(null);
  }

  function handleTriggerKeyDown(
    e: React.KeyboardEvent<HTMLAnchorElement>,
    type: DropdownType,
  ) {
    if (e.key !== "ArrowDown") return;
    e.preventDefault();
    clearTimers();
    setDirection(0);
    setActiveDropdown(type);
    setTimeout(
      () => panelRef.current?.querySelector<HTMLElement>("a")?.focus(),
      60,
    );
  }

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    return () => {
      if (openTimer.current) clearTimeout(openTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      // Return focus to the trigger when closing from inside the flyout
      if (
        activeDropdown &&
        panelRef.current?.contains(document.activeElement)
      ) {
        document.getElementById(`nav-trigger-${activeDropdown}`)?.focus();
      }
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeDropdown]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-x-0 top-0 z-50 tracking-[-0.01em] normal-nums"
        onMouseEnter={() => {
          if (closeTimer.current) clearTimeout(closeTimer.current);
        }}
        onMouseLeave={() => closeDropdown()}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null))
            closeNow();
        }}
      >
        {/* Bar + flyout share one surface */}
        <div
          className={cn(
            "relative z-20 border-b transition-[background-color,border-color] duration-300",
            isTransparent
              ? "border-transparent bg-transparent"
              : mobileMenuOpen || activeDropdown
                ? cn(
                    "bg-[#f7f7f5]",
                    activeDropdown
                      ? "border-black/[0.08] contrast-more:border-black/30"
                      : "border-transparent",
                  )
                : cn(
                    "bg-[#f7f7f5]",
                    scrolled
                      ? "border-black/[0.08] contrast-more:border-black/30"
                      : "border-transparent",
                  ),
          )}
        >
          <nav
            aria-label="Main"
            className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-6 md:px-10"
          >
            <Link
              href="/"
              aria-label="Wavenxt home"
              onClick={() => setMobileMenuOpen(false)}
              onMouseEnter={() => closeDropdown(80)}
              className={cn(
                "relative z-10 flex items-center rounded-md transition-opacity duration-200 hover:opacity-75",
                focusRing,
              )}
            >
              <Image
                src="/logo.png"
                alt="Wavenxt"
                width={160}
                height={40}
                className="h-[26px] w-auto object-contain"
                priority
              />
            </Link>

            {/* Center nav */}
            <ul className="absolute inset-y-0 left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link, pathname);
                const isOpen =
                  !!link.dropdownType && activeDropdown === link.dropdownType;

                return (
                  <li key={link.href} className="flex h-full items-center">
                    <Link
                      id={
                        link.dropdownType
                          ? `nav-trigger-${link.dropdownType}`
                          : undefined
                      }
                      href={
                        link.dropdownType === "resources"
                          ? "/resources/blogs"
                          : link.href
                      }
                      onMouseEnter={() =>
                        link.dropdownType
                          ? openDropdown(link.dropdownType)
                          : closeDropdown(80)
                      }
                      onFocus={() =>
                        link.dropdownType
                          ? openDropdown(link.dropdownType)
                          : closeNow()
                      }
                      onKeyDown={
                        link.dropdownType
                          ? (e) => handleTriggerKeyDown(e, link.dropdownType!)
                          : undefined
                      }
                      onClick={closeNow}
                      aria-current={isActive ? "page" : undefined}
                      aria-expanded={link.dropdownType ? isOpen : undefined}
                      aria-controls={
                        link.dropdownType ? "nav-flyout" : undefined
                      }
                      className={cn(
                        "flex items-center gap-1 rounded-md px-3.5 py-2 text-[13px] tracking-[-0.005em] transition-colors duration-200 contrast-more:text-[#1d1d1f]",
                        focusRing,
                        isActive || isOpen
                          ? "text-[#1d1d1f]"
                          : "text-[#1d1d1f]/75 hover:text-[#1d1d1f]",
                      )}
                    >
                      {link.label}
                      {link.dropdownType && (
                        <CaretDown
                          aria-hidden="true"
                          weight="bold"
                          className={cn(
                            "size-2.5 text-[#86868b] transition-transform duration-300",
                            isOpen && "rotate-180 text-[#1d1d1f]",
                          )}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="relative z-10 flex items-center gap-2">
              <Link
                href="/contact"
                onClick={closeNow}
                onMouseEnter={() => closeDropdown(80)}
                className={cn(
                  "inline-flex min-h-10 items-center justify-center rounded-full bg-[#0b3d91] px-4 py-2 text-[13px] text-white transition-colors duration-200 hover:bg-[#1249a8] active:bg-[#08306f]",
                  focusRing,
                )}
              >
                Let&apos;s Talk
              </Link>

              {/* Mobile toggle — two lines that morph into a close mark */}
              <button
                type="button"
                className={cn(
                  "-mr-3 flex size-11 items-center justify-center rounded-full lg:hidden",
                  focusRing,
                )}
                onClick={() => setMobileMenuOpen((open) => !open)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <span
                  aria-hidden="true"
                  className="relative block h-3 w-[18px]"
                >
                  <motion.span
                    className="absolute inset-x-0 top-[2px] h-[1.5px] rounded-full bg-[#1d1d1f]"
                    animate={
                      mobileMenuOpen
                        ? { y: 3.25, rotate: 45 }
                        : { y: 0, rotate: 0 }
                    }
                    transition={{ duration: dur(0.3), ease }}
                  />
                  <motion.span
                    className="absolute inset-x-0 bottom-[2px] h-[1.5px] rounded-full bg-[#1d1d1f]"
                    animate={
                      mobileMenuOpen
                        ? { y: -3.25, rotate: -45 }
                        : { y: 0, rotate: 0 }
                    }
                    transition={{ duration: dur(0.3), ease }}
                  />
                </span>
              </button>
            </div>
          </nav>

          {/* ── Desktop flyout ── */}
          <AnimatePresence>
            {activeDropdown && (
              <Flyout
                key="flyout"
                ref={panelRef}
                type={activeDropdown}
                direction={direction}
                reduceMotion={!!reduceMotion}
                onNavigate={closeNow}
              />
            )}
          </AnimatePresence>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              id="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: dur(0.25), ease }}
              className="fixed inset-0 z-10 flex flex-col bg-[#f7f7f5] pt-14 lg:hidden"
            >
              <MobileMenu
                pathname={pathname}
                reduceMotion={!!reduceMotion}
                onNavigate={() => setMobileMenuOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Page scrim behind the flyout */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            key="scrim"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur(0.3), ease }}
            onClick={closeNow}
            className="fixed inset-0 z-40 hidden bg-[#e8e8ed]/40 supports-[backdrop-filter]:backdrop-blur-xl lg:block"
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Mobile menu ───
   Product-first: the families as image tiles (like the home hero rail),
   then Resources and Company as inset grouped lists. Sections rise in
   one after another. */

const mobileHeadingClass = "px-1 text-[13px] font-semibold text-[#6e6e73]";

const mobileGroupClass =
  "overflow-hidden rounded-[20px] bg-white ring-1 ring-black/[0.06] divide-y divide-black/[0.06]";

const mobileSectionVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.05 + i * 0.07, ease },
  }),
};

function MobileMenu({
  pathname,
  reduceMotion,
  onNavigate,
}: {
  pathname: string;
  reduceMotion: boolean;
  onNavigate: () => void;
}) {
  const companyLinks = navLinks.filter((link) => !link.dropdownType);
  const isCurrent = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  const section = (i: number) => ({
    custom: i,
    variants: mobileSectionVariants,
    initial: reduceMotion ? false : ("hidden" as const),
    animate: "visible" as const,
  });

  return (
    <>
      <nav
        aria-label="Mobile"
        className="flex-1 overflow-y-auto overscroll-contain px-5 pb-10 pt-5"
      >
        <motion.section {...section(0)} aria-labelledby="mobile-products">
          <div className="flex items-baseline justify-between">
            <h2 id="mobile-products" className={mobileHeadingClass}>
              Products
            </h2>
            <Link
              href="/products"
              onClick={onNavigate}
              className={cn(
                "inline-flex items-center gap-1 rounded-sm text-[15px] text-[#0066cc]",
                focusRing,
              )}
            >
              All Products
              <CaretRight aria-hidden="true" weight="bold" className="size-3" />
            </Link>
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-2.5">
            {productItems.map((item) => {
              const current = isCurrent(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "flex h-full flex-col rounded-[20px] bg-white px-3.5 pb-3.5 pt-3 ring-1 transition-transform duration-200 active:scale-[0.98]",
                      current ? "ring-2 ring-[#0b3d91]" : "ring-black/[0.06]",
                      focusRing,
                    )}
                  >
                    <span className="relative block h-[72px] w-full">
                      <ProductImage src={item.image} sizes="160px" inset="inset-1" />
                    </span>
                    <span className="mt-3 text-[15px] font-medium leading-[1.25] tracking-[-0.01em] text-[#1d1d1f]">
                      {item.name}
                    </span>
                    <span className="mt-1 text-[12px] leading-[1.3] text-[#6e6e73]">
                      {item.tag}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.section>

        <motion.section {...section(1)} aria-labelledby="mobile-resources" className="mt-8">
          <h2 id="mobile-resources" className={mobileHeadingClass}>
            Resources
          </h2>
          <ul className={cn("mt-3", mobileGroupClass)}>
            {resourceItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5 transition-colors active:bg-[#f5f5f7]",
                    focusRing,
                  )}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[17px] font-medium tracking-[-0.01em] text-[#1d1d1f]">
                      {item.name}
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-[1.4] text-[#6e6e73]">
                      {item.desc}
                    </span>
                  </span>
                  <CaretRight aria-hidden="true" weight="bold" className="size-3.5 shrink-0 text-[#c7c7cc]" />
                </Link>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section {...section(2)} aria-labelledby="mobile-company" className="mt-8">
          <h2 id="mobile-company" className={mobileHeadingClass}>
            Company
          </h2>
          <ul className={cn("mt-3", mobileGroupClass)}>
            {companyLinks.map((link) => {
              const current = isLinkActive(link, pathname);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "flex min-h-[52px] items-center gap-3 px-4 transition-colors active:bg-[#f5f5f7]",
                      focusRing,
                    )}
                  >
                    <span
                      className={cn(
                        "flex-1 text-[17px] font-medium tracking-[-0.01em]",
                        current ? "text-[#0b3d91]" : "text-[#1d1d1f]",
                      )}
                    >
                      {link.label}
                    </span>
                    <CaretRight aria-hidden="true" weight="bold" className="size-3.5 shrink-0 text-[#c7c7cc]" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.section>
      </nav>

      <motion.div
        {...section(3)}
        className="border-t border-black/[0.06] bg-[#f7f7f5]/90 px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-xl"
      >
        <Link
          href="/contact"
          onClick={onNavigate}
          className={cn(
            "flex h-12 w-full items-center justify-center rounded-full bg-[#0b3d91] text-[17px] text-white transition-colors hover:bg-[#1249a8] active:bg-[#08306f]",
            focusRing,
          )}
        >
          Let&apos;s Talk
        </Link>
      </motion.div>
    </>
  );
}

/* ─── Flyout ─── */

// Menu copies of the product images, cropped tight to the product so they
// center correctly. `fit` evens out visual weight between tall and wide
// products, and keeps the low-resolution sources from being upscaled.
const navImages: Record<string, { src: string; fit: number }> = {
  "/images/group-atten.webp": {
    src: "/images/nav/group-atten.webp",
    fit: 0.82,
  },
  "/images/mesh4.webp": { src: "/images/nav/mesh4.webp", fit: 1 },
  "/images/butler4.webp": { src: "/images/nav/butler4.webp", fit: 0.8 },
  "/images/handover.webp": { src: "/images/nav/handover.webp", fit: 0.96 },
  "/images/matrix.webp": { src: "/images/nav/matrix.webp", fit: 0.96 },
  "/images/splitter.webp": { src: "/images/nav/splitter.webp", fit: 0.78 },
};

const contentVariants: Variants = {
  enter: (direction: number) =>
    direction === 0 ? { opacity: 0, y: -8 } : { opacity: 0, x: direction * 40 },
  center: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.32, ease, staggerChildren: 0.025 },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -40,
    transition: { duration: 0.2, ease },
  }),
};

const itemVariants: Variants = {
  enter: { opacity: 0, y: 8 },
  center: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
};

const detailVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, y: direction * 14 }),
  center: { opacity: 1, y: 0, transition: { duration: 0.3, ease } },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction * -14,
    transition: { duration: 0.16, ease },
  }),
};

function Flyout({
  ref,
  type,
  direction,
  reduceMotion,
  onNavigate,
}: {
  ref: React.Ref<HTMLDivElement>;
  type: DropdownType;
  direction: number;
  reduceMotion: boolean;
  onNavigate: () => void;
}) {
  // Measure the active content so the panel height animates between flyouts
  const measureRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setHeight(entry.borderBoxSize[0].blockSize),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      id="nav-flyout"
      initial={{ height: 0 }}
      animate={{ height }}
      exit={{ height: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease }}
      className="hidden overflow-hidden lg:block"
    >
      <div ref={measureRef} className="relative">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={type}
            custom={direction}
            variants={contentVariants}
            initial={reduceMotion ? false : "enter"}
            animate="center"
            exit={reduceMotion ? undefined : "exit"}
            className="mx-auto w-full max-w-7xl px-6 pb-8 pt-5 md:px-10"
          >
            {type === "products" ? (
              <ProductsFlyout
                onNavigate={onNavigate}
                reduceMotion={reduceMotion}
              />
            ) : (
              <ResourcesFlyout onNavigate={onNavigate} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ProductImage({
  src,
  sizes,
  inset,
  className,
}: {
  src: string;
  sizes: string;
  /** Padding between the tile edge and the image box */
  inset: string;
  className?: string;
}) {
  const image = navImages[src] ?? { src, fit: 1 };

  return (
    <div className={cn("absolute inset-0", inset)}>
      <div
        className="relative size-full"
        style={{ transform: `scale(${image.fit})` }}
      >
        <Image
          src={image.src}
          alt=""
          fill
          sizes={sizes}
          className={cn("object-contain", className)}
        />
      </div>
    </div>
  );
}

function ProductsFlyout({
  onNavigate,
  reduceMotion,
}: {
  onNavigate: () => void;
  reduceMotion: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);
  const product = productItems[activeIndex];

  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  function select(idx: number) {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (idx === activeIndex) return;
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  }

  // Short hover intent so a diagonal move toward the detail card
  // doesn't flip through every row the pointer crosses.
  function handleRowEnter(idx: number) {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => select(idx), 70);
  }

  function handleRowLeave() {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }

  function handleListKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const rows = Array.from(
      e.currentTarget.querySelectorAll<HTMLAnchorElement>("a"),
    );
    const current = rows.indexOf(document.activeElement as HTMLAnchorElement);
    if (current === -1) return;
    e.preventDefault();
    const next =
      e.key === "ArrowDown"
        ? Math.min(current + 1, rows.length - 1)
        : Math.max(current - 1, 0);
    rows[next].focus();
  }

  return (
    <div className="grid grid-cols-[280px_minmax(0,1fr)] gap-6 xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-8">
      {/* Product list */}
      <div className="flex flex-col">
        <motion.p
          variants={itemVariants}
          className="px-1 text-[12px] text-[#6e6e73]"
        >
          Products
        </motion.p>
        <ul
          className="-mx-2 mt-2.5 flex flex-col gap-0.5"
          onKeyDown={handleListKeyDown}
        >
          {productItems.map((item, idx) => {
            const selected = idx === activeIndex;
            return (
              <motion.li key={item.href} variants={itemVariants}>
                <Link
                  href={item.href}
                  onMouseEnter={() => handleRowEnter(idx)}
                  onMouseLeave={handleRowLeave}
                  onFocus={() => select(idx)}
                  onClick={onNavigate}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl p-1.5 pr-3",
                    focusRing,
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="product-highlight"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-xl bg-white shadow-[0_1px_2px_rgba(17,30,61,0.06),0_6px_16px_-8px_rgba(17,30,61,0.2)] ring-1 ring-black/[0.06] contrast-more:ring-black/30"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 520, damping: 42 }
                      }
                    />
                  )}
                  <span className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-black/[0.06]">
                    <ProductImage src={item.image} sizes="64px" inset="p-1.5" />
                  </span>
                  <span
                    className={cn(
                      "relative flex-1 truncate text-[14px] transition-colors duration-150",
                      selected
                        ? "text-[#1d1d1f]"
                        : "text-[#424245] group-hover:text-[#1d1d1f]",
                    )}
                  >
                    {item.name}
                  </span>
                  <CaretRight
                    aria-hidden="true"
                    weight="bold"
                    className={cn(
                      "relative size-3 text-[#86868b] transition-all duration-200",
                      selected
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-1 opacity-0",
                    )}
                  />
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* Detail card — sized by an invisible stack of every product's details,
          so the panel never changes height while hovering through the list */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(17,30,61,0.04)] ring-1 ring-black/[0.06] contrast-more:ring-black/30"
      >
        <div
          aria-hidden="true"
          className="invisible grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
        >
          <div className="col-start-2 grid">
            {productItems.map((item) => (
              <div key={item.href} className="col-start-1 row-start-1">
                <ProductDetails product={item} onNavigate={onNavigate} />
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={product.href}
            custom={direction}
            variants={detailVariants}
            initial={reduceMotion ? false : "enter"}
            animate="center"
            exit={reduceMotion ? undefined : "exit"}
            className="absolute inset-0 grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
          >
            <Link
              href={product.href}
              onClick={onNavigate}
              tabIndex={-1}
              aria-hidden="true"
              className="group/img relative m-2 overflow-hidden rounded-xl bg-[#f5f5f7]"
            >
              <ProductImage
                src={product.image}
                sizes="(min-width: 1280px) 400px, 30vw"
                inset="p-10"
                className="drop-shadow-[0_14px_14px_rgba(17,30,61,0.18)] transition-transform duration-500 ease-out group-hover/img:scale-[1.04]"
              />
            </Link>
            <ProductDetails product={product} onNavigate={onNavigate} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// Rack-unit badges (1RU, 3RU…) are the key spec, so they lead and stand out
const isRackUnit = (part: string) => /^\d+RU$/i.test(part);

function orderBadges(parts: string[]) {
  return [...parts.filter(isRackUnit), ...parts.filter((p) => !isRackUnit(p))];
}

function ProductDetails({
  product,
  onNavigate,
}: {
  product: ProductItem;
  onNavigate: () => void;
}) {
  return (
    <div className="flex flex-col py-6 pl-4 pr-6">
      <span className="text-[12px] font-semibold text-[#bf4800]">
        {product.tag}
      </span>
      <h3 className="mt-1 text-[21px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
        {product.name}
      </h3>
      <p className="mt-1.5 text-[14px] leading-[1.45] text-[#6e6e73]">
        {product.desc}
      </p>

      {product.subModels.length > 0 ? (
        <div className="mt-4">
          <p className="text-[12px] font-semibold text-[#1d1d1f]">
            Available Series
          </p>
          <ul className="mt-2 grid grid-cols-2 gap-2">
            {product.subModels.map((sub) => (
              <li key={sub.name}>
                <Link
                  href={sub.href}
                  onClick={onNavigate}
                  className={cn(
                    "group/sub flex h-full flex-col gap-2.5 rounded-xl bg-white p-3 ring-1 ring-[#d2d2d7] transition-[box-shadow] duration-200 hover:shadow-[0_8px_20px_-12px_rgba(0,0,0,0.28)] hover:ring-[#86868b] contrast-more:ring-black/40",
                    focusRing,
                  )}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-[14px] font-semibold tracking-[-0.01em] text-[#1d1d1f]">
                      {sub.name}
                    </span>
                    <CaretRight
                      aria-hidden="true"
                      weight="bold"
                      className="size-3 shrink-0 text-[#86868b] transition-all duration-200 group-hover/sub:translate-x-0.5 group-hover/sub:text-[#0b3d91]"
                    />
                  </span>
                  <span className="flex flex-wrap gap-1.5">
                    {orderBadges(sub.spec.split(" · ")).map((part) => (
                      <span
                        key={part}
                        className={cn(
                          "rounded-md px-2 py-1 text-[12px] font-semibold leading-none",
                          isRackUnit(part)
                            ? "bg-[#0b3d91] text-white"
                            : "bg-[#f5f5f7] text-[#1d1d1f] ring-1 ring-inset ring-black/[0.04]",
                        )}
                      >
                        {part}
                      </span>
                    ))}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-4 text-[14px] leading-[1.45] text-[#6e6e73]">
          Multiple configurations available — visit the product page.
        </p>
      )}

      <Link
        href={product.href}
        onClick={onNavigate}
        className={cn(
          "group mt-auto inline-flex items-center gap-1 self-start rounded-sm pt-5 text-[14px] text-[#0066cc] hover:underline hover:underline-offset-4",
          focusRing,
        )}
      >
        View full details
        <CaretRight aria-hidden="true" weight="bold" className="size-3" />
      </Link>
    </div>
  );
}

function ResourcesFlyout({ onNavigate }: { onNavigate: () => void }) {
  return (
    <ul className="grid grid-cols-2 gap-4">
      {resourceItems.map((item) => {
        const Art =
          item.href === "/resources/webinars" ? WebinarsArt : BlogsArt;
        return (
          <motion.li key={item.href} variants={itemVariants}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group block rounded-2xl bg-white p-2 shadow-[0_1px_2px_rgba(17,30,61,0.04)] ring-1 ring-black/[0.06] transition-[box-shadow,translate] duration-300 hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(17,30,61,0.06),0_16px_32px_-16px_rgba(17,30,61,0.3)] contrast-more:ring-black/30",
                focusRing,
              )}
            >
              <div aria-hidden="true" className="h-40">
                <Art />
              </div>
              <div className="flex items-start gap-3.5 px-3 pb-3 pt-4">
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-[17px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
                      {item.name}
                    </span>
                    <CaretRight
                      aria-hidden="true"
                      weight="bold"
                      className="size-3 text-[#86868b] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#0b3d91]"
                    />
                  </span>
                  <span className="mt-0.5 block text-[14px] leading-[1.45] text-[#6e6e73]">
                    {item.desc}
                  </span>
                </span>
              </div>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
}

/* ─── Resource card art (decorative) ─── */

function ArticleSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute w-[42%] max-w-[220px] rounded-lg bg-white p-2.5 ring-1 ring-black/[0.06]",
        className,
      )}
    >
      <div className="h-14 rounded-md bg-[linear-gradient(135deg,#e8e8ed_0%,#d2d2d7_100%)]" />
      <div className="mt-2.5 h-2 w-4/5 rounded-full bg-[#1d1d1f]/80" />
      <div className="mt-2 h-1.5 w-full rounded-full bg-[#e8e8ed]" />
      <div className="mt-1.5 h-1.5 w-11/12 rounded-full bg-[#e8e8ed]" />
      <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-[#e8e8ed]" />
    </div>
  );
}

function BlogsArt() {
  return (
    <div className="relative h-full overflow-hidden rounded-xl bg-[#f5f5f7]">
      <div className="absolute inset-0 bg-[radial-gradient(#1d1d1f_1px,transparent_1px)] [background-size:14px_14px] opacity-[0.06]" />
      <ArticleSkeleton className="left-1/2 top-9 translate-x-[-8%] rotate-[5deg] opacity-80 shadow-sm transition-[translate,rotate] duration-500 ease-out group-hover:translate-x-[2%] group-hover:rotate-[8deg]" />
      <ArticleSkeleton className="left-1/2 top-6 -translate-x-[88%] -rotate-[4deg] opacity-90 shadow-sm transition-[translate,rotate] duration-500 ease-out group-hover:-translate-x-[98%] group-hover:-rotate-[7deg]" />
      <ArticleSkeleton className="left-1/2 top-8 -translate-x-1/2 shadow-[0_12px_28px_-10px_rgba(17,30,61,0.35)] transition-[translate] duration-500 ease-out group-hover:-translate-y-2" />
    </div>
  );
}

const waveform = [
  38, 62, 45, 80, 52, 70, 34, 58, 88, 64, 42, 74, 50, 92, 60, 40, 68, 54, 82,
  46, 66, 36, 72, 56, 44, 78, 48, 62, 38, 70,
];

function WebinarsArt() {
  return (
    <div className="relative h-full overflow-hidden rounded-xl bg-[#0b3d91]">
      <div className="absolute inset-x-[16%] bottom-0 top-5 overflow-hidden rounded-t-lg bg-white/[0.06] ring-1 ring-white/10">
        {/* Signal waveform */}
        <div className="absolute inset-x-4 bottom-5 flex h-12 items-end gap-[3px]">
          {waveform.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-full bg-white/20 transition-colors duration-500 group-hover:bg-white/55"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        {/* Play button */}
        <div className="absolute left-1/2 top-[38%] flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5)] transition-[scale] duration-300 ease-out group-hover:scale-110">
          <Play weight="fill" className="ml-0.5 size-4 text-[#0b3d91]" />
        </div>
        {/* Progress */}
        <div className="absolute inset-x-4 bottom-2 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/4 rounded-full bg-white transition-[width] duration-700 ease-out group-hover:w-2/3" />
        </div>
      </div>
    </div>
  );
}
