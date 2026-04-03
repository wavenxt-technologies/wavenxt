import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  FileDown,
  Radio,
  Gauge,
  Zap,
  Globe,
  Shield,
  GitBranch,
  Clock,
  Monitor,
} from "lucide-react";

/* ── Model data derived from URL id ──────────────────────────────────── */

const FREQ_MAP: Record<string, { band: string; max: string; tag: string }> = {
  8: { band: "200 – 8000 MHz", max: "8 GHz", tag: "8 GHz" },
  6: { band: "200 – 6000 MHz", max: "6 GHz", tag: "6 GHz" },
  3: { band: "200 – 3000 MHz", max: "3 GHz", tag: "3 GHz" },
};

const MODEL_IMAGES: Record<string, string> = {
  8: "/atten8.jpg",
  4: "/atten4.jpg",
  2: "/atten2.jpg",
  1: "/atten1.jpg",
};

function parseModel(id: string) {
  const upper = (id || "").toUpperCase();
  const match = upper.match(/MT(\d)(\d)A/);
  if (!match) return null;
  const [, freqTag, ch] = match;
  const freq = FREQ_MAP[freqTag];
  if (!freq) return null;
  return {
    raw: upper,
    model: `MT-${freqTag}${ch}A`,
    freqTag,
    ch,
    chNum: parseInt(ch),
    freq,
    sizeLabel: `${ch} Channel`,
    image: MODEL_IMAGES[ch] ?? MODEL_IMAGES["8"],
  };
}

/* ── Static spec table ───────────────────────────────────────────────── */

const datasheetRows = [
  { parameter: "Impedance", condition: "", min: "", typ: "50", max: "", unit: "Ω" },
  { parameter: "Shielding", condition: "", min: "", typ: "90", max: "", unit: "dB" },
  { parameter: "Isolation between Channels", condition: "", min: "", typ: "85", max: "", unit: "dB" },
  { parameter: "Insertion Loss", condition: "< 2.5 GHz", min: "", typ: "6", max: "6.5", unit: "dB" },
  { parameter: "Insertion Loss", condition: "< 6 GHz", min: "", typ: "7", max: "8", unit: "dB" },
  { parameter: "Insertion Loss", condition: "< 8 GHz", min: "", typ: "9.5", max: "11", unit: "dB" },
  { parameter: "Attenuation Range", condition: "", min: "0", typ: "", max: "95", unit: "dB" },
  { parameter: "Step Size", condition: "", min: "", typ: "0.25", max: "", unit: "dB" },
  { parameter: "Attenuation Accuracy", condition: "", min: "", typ: "0.25", max: "1.5", unit: "dB" },
  { parameter: "Switching Speed", condition: "", min: "", typ: "2", max: "", unit: "µs" },
  { parameter: "Maximum Input Level", condition: "Operating", min: "", typ: "+28", max: "", unit: "dBm" },
  { parameter: "Maximum Input Level", condition: "Absolute", min: "", typ: "+33", max: "", unit: "dBm" },
  { parameter: "Input IP3", condition: "", min: "", typ: "58", max: "", unit: "dBm" },
  { parameter: "Operating Modes", condition: "", min: "", typ: "Uni / Bi-Directional", max: "", unit: "" },
  { parameter: "Control", condition: "", min: "", typ: "GUI / REST APIs", max: "", unit: "" },
  { parameter: "Power", condition: "", min: "", typ: "PoE (802.3af)", max: "", unit: "" },
  { parameter: "Operating Temperature", condition: "", min: "−30", typ: "", max: "+70", unit: "°C" },
];

/* ── Applications ────────────────────────────────────────────────────── */

const applications = [
  { title: "Wi-Fi & 5G Device Characterisation", desc: "Validate throughput and sensitivity of 802.11be, 5G-FR1, and LTE devices across the full operating frequency range." },
  { title: "Throughput vs. Range Mapping", desc: "Step attenuation to simulate real-world propagation distances and map device performance curves repeatably." },
  { title: "Roaming & Handover Validation", desc: "Reproduce controlled signal transitions between access points or base stations for seamless mobility testing." },
  { title: "Mesh & Band-Steering Tests", desc: "Test multi-node mesh network behaviour and band-steering logic under precisely controlled RF path conditions." },
  { title: "Receiver Sensitivity", desc: "Determine minimum detectable signal levels with fine 0.25 dB steps and repeatable measurement accuracy." },
  { title: "Device Verification Testbeds", desc: "System-level RF testbeds for design validation, compliance testing, and pre-production certification." },
  { title: "Automated Manufacturing Test", desc: "High-throughput production lines needing 24/7 unattended operation, fast switching, and full API control." },
  { title: "MIMO & Multi-Antenna Testing", desc: "Configure independent attenuation per spatial stream to test MIMO systems under asymmetric channel conditions." },
];

