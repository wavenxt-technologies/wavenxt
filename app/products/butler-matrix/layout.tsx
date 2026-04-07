import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import {
  createBreadcrumbJsonLd,
  createCollectionPageJsonLd,
  createMetadata,
} from "@/lib/seo";
import { butlerModels } from "./data";

const description =
  "Passive 4x4 and 8x8 Butler Matrix networks for beamforming, OTA, MIMO, and antenna characterization workflows across 0.6 to 8 GHz.";

export const metadata: Metadata = createMetadata({
  title: "Butler Matrix",
  description,
  path: "/products/butler-matrix",
  keywords: [
    "Butler Matrix",
    "beamforming network",
    "passive beamforming",
    "OTA test hardware",
  ],
});

export default function ButlerMatrixLayout({
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
            { name: "Butler Matrix", path: "/products/butler-matrix" },
          ]),
          createCollectionPageJsonLd({
            name: "Butler Matrix Networks",
            description,
            path: "/products/butler-matrix",
            items: butlerModels.map((model) => ({
              name: model.model,
              path: `/products/butler-matrix/${model.id}`,
              description: `${model.matrix} covering ${model.frequencyText}.`,
            })),
          }),
        ]}
      />
      {children}
    </>
  );
}
