/**
 * Server entry for the build-time prerender (scripts/prerender.mjs). Renders a
 * route to HTML with the same AppShell the browser uses, so crawlers and AI
 * engines that don't run JavaScript get the full page.
 */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppShell, basename } from "./App";

export { ROUTES, headHtml, llmsTxt, sitemapXml } from "./seo";

/** `path` is the route without the base, e.g. "/news". */
export function render(path: string): string {
  return renderToString(
    <StaticRouter basename={basename} location={`${basename}${path === "/" ? "/" : path}`}>
      <AppShell />
    </StaticRouter>,
  );
}
