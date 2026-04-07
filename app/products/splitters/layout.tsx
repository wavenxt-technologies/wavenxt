import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import {
  createBreadcrumbJsonLd,
  createCollectionPageJsonLd,
  createMetadata,
} from "@/lib/seo";
import { splitterModels } from "./data";

const description =
  "Wideband RF splitter and combiner products engineered for balanced signal distribution, low insertion loss, and repeatable performance from 0.5 to 18 GHz.";

export const metadata: Metadata = createMetadata({
  title: "Splitters",
  description,
  path: "/products/splitters",
  keywords: [
    "RF splitters",
    "power splitters",
    "RF combiners",
    "wideband splitters",
  ],
});

export default function SplittersLayout({
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
            { name: "Splitters", path: "/products/splitters" },
          ]),
          createCollectionPageJsonLd({
            name: "RF Splitters",
            description,
            path: "/products/splitters",
            items: splitterModels.map((model) => ({
              name: model.model,
              path: "/products/splitters",
              description: `${model.ways}-way splitter covering ${model.frequency}.`,
            })),
          }),
        ]}
      />
      {children}
    </>
  );
}
