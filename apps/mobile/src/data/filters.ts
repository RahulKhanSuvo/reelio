import type { FilterPreset } from "@/components/filter-card";
import { filterImages } from "./images";

/**
 * Filter presets for the home "Filters" row. Photos are Unsplash
 * placeholders; real LUT previews ship with the filter engine
 * (on-device encoding milestone).
 */
export const filterPresets: FilterPreset[] = [
  {
    id: "afterhours-01",
    name: "Afterhours 01",
    image: filterImages["afterhours-01"],
    swatch: ["#0f0c29", "#302b63"],
  },
  {
    id: "sunwave-01",
    name: "Sunwave 01",
    image: filterImages["sunwave-01"],
    swatch: ["#ff9966", "#ff5e62"],
  },
  {
    id: "saffron-08",
    name: "Saffron 08",
    image: filterImages["saffron-08"],
    swatch: ["#ffd60a", "#c76b00"],
  },
  {
    id: "oat-milk",
    name: "Oat Milk",
    image: filterImages["oat-milk"],
    swatch: ["#f7f0e4", "#d9c7a7"],
  },
];
