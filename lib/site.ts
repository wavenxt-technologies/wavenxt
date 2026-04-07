export const siteConfig = {
  name: "Wavenxt",
  legalName: "Wavenxt Technologies",
  title: "Wavenxt | RF Test Solutions for Wireless Validation",
  description:
    "Wavenxt Technologies builds precision RF test systems for wireless validation, signal control, routing, beamforming, and handover testing.",
  locale: "en_IN",
  themeColor: "#172556",
  email: {
    sales: "sales@wavenxt.com",
    support: "support@wavenxt.com",
  },
  phone: {
    landlineDisplay: "080-4164 3659",
    landlineLink: "+918041643659",
    mobileDisplay: "+91 74837 59420",
    mobileLink: "+917483759420",
  },
  address: {
    streetAddress: "#847 2nd Floor A block, Sahakaranagar",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560092",
    addressCountry: "IN",
  },
  keywords: [
    "RF test solutions",
    "wireless validation systems",
    "digital attenuators",
    "mesh attenuators",
    "RF matrix systems",
    "Butler Matrix",
    "handover test systems",
    "RF splitters",
    "5G test equipment",
    "Wi-Fi test equipment",
    "MIMO testing",
    "beamforming validation",
  ],
} as const;

export const productFamilies = [
  {
    name: "Digital Attenuators",
    path: "/products/digital-attenuators",
    description:
      "Programmable RF digital attenuators with 95 dB dynamic range and 0.25 dB resolution across 12 models.",
    image: "/images/group-atten.webp",
  },
  {
    name: "Mesh Attenuators",
    path: "/products/mesh-attenuators",
    description:
      "Programmable multi-port mesh attenuators for automated RF path-loss simulation and network validation.",
    image: "/images/mesh4.webp",
  },
  {
    name: "Matrix Systems",
    path: "/products/matrix-systems",
    description:
      "Solid-state RF switching and routing systems for repeatable multi-device and multi-band validation.",
    image: "/images/matrix.webp",
  },
  {
    name: "Butler Matrix",
    path: "/products/butler-matrix",
    description:
      "Passive 4x4 and 8x8 beamforming networks for OTA, MIMO, and antenna characterization workflows.",
    image: "/images/butler4.webp",
  },
  {
    name: "Handover Test Systems",
    path: "/products/handover-test-systems",
    description:
      "Integrated handover and roaming validation systems with high-density attenuation paths and custom topologies.",
    image: "/images/handover.webp",
  },
  {
    name: "Splitters",
    path: "/products/splitters",
    description:
      "Wideband splitter and combiner solutions for balanced signal distribution with low insertion loss.",
    image: "/images/splitter.webp",
  },
] as const;

export const handoverSystemModels = [
  "NXA-B88M",
  "NXA-B168M",
  "NXA-B248M",
  "NXA-B328M",
  "NXA-B648M",
  "NXA-B6416M",
  "NXA-B1616M",
] as const;

function normalizeSiteUrl(url: string) {
  const withProtocol = /^https?:\/\//.test(url) ? url : `https://${url}`;
  return withProtocol.replace(/\/+$/, "");
}

export function getSiteUrl() {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? "https://wavenxt.com");
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}
