import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import { createBreadcrumbJsonLd, createMetadata } from "@/lib/seo";

const description =
  "Watch live and on-demand Wavenxt webinars on RF test automation, attenuator control, handover validation, and wireless measurement best practices.";

export const metadata: Metadata = createMetadata({
  title: "RF Testing Webinars",
  description,
  path: "/resources/webinars",
  keywords: [
    "RF testing webinars",
    "wireless validation webinar",
    "attenuator automation",
    "handover testing tutorial",
  ],
});

export default function WebinarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources/blogs" },
          { name: "Webinars", path: "/resources/webinars" },
        ])}
      />
      {children}
    </>
  );
}
