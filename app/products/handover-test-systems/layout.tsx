import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import {
  createBreadcrumbJsonLd,
  createCollectionPageJsonLd,
  createMetadata,
} from "@/lib/seo";
import { handoverSystemModels } from "@/lib/site";

const description =
  "Integrated handover test systems that combine attenuators, splitter and combiner units, and RF switching into compact validation platforms with up to 512 attenuation paths.";

export const metadata: Metadata = createMetadata({
  title: "Handover Test Systems",
  description,
  path: "/products/handover-test-systems",
  keywords: [
    "handover test systems",
    "roaming validation systems",
    "mobility test hardware",
    "RF handover testing",
  ],
});

export default function HandoverTestSystemsLayout({
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
            { name: "Products", path: "/products" },
            {
              name: "Handover Test Systems",
              path: "/products/handover-test-systems",
            },
          ]),
          createCollectionPageJsonLd({
            name: "Handover Test Systems",
            description,
            path: "/products/handover-test-systems",
            items: handoverSystemModels.map((model) => ({
              name: model,
              path: "/products/handover-test-systems",
              description: `Integrated handover validation system based on the ${model} topology.`,
            })),
          }),
        ]}
      />
      {children}
    </>
  );
}
