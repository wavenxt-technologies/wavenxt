import { ImageResponse } from "next/og";
import { SiteSocialImage } from "@/lib/social-image";

export const alt = "Wavenxt RF test solutions for wireless validation";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <SiteSocialImage
        eyebrow="RF Test Solutions"
        title="Wireless Validation, Engineered for Repeatability"
        description="Digital attenuators, mesh attenuators, matrix systems, beamforming networks, splitters, and handover test systems from Wavenxt."
      />
    ),
    size,
  );
}
