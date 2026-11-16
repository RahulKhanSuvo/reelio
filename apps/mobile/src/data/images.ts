/**
 * Placeholder photography from Unsplash (free to hotlink).
 * Single source for every remote image until real assets live in
 * Supabase Storage (template previews, filter LUTs, hero artwork).
 */
const unsplash = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const heroImage = unsplash("photo-1502602898655-3e91760cbb34", 1080);

/** template id → card thumbnail */
export const templateThumbs: Record<string, string> = {
  "minimal-intro": unsplash("photo-1495474472287-4d71bcdd2085"),
  "punch-lines": unsplash("photo-1529626455594-4ff0802cfb7e"),
  "showcase-triptych": unsplash("photo-1554118811-1e0d58224f24"),
};

export const filterImages: Record<string, string> = {
  "afterhours-01": unsplash("photo-1493809842364-78817add7ffb"),
  "sunwave-01": unsplash("photo-1487412947147-5cebf100ffc2"),
  "saffron-08": unsplash("photo-1506905925346-21bda4d32df4"),
  "oat-milk": unsplash("photo-1483985988355-763728e1935b"),
};
