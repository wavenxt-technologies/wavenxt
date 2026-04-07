import { ImageResponse } from "next/og";
import { SiteSocialImage } from "@/lib/social-image";

export const alt = "Wavenxt wireless validation systems";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <SiteSocialImage
        eyebrow="Wavenxt"
        title="Precision RF Test Systems for Modern Labs"
        description="High-performance hardware for signal control, routing, beamforming, and handover validation."
      />
    ),
    size,
  );
}
