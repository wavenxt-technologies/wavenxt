export const digitalAttenuatorGroups = [
  {
    band: "200 – 8000 MHz",
    tag: "8 GHz",
    models: [
      { model: "MT81A", channel: 1 },
      { model: "MT82A", channel: 2 },
      { model: "MT84A", channel: 4 },
      { model: "MT88A", channel: 8 },
      { model: "MT128A", channel: 12 },
      { model: "MT168A", channel: 16 },
      { model: "MT248A", channel: 24 },
    ],
  },
  {
    band: "200 – 6000 MHz",
    tag: "6 GHz",
    models: [
      { model: "MT61A", channel: 1 },
      { model: "MT62A", channel: 2 },
      { model: "MT64A", channel: 4 },
      { model: "MT68A", channel: 8 },
    ],
  },
  {
    band: "200 – 3000 MHz",
    tag: "3 GHz",
    models: [
      { model: "MT31A", channel: 1 },
      { model: "MT32A", channel: 2 },
      { model: "MT34A", channel: 4 },
      { model: "MT38A", channel: 8 },
    ],
  },
] as const;

export const digitalAttenuatorCommonSpecs = [
  { label: "Attenuation Range", value: "0 – 95 dB" },
  { label: "Step Size", value: "0.25 dB" },
  { label: "Accuracy", value: "±0.25 dB typ" },
  { label: "Control", value: "USB & Ethernet" },
  { label: "Connector", value: "SMA Female" },
  { label: "Switching Speed", value: "2 µs" },
] as const;

const frequencyMap: Record<string, { band: string; max: string; tag: string }> = {
  8: { band: "200 – 8000 MHz", max: "8 GHz", tag: "8 GHz" },
  6: { band: "200 – 6000 MHz", max: "6 GHz", tag: "6 GHz" },
  3: { band: "200 – 3000 MHz", max: "3 GHz", tag: "3 GHz" },
};

// Insertion loss (dB) per the datasheets. The 12/16/24 channel models have
// higher loss than the 1–8 channel models in the same 8 GHz band.
type InsertionLossRow = { condition: string; typ: string; max: string };

const insertionLoss: Record<string, InsertionLossRow[]> = {
  3: [{ condition: "< 3 GHz", typ: "4.5", max: "6.5" }],
  6: [
    { condition: "< 2.5 GHz", typ: "4.5", max: "6" },
    { condition: "< 6 GHz", typ: "6", max: "7" },
  ],
  8: [
    { condition: "< 2.5 GHz", typ: "4.5", max: "6" },
    { condition: "< 6 GHz", typ: "6", max: "7" },
    { condition: "< 8 GHz", typ: "8", max: "10" },
  ],
  "8-high-density": [
    { condition: "< 2.5 GHz", typ: "5.5", max: "7" },
    { condition: "< 6 GHz", typ: "7", max: "8" },
    { condition: "< 8 GHz", typ: "9", max: "11" },
  ],
};

// Extra datasheet sections that only some models have.
const mechanicalSpecs: Record<string, { parameter: string; value: string }[]> = {
  MT248A: [
    { parameter: "Power Requirements", value: "100 – 240 V AC, 50/60 Hz" },
    { parameter: "Operating Temperature", value: "0 °C to +40 °C" },
    { parameter: "Power Connector", value: "Power Cord" },
    { parameter: "Control", value: "USB / Ethernet" },
    { parameter: "RF Connectors", value: "SMA female" },
  ],
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
  insertionLoss: InsertionLossRow[];
  mechanical: { parameter: string; value: string }[];
};

export const digitalAttenuatorModelIds = digitalAttenuatorGroups.flatMap((group) =>
  group.models.map((item) => item.model.toLowerCase()),
);

export function parseDigitalAttenuatorModel(id: string): DigitalAttenuatorModel | null {
  const upper = id.trim().toUpperCase();
  // Legacy models are MT{freq}{ch}A (e.g. MT84A); high-density models are
  // MT{ch}{freq}A (e.g. MT128A).
  const match = upper.match(/^MT(\d)(\d)A$/) ?? upper.match(/^MT(\d{2})(\d)A$/);

  if (!match) {
    return null;
  }

  const [freqTag, ch] =
    match[1].length === 2 ? [match[2], match[1]] : [match[1], match[2]];
  const freq = frequencyMap[freqTag];

  if (!freq) {
    return null;
  }

  return {
    id: upper.toLowerCase(),
    raw: upper,
    model: `MT-${upper.slice(2)}`,
    freqTag,
    ch,
    chNum: Number.parseInt(ch, 10),
    freq,
    sizeLabel: `${ch} Channel`,
    image: modelImages[ch] ?? modelImages["8"],
    insertionLoss:
      insertionLoss[Number(ch) > 8 ? `${freqTag}-high-density` : freqTag] ?? [],
    mechanical: mechanicalSpecs[upper] ?? [],
  };
}

export function getDigitalAttenuatorSiblings(model: DigitalAttenuatorModel) {
  const group = digitalAttenuatorGroups.find((g) => g.tag === model.freq.tag);
  const models: readonly { model: string }[] = group?.models ?? [];
  const index = models.findIndex((item) => item.model === model.raw);

  // Closest channel counts first
  return models
    .map((item, i) => ({ item, distance: Math.abs(i - index) }))
    .filter(({ distance }) => distance > 0)
    .sort((a, b) => a.distance - b.distance)
    .map(({ item }) => parseDigitalAttenuatorModel(item.model))
    .filter((item): item is DigitalAttenuatorModel => item !== null);
}

export function buildDigitalAttenuatorDescription(model: DigitalAttenuatorModel) {
  return `The ${model.model} is a fully shielded, digitally controlled ${model.chNum}-channel RF attenuator covering ${model.freq.band} with 95 dB dynamic range, 0.25 dB step resolution, PoE power, and Ethernet or USB control for automated test environments.`;
}
