"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronRight, Loader2, Lock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

/* ─── Types ─── */

export interface VideoGateProps {
  webinarId: string;
  embedType: "iframe" | "video";
  embedSrc: string;
  poster: string;
  title: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  country: string;
  phone: string;
  address: string;
}

type FieldCfg = {
  name: keyof FormData;
  label: string;
  type: string;
  placeholder: string;
  zohoName: string;
  autoComplete?: string;
};

/* ─── Fields ─── */

const FIELDS: FieldCfg[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Jane",
    zohoName: "FIRSTNAME",
    autoComplete: "given-name",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Smith",
    zohoName: "LASTNAME",
    autoComplete: "family-name",
  },
  {
    name: "email",
    label: "Work Email",
    type: "email",
    placeholder: "jane@company.com",
    zohoName: "CONTACT_EMAIL",
    autoComplete: "email",
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    placeholder: "Acme Corp",
    zohoName: "COMPANYNAME",
    autoComplete: "organization",
  },
  {
    name: "jobTitle",
    label: "Job Title",
    type: "text",
    placeholder: "RF Engineer",
    zohoName: "JOB_TITLE",
    autoComplete: "organization-title",
  },
  {
    name: "country",
    label: "Country",
    type: "text",
    placeholder: "United States",
    zohoName: "COUNTRY",
    autoComplete: "country-name",
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "+1 (555) 000-0000",
    zohoName: "PHONE",
    autoComplete: "tel",
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "123 Main St, City",
    zohoName: "ADDRESS",
    autoComplete: "street-address",
  },
];

/* ─── Zoho submission (fire-and-forget via hidden iframe) ─── */

