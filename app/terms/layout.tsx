import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import { createBreadcrumbJsonLd, createMetadata } from "@/lib/seo";

const description =
  "Terms and Conditions of Sale governing the purchase of products and services from Wavenxt Technologies Pvt. Ltd.";

export const metadata: Metadata = createMetadata({
  title: "Terms & Conditions of Sale",
  description,
  path: "/terms",
  keywords: ["terms and conditions of sale", "Wavenxt terms", "sales terms"],
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={[
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Terms & Conditions of Sale", path: "/terms" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
