import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/json-ld";
import {
  createBreadcrumbJsonLd,
  createMetadata,
  createProductJsonLd,
} from "@/lib/seo";
import { meshModelMap } from "../data";

function findSpec(
  specs: { parameter: string; min?: string; typ?: string; max?: string }[],
  keyword: string,
) {
  return specs.find((item) =>
    item.parameter.toLowerCase().includes(keyword.toLowerCase()),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const model = meshModelMap[id];

  if (!model) {
    notFound();
  }

  return createMetadata({
    title: `${model.model} Mesh Attenuator`,
    description: model.overview,
    path: `/products/mesh-attenuators/${id}`,
    keywords: [model.model, "mesh attenuator", "RF mesh attenuator"],
  });
}

export default async function MeshAttenuatorModelLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const model = meshModelMap[id];

  if (!model) {
    notFound();
  }

  const ports =
    findSpec(model.specifications, "inputs/outputs")?.typ ??
    findSpec(model.specifications, "number of rf ports")?.typ ??
    "N/A";

  return (
    <>
      <JsonLd
        data={[
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: "Mesh Attenuators", path: "/products/mesh-attenuators" },
            {
              name: model.model,
              path: `/products/mesh-attenuators/${id}`,
            },
          ]),
          createProductJsonLd({
            name: `${model.model} Mesh Attenuator`,
            description: model.overview,
            path: `/products/mesh-attenuators/${id}`,
            image: model.image,
            sku: model.model,
            category: "Mesh Attenuator",
            additionalProperties: [
              { name: "Frequency Range", value: model.frequencyText },
              { name: "Ports", value: ports },
              {
                name: "Dynamic Range",
                value: `${findSpec(model.specifications, "attenuation range")?.typ ?? "95"} dB`,
              },
              {
                name: "Step Size",
                value: `${findSpec(model.specifications, "step size")?.typ ?? "0.25"} dB`,
              },
              {
                name: "Isolation",
                value: `${findSpec(model.specifications, "isolation")?.typ ?? "90"} dB`,
              },
            ],
          }),
        ]}
      />
      {children}
    </>
  );
}
