import type { Template } from "./schema";

/**
 * Starter templates, used to seed Supabase and as fallback content.
 * Design language: big type, generous whitespace, one accent gradient.
 */
export const starterTemplates: Template[] = [
  {
    id: "minimal-intro",
    name: "Minimal Intro",
    category: "story",
    aspect: "9:16",
    durationMs: 3000,
    canvas: { width: 1080, height: 1920 },
    background: { type: "solid", color: "#101014" },
    layers: [
      {
        type: "photo",
        id: "photo-1",
        slotId: "hero",
        frame: { x: 120, y: 420, width: 840, height: 840, rotation: 0 },
        fit: "cover",
        radius: 64,
        animation: {
          in: { type: "zoom-in", delayMs: 0, durationMs: 700, easing: "ease-out" },
          loop: { type: "float", periodMs: 3200, easing: "ease-in-out" },
        },
      },
      {
        type: "text",
        id: "title-1",
        text: "New drop",
        editable: true,
        frame: { x: 60, y: 1360, width: 960, height: 160, rotation: 0 },
        style: {
          fontFamily: "system",
          fontSize: 96,
          color: "#ffffff",
          fontWeight: "black",
          align: "center",
          lineHeight: 1.1,
          letterSpacing: -2,
          uppercase: true,
        },
        animation: {
          in: { type: "slide-up", delayMs: 350, durationMs: 500, easing: "spring" },
        },
      },
      {
        type: "text",
        id: "subtitle-1",
        text: "swipe up to shop",
        editable: true,
        frame: { x: 60, y: 1540, width: 960, height: 90, rotation: 0 },
        style: {
          fontFamily: "system",
          fontSize: 44,
          color: "#9b9ba3",
          fontWeight: "medium",
          align: "center",
          lineHeight: 1.2,
          letterSpacing: 4,
          uppercase: true,
        },
        animation: {
          in: { type: "fade", delayMs: 700, durationMs: 500, easing: "ease-out" },
        },
      },
    ],
  },
  {
    id: "punch-lines",
    name: "Punch Lines",
    category: "story",
    aspect: "9:16",
    durationMs: 4000,
    canvas: { width: 1080, height: 1920 },
    background: {
      type: "gradient",
      value: "linear-gradient(160deg, #fa709a 0%, #fee140 100%)",
    },
    layers: [
      {
        type: "photo",
        id: "photo-1",
        slotId: "selfie",
        frame: { x: 190, y: 640, width: 700, height: 700, rotation: 0 },
        fit: "cover",
        radius: 360,
        animation: {
          in: { type: "pop", delayMs: 0, durationMs: 600, easing: "spring" },
          loop: { type: "pulse", periodMs: 2400, easing: "ease-in-out" },
        },
      },
      {
        type: "text",
        id: "line-1",
        text: "DAY 1 OF",
        editable: true,
        frame: { x: 60, y: 300, width: 960, height: 130, rotation: -4 },
        style: {
          fontFamily: "system",
          fontSize: 110,
          color: "#ffffff",
          fontWeight: "black",
          align: "center",
          lineHeight: 1.05,
          letterSpacing: 0,
          uppercase: true,
          shadow: { color: "#00000040", blur: 12, offsetY: 4 },
        },
        animation: {
          in: { type: "slide-left", delayMs: 200, durationMs: 450, easing: "spring" },
        },
      },
      {
        type: "text",
        id: "line-2",
        text: "MY GLOW UP",
        editable: true,
        frame: { x: 60, y: 1440, width: 960, height: 130, rotation: 3 },
        style: {
          fontFamily: "system",
          fontSize: 110,
          color: "#ffffff",
          fontWeight: "black",
          align: "center",
          lineHeight: 1.05,
          letterSpacing: 0,
          uppercase: true,
          shadow: { color: "#00000040", blur: 12, offsetY: 4 },
        },
        animation: {
          in: { type: "slide-right", delayMs: 500, durationMs: 450, easing: "spring" },
        },
      },
    ],
  },
  {
    id: "showcase-triptych",
    name: "Showcase",
    category: "reel",
    aspect: "9:16",
    durationMs: 5000,
    canvas: { width: 1080, height: 1920 },
    background: { type: "solid", color: "#f4f1ec" },
    layers: [
      {
        type: "photo",
        id: "photo-1",
        slotId: "shot-1",
        frame: { x: 90, y: 240, width: 900, height: 480, rotation: 0 },
        fit: "cover",
        radius: 24,
        animation: {
          in: { type: "slide-left", delayMs: 0, durationMs: 500, easing: "ease-out" },
        },
      },
      {
        type: "photo",
        id: "photo-2",
        slotId: "shot-2",
        frame: { x: 90, y: 760, width: 900, height: 480, rotation: 0 },
        fit: "cover",
        radius: 24,
        animation: {
          in: { type: "slide-right", delayMs: 300, durationMs: 500, easing: "ease-out" },
        },
      },
      {
        type: "photo",
        id: "photo-3",
        slotId: "shot-3",
        frame: { x: 90, y: 1280, width: 900, height: 480, rotation: 0 },
        fit: "cover",
        radius: 24,
        animation: {
          in: { type: "slide-left", delayMs: 600, durationMs: 500, easing: "ease-out" },
        },
      },
      {
        type: "text",
        id: "brand-1",
        text: "@yourbrand",
        editable: true,
        frame: { x: 90, y: 1810, width: 900, height: 70, rotation: 0 },
        style: {
          fontFamily: "system",
          fontSize: 40,
          color: "#1c1c1e",
          fontWeight: "semibold",
          align: "center",
          lineHeight: 1.2,
          letterSpacing: 2,
          uppercase: true,
        },
        animation: {
          in: { type: "fade", delayMs: 900, durationMs: 400, easing: "ease-out" },
        },
      },
    ],
  },
];
