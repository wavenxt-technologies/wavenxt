"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import posthog from "posthog-js";
import styles from "./zoho-form.module.css";

/*
  Zoho Campaigns web-optin form ("Evaluation Request Form"), converted from
  Zoho's raw copy-code HTML. Field names and hidden tags must stay exactly as
  Zoho exports them, or submissions are rejected.

  Instead of Zoho's target="_blank", the form posts into a hidden iframe so
  the visitor stays on the page and sees the success message inline.
*/

// `value` must match the Zoho picklist exactly, including Zoho's
// "Custom Desgin" spelling.
const solutionOptions = [
  { label: "Digital Attenuators", value: "Digital Attenuators" },
  { label: "Mesh Attenuators", value: "Mesh Attenuators" },
  { label: "Matrix Systems", value: "Matrix Systems" },
  { label: "Butler Matrix", value: "Butler Matrix" },
  { label: "Custom Design", value: "Custom Desgin" },
];

function Label({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label htmlFor={htmlFor}>
      {children}
      <span aria-hidden="true">*</span>
    </label>
  );
}

export default function ZohoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const fallbackTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    };
  }, []);

  // The success state only replaces the form once Zoho has answered in the
  // hidden iframe. The <form> must stay in the DOM while the browser sends
  // it, otherwise the submission is cancelled ("form is not connected").
  function markSent() {
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    setSending(false);
    setSubmitted(true);
  }

  function handleFrameLoad() {
    if (sending) markSent();
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    // Zoho's zcScptlessSubmit(): bots that don't run JavaScript still send
    // zc_spmSubmit and get filtered out. Disabled inputs aren't submitted.
    const spam = form.elements.namedItem("zc_spmSubmit");
    if (spam instanceof HTMLInputElement) spam.disabled = true;

    // Do not preventDefault: the native POST goes to the hidden iframe.
    const fd = new FormData(form);
    posthog.capture("contact_form_submitted", {
      subject: fd.get("JOB_TITLE"),
      company_name: fd.get("COMPANYNAME"),
      company_location: fd.get("COUNTRY"),
      solutions: fd.get("CONTACT_CF5"),
    });
    setHasErrors(false);
    setSending(true);
    // If Zoho's response page never fires a load event, still confirm.
    fallbackTimer.current = setTimeout(markSent, 6000);
  }

  return (
    <div id="SIGNUP_PAGE" className={styles.zoho}>
      <div id="signupMainDiv">
        {submitted && (
          <div id="Zc_SignupSuccess" role="status">
            <span className={styles.successIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h2 id="signupSuccessMsg">Thank you, your request is in</h2>
            <p>Our team will review it and get back to you within 24 hours.</p>
          </div>
        )}

        <form
          hidden={submitted}
          aria-busy={sending}
          method="POST"
          id="zcampaignOptinForm"
          action="https://vtzl-zgph.maillist-manage.in/weboptin.zc"
          target="zoho-signup-frame"
          onSubmit={handleSubmit}
          onInvalidCapture={() => setHasErrors(true)}
        >
          <div id="SIGNUP_BODY_ALL">
            <h2 id="SIGNUP_HEADING">Evaluation Request Form</h2>
            <div id="SIGNUP_BODY">
              <p id="SIGNUP_DESCRIPTION">
                Request a demo or get a validation unit to explore performance
                and compatibility in real conditions.
              </p>

              {hasErrors && (
                <div id="errorMsgDiv" role="alert">
                  Please correct the marked field(s) below.
                </div>
              )}

              <div className="zcsffieldsdiv">
                <div>
                  <Label htmlFor="FIRSTNAME">Name</Label>
                  <div className="zcinputbox">
                    <input
                      id="FIRSTNAME"
                      name="FIRSTNAME"
                      type="text"
                      maxLength={100}
                      autoComplete="name"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="CONTACT_EMAIL">Email</Label>
                  <div className="zcinputbox">
                    <input
                      id="CONTACT_EMAIL"
                      name="CONTACT_EMAIL"
                      type="email"
                      maxLength={100}
                      autoComplete="email"
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="PHONE">Phone</Label>
                  <div className="zcinputbox">
                    <input
                      id="PHONE"
                      name="PHONE"
                      type="tel"
                      maxLength={20}
                      autoComplete="tel"
                      placeholder="+91 00000 00000"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="COMPANYNAME">Company Name</Label>
                  <div className="zcinputbox">
                    <input
                      id="COMPANYNAME"
                      name="COMPANYNAME"
                      type="text"
                      maxLength={100}
                      autoComplete="organization"
                      placeholder="Your company"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="COUNTRY">Company Location</Label>
                  <div className="zcinputbox">
                    <input
                      id="COUNTRY"
                      name="COUNTRY"
                      type="text"
                      maxLength={100}
                      placeholder="City, Country"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="CONTACT_CF5">Solutions</Label>
                  <div className="zcinputbox">
                    <select
                      id="CONTACT_CF5"
                      name="CONTACT_CF5"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select a solution
                      </option>
                      {solutionOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.full}>
                  <Label htmlFor="JOB_TITLE">Subject</Label>
                  <div className="zcinputbox">
                    <input
                      id="JOB_TITLE"
                      name="JOB_TITLE"
                      type="text"
                      maxLength={50}
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                </div>

                <div className={styles.full}>
                  <Label htmlFor="NOTE">Message</Label>
                  <div className="zcinputbox">
                    <textarea
                      id="NOTE"
                      name="NOTE"
                      rows={5}
                      placeholder="Tell us about your setup, frequency range and channel count…"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={styles.footer}>
                <p id="REQUIRED_FIELD_TEXT">*Required Fields</p>
                <input
                  type="submit"
                  id="zcWebOptin"
                  name="SIGNUP_SUBMIT_BUTTON"
                  value="Submit Request"
                />
              </div>
            </div>

            {/* Do not edit the below Zoho Campaigns hidden tags */}
            <input type="hidden" name="zc_trackCode" value="ZCFORMVIEW" />
            <input type="hidden" name="viewFrom" value="URL_ACTION" />
            <input type="hidden" name="submitType" value="optinCustomView" />
            <input type="hidden" name="lD" value="1492cbfa9dc0a5ba" />
            <input type="hidden" name="emailReportId" value="" />
            <input type="hidden" name="zx" value="1dfc37c691" />
            <input type="hidden" name="zcvers" value="2.0" />
            <input type="hidden" name="oldListIds" value="" />
            <input type="hidden" name="mode" value="OptinCreateView" />
            <input type="hidden" name="zcld" value="1492cbfa9dc0a5ba" />
            <input type="hidden" name="zctd" value="1492cbfa9dbb2e31" />
            <input
              type="hidden"
              name="zc_formIx"
              value="3z9aec480a2f989d896f5f16b6a5c9270d1bf5144ba7f6d0ba5bfe7597ceb4bc5b"
            />
            {/* End of the campaigns hidden tags */}
          </div>
          <input type="hidden" name="scriptless" value="yes" />
          <input type="hidden" name="zc_spmSubmit" value="ZCSPMSUBMIT" />
        </form>

        <div id="privacyNotes">
          Note: It is our responsibility to protect your privacy and we
          guarantee that your data will be completely confidential.
        </div>
      </div>

      {/* Receives Zoho's response so the page never navigates away */}
      <iframe
        name="zoho-signup-frame"
        title="Form submission"
        onLoad={handleFrameLoad}
        hidden
        tabIndex={-1}
      />
    </div>
  );
}
