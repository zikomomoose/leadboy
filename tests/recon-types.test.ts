import { describe, expect, it } from "vitest";
import type { FormField, RegistrationRecon } from "../src/types.js";

describe("recon types", () => {
  it("accepts optional DOM metadata", () => {
    const field: FormField = { tag: "input", id: "email", type: "text" };
    const recon: RegistrationRecon = {
      url: "https://example.com",
      title: "Example",
      inputs: [field],
      buttons: [{ text: "Continue" }],
      selects: [],
      captchaSignals: []
    };

    expect(recon.inputs[0]?.id).toBe("email");
  });
});
