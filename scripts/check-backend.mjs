/**
 * WHAT: Pre-dev backend health check
 * WHY:  Login state depends on capstone-be-api (NestJS), capstone-keycloak, capstone-redis,
 *       and capstone-postgres all running. If any are down, the session cookie won't work.
 * HOW:  Runs before `pnpm dev` via the "predev" script in package.json.
 *       Uses `docker inspect` — no extra deps required.
 */

import { execSync } from "node:child_process";

const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const CYAN = "\x1b[36m";
const DIM = "\x1b[2m";

/** @type {{ name: string; role: string; required: boolean }[]} */
const CONTAINERS = [
  {
    name: "capstone-be-api",
    role: "NestJS API (port 3001) — Auth, Session, API proxy target",
    required: true,
  },
  {
    name: "capstone-keycloak",
    role: "Keycloak (port 8080) — OAuth2 / login redirect",
    required: true,
  },
  {
    name: "capstone-redis",
    role: "Redis (port 6379) — Session cookie storage",
    required: true,
  },
  {
    name: "capstone-postgres",
    role: "PostgreSQL (port 5432) — Application database",
    required: true,
  },
];

/**
 * @param {string} containerName
 * @returns {"running" | "stopped" | "not_found" | "docker_unavailable"}
 */
function getContainerStatus(containerName) {
  try {
    const output = execSync(
      `docker inspect --format "{{.State.Status}}" ${containerName}`,
      { stdio: ["pipe", "pipe", "pipe"] },
    )
      .toString()
      .trim();
    return output === "running" ? "running" : "stopped";
  } catch (err) {
    const msg = err?.message ?? "";
    if (msg.includes("No such object") || msg.includes("Error response")) {
      return "not_found";
    }
    // Docker daemon not running / not installed
    return "docker_unavailable";
  }
}

function statusBadge(status) {
  switch (status) {
    case "running":
      return `${GREEN}● RUNNING${RESET}`;
    case "stopped":
      return `${YELLOW}○ STOPPED${RESET}`;
    case "not_found":
      return `${RED}✗ NOT FOUND${RESET}`;
    case "docker_unavailable":
      return `${RED}✗ DOCKER UNAVAILABLE${RESET}`;
    default:
      return `${DIM}? UNKNOWN${RESET}`;
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

console.log();
console.log(
  `${BOLD}${CYAN}╔════════════════════════════════════════════════════════╗${RESET}`,
);
console.log(
  `${BOLD}${CYAN}║        GlowScan — Backend Services Health Check        ║${RESET}`,
);
console.log(
  `${BOLD}${CYAN}╚════════════════════════════════════════════════════════╝${RESET}`,
);
console.log();

let allRequiredUp = true;
const results = [];

for (const container of CONTAINERS) {
  const status = getContainerStatus(container.name);
  results.push({ ...container, status });
  if (container.required && status !== "running") {
    allRequiredUp = false;
  }
}

// Print table
for (const { name, role, status } of results) {
  const badge = statusBadge(status);
  console.log(`  ${badge}  ${BOLD}${name}${RESET}`);
  console.log(`  ${DIM}         ${role}${RESET}`);
  console.log();
}

// ─── Summary ────────────────────────────────────────────────────────────────

if (allRequiredUp) {
  console.log(
    `${GREEN}${BOLD}✓ All backend services are running. Login state will persist correctly.${RESET}`,
  );
} else {
  console.log(
    `${YELLOW}${BOLD}⚠  Some backend services are NOT running.${RESET}`,
  );
  console.log(
    `${YELLOW}   Session cookies (login state) will NOT work until they are up.${RESET}`,
  );
  console.log();
  console.log(
    `${DIM}   To start all backend services, run from capstone-be/:${RESET}`,
  );
  console.log(`${BOLD}   docker compose up -d${RESET}`);
  console.log();
  console.log(
    `${DIM}   The FE dev server will still start — set NEXT_PUBLIC_DEV_BYPASS_AUTH=true${RESET}`,
  );
  console.log(
    `${DIM}   in .env.local if you want to skip auth entirely during development.${RESET}`,
  );
}

console.log();
console.log(
  `${DIM}─────────────────────────────────────────────────────────${RESET}`,
);
console.log();

// Always exit 0 — the check is informational, never blocks `pnpm dev`
process.exit(0);
