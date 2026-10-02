import type { Page } from "playwright";
import { config } from "../config.js";

export async function openFounditRegistration(page: Page): Promise<void> {
  await page.goto(config.FOUNDIt_START_URL, {
    waitUntil: "domcontentloaded",
    timeout: config.NAVIGATION_TIMEOUT_MS
  });
}
