/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Published URL of this build (with trailing slash), from SITE_URL in vite.config.ts. */
  readonly VITE_SITE_URL: string;
}
