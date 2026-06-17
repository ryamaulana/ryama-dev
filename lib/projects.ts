export const HERO_IMAGE = "/hero.jpg";

export interface Project {
  slug: string;
  name: string;
  description: string;
  previewImage: string;
  previewVideo?: string;
  previewBgColor: string;
  caseStudyUrl: string;
  modelIndicator: string;
  titleColor: string;
  accentColor: string;
  eyebrow: string;
  metrics: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    slug: "asset-lifespan-prediction",
    name: "exigen",
    description: "Predict Asset Lifespan Before Failure Occurs",
    previewImage: "/projects/exigen-overview.png",
    previewVideo: "/projects/exigen.mp4",
    previewBgColor: "#f3f6fa",
    caseStudyUrl: "https://github.com/NazeeraAlthea/exigen-smart-maintenance",
    modelIndicator: "Predictive Maintenance",
    titleColor: "#00A86B", // Kelly Green
    accentColor: "#00A86B", // Match about page green
    eyebrow: "ASSET HEALTH",
    metrics: [
      { label: "Accuracy", value: "96.4%" },
      { label: "Latency", value: "<5ms" },
      { label: "Lead Time", value: "14 Days" },
    ],
  },
  {
    slug: "complaint-ticket-analysis",
    name: "Interview System",
    description: "Predict Candidate Success and Retention Before the Offer is Made.",
    previewImage: "/projects/asah-overview.jpeg",
    previewVideo: "/projects/interview-assessment-system.mp4",
    previewBgColor: "#cadbfc",
    caseStudyUrl: "https://github.com/acoramadan/Interview-Assesment-System",
    modelIndicator: "NLP & Extraction",
    titleColor: "#0052FF", // Vibrant Royal Blue
    accentColor: "#0052FF", // Match about page blue
    eyebrow: "TICKET ROUTING",
    metrics: [
      { label: "Parameters", value: "350M" },
      { label: "Routing Acc", value: "94.2%" },
      { label: "Process Time", value: "85ms" },
    ],
  },
  {
    slug: "asset-condition-monitoring",
    name: "sipedig",
    description: "Read Less. Respond Smarter. Prevents Missed Opportunities.",
    previewImage: "/projects/sipedig-overview.png",
    previewVideo: "/projects/sipedig.mp4",
    previewBgColor: "#f8fafc",
    caseStudyUrl: "https://github.com/NazeeraAlthea/santara-mail-api",
    modelIndicator: "Time Series Anomaly",
    titleColor: "#8B00FF", // Vivid Purple / Violet
    accentColor: "#8B00FF", // Match about page purple
    eyebrow: "SENSOR ANOMALY",
    metrics: [
      { label: "Sensor Count", value: "10k+" },
      { label: "Throughput", value: "250k/s" },
      { label: "False Alarm", value: "<0.1%" },
    ],
  },
];

export const TOTAL_PROJECTS = projects.length;
