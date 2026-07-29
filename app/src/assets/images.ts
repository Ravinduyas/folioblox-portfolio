/**
 * Central image registry. Importing (rather than hard-coding "/src/assets/…"
 * strings) means Vite fingerprints and rewrites these paths at build time.
 */
import logo from "./images/logo.jpg";

/* Photography — see images/site/ */
import heroBooth from "./images/site/hero-booth.jpg";
import lasers from "./images/site/lasers.webp";
import festival from "./images/site/festival.jpg";
import portraitShades from "./images/site/portrait-shades.jpg";
import handsBw from "./images/site/hands-bw.jpg";
import boothPov from "./images/site/booth-pov.jpg";
import mixerBlue from "./images/site/mixer-blue.jpg";
import overheadSmoke from "./images/site/overhead-smoke.jpg";
import studioDark from "./images/site/studio-dark.jpg";
import deckBokeh from "./images/site/deck-bokeh.jpg";
import radioDesk from "./images/site/radio-desk.jpg";
import radioOnAir from "./images/site/radio-onair.jpg";
import studioVinyl from "./images/site/studio-vinyl.jpg";
import vinyl from "./images/site/vinyl.jpg";
import coverTapeDubs from "./images/site/cover-tape-dubs.jpg";
import coverColdStorage from "./images/site/cover-cold-storage.jpg";
import artistBooth from "./images/site/artist-booth.jpg";
import pressPortrait from "./images/site/press-portrait.jpg";
import pressGreen from "./images/site/press-green.jpg";
import crowdConfetti from "./images/site/crowd-confetti.jpg";
import crowdBooth from "./images/site/crowd-booth.jpg";
import crowdHands from "./images/site/crowd-hands.jpg";
import crowdDance from "./images/site/crowd-dance.jpg";

export const IMAGES = {
  logo,

  /* Heroes */
  heroBooth,
  lasers,
  festival,
  portraitShades,
  handsBw,
  boothPov,

  /* Music — mixes, radio, releases */
  mixerBlue,
  overheadSmoke,
  studioDark,
  deckBokeh,
  radioDesk,
  radioOnAir,
  studioVinyl,
  vinyl,
  coverTapeDubs,
  coverColdStorage,
  artistBooth,

  /* Press + gallery */
  pressPortrait,
  pressGreen,
  crowdConfetti,
  crowdBooth,
  crowdHands,
  crowdDance,
};
