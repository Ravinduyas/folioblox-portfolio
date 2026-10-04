/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode, useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { BookingProvider } from "./context/BookingContext";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import PageTransition from "./components/motion/PageTransition";
import Home from "./pages/Home";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Releases from "./pages/Releases";
import Artists from "./pages/Artists";
import ArtistDetail from "./pages/ArtistDetail";
import Booking from "./pages/Booking";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shows from "./pages/Shows";
import Press from "./pages/Press";
import { headTags, jsonLdGraph, pageSeo } from "./seo";

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
    ["/news", <News />],
    ["/news/:newsId", <NewsDetail />],
    ["/releases", <Releases />],
    ["/artists", <Artists />],
    ["/artists/:artistId", <ArtistDetail />],
    ["/booking", <Booking />],
    ["/about", <About />],
    ["/contact", <Contact />],
    // Not in the nav — left over from the single-artist site.
    ["/shows", <Shows />],
    ["/press", <Press />],
    // Old URL — Releases replaced the Music page.
    ["/music", <Navigate to="/releases" replace />],
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

/**
 * Keeps the head in step with the route on client-side navigation: title,
 * description, canonical, Open Graph / Twitter tags and JSON-LD, all from
 * seo.ts. The prerendered HTML ships the same tags for the first load.
 */
function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = pageSeo(pathname);
    document.title = seo.title;
    document.head.querySelectorAll("[data-seo]").forEach((node) => node.remove());
    for (const { tag, attrs } of headTags(seo)) {
      const el = document.createElement(tag);
      for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
      el.setAttribute("data-seo", "");
      document.head.appendChild(el);
    }
    if (seo.jsonLd.length) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo", "");
      script.textContent = jsonLdGraph(seo);
      document.head.appendChild(script);
    }
  }, [pathname]);

  return null;
}

/** Vite's base is "/" locally and "/folioblox-portfolio/" on GitHub Pages. */
export const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Everything inside the router — shared by the browser app and the prerender. */
export function AppShell() {
  return (
    <BookingProvider>
      <Seo />
      <ScrollToTop />
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BookingProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <AppShell />
    </BrowserRouter>
  );
}
