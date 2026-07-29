/**
 * Central image registry. Importing (rather than hard-coding "/src/assets/…"
 * strings) means Vite fingerprints and rewrites these paths at build time.
 */
import hero from "./images/hero_silhouette_1780045111608.png";
import booth from "./images/headphones_guy_1780045152818.png";
import portrait from "./images/puffer_jacket_1780045134950.png";
import still from "./images/cosmetic_bottle_1780045171230.png";
import logo from "./images/logo.jpg";

export const IMAGES = { hero, booth, portrait, still, logo };
