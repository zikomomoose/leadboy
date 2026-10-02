import { config } from "./config.js";
import { createBrowserContext } from "./browser/browser.js";
import { openFounditRegistration } from "./foundit/navigation.js";
import { inspectRegistration } from "./foundit/recon.js";
import { logEvent } from "./reporting/logger.js";

async function runRecon(): Promise<void> {
  const context = await createBrowserContext();
  const page = context.pages()[0] ?? await context.newPage();

  try {
    await logEvent("run_started", { mode: "recon" });
    await openFounditRegistration(page);

    const recon = await inspectRegistration(page);
    console.log(JSON.stringify(recon, null, 2));

    await page.screenshot({
      path: `screenshots/recon-${Date.now()}.png`,
      fullPage: true
    });

    if (recon.captchaSignals.length > 0) {
      console.warn(
        "Human verification signals detected. No bypass is attempted; inspect the visible browser manually."
      );
    }

    await logEvent("recon_completed", recon as unknown as Record<string, unknown>);
  } finally {
    await context.close();
  }
}

const command = process.argv[2] ?? "recon";

if (command === "recon") {
  await runRecon();
} else {
  throw new Error(`Unknown command: ${command}`);
}
