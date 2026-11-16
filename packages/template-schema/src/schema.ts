import { z } from "zod";

/**
 * Template schema — the single source of truth shared by:
 *
 * - apps/admin   (template designer reads/writes this shape)
 * - apps/mobile  (gallery + editor render this shape)
 * - supabase     (`templates.schema` jsonb column validated with this)
 *
 * All coordinates are in canvas pixels on a 1080x1920 (9:16) canvas.
 */

export const easingSchema = z.enum([
  "linear",
  "ease-in",
  "ease-out",
  "ease-in-out",
  "spring",
]);
export type Easing = z.infer<typeof easingSchema>;

const transitionTypes = [
  "fade",
  "slide-up",
  "slide-down",
  "slide-left",
  "slide-right",
  "zoom-in",
  "zoom-out",
  "pop",
] as const;

export const transitionSchema = z.object({
  type: z.enum(transitionTypes),
  /** ms from layer start (or from exit point) */
  delayMs: z.number().int().min(0).default(0),
  durationMs: z.number().int().min(1).default(500),
  easing: easingSchema.default("ease-out"),
});
export type Transition = z.infer<typeof transitionSchema>;

export const loopSchema = z.object({
  type: z.enum(["pulse", "float", "wiggle", "spin"]),
  periodMs: z.number().int().min(100).default(2000),
  easing: easingSchema.default("ease-in-out"),
});
export type Loop = z.infer<typeof loopSchema>;

export const animationSchema = z.object({
  in: transitionSchema.optional(),
  loop: loopSchema.optional(),
  out: transitionSchema.optional(),
});
export type Animation = z.infer<typeof animationSchema>;

const frameSchema = z.object({
  /** top-left corner on the canvas */
  x: z.number(),
  y: z.number(),
  width: z.number().positive(),
  height: z.number().positive(),
  rotation: z.number().default(0),
});

const textStyleSchema = z.object({
  fontFamily: z.string().default("system"),
  fontSize: z.number().positive(),
  color: z.string(),
  fontWeight: z
    .enum(["regular", "medium", "semibold", "bold", "black"])
    .default("bold"),
  align: z.enum(["left", "center", "right"]).default("center"),
  lineHeight: z.number().positive().default(1.15),
  letterSpacing: z.number().default(0),
  uppercase: z.boolean().default(false),
  shadow: z
    .object({
      color: z.string().default("#00000080"),
      blur: z.number().min(0).default(8),
      offsetY: z.number().default(2),
    })
    .optional(),
});
export type TextStyle = z.infer<typeof textStyleSchema>;

/** A photo placeholder the end user fills with their own photo/video. */
export const photoLayerSchema = z.object({
  type: z.literal("photo"),
  id: z.string(),
  /** identifier used to bind a user-selected photo to this layer */
  slotId: z.string(),
  frame: frameSchema,
  fit: z.enum(["cover", "contain"]).default("cover"),
  radius: z.number().min(0).default(0),
  animation: animationSchema.optional(),
});

/** Editable text, e.g. a headline the user can retype. */
export const textLayerSchema = z.object({
  type: z.literal("text"),
  id: z.string(),
  text: z.string(),
  /** whether the end user may edit this text */
  editable: z.boolean().default(true),
  frame: frameSchema,
  style: textStyleSchema,
  animation: animationSchema.optional(),
});

/** Static artwork: stickers, decorative shapes, PNG overlays. */
export const stickerLayerSchema = z.object({
  type: z.literal("sticker"),
  id: z.string(),
  /** Supabase Storage path or absolute URL */
  src: z.string(),
  frame: frameSchema,
  animation: animationSchema.optional(),
});

export const layerSchema = z.discriminatedUnion("type", [
  photoLayerSchema,
  textLayerSchema,
  stickerLayerSchema,
]);
export type TemplateLayer = z.infer<typeof layerSchema>;
export type PhotoLayer = z.infer<typeof photoLayerSchema>;
export type TextLayer = z.infer<typeof textLayerSchema>;
export type StickerLayer = z.infer<typeof stickerLayerSchema>;

export const backgroundSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("solid"), color: z.string() }),
  z.object({
    type: z.literal("gradient"),
    /** CSS-style linear gradient string, e.g. "linear-gradient(160deg, #fa709a, #fee140)" */
    value: z.string(),
  }),
  z.object({ type: z.literal("image"), src: z.string() }),
]);
export type TemplateBackground = z.infer<typeof backgroundSchema>;

export const templateSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(["story", "reel"]),
  aspect: z.literal("9:16").default("9:16"),
  /** total animated duration; photo stories can export a single frame */
  durationMs: z.number().int().positive().default(3000),
  canvas: z
    .object({
      width: z.number().int().positive().default(1080),
      height: z.number().int().positive().default(1920),
    })
    .default({ width: 1080, height: 1920 }),
  background: backgroundSchema,
  layers: z.array(layerSchema).min(1),
  preview: z
    .object({
      image: z.string().nullish(),
      video: z.string().nullish(),
    })
    .optional(),
});
export type Template = z.infer<typeof templateSchema>;

/** Parse unknown JSON (e.g. a row from Supabase) into a Template. */
export function parseTemplate(value: unknown): Template {
  return templateSchema.parse(value);
}

/** Collect the photo slots a user must fill, in layer order. */
export function getPhotoSlots(template: Template): PhotoLayer[] {
  return template.layers.filter(
    (layer): layer is PhotoLayer => layer.type === "photo"
  );
}
