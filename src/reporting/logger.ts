import { appendFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

export async function logEvent(event: string, data: Record<string, unknown> = {}): Promise<void> {
  const path = "./logs/agent.jsonl";
  await mkdir(dirname(path), { recursive: true });
  await appendFile(
    path,
    JSON.stringify({ timestamp: new Date().toISOString(), event, ...data }) + "\n",
    "utf8"
  );
}
