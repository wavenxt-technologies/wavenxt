"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const total = scrollHeight - clientHeight;
      const pct = total > 0 ? (scrollTop / total) * 100 : 0;
      setProgress(pct);
      setVisible(scrollTop > 260);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const R = 21;
  const circumference = 2 * Math.PI * R;
  const dashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${
        visible
          ? "opacity-100 scale-100"
          : "pointer-events-none scale-90 opacity-0"
      }`}
    >
      <div className="relative flex size-[52px] items-center justify-center rounded-full bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.14)] ring-1 ring-zinc-200">
        <svg
          className="absolute inset-0 -rotate-90"
          width="52"
          height="52"
          viewBox="0 0 52 52"
        >
          <circle
            cx="26"
            cy="26"
            r={R}
            fill="none"
            stroke="#e4e4e7"
            strokeWidth="2.5"
          />
          <circle
            cx="26"
            cy="26"
            r={R}
            fill="none"
            stroke="#172556"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            className="transition-[stroke-dashoffset] duration-100 ease-linear"
          />
        </svg>
        <span className="relative z-10 text-[10px] font-bold tabular-nums text-[#172556]">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
