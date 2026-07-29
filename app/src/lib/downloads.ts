import { ARTIST, LONG_BIO, RIDER, SHORT_BIO, formatShowDate, pastShows, upcomingShows } from "../data";

/** Trigger a client-side download of generated text — no server needed. */
function downloadText(filename: string, contents: string) {
  const url = URL.createObjectURL(new Blob([contents], { type: "text/plain;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

const rule = (title: string) => `${title}\n${"─".repeat(title.length)}\n`;

export function downloadBio() {
  const body = [
    `${ARTIST.name} — ARTIST BIOGRAPHY`,
    `${ARTIST.role} · ${ARTIST.basedIn}`,
    "",
    rule("SHORT BIO (1 paragraph)"),
    SHORT_BIO,
    "",
    rule("LONG BIO"),
    LONG_BIO.join("\n\n"),
    "",
    rule("BILLING"),
    `Billing name: ${ARTIST.name} (all caps)`,
    `Genres: ${ARTIST.genres.join(", ")}`,
    `Resident Advisor: ${ARTIST.residentAdvisor}`,
    "",
    rule("CONTACT"),
    `Bookings: ${ARTIST.bookingEmail}`,
    `Press: ${ARTIST.pressEmail}`,
  ].join("\n");

  downloadText(`${ARTIST.displayName}-bio.txt`, body);
}

export function downloadRider() {
  const body = [
    `${ARTIST.name} — TECHNICAL & HOSPITALITY RIDER`,
    `Version ${new Date().getFullYear()} · supersedes all previous versions`,
    "",
    ...RIDER.flatMap((section) => [
      rule(section.title.toUpperCase()),
      ...section.items.map((item) => `  • ${item}`),
      "",
    ]),
    rule("CONTACT"),
    `Bookings: ${ARTIST.bookingEmail}`,
    `Anything in this rider that the venue cannot meet: raise it before the contract is signed,`,
    `not on the night. Most of it is negotiable if flagged early.`,
  ].join("\n");

  downloadText(`${ARTIST.displayName}-technical-rider.txt`, body);
}

export function downloadDateSheet() {
  const line = (s: ReturnType<typeof upcomingShows>[number]) =>
    `  ${formatShowDate(s.date).full.padEnd(22)} ${s.city}, ${s.country} — ${s.venue} (${s.event})`;

  const body = [
    `${ARTIST.name} — DATE SHEET`,
    `Generated ${new Date().toLocaleDateString("en-GB")}`,
    "",
    rule("UPCOMING"),
    ...upcomingShows().map(line),
    "",
    rule("RECENT"),
    ...pastShows().slice(0, 12).map(line),
  ].join("\n");

  downloadText(`${ARTIST.displayName}-dates.txt`, body);
}
