import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get in touch with the Wavenxt team. We're here to help with questions, support, and sales inquiries.",
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
