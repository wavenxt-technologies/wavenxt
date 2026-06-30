import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import { createBreadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

const description =
  "Engineering insights, application notes, and guides on RF attenuators, matrix systems, handover testing, and wireless validation from the Wavenxt team.";

export const metadata: Metadata = createMetadata({
  title: "RF & Wireless Testing Blog",
  description,
  path: "/resources/blogs",
  keywords: [
    "RF testing blog",
    "wireless validation articles",
    "attenuator application notes",
    "handover testing guide",
    "RF engineering insights",
  ],
});

export default function BlogsLayout({
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
            { name: "Resources", path: "/resources/blogs" },
            { name: "Blog", path: "/resources/blogs" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${siteConfig.name} Blog`,
            description,
            url: absoluteUrl("/resources/blogs"),
            inLanguage: "en",
            publisher: {
              "@type": "Organization",
              name: siteConfig.legalName,
              url: absoluteUrl("/"),
            },
          },
        ]}
      />
      {children}
    </>
  );
}
