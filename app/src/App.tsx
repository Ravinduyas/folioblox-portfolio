/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { BookingProvider } from "./context/BookingContext";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import PageTransition from "./components/motion/PageTransition";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Shows from "./pages/Shows";
import About from "./pages/About";
import ArtistDetail from "./pages/ArtistDetail";
import Press from "./pages/Press";
import Booking from "./pages/Booking";

/**
 * Land at the top on navigation. With a #hash, wait a frame for the incoming
 * page to mount — the client router bypasses the browser's own hash scrolling,
 * so /about#roster would otherwise land nowhere.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      return;
    }

    const frame = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

/** Routes live here so AnimatePresence can see the location change. */
function AnimatedRoutes() {
  const location = useLocation();

  const pages: [string, ReactNode][] = [
    ["/", <Home />],
    ["/music", <Music />],
    ["/shows", <Shows />],
    ["/about", <About />],
    ["/artists/:artistId", <ArtistDetail />],
    ["/press", <Press />],
    ["/booking", <Booking />],
    ["*", <Home />],
  ];

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {pages.map(([path, element]) => (
          <Route key={path} path={path} element={<PageTransition>{element}</PageTransition>} />
        ))}
      </Routes>
    </AnimatePresence>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b0c0e] font-sans text-white antialiased">
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <main className="overflow-x-clip">{children}</main>
      <Footer />
    </div>
  );
}

/** Vite's base is "/" locally and "/folioblox-portfolio/" on GitHub Pages. */
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <BookingProvider>
        <ScrollToTop />
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </BookingProvider>
    </BrowserRouter>
  );
}
