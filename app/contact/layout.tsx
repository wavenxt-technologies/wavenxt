import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import {
  createBreadcrumbJsonLd,
  createContactPageJsonLd,
  createMetadata,
} from "@/lib/seo";

const description =
  "Contact Wavenxt for RF test system sales, technical support, custom validation workflows, and engineering consultation.";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description,
  path: "/contact",
  keywords: [
    "contact Wavenxt",
    "RF test system support",
    "wireless validation sales",
  ],
});

export default function SupportLayout({
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
            { name: "Contact", path: "/contact" },
          ]),
          createContactPageJsonLd({
            name: "Contact Wavenxt",
            description,
            path: "/contact",
          }),
        ]}
      />
      {children}
    </>
  );
}
