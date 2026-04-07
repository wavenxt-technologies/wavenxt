import type { ReactElement } from "react";
import { siteConfig } from "@/lib/site";

type SocialImageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SiteSocialImage({
  eyebrow,
  title,
  description,
}: SocialImageProps): ReactElement {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(circle at top right, rgba(59,130,246,0.24), transparent 30%), linear-gradient(135deg, #0f172a 0%, #172556 52%, #f7f7f5 140%)",
        color: "#f8fafc",
        padding: "58px 64px",
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "1px solid rgba(255,255,255,0.16)",
          borderRadius: "28px",
          padding: "44px 48px",
          background: "rgba(15, 23, 42, 0.34)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "14px",
                height: "14px",
                borderRadius: "999px",
                background: "#38bdf8",
                boxShadow: "0 0 32px rgba(56, 189, 248, 0.75)",
              }}
            />
            <span>{siteConfig.name}</span>
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 18px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.1)",
              fontSize: 18,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "rgba(248,250,252,0.75)",
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "930px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 72,
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: "-0.05em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.35,
              color: "rgba(226,232,240,0.86)",
              maxWidth: "860px",
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "rgba(226,232,240,0.78)",
          }}
        >
          <div style={{ display: "flex" }}>
            RF Test Solutions for Wireless Validation
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              color: "rgba(226,232,240,0.62)",
            }}
          >
            <span>Digital Attenuators</span>
            <span>Matrix Systems</span>
            <span>Beamforming</span>
          </div>
        </div>
      </div>
    </div>
  );
}
