import type { Page } from "playwright";
import type { FormField, RegistrationRecon } from "../types.js";

export async function inspectRegistration(page: Page): Promise<RegistrationRecon> {
  const inputs = await page.locator("input").evaluateAll((nodes): FormField[] =>
    nodes.map((node) => {
      const el = node as HTMLInputElement;
      return {
        tag: "input",
        type: el.type || undefined,
        id: el.id || undefined,
        name: el.name || undefined,
        placeholder: el.placeholder || undefined,
        ariaLabel: el.getAttribute("aria-label") || undefined
      };
    })
  );

  const buttons = await page.locator("button").evaluateAll((nodes) =>
    nodes.map((node) => {
      const el = node as HTMLButtonElement;
      return {
        text: (el.innerText || el.textContent || "").trim(),
        ariaLabel: el.getAttribute("aria-label") || undefined
      };
    }).filter((x) => x.text || x.ariaLabel)
  );

  const selects = await page.locator("select").evaluateAll((nodes): FormField[] =>
    nodes.map((node) => {
      const el = node as HTMLSelectElement;
      return {
        tag: "select",
        id: el.id || undefined,
        name: el.name || undefined,
        ariaLabel: el.getAttribute("aria-label") || undefined
      };
    })
  );

  const captchaSignals = await page.locator("body").evaluate((body) => {
    const bodyElement = body as HTMLElement;
    const text = (bodyElement.innerText || "").toLowerCase();
    const selectors = [
      "[class*='captcha']",
      "[id*='captcha']",
      "[class*='recaptcha']",
      "[id*='recaptcha']",
      "iframe[src*='captcha']"
    ];
    const selectorHits = selectors.filter((selector) => body.querySelector(selector));
    const textHits = ["captcha", "verify you are human", "cloudflare"]
      .filter((term) => text.includes(term));
    return [...new Set([...selectorHits, ...textHits])];
  });

  return {
    url: page.url(),
    title: await page.title(),
    inputs,
    buttons,
    selects,
    captchaSignals
  };
}
