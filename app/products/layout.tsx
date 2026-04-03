import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Precision RF test products — programmable attenuators, matrix systems, splitters, and integrated handover test systems by Wavenxt.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
