const CACHE_NAME = "printing-app-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/app.bundle.js",
  "/runtime.bundle.js",
  "/manifest.json",
];

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache opened");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event handling
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Return cached version or fetch new
        return response || fetch(event.request);
      })
      .catch(() => {
        // Return offline page or handle error
        return new Response("Offline mode: No cached data available");
      })
  );
});
