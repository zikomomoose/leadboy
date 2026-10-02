import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  FOUNDIt_START_URL: z.string().url(),
  HEADLESS: z.enum(["true", "false"]).default("false"),
  BROWSER_PROFILE_DIR: z.string().default("./data/browser-profile"),
  NAVIGATION_TIMEOUT_MS: z.coerce.number().int().positive().default(30_000)
});

export const config = envSchema.parse({
  FOUNDIt_START_URL: process.env.FOUNDIt_START_URL,
  HEADLESS: process.env.HEADLESS ?? "false",
  BROWSER_PROFILE_DIR: process.env.BROWSER_PROFILE_DIR ?? "./data/browser-profile",
  NAVIGATION_TIMEOUT_MS: process.env.NAVIGATION_TIMEOUT_MS ?? "30000"
});
