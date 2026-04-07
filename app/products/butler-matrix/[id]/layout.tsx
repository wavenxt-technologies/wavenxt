import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/json-ld";
import {
  createBreadcrumbJsonLd,
  createMetadata,
  createProductJsonLd,
} from "@/lib/seo";
import { butlerModelMap } from "../data";

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
  const model = butlerModelMap[id];

  if (!model) {
    notFound();
  }

  return createMetadata({
    title: `${model.model} ${model.matrix}`,
    description: model.overview,
    path: `/products/butler-matrix/${id}`,
    keywords: [model.model, "Butler Matrix", model.matrix, "beamforming"],
  });
}

export default async function ButlerMatrixModelLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const model = butlerModelMap[id];

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
            { name: "Butler Matrix", path: "/products/butler-matrix" },
            {
              name: model.model,
              path: `/products/butler-matrix/${id}`,
            },
          ]),
          createProductJsonLd({
            name: `${model.model} ${model.matrix}`,
            description: model.overview,
            path: `/products/butler-matrix/${id}`,
            image: model.image,
            sku: model.model,
            category: "Butler Matrix",
            additionalProperties: [
              { name: "Frequency Range", value: model.frequencyText },
              { name: "Matrix Size", value: model.matrix },
              {
                name: "Insertion Loss",
                value: `${findSpec(model.specifications, "Insertion loss")?.typ ?? "N/A"} dB`,
              },
              {
                name: "Phase Balance",
                value: `${findSpec(model.specifications, "Phase Balance")?.typ ?? "N/A"} degrees`,
              },
              {
                name: "RF Ports",
                value: findSpec(model.specifications, "Number of RF Ports")?.typ ?? "N/A",
              },
            ],
          }),
        ]}
      />
      {children}
    </>
  );
}
