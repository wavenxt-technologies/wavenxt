import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import {
  createBreadcrumbJsonLd,
  createMetadata,
  createProductJsonLd,
} from "@/lib/seo";
import { matrixModels } from "./data";

const model = matrixModels[0];

export const metadata: Metadata = createMetadata({
  title: "Matrix Systems",
  description: model.overview,
  path: "/products/matrix-systems",
  keywords: [
    "RF matrix systems",
    "solid-state RF routing",
    "matrix attenuator system",
    model.model,
  ],
});

export default function MatrixSystemsLayout({
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
            { name: "Matrix Systems", path: "/products/matrix-systems" },
          ]),
          createProductJsonLd({
            name: `${model.model} Matrix System`,
            description: model.overview,
            path: "/products/matrix-systems",
            image: model.image,
            sku: model.model,
            category: "RF Matrix System",
            additionalProperties: [
              { name: "Frequency Range", value: model.frequencyText },
              { name: "Matrix Size", value: "16x8" },
              { name: "Dynamic Range", value: "95 dB" },
              { name: "Step Size", value: "0.25 dB" },
            ],
          }),
        ]}
      />
      {children}
    </>
  );
}
