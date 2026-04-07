import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import {
  createBreadcrumbJsonLd,
  createCollectionPageJsonLd,
  createMetadata,
} from "@/lib/seo";
import { productFamilies } from "@/lib/site";

const description =
  "Browse Wavenxt RF test products including digital attenuators, mesh attenuators, matrix systems, Butler Matrix networks, splitters, and integrated handover test systems.";

export const metadata: Metadata = createMetadata({
  title: "Products",
  description,
  path: "/products",
  keywords: [
    "RF test products",
    "wireless validation hardware",
    "digital attenuators",
    "matrix systems",
    "Butler Matrix",
  ],
});

export default function ProductsLayout({
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
          ]),
          createCollectionPageJsonLd({
            name: "Wavenxt RF Test Products",
            description,
            path: "/products",
            items: productFamilies.map((family) => ({
              name: family.name,
              path: family.path,
              description: family.description,
            })),
          }),
        ]}
      />
      {children}
    </>
  );
}
