// Webpack Development Helper
// Script to handle development mode issues and suppress Workbox warnings

const fs = require("fs");
const path = require("path");

// Function to check if we're in watch mode
function isWatchMode() {
  return (
    process.argv.includes("--watch") || process.env.WEBPACK_WATCH === "true"
  );
}

// Function to clean up old service worker files
function cleanupServiceWorkers() {
  const distPath = path.join(__dirname, "dist");
  const swFiles = ["sw.js", "sw.js.map", "workbox-*.js", "workbox-*.js.map"];

  if (fs.existsSync(distPath)) {
    const files = fs.readdirSync(distPath);
    files.forEach((file) => {
      if (
        file.startsWith("workbox-") ||
        file === "sw.js" ||
        file === "sw.js.map"
      ) {
        const filePath = path.join(distPath, file);
        try {
          fs.unlinkSync(filePath);
          console.log(`[Cleanup] Removed old service worker file: ${file}`);
        } catch (error) {
          // Ignore errors, file might be in use
        }
      }
    });
  }
}

// Function to create development service worker
function createDevServiceWorker() {
  const distPath = path.join(__dirname, "dist");
  const swPath = path.join(distPath, "sw.js");

  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }

  const devSWContent = `
// Development Service Worker - No Workbox warnings
const CACHE_NAME = 'gci-inventory-dev-' + Date.now();

self.addEventListener('install', (event) => {
  console.log('[Dev SW] Installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Dev SW] Activating...');
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Simple pass-through in development
  event.respondWith(fetch(event.request));
});

console.log('[Dev SW] Development service worker loaded');
`;

  fs.writeFileSync(swPath, devSWContent);
  console.log("[Setup] Created development service worker");
}

// Function to suppress Workbox warnings
function suppressWorkboxWarnings() {
  const originalConsoleWarn = console.warn;
  console.warn = function (...args) {
    const message = args.join(" ");
    if (
      message.includes("GenerateSW has been called multiple times") ||
      message.includes("workbox") ||
      message.includes("precache manifest")
    ) {
      // Suppress Workbox warnings in development
      return;
    }
    originalConsoleWarn.apply(console, args);
  };
}

// Main execution
if (process.env.NODE_ENV !== "production") {
  console.log("[Dev Helper] Development mode detected");

  if (isWatchMode()) {
    console.log(
      "[Dev Helper] Watch mode detected - suppressing Workbox warnings"
    );
    suppressWorkboxWarnings();
    cleanupServiceWorkers();
    createDevServiceWorker();
  }
}

module.exports = {
  isWatchMode,
  cleanupServiceWorkers,
  createDevServiceWorker,
  suppressWorkboxWarnings,
};
