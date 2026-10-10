/**
 * Central image registry. Importing (rather than hard-coding "/src/assets/…"
 * strings) means Vite fingerprints and rewrites these paths at build time.
 */
import logo from "./images/logo.png";

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
import artistDecks from "./images/site/artist-decks.jpg";
import pressPortrait from "./images/site/press-portrait.jpg";
import pressGreen from "./images/site/press-green.jpg";
import crowdConfetti from "./images/site/crowd-confetti.jpg";
import crowdBooth from "./images/site/crowd-booth.jpg";
import crowdHands from "./images/site/crowd-hands.jpg";
import crowdDance from "./images/site/crowd-dance.jpg";

/* Real event photography — see images/real/ (cropped 16:9 for headers) */
import realBrunchSet from "./images/real/brunch-set.jpg";
import realRedDecks from "./images/real/red-decks.jpg";
import realDjCrowd from "./images/real/dj-crowd.jpg";
import realDlcDecks from "./images/real/dlc-decks.jpg";
import realStageWide from "./images/real/stage-wide.jpg";
import realSystemStage from "./images/real/system-stage.jpg";
import realDlcPortrait from "./images/real/dlc-portrait.jpg";
import realWhiteTee from "./images/real/white-tee.jpg";
import realSouthCoast from "./images/real/south-coast.jpg";
import realGoldenSet from "./images/real/golden-set.jpg";

/* Release artwork — see images/releases/ (from the label's Proton Radio catalogue) */
import coverER001 from "./images/releases/er001-time-machine.jpg";
import coverER002 from "./images/releases/er002-liquid-aura.jpg";

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
  artistDecks,

  /* Press + gallery */
  pressPortrait,
  pressGreen,
  crowdConfetti,
  crowdBooth,
  crowdHands,
  crowdDance,

  /* Real event photography */
  realBrunchSet,
  realRedDecks,
  realDjCrowd,
  realDlcDecks,
  realStageWide,
  realSystemStage,
  realDlcPortrait,
  realWhiteTee,
  realSouthCoast,
  realGoldenSet,

  /* Release artwork */
  coverER001,
  coverER002,
};
