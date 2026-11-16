import type { Guide } from "@/components/guide-card";

/** Guide articles for the Guides tab (placeholder content until CMS). */

export type GuideCategory = "For You" | "Content Ideas" | "For beginners";

export const GUIDE_CATEGORIES: GuideCategory[] = [
  "For You",
  "Content Ideas",
  "For beginners",
];

export const featuredGuides: Guide[] = [
  {
    id: "g-hook",
    title: "How to hook viewers in the first 3 seconds",
    subtitle: "The pattern every viral reel uses",
  },
];

export const guideRows: Guide[] = [
  { id: "g-trend", title: "5 audio trends to use this week" },
  { id: "g-hashtags", title: "Hashtags that actually work in 2026" },
  { id: "g-calendar", title: "A posting schedule you'll keep" },
  { id: "g-edit", title: "Edit faster: cuts, captions, covers" },
];
