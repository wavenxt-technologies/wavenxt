export const digitalAttenuatorGroups = [
  {
    band: "200 – 8000 MHz",
    tag: "8 GHz",
    models: [
      { model: "MT88A", channel: 8 },
      { model: "MT84A", channel: 4 },
      { model: "MT82A", channel: 2 },
      { model: "MT81A", channel: 1 },
    ],
  },
  {
    band: "200 – 6000 MHz",
    tag: "6 GHz",
    models: [
      { model: "MT68A", channel: 8 },
      { model: "MT64A", channel: 4 },
      { model: "MT62A", channel: 2 },
      { model: "MT61A", channel: 1 },
    ],
  },
  {
    band: "200 – 3000 MHz",
    tag: "3 GHz",
    models: [
      { model: "MT38A", channel: 8 },
      { model: "MT34A", channel: 4 },
      { model: "MT32A", channel: 2 },
      { model: "MT31A", channel: 1 },
    ],
  },
] as const;

export const digitalAttenuatorCommonSpecs = [
  { label: "Attenuation Range", value: "0 – 95 dB" },
  { label: "Step Size", value: "0.25 dB" },
  { label: "Accuracy", value: "±0.5 dB" },
  { label: "Control", value: "USB & Ethernet" },
  { label: "Connector", value: "SMA Female" },
  { label: "Operation", value: "24/7 Automated" },
] as const;

const frequencyMap: Record<string, { band: string; max: string; tag: string }> = {
  8: { band: "200 – 8000 MHz", max: "8 GHz", tag: "8 GHz" },
  6: { band: "200 – 6000 MHz", max: "6 GHz", tag: "6 GHz" },
  3: { band: "200 – 3000 MHz", max: "3 GHz", tag: "3 GHz" },
};

const modelImages: Record<string, string> = {
  8: "/images/atten8.webp",
  4: "/images/atten4.webp",
  2: "/images/atten2.webp",
  1: "/images/atten1.webp",
};

export type DigitalAttenuatorModel = {
  id: string;
  raw: string;
  model: string;
  freqTag: string;
  ch: string;
  chNum: number;
  freq: {
    band: string;
    max: string;
    tag: string;
  };
  sizeLabel: string;
  image: string;
};

export const digitalAttenuatorModelIds = digitalAttenuatorGroups.flatMap((group) =>
  group.models.map((item) => item.model.toLowerCase()),
);

export function parseDigitalAttenuatorModel(id: string): DigitalAttenuatorModel | null {
  const upper = id.trim().toUpperCase();
  const match = upper.match(/MT(\d)(\d)A/);

  if (!match) {
    return null;
  }

  const [, freqTag, ch] = match;
  const freq = frequencyMap[freqTag];

  if (!freq) {
    return null;
  }

  return {
    id: upper.toLowerCase(),
    raw: upper,
    model: `MT-${freqTag}${ch}A`,
    freqTag,
    ch,
    chNum: Number.parseInt(ch, 10),
    freq,
    sizeLabel: `${ch} Channel`,
    image: modelImages[ch] ?? modelImages["8"],
  };
}

export function buildDigitalAttenuatorDescription(model: DigitalAttenuatorModel) {
  return `The ${model.model} is a fully shielded, digitally controlled ${model.chNum}-channel RF attenuator covering ${model.freq.band} with 95 dB dynamic range, 0.25 dB step resolution, and PoE/USB control for automated test environments.`;
}