/* ── Page ─────────────────────────────────────────────────────────────── */

export default async function DigitalAttenuatorProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const m = parseModel(id);
  if (!m) notFound();

  const featuresData = [
    { icon: Radio, title: "Broad Frequency Coverage", stat: m.freq.max, desc: `Precision attenuation from 200 MHz to ${m.freq.max} — covering 5G FR1, Wi-Fi 6/6E/7, LTE, and all major cellular bands.` },
    { icon: Gauge, title: "95 dB Dynamic Range", stat: "95 dB", desc: "Wide 0–95 dB attenuation range with 0.25 dB resolution for accurate, repeatable signal power control in every scenario." },
    { icon: Zap, title: "PoE Powered", stat: "802.3af", desc: "A single Ethernet cable delivers both power and control — no extra PSU, no extra cabling, plug-and-play in any lab rack." },
    { icon: Globe, title: "Browser & API Control", stat: "REST + GUI", desc: "Built-in web GUI plus REST and USB APIs allow manual control or seamless integration with any automation framework." },
    { icon: Shield, title: "Complete RF Shielding", stat: "90 dB", desc: "90 dB enclosure shielding and 85 dB channel isolation ensure interference-free measurements on all active paths." },
    { icon: GitBranch, title: `${m.chNum}-Channel Architecture`, stat: `${m.chNum} ch`, desc: `${m.chNum} fully independent RF paths with 2 µs switching for concurrent multi-device or multi-band test setups.` },
    { icon: Clock, title: "24/7 Automated Operation", stat: "24/7", desc: "Designed for continuous unattended use in engineering characterisation and high-volume production test lines." },
    { icon: Monitor, title: "Cross-Platform Software", stat: "3 OS", desc: "Control GUI and APIs run natively on Windows, Linux, and Mac OS — no proprietary drivers or licence fees." },
  ];

  const heroSpecs = [
    { label: "Frequency", value: m.freq.band },
    { label: "Channels", value: `${m.ch} ch` },
    { label: "Dynamic Range", value: "95 dB" },
    { label: "Step Size", value: "0.25 dB" },
    { label: "Connector", value: "SMA Female" },
    { label: "Power", value: "PoE" },
  ];

  const siblings = ["8", "4", "2", "1"]
    .filter((c) => c !== m.ch)
    .map((c) => ({
      id: `mt${m.freqTag}${c}a`,
      model: `MT-${m.freqTag}${c}A`,
      ch: parseInt(c),
      band: m.freq.band,
      image: MODEL_IMAGES[c] ?? MODEL_IMAGES["8"],
    }))
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-zinc-900">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-0 pt-36 md:px-10 md:pt-44">
        <p className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
          <Link
            href="/products"
            className="transition-colors hover:text-zinc-800"
          >
            Products
          </Link>
          <span className="h-px w-6 bg-zinc-300" />
          <Link
            href="/products/digital-attenuators"
            className="transition-colors hover:text-zinc-800"
          >
            Digital Attenuators
          </Link>
          <span className="h-px w-6 bg-zinc-300" />
          <span className="text-zinc-700">{m.model}</span>
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <span className="mb-4 inline-block rounded-full bg-[#172556] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
              {m.model}
            </span>
            <h1 className="font-heading text-5xl font-medium leading-[1.1] tracking-tight md:text-7xl lg:text-8xl">
              {m.sizeLabel}
              <br />
              Attenuator
            </h1>
          </div>
          <div className="md:col-span-4">
            <p className="text-base leading-relaxed text-zinc-600">
              The {m.model} is a fully shielded, digitally controlled{" "}
              {m.chNum}-channel RF attenuator covering {m.freq.band}.
              PoE-powered with browser and API control — built for high-accuracy
              automated test environments.
            </p>
          </div>
        </div>
      </section>

      {/* ── Hero image grid ───────────────────────────────────────────────── */}
      <section className="mx-auto mt-12 max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-12 gap-3 md:gap-4">
          <div className="col-span-12 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 md:col-span-8">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={m.image}
                alt={m.model}
                fill
                sizes="(max-width:768px) 100vw, 66vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="col-span-12 grid grid-cols-2 gap-3 md:col-span-4 md:grid-cols-1 md:gap-4">
            {heroSpecs.slice(0, 3).map((s) => (
              <div
                key={s.label}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white px-5 py-5"
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  {s.label}
                </p>
                <p className="mt-3 font-heading text-lg font-medium leading-snug text-zinc-900">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 md:mt-4">
          {heroSpecs.slice(3).map((s) => (
            <div key={s.label} className="bg-[#f7f7f5] px-6 py-5">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                {s.label}
              </p>
              <p className="font-heading text-base font-medium text-zinc-900">
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pull quote ───────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div className="flex gap-8 md:gap-14">
          <div className="w-1 shrink-0 rounded-full bg-[#172556]" />
          <p className="max-w-4xl text-xl leading-relaxed text-zinc-700 md:text-2xl md:leading-relaxed">
            The {m.model} covers {m.freq.band} with a full 95 dB dynamic range,
            0.25 dB resolution, and {m.chNum} independent channels —
            PoE-powered, browser-controlled, and ready for 24/7 automated test
            operation without calibration or active components.
          </p>
        </div>
      </section>

      {/* ── Key Features — editorial rows ─────────────────────────────── */}
      <section className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            {/* Left — sticky header */}
            <div className="md:col-span-4">
              <div className="md:sticky md:top-28">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  Key Features
                </p>
                <h2 className="font-heading text-3xl font-medium leading-[1.15] tracking-tight md:text-4xl">
                  Built for precision
                  <br />
                  and automation
                </h2>
                <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-500">
                  Every specification is engineered for repeatable, accurate RF
                  control in demanding test environments.
                </p>
                <div className="mt-8 hidden grid-cols-2 gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 md:grid">
                  {[
                    { label: "Range", value: "95 dB" },
                    { label: "Step", value: "0.25 dB" },
                    { label: "Speed", value: "2 µs" },
                    { label: "Channels", value: `${m.chNum} ch` },
                  ].map((s) => (
                    <div key={s.label} className="bg-white px-4 py-3.5">
                      <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                        {s.label}
                      </p>
                      <p className="font-heading text-sm font-medium tabular-nums text-zinc-900">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — feature rows */}
            <div className="md:col-span-8">
              {featuresData.map((f, i) => (
                <div
                  key={i}
                  className="group -mx-4 grid grid-cols-[auto_1fr_auto] items-start gap-x-4 rounded-lg border-t border-zinc-200 px-4 py-7 transition-colors last:border-b hover:bg-zinc-50/60 md:grid-cols-[2rem_1fr_auto] md:gap-x-6 md:py-9"
                >
                  <span className="pt-1 text-xs font-medium tabular-nums text-zinc-400 transition-colors group-hover:text-zinc-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <div className="mb-1.5 flex items-center gap-2.5">
                      <f.icon className="size-4 shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-700" />
                      <h3 className="text-base font-medium leading-snug text-zinc-900">
                        {f.title}
                      </h3>
                    </div>
                    <p className="pl-[26px] text-sm leading-relaxed text-zinc-500">
                      {f.desc}
                    </p>
                  </div>

                  <div className="pt-0.5 text-right">
                    <span className="inline-block rounded-lg bg-zinc-100 px-3 py-1.5 text-sm font-semibold tabular-nums text-zinc-700 transition-all duration-200 group-hover:bg-[#172556] group-hover:text-white">
                      {f.stat}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Applications — bento grid ─────────────────────────────────── */}
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

        <div className="relative mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-14 grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-blue-200/70">
                Applications
              </p>
              <h2 className="font-heading text-3xl font-medium leading-tight tracking-tight md:text-4xl">
                Where the {m.model}
                <br />
                is used
              </h2>
            </div>
            <div className="md:col-span-6">
              <p className="mb-6 text-sm leading-relaxed text-blue-100/60">
                From R&D characterisation to high-volume production testing —
                wherever programmable, accurate RF attenuation is needed.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="/support"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-blue-200"
                >
                  Talk to an engineer <ArrowUpRight className="size-4" />
                </Link>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-200/50 transition-colors hover:text-white"
                >
                  <FileDown className="size-4" /> Datasheet
                </a>
              </div>
            </div>
          </div>

          {/* Bento grid — 3 cols, mixed spans */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
            {applications.map((app, i) => {
              const isWide = i === 0 || i === 5;
              return (
                <div
                  key={i}
                  className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-7 backdrop-blur-sm transition-colors hover:bg-white/[0.07] md:p-8 ${
                    isWide ? "sm:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-400/[0.06] blur-2xl transition-opacity group-hover:bg-blue-300/10" />

                  <div className="relative">
                    <span className="mb-4 inline-block text-xs font-medium tabular-nums text-white/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base font-semibold leading-snug text-white md:text-lg">
                      {app.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-blue-100/40">
                      {app.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Specifications ────────────────────────────────────────────── */}
      <section
        id="specs"
        className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28"
      >
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              Specifications
            </p>
            <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
              Technical Data
            </h2>
            <p className="mt-3 max-w-lg text-zinc-600">
              Complete performance data for the {m.model}.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-2xl bg-zinc-900 px-6 py-3.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-zinc-800 md:self-auto"
          >
            <FileDown className="size-4" /> Download Datasheet
          </a>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] lg:col-span-8">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-200 bg-[#f7f7f5]">
                <tr>
                  {["Parameter", "Condition", "Min", "Typ", "Max", "Unit"].map(
                    (h) => (
                      <th
                        key={h}
                        className="whitespace-nowrap px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-500"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {datasheetRows.map((row, i) => (
                  <tr
                    key={i}
                    className="transition-colors hover:bg-zinc-50/60"
                  >
                    <td className="px-5 py-4 font-medium text-zinc-900">
                      {row.parameter}
                    </td>
                    <td className="px-5 py-4 text-xs text-zinc-500">
                      {row.condition || "—"}
                    </td>
                    <td className="px-5 py-4 text-zinc-600">
                      {row.min || "—"}
                    </td>
                    <td className="px-5 py-4 text-zinc-600">
                      {row.typ || "—"}
                    </td>
                    <td className="px-5 py-4 text-zinc-600">
                      {row.max || "—"}
                    </td>
                    <td className="px-5 py-4 text-zinc-500">
                      {row.unit || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)]">
                <h3 className="mb-2 text-base font-medium text-zinc-900">
                  Download Resources
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-zinc-500">
                  Full datasheet with performance graphs, insertion loss curves,
                  and software documentation for the {m.model}.
                </p>
                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 py-3.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-zinc-800"
                >
                  <FileDown className="size-4" /> Download Datasheet
                </a>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)]">
                <h3 className="mb-2 text-base font-medium text-zinc-900">
                  Need a different channel count?
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-zinc-500">
                  Available in 1, 2, 4, and 8-channel configurations across
                  three frequency bands.
                </p>
                <Link
                  href="/products/digital-attenuators"
                  className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 underline underline-offset-4 transition-colors hover:text-[#172556]"
                >
                  View all models <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Other models in same band ─────────────────────────────────── */}
      <section className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Same Band · Different Channel Count
              </p>
              <p className="text-sm text-zinc-600">{m.freq.band}</p>
            </div>
            <Link
              href="/products/digital-attenuators"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
            >
              View all <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {siblings.map((sib) => (
              <Link
                key={sib.id}
                href={`/products/digital-attenuators/${sib.id}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:border-zinc-300 hover:shadow-[0_6px_24px_-8px_rgba(0,0,0,0.1)]"
              >
                <div className="relative aspect-video overflow-hidden bg-zinc-100">
                  <Image
                    src={sib.image}
                    alt={sib.model}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                    {sib.model}
                  </p>
                  <p className="font-heading text-base font-medium text-zinc-900">
                    {sib.ch} Channel Attenuator
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">{sib.band}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4">
                    <span className="text-xs text-zinc-400">
                      95 dB · 0.25 dB step · PoE
                    </span>
                    <span className="flex size-7 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition-all group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white">
                      <ArrowUpRight className="size-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
