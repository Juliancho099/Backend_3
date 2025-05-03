import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __baseUrl = resolve(__dirname, "../..");

export { __dirname, __baseUrl };
