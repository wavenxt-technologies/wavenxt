"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!headings.length) return;
    const observers: IntersectionObserver[] = [];

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-15% 0px -70% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#172556]/50">
        On this page
      </p>
      <ul>
        {headings.map(({ id, text, level }) => (
          <li key={id} className={level === 3 ? "ml-3" : ""}>
            <a
              href={`#${id}`}
              className={`flex border-l-2 py-2 pl-4 text-[13px] leading-snug transition-all duration-150 ${
                active === id
                  ? "border-[#172556] font-semibold text-zinc-900"
                  : "border-zinc-200 text-zinc-400 hover:border-zinc-400 hover:text-zinc-700"
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
