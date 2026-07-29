# Roster photos

Drop artist photos in this folder. The filename must match the artist's `id` in
`ROSTER` (see [`app/src/data.ts`](../../../data.ts)) — nothing else to change.

| Artist | Filename | Present |
| ------ | -------- | ------- |
| Exploration Recordings | `exploration-recordings.*` | ✅ `.jpg` |
| Halide | `halide.*` | ✅ `.webp` |
| Low Arc | `low-arc.*` | ✅ `.jpg` |
| Marisa Volt | `marisa-volt.*` | ✅ `.jpg` |

Formats: `.jpg`, `.jpeg`, `.png`, `.webp`. Replacing a photo means overwriting
the file — the extension can change, the name cannot.

> **Rights check before launch.** The current four are web-sourced press shots
> of real, identifiable DJs, used here as placeholders. Two are named in their
> original filenames. Publishing them next to invented artist names and bios
> would misrepresent those people, so swap in licensed or own photography
> before the site goes live.

**A file here always wins.** Until one exists, each artist shows the stand-in
set on `photo` in `ROSTER` — currently the site's own stock photography, reused
so the roster reads as finished. Dropping a real file in overrides it; there is
no placeholder line to remember to delete. An artist with neither falls back to
a monogram tile.

Each entry also has an optional `photoPosition` (an `object-position` value like
`"60% 22%"`) controlling the crop. Set it if a new photo's subject sits off
centre in the 4:3 card or the wide hero band.

## What the images should be

- **Landscape or square works best.** Cards crop to 4:3 and the biography hero
  crops to a wide band, so keep the subject away from the extreme edges.
- **~1600px on the long edge** is plenty. Vite fingerprints these at build time
  but does not resize them, so a 6000px camera export ships at full weight —
  scale it down first.
- Cards render photos **greyscale, colouring on hover**, matching the gallery
  and release artwork. High-contrast shots hold up best.

Adding a new artist to `ROSTER` and dropping in `their-id.jpg` is the whole job.
