export const HERO_IMAGE = "/hero.jpg";

export interface Project {
  slug: string;
  name: string;
  description: string;
  previewImage: string;
  previewVideo?: string;
  previewBgColor: string;
  caseStudyUrl: string;
  accentColor: string;
  eyebrow: string;
}

export const projects: Project[] = [
  {
    slug: "asset-lifespan-prediction",
    name: "Predictive Maintenance",
    description: "Predict Asset Lifespan Before Failure Occurs",
    previewImage: "/projects/exigen-overview.png",
    previewVideo: "/case-studies/smart maintenance/Hero.mp4",
    previewBgColor: "#f3f6fa",
    caseStudyUrl: "/projects/asset-lifespan-prediction",
    accentColor: "#1B4332", // Deep Forest Green
    eyebrow: "ASSET HEALTH",
  },
  {
    slug: "complaint-ticket-analysis",
    name: "Interview Assessment System",
    description: "Predict Candidate Success and Retention Before the Offer is Made.",
    previewImage: "/projects/asah-overview.jpeg",
    previewVideo: "/case-studies/interview assessment system/HeroInterview.mp4",
    previewBgColor: "#cadbfc",
    caseStudyUrl: "/projects/complaint-ticket-analysis",
    accentColor: "#1B2A4A", // Deep Navy
    eyebrow: "TICKET ROUTING",
  },
  {
    slug: "asset-condition-monitoring",
    name: "Mail Reader",
    description: "Read Less. Respond Smarter. Prevents Missed Opportunities.",
    previewImage: "/projects/sipedig-overview.png",
    previewVideo: "/case-studies/mail reader/HeroMailReader.mp4",
    previewBgColor: "#f8fafc",
    caseStudyUrl: "/projects/asset-condition-monitoring",
    accentColor: "#6B1F2A", // Deep Maroon
    eyebrow: "SENSOR ANOMALY",
  },
];

export const TOTAL_PROJECTS = projects.length;
