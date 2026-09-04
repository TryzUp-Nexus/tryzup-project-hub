import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const PROJECTS_PATH = path.join(ROOT_DIR, "data", "projects.json");
const SCHEMA_PATH = path.join(ROOT_DIR, "data", "projects.schema.json");

async function readJson(filePath) {
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content);
}

function printValidationErrors(errors = []) {
  console.error("\nErrores encontrados:\n");

  for (const error of errors) {
    const location = error.instancePath || "/";
    console.error(`- ${location}: ${error.message}`);
  }
}

async function validateProjects() {
  try {
    const [projects, schema] = await Promise.all([readJson(PROJECTS_PATH), readJson(SCHEMA_PATH)]);

    const ajv = new Ajv2020({
      allErrors: true,
      strict: true,
    });

    addFormats(ajv);

    const validate = ajv.compile(schema);
    const isValid = validate(projects);

    if (!isValid) {
      console.error("✗ projects.json validation failed.");
      printValidationErrors(validate.errors);
      process.exitCode = 1;
      return;
    }

    console.log(`✓ projects.json is valid.`);
    console.log(`✓ ${projects.length} projects validated successfully.`);
  } catch (error) {
    console.error("✗ Data validation could not be completed.");
    console.error(error.message);
    process.exitCode = 1;
  }
}

await validateProjects();
