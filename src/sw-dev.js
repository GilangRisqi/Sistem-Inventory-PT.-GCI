// Development Service Worker
// Minimal service worker for development mode

console.log("Development Service Worker loaded");

self.addEventListener("install", (event) => {
  console.log("Dev SW: Installing...");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Dev SW: Activating...");
  event.waitUntil(self.clients.claim());
});

// Pass through all requests in development
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
