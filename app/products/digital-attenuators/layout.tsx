import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import {
  createBreadcrumbJsonLd,
  createCollectionPageJsonLd,
  createMetadata,
} from "@/lib/seo";
import { digitalAttenuatorGroups } from "./data";

const description =
  "Programmable RF digital attenuators with 95 dB dynamic range, 0.25 dB step resolution, PoE or USB control, and 12 models from 200 MHz to 8 GHz.";

const items = digitalAttenuatorGroups.flatMap((group) =>
  group.models.map((model) => ({
    name: `${model.model} Digital Attenuator`,
    path: `/products/digital-attenuators/${model.model.toLowerCase()}`,
    description: `${model.channel}-channel programmable RF attenuator covering ${group.band}.`,
  })),
);

export const metadata: Metadata = createMetadata({
  title: "Digital Attenuators",
  description,
  path: "/products/digital-attenuators",
  keywords: [
    "RF digital attenuators",
    "programmable attenuators",
    "0.25 dB attenuator",
    "PoE attenuator",
  ],
});

export default function DigitalAttenuatorsLayout({
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
              name: "Digital Attenuators",
              path: "/products/digital-attenuators",
            },
          ]),
          createCollectionPageJsonLd({
            name: "Digital Attenuators",
            description,
            path: "/products/digital-attenuators",
            items,
          }),
        ]}
      />
      {children}
    </>
  );
}
