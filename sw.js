// Import Workbox
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst,
} from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";

// Precache and route all assets
precacheAndRoute(self.__WB_MANIFEST);

// Clean up outdated caches
cleanupOutdatedCaches();

// Cache Strategy for HTML pages
registerRoute(
  ({ request }) => request.destination === "document",
  new NetworkFirst({
    cacheName: "html-pages",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Cache Strategy for CSS and JS files
registerRoute(
  ({ request }) =>
    request.destination === "style" || request.destination === "script",
  new StaleWhileRevalidate({
    cacheName: "static-assets",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      }),
    ],
  })
);

// Cache Strategy for Images
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Cache Strategy for Fonts
registerRoute(
  ({ url }) =>
    url.origin === "https://cdn.jsdelivr.net" && url.pathname.includes("font"),
  new CacheFirst({
    cacheName: "fonts",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
      }),
    ],
  })
);

// Cache Strategy for External Libraries (Bootstrap, jsPDF, etc.)
registerRoute(
  ({ url }) =>
    url.origin === "https://cdnjs.cloudflare.com" ||
    url.origin === "https://cdn.jsdelivr.net",
  new StaleWhileRevalidate({
    cacheName: "external-libraries",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Cache Strategy for API calls (if any)
registerRoute(
  ({ url }) => url.pathname.startsWith("/api/"),
  new NetworkFirst({
    cacheName: "api-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60, // 5 minutes
      }),
    ],
  })
);

// Offline fallback
const FALLBACK_HTML_URL = "/offline.html";
const CACHE_NAME = "offline-fallback";

// Cache the offline fallback page
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.add(FALLBACK_HTML_URL);
    })
  );
});

// Show offline page when network fails
self.addEventListener("fetch", (event) => {
  if (event.request.destination === "document") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(FALLBACK_HTML_URL);
      })
    );
  }
});

// Handle background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle offline data synchronization
  try {
    const offlineData = await getOfflineData();
    if (offlineData.length > 0) {
      await syncOfflineData(offlineData);
      await clearOfflineData();
    }
  } catch (error) {
    console.error("Background sync failed:", error);
  }
}

async function getOfflineData() {
  // Get data stored while offline
  const db = await openDB();
  const transaction = db.transaction(["offline-actions"], "readonly");
  const store = transaction.objectStore("offline-actions");
  return store.getAll();
}

async function syncOfflineData(data) {
  // Sync offline data to server
  for (const item of data) {
    try {
      await fetch("/api/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
    } catch (error) {
      console.error("Failed to sync item:", item, error);
    }
  }
}

async function clearOfflineData() {
  // Clear synced offline data
  const db = await openDB();
  const transaction = db.transaction(["offline-actions"], "readwrite");
  const store = transaction.objectStore("offline-actions");
  await store.clear();
}

async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("OfflineDB", 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("offline-actions")) {
        db.createObjectStore("offline-actions", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };
  });
}

// Handle push notifications
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: "/images/icons/icon-192x192.png",
      badge: "/images/icons/icon-72x72.png",
      tag: data.tag || "default",
      requireInteraction: true,
      actions: [
        {
          action: "view",
          title: "Lihat",
          icon: "/images/icons/action-view.png",
        },
        {
          action: "dismiss",
          title: "Tutup",
          icon: "/images/icons/action-dismiss.png",
        },
      ],
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "view") {
    event.waitUntil(clients.openWindow("/"));
  }
});

// Skip waiting and immediately activate new service worker
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
