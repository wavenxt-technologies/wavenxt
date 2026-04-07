import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import {
  createBreadcrumbJsonLd,
  createCollectionPageJsonLd,
  createMetadata,
} from "@/lib/seo";
import { meshModels } from "./data";

const description =
  "Programmable mesh attenuators for automated RF network testing with 4-port and 9-port options, 95 dB dynamic range, and 0.25 dB resolution.";

export const metadata: Metadata = createMetadata({
  title: "Mesh Attenuators",
  description,
  path: "/products/mesh-attenuators",
  keywords: [
    "mesh attenuators",
    "RF network attenuator",
    "multi-port attenuator",
    "programmable mesh attenuator",
  ],
});

export default function MeshAttenuatorsLayout({
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
            { name: "Mesh Attenuators", path: "/products/mesh-attenuators" },
          ]),
          createCollectionPageJsonLd({
            name: "Mesh Attenuators",
            description,
            path: "/products/mesh-attenuators",
            items: meshModels.map((model) => ({
              name: model.model,
              path: `/products/mesh-attenuators/${model.id}`,
              description: model.overview,
            })),
          }),
        ]}
      />
      {children}
    </>
  );
}
