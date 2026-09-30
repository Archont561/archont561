import { access, copyFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const examplePath = join(root, ".env.example");
const envPath = join(root, ".env");
const force = process.argv.includes("--force");

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

if ((await exists(envPath)) && !force) {
  console.log("[env:restore] .env already exists; leaving it unchanged.");
  console.log("[env:restore] Use --force to restore it from .env.example.");
} else {
  await copyFile(examplePath, envPath);
  console.log("[env:restore] restored .env from .env.example.");
  console.log("[env:restore] Review local values before running the scanner.");
}
