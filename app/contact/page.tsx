"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Mail,
  Phone,
  ArrowUpRight,
  CheckCircle,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const contactDetails = [
  {
    label: "For Support",
    value: "support@wavenxt.com",
    href: "mailto:support@wavenxt.com",
  },
  {
    label: "For Sales",
    value: "sales@wavenxt.com",
    href: "mailto:sales@wavenxt.com",
  },
  {
    label: "Landline Number",
    value: "080-4164 3659 | Monday - Friday",
    href: "tel:08041643659",
  },
  {
    label: "Phone Number",
    value: "+91 74837 59420 | Monday - Friday",
    href: "tel:+917483759420",
  },
  {
    label: "Office Location",
    value: "#847 2nd Floor A block Sahakaranagar Bangalore 560092",
  },
];

const fieldClass =
  "mt-2 w-full rounded-xl border border-zinc-300/80 bg-zinc-50/80 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-all duration-200 focus:border-[#172556] focus:bg-white focus:ring-2 focus:ring-[#172556]/10";

export default function SupportPage() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          subject: fd.get("subject"),
          message: fd.get("message"),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

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
            Let&apos;s Connect
          </motion.p>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mt-6 max-w-5xl font-heading text-4xl font-medium leading-[1.1] tracking-tight text-zinc-900 md:text-6xl"
          >
            We&apos;d Love to Hear From You!
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-8 max-w-4xl leading-relaxed text-zinc-600"
          >
            At Wavenxt, your satisfaction is our top priority. Whether you have
            questions, need assistance, or want to explore new opportunities
            with us, we&apos;re here to provide all the support you need. Our
            dedicated team of experts is always ready to offer personalized
            solutions and insights to help you get the most out of our products.
            Don&apos;t hesitate to reach out - no question is too small, and no
            idea is too big. We&apos;re committed to ensuring your success every
            step of the way, from initial inquiries to ongoing support.
            Let&apos;s innovate and grow together.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Form + Sidebar ── */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 pt-0 pb-20 md:grid-cols-12 md:px-10 md:pt-0 md:pb-28">
        {/* Form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="md:col-span-7"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="rounded-3xl border border-zinc-200/80 bg-gradient-to-b from-zinc-100/80 to-zinc-50/80 p-6 shadow-[0_1px_0_0_rgba(0,0,0,0.03)] backdrop-blur-sm md:p-8"
          >
            <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
              Send us a message
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-zinc-600">
              Share your query and our team will get back with the right
              guidance.
            </p>

            {status === "success" && (
              <div className="mt-8 flex flex-col items-center justify-center rounded-2xl bg-emerald-50/60 py-12 text-center">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-100">
                  <CheckCircle className="size-6 text-emerald-600" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-medium text-zinc-900">
                  Message Sent
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">
                  Thank you for reaching out. Our team will get back to you
                  within 24 hours.
                </p>
              </div>
            )}

            <form
              className={`mt-8 grid gap-5 md:grid-cols-2 ${status === "success" ? "hidden" : ""}`}
              onSubmit={handleSubmit}
            >
              <motion.div variants={fadeUp} custom={1}>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-zinc-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className={fieldClass}
                  placeholder="Your full name"
                />
              </motion.div>

              <motion.div variants={fadeUp} custom={2}>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-zinc-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={fieldClass}
                  placeholder="you@company.com"
                />
              </motion.div>

              <motion.div variants={fadeUp} custom={3}>
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-zinc-700"
                >
                  Phone{" "}
                  <span className="font-normal text-zinc-400">(Optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={fieldClass}
                  placeholder="+00 00000 00000"
                />
              </motion.div>

              <motion.div variants={fadeUp} custom={4}>
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-zinc-700"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className={fieldClass}
                  placeholder="How can we help?"
                />
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={5}
                className="md:col-span-2"
              >
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-zinc-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className={`${fieldClass} resize-none`}
                  placeholder="Tell us about your requirement or issue..."
                />
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={6}
                className="md:col-span-2"
              >
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#172556] px-7 py-3 text-sm font-medium text-white shadow-[0_10px_24px_-10px_rgba(23,37,86,0.5)] transition-colors hover:bg-[#1e3070] disabled:opacity-60"
                >
                  {status === "loading" ? "Sending..." : "Submit Inquiry"}
                </motion.button>
                {status === "error" && (
                  <p className="mt-2 text-sm text-red-500">
                    Something went wrong. Please try again.
                  </p>
                )}
              </motion.div>
            </form>
          </motion.div>
        </motion.div>

        {/* Sidebar */}
        <motion.aside
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="space-y-6 md:col-span-5"
        >
          {/* Contact Details */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="rounded-3xl border border-zinc-200/80 bg-gradient-to-b from-zinc-100/80 to-zinc-50/80 p-6 shadow-[0_1px_0_0_rgba(0,0,0,0.03)] backdrop-blur-sm"
          >
            <h3 className="font-heading text-xl font-medium tracking-tight">
              Contact Details
            </h3>
            <div className="mt-5 space-y-4">
              {contactDetails.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-zinc-200/80 pb-4 last:border-0 last:pb-0"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="group mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 transition-colors hover:text-[#172556]"
                    >
                      {item.value}
                      <ArrowUpRight className="size-3.5 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : (
                    <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-800">
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-gradient-to-b from-zinc-100/80 to-zinc-50/80 shadow-[0_1px_0_0_rgba(0,0,0,0.03)]"
          >
            <div className="border-b border-zinc-200/80 p-5">
              <h3 className="font-heading text-xl font-medium tracking-tight">
                Find Us
              </h3>
              <p className="mt-2 text-sm text-zinc-600">
                Visit our location or use the map to plan your route.
              </p>
            </div>
            <div className="aspect-4/3 w-full">
              <iframe
                title="Wavenxt Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.560391827154!2d77.58399237578841!3d13.063630612852435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae18223d26c1f7%3A0xe2ff1b42fcbf6c3a!2sPremier%20Measurement%20Solutions%20Private%20Limited!5e0!3m2!1sen!2sin!4v1775478059147!5m2!1sen!2sin"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.aside>
      </section>

      {/* ── Technical Support CTA ── */}
      <section className="relative overflow-hidden bg-[#172556]">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-indigo-400/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm md:p-10"
          >
            <div className="grid items-center gap-10 md:grid-cols-12">
              <motion.div
                variants={fadeUp}
                custom={0}
                className="md:col-span-4"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-blue-200/70">
                  Technical Assistance
                </p>
                <h2 className="mt-4 font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
                  Need Technical Support?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-blue-100/60">
                  Talk directly to a team that understands your systems,
                  integration constraints, and validation timelines.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={1}
                className="md:col-span-8"
              >
                <p className="text-base leading-relaxed text-blue-100/80 md:text-lg">
                  Our dedicated team is ready to help troubleshoot any issues
                  you may face. Whether it&apos;s a product concern or service
                  inquiry, we&apos;re committed to finding the right solution
                  for you.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      icon: Mail,
                      text: "support@wavenxt.com",
                      href: "mailto:support@wavenxt.com",
                    },
                    {
                      icon: Mail,
                      text: "sales@wavenxt.com",
                      href: "mailto:sales@wavenxt.com",
                    },
                    {
                      icon: Phone,
                      text: "+91 74837 59420",
                      href: "tel:+917483759420",
                    },
                  ].map((item) => (
                    <motion.a
                      key={item.text}
                      href={item.href}
                      whileHover={{
                        y: -2,
                        backgroundColor: "rgba(255,255,255,0.12)",
                      }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm text-blue-50/90 transition-colors"
                    >
                      <item.icon className="size-4 shrink-0 text-blue-300/70" />
                      {item.text}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
