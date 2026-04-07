import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/json-ld";
import {
  createBreadcrumbJsonLd,
  createMetadata,
  createProductJsonLd,
} from "@/lib/seo";
import {
  buildDigitalAttenuatorDescription,
  parseDigitalAttenuatorModel,
} from "../data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const model = parseDigitalAttenuatorModel(id);

  if (!model) {
    notFound();
  }

  return createMetadata({
    title: `${model.model} Digital Attenuator`,
    description: buildDigitalAttenuatorDescription(model),
    path: `/products/digital-attenuators/${id}`,
    keywords: [
      model.model,
      "digital attenuator",
      `${model.chNum} channel attenuator`,
      model.freq.tag,
    ],
  });
}

export default async function DigitalAttenuatorModelLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const model = parseDigitalAttenuatorModel(id);

  if (!model) {
    notFound();
  }

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
            {
              name: model.model,
              path: `/products/digital-attenuators/${id}`,
            },
          ]),
          createProductJsonLd({
            name: `${model.model} Digital Attenuator`,
            description: buildDigitalAttenuatorDescription(model),
            path: `/products/digital-attenuators/${id}`,
            image: model.image,
            sku: model.model,
            category: "RF Digital Attenuator",
            additionalProperties: [
              { name: "Frequency Range", value: model.freq.band },
              { name: "Channels", value: `${model.chNum}` },
              { name: "Dynamic Range", value: "95 dB" },
              { name: "Step Size", value: "0.25 dB" },
              { name: "Power", value: "PoE/USB" },
            ],
          }),
        ]}
      />
      {children}
    </>
  );
}
