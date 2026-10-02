import { chromium, type BrowserContext } from "playwright";
import { mkdir } from "node:fs/promises";
import { config } from "../config.js";

export async function createBrowserContext(): Promise<BrowserContext> {
  await mkdir(config.BROWSER_PROFILE_DIR, { recursive: true });

  return chromium.launchPersistentContext(config.BROWSER_PROFILE_DIR, {
    headless: config.HEADLESS === "true",
    viewport: { width: 1440, height: 900 },
    acceptDownloads: false
  });
}
