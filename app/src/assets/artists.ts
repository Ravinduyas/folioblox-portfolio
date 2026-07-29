/**
 * Roster photos, picked up by filename.
 *
 * Drop an image into `images/artists/` named after the artist's id in ROSTER —
 * `halide.jpg`, `low-arc.png` — and it appears on that artist's card and
 * biography page automatically. No import, no code change. Artists with no file
 * keep the monogram tile.
 *
 * Supported: .jpg .jpeg .png .webp · portrait or landscape (cards crop to 4:3,
 * heroes to a wide band, so keep the subject off the extreme edges).
 */
const files = import.meta.glob("./images/artists/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export const ARTIST_PHOTOS: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [
    path
      .split("/")
      .pop()!
      .replace(/\.[^.]+$/, "")
      .toLowerCase(),
    url,
  ]),
);

/**
 * A dropped-in file always wins. `fallback` is the stand-in set in ROSTER, so
 * the cards look complete today and are replaced the moment a real photo lands
 * — no code edit, nothing to remember to delete.
 */
export function artistPhoto(id: string, fallback?: string): string | undefined {
  return ARTIST_PHOTOS[id.toLowerCase()] ?? fallback;
}