function submitToZoho(data: FormData) {
  if (typeof window === "undefined") return;

  const iframeName = `_zc_gate_${Date.now()}`;
  const iframe = document.createElement("iframe");
  iframe.name = iframeName;
  iframe.setAttribute(
    "style",
    "position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;",
  );
  document.body.appendChild(iframe);

  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://vtzl-zgph.maillist-manage.in/weboptin.zc";
  form.target = iframeName;
  form.style.display = "none";

  const payload: Record<string, string> = {
    FIRSTNAME: data.firstName,
    LASTNAME: data.lastName,
    CONTACT_EMAIL: data.email,
    COMPANYNAME: data.company,
    JOB_TITLE: data.jobTitle,
    COUNTRY: data.country,
    PHONE: data.phone,
    ADDRESS: data.address,
    zc_trackCode: "ZCFORMVIEW",
    viewFrom: "URL_ACTION",
    submitType: "optinCustomView",
    lD: "1492cbfa9dc0e33a",
    emailReportId: "",
    zx: "1dfc37c691",
    zcvers: "2.0",
    oldListIds: "",
    mode: "OptinCreateView",
    zcld: "1492cbfa9dc0e33a",
    zctd: "1492cbfa9dbb2e31",
    document_domain: "",
    zc_Url: "vtzl-zgph.maillist-manage.in",
    new_optin_response_in: "0",
    duplicate_optin_response_in: "0",
    zc_formIx:
      "3ze8ffe57c7b3f1c130a7da767d60f7ef2936cb3780e7617d0bacb15376af13cc6",
  };

  Object.entries(payload).forEach(([name, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();

  setTimeout(() => {
    try {
      document.body.removeChild(form);
    } catch {}
    try {
      document.body.removeChild(iframe);
    } catch {}
  }, 10_000);
}

/* ─── Validation ─── */

function validate(d: FormData): Partial<Record<keyof FormData, string>> {
  const e: Partial<Record<keyof FormData, string>> = {};
  if (!d.firstName.trim()) e.firstName = "Required";
  if (!d.lastName.trim()) e.lastName = "Required";
  if (!d.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))
    e.email = "Valid email required";
  if (!d.company.trim()) e.company = "Required";
  if (!d.jobTitle.trim()) e.jobTitle = "Required";
  if (!d.country.trim()) e.country = "Required";
  if (!d.phone.trim()) e.phone = "Required";
  if (!d.address.trim()) e.address = "Required";
  return e;
}

/* ═══════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════ */

const ease = [0.22, 1, 0.36, 1] as const;

const EMPTY_FORM: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  jobTitle: "",
  country: "",
  phone: "",
  address: "",
};

export function VideoGate({
  webinarId,
  embedType,
  embedSrc,
  poster,
  title,
}: VideoGateProps) {
  const storageKey = `webinar_gate_${webinarId}`;

  const [unlocked,   setUnlocked]   = useState(false);
  const [sheetOpen,  setSheetOpen]  = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [form,       setForm]       = useState<FormData>(EMPTY_FORM);
  const [errors,     setErrors]     = useState<Partial<Record<keyof FormData, string>>>({});

  useEffect(() => {
    try {
      if (sessionStorage.getItem(storageKey) === "true") setUnlocked(true);
    } catch {}
  }, [storageKey]);

  const change =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((p) => ({ ...p, [field]: e.target.value }));
      if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    submitToZoho(form);

    setTimeout(() => {
      try {
        sessionStorage.setItem(storageKey, "true");
      } catch {}
      setSubmitted(true);
      setSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {unlocked ? (
          /* ══ VIDEO PLAYER ══ */
          <motion.div
            key="video"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease }}
            className="overflow-hidden rounded-2xl bg-zinc-950 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.25)] ring-1 ring-black/10"
          >
            <div className="relative aspect-video w-full">
              {embedType === "iframe" ? (
                <iframe
                  src={embedSrc}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title={title}
                />
              ) : (
                <video
                  src={embedSrc}
                  controls
                  autoPlay
                  className="absolute inset-0 h-full w-full"
                  poster={poster}
                />
              )}
            </div>
          </motion.div>
        ) : (
          /* ══ THUMBNAIL + PLAY BUTTON ══ */
          <motion.div
            key="thumbnail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl shadow-[0_32px_80px_-16px_rgba(0,0,0,0.25)] ring-1 ring-black/10"
            onClick={() => setSheetOpen(true)}
          >
            <Image
              src={poster}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 960px"
              priority
            />
            {/* subtle gradient so play button is readable */}
            <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/35" />

            {/* play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex size-16 md:size-20 items-center justify-center rounded-full border border-white/20 bg-white/15 shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:bg-white/25"
              >
                <Play className="ml-1 size-7 md:size-8 fill-white text-white" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ SHEET ══ */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          className="w-full overflow-y-auto sm:max-w-md p-0 gap-0"
        >
          {/* header */}
          <SheetHeader className="border-b border-zinc-100 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#172556]/8">
                <Lock
                  className="size-[13px] text-[#172556]"
                  strokeWidth={1.75}
                />
              </div>
              <div>
                <SheetTitle className="text-[15px] font-semibold text-zinc-900">
                  Watch this webinar
                </SheetTitle>
                <SheetDescription className="text-[12px] text-zinc-400 mt-0.5">
                  Fill in your details for instant access
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          {/* form / success */}
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease }}
                className="flex flex-col flex-1 items-center justify-center px-6 py-12 text-center gap-6"
              >
                <div className="flex size-16 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-100">
                  <CheckCircle2 className="size-8 text-emerald-500" strokeWidth={1.75} />
                </div>
                <div className="space-y-1.5">
                  <p className="text-[17px] font-semibold text-zinc-900">You&rsquo;re all set!</p>
                  <p className="text-[13px] text-zinc-400 leading-relaxed max-w-[240px] mx-auto">
                    Thanks for registering. Your webinar is ready to watch.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSheetOpen(false);
                    setTimeout(() => setUnlocked(true), 250);
                  }}
                  className={cn(
                    "group inline-flex items-center justify-center gap-2",
                    "rounded-full px-7 py-2.5 text-[13.5px] font-semibold text-white",
                    "bg-[#172556] shadow-[0_8px_24px_-8px_rgba(23,37,86,0.4)]",
                    "transition-all duration-200",
                    "hover:bg-[#1e3070] hover:shadow-[0_12px_28px_-8px_rgba(23,37,86,0.5)]",
                  )}
                >
                  <Play className="size-3.5 fill-white" />
                  Watch Now
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col flex-1"
              >
                <div className="flex flex-col gap-4 px-6 pt-6 pb-4">
                  {FIELDS.map((f) => (
                    <div key={f.name} className="flex flex-col gap-1.5">
                      <label
                        htmlFor={`gate-${f.name}`}
                        className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-400"
                      >
                        {f.label}
                        <span className="ml-0.5 text-red-400">*</span>
                      </label>
                      <input
                        id={`gate-${f.name}`}
                        type={f.type}
                        value={form[f.name]}
                        onChange={change(f.name)}
                        placeholder={f.placeholder}
                        disabled={submitting}
                        autoComplete={f.autoComplete}
                        className={cn(
                          "h-10 w-full rounded-lg border px-3.5 text-[13.5px] text-zinc-900",
                          "placeholder:text-zinc-300 outline-none transition-all duration-150",
                          "bg-zinc-50 hover:bg-white",
                          "focus:bg-white focus:ring-2",
                          "disabled:cursor-not-allowed disabled:opacity-55",
                          errors[f.name]
                            ? "border-red-300 bg-red-50/50 focus:border-red-300 focus:ring-red-100"
                            : "border-zinc-200 focus:border-[#172556]/40 focus:ring-[#172556]/10",
                        )}
                      />
                      {errors[f.name] && (
                        <p className="text-[11px] font-medium text-red-500 leading-tight">
                          {errors[f.name]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* footer */}
                <div className="mt-auto border-t border-zinc-100 px-6 py-5 space-y-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={cn(
                      "group w-full inline-flex items-center justify-center gap-2",
                      "rounded-full py-2.5 text-[13.5px] font-semibold text-white",
                      "bg-[#172556] shadow-[0_8px_24px_-8px_rgba(23,37,86,0.4)]",
                      "transition-all duration-200",
                      "hover:bg-[#1e3070] hover:shadow-[0_12px_28px_-8px_rgba(23,37,86,0.5)]",
                      "disabled:cursor-not-allowed disabled:opacity-65 disabled:shadow-none",
                    )}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Unlocking…
                      </>
                    ) : (
                      <>
                        Submit
                        <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </SheetContent>
      </Sheet>
    </>
  );
}
