/**
 * Roster photos, picked up by filename.
 *
 * Two ways to add them, no import or code change either way:
 *   images/artists/<id>.jpg         one photo
 *   images/artists/<id>/01.jpg …    a set — the artist page hero cycles
 *                                   through them in filename order, and the
 *                                   first is the card photo
 *
 * Supported: .jpg .jpeg .png .webp. Artists with neither keep the monogram tile.
 */
const files = import.meta.glob("./images/artists/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

/** id → photo URLs, in filename order. */
const PHOTOS: Record<string, string[]> = {};
for (const path of Object.keys(files).sort()) {
  const rel = path.replace("./images/artists/", "");
  // "dlc/01.jpg" → "dlc"; "junior-sl.jpg" → "junior-sl"
  const id = (rel.includes("/") ? rel.split("/")[0] : rel.replace(/\.[^.]+$/, "")).toLowerCase();
  (PHOTOS[id] ??= []).push(files[path]);
}

/** Every photo for an artist — the hero carousel. Falls back to the stand-in. */
export function artistPhotos(id: string, fallback?: string): string[] {
  return PHOTOS[id.toLowerCase()] ?? (fallback ? [fallback] : []);
}

/**
 * The lead photo — cards, thumbnails, social previews. A dropped-in file always
 * wins over the `fallback` stand-in set in ROSTER.
 */
export function artistPhoto(id: string, fallback?: string): string | undefined {
  return artistPhotos(id, fallback)[0];
}
