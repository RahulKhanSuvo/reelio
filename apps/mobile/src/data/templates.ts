import { starterTemplates, type Template } from "@reelio/template-schema";
import { templateThumbs } from "./images";

/**
 * Local template catalog. Later this is fetched from Supabase
 * (`templates` table); starter templates are the offline fallback.
 */

export type Category = "For You" | "Lifestyle" | "Business" | "Collage";

export const CATEGORIES: Category[] = ["For You", "Lifestyle", "Business", "Collage"];

export type TemplateEntry = {
  template: Template;
  categories: Category[];
  pro: boolean;
  /** card thumbnail (Unsplash placeholder until Supabase previews) */
  image?: string;
};

export const templateCatalog: TemplateEntry[] = [
  {
    template: starterTemplates[0], // minimal-intro
    categories: ["For You", "Business"],
    pro: false,
    image: templateThumbs["minimal-intro"],
  },
  {
    template: starterTemplates[1], // punch-lines
    categories: ["For You", "Lifestyle"],
    pro: true,
    image: templateThumbs["punch-lines"],
  },
  {
    template: starterTemplates[2], // showcase-triptych
    categories: ["For You", "Collage"],
    pro: false,
    image: templateThumbs["showcase-triptych"],
  },
];

export function trendingTemplates(category?: Category): TemplateEntry[] {
  if (!category || category === "For You") return templateCatalog;
  return templateCatalog.filter((entry) => entry.categories.includes(category));
}
