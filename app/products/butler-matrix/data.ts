const eightByEightOverview =
  "The 8x8 Butler Matrix is a passive RF network designed to provide a set of predefined spatial beams for multi-antenna systems. The network distributes RF energy from a selected input port to multiple outputs with defined phase offsets, enabling repeatable beam formation without active control. The architecture supports bidirectional operation and is suitable for controlled spatial signal processing in test and measurement environments.";

const eightByEightFeatures = [
  "Predefined fixed beam patterns",
  "Passive, bidirectional RF operation",
  "Controlled phase offsets across output ports",
  "Uniform signal distribution characteristics",
  "Broadband implementation for multi-standard testing",
  "Stable and repeatable RF performance",
  "SMA, 50-ohm RF interfaces",
];

const eightByEightApplications = [
  "Multi-antenna and beamforming system evaluation",
  "MIMO and spatial channel testing",
  "Over-the-air (OTA) measurement setups",
  "Antenna and beam pattern characterization",
  "RF verification in laboratory and production environments",
];

const fourByFourOverview =
  "The 4x4 Butler Matrix is a passive RF network designed to generate multiple fixed beam states when used with a four-element antenna array. By applying a signal to one of the beam ports, the network produces equal-amplitude outputs with defined phase progression across the antenna ports, enabling directional radiation without active phase control.";

const fourByFourFeatures = [
  "Passive 4x4 beamforming",
  "Accurate phase and amplitude balance",
  "Instant beam selection",
  "High reliability and low noise",
  "Wide frequency coverage",
];

const fourByFourApplications = [
  "Switched beam smart antennas",
  "MIMO system test and simulation",
  "Wireless standards test environments (5G, Wi-Fi)",
  "Multipath simulation",
  "Phased array beamforming and pattern generation",
];

function buildSpecs({
  minFrequency,
  maxFrequency,
  ports,
  insertionLoss,
  dimensions,
}: {
  minFrequency: number;
  maxFrequency: number;
  ports: string;
  insertionLoss: number;
  dimensions: string;
}) {
  return [
    {
      parameter: "Frequency Range (GHz)",
      min: String(minFrequency),
      typ: "",
      max: String(maxFrequency),
    },
    { parameter: "Impedance (Ohms)", min: "", typ: "50", max: "" },
    { parameter: "Number of RF Ports", min: "", typ: ports, max: "" },
    {
      parameter: "Insertion loss (dB)",
      min: "",
      typ: String(insertionLoss),
      max: "",
    },
    { parameter: "VSWR", min: "", typ: "1.5", max: "" },
    { parameter: "Phase Balance (degrees)", min: "", typ: "±9", max: "" },
    { parameter: "Amplitude balance (dB)", min: "", typ: "3", max: "" },
    { parameter: "Isolation between ports (dB)", min: ">20", typ: "", max: "" },
    { parameter: "Maximum RF input power (dBm)", min: "", typ: "+30", max: "" },
    { parameter: "Temperature", min: "5 °C", typ: "", max: "40 °C" },
    { parameter: "RF connectors", min: "", typ: "SMA Female", max: "" },
    { parameter: "Form factor", min: "", typ: "Compact and rugged", max: "" },
    {
      parameter: "Integration",
      min: "",
      typ: "Fits lab racks and field systems easily",
      max: "",
    },
    { parameter: "Dimensions (mm)", min: "", typ: dimensions, max: "" },
  ];
}

export const butlerModels = [
  {
    id: "nxbm-4p67",
    model: "NXBM-4P67",
    matrix: "4x4 Butler Matrix",
    frequencyText: "0.6 to 7.125 GHz",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
    overview: fourByFourOverview,
    features: fourByFourFeatures,
    applications: fourByFourApplications,
    specifications: buildSpecs({
      minFrequency: 0.6,
      maxFrequency: 7.125,
      ports: "8 (4 beam input ports, 4 antenna output ports)",
      insertionLoss: 9,
      dimensions: "110 x 85 x 10",
    }),
  },
  {
    id: "nxbm-4p28",
    model: "NXBM-4P28",
    matrix: "4x4 Butler Matrix",
    frequencyText: "2.4 to 8 GHz",
    image:
      "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1600&q=80",
    overview: fourByFourOverview,
    features: fourByFourFeatures,
    applications: fourByFourApplications,
    specifications: buildSpecs({
      minFrequency: 2.4,
      maxFrequency: 8,
      ports: "8 (4 beam input ports, 4 antenna output ports)",
      insertionLoss: 9,
      dimensions: "110 x 85 x 10",
    }),
  },
  {
    id: "nxbm-8p67",
    model: "NXBM-8P67",
    matrix: "8x8 Butler Matrix",
    frequencyText: "0.6 to 7.125 GHz",
    image:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1600&q=80",
    overview: eightByEightOverview,
    features: eightByEightFeatures,
    applications: eightByEightApplications,
    specifications: buildSpecs({
      minFrequency: 0.6,
      maxFrequency: 7.125,
      ports: "16 (8 beam input ports, 8 antenna output ports)",
      insertionLoss: 11,
      dimensions: "130 x 110 x 10",
    }),
  },
  {
    id: "nxbm-8p28",
    model: "NXBM-8P28",
    matrix: "8x8 Butler Matrix",
    frequencyText: "2.4 to 8 GHz",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    overview: eightByEightOverview,
    features: eightByEightFeatures,
    applications: eightByEightApplications,
    specifications: buildSpecs({
      minFrequency: 2.4,
      maxFrequency: 8,
      ports: "16 (8 beam input ports, 8 antenna output ports)",
      insertionLoss: 11,
      dimensions: "130 x 110 x 10",
    }),
  },
];

export const butlerModelMap = Object.fromEntries(
  butlerModels.map((model) => [model.id, model]),
);
