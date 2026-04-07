import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import {
  createAboutPageJsonLd,
  createBreadcrumbJsonLd,
  createMetadata,
} from "@/lib/seo";

const description =
  "Learn how Wavenxt Technologies designs dependable RF test systems for wireless validation, signal control, system integration, and repeatable performance.";

export const metadata: Metadata = createMetadata({
  title: "About Us",
  description,
  path: "/about-us",
  keywords: [
    "about Wavenxt",
    "RF engineering company",
    "wireless validation experts",
  ],
});

export default function AboutLayout({
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
            { name: "About Us", path: "/about-us" },
          ]),
          createAboutPageJsonLd({
            name: "About Wavenxt",
            description,
            path: "/about-us",
          }),
        ]}
      />
      {children}
    </>
  );
}
