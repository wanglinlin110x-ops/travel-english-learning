const CACHE_VERSION = "travel-english-v42";
const APP_SHELL = [
  "./",
  "./index.html",
  "./cloud-config.js",
  "./manifest.webmanifest",
  "./assets/home-figma-bg.webp",
  "./assets/home-figma-route.svg",
  "./assets/home-figma-star.png",
  "./assets/nav-home-figma.png",
  "./assets/nav-learn-figma.png",
  "./assets/nav-review-figma.png",
  "./assets/review-play-figma.svg",
  "./assets/review-slow-figma.svg",
  "./assets/review-wrongbook-figma.png",
  "./assets/immersion-back-figma.svg",
  "./assets/immersion-word-audio-figma.svg",
  "./assets/immersion-example-play-figma.svg",
  "./assets/immersion-example-slow-figma.svg",
  "./assets/immersion-favorite-figma.svg",
  "./assets/immersion-favorite-active-figma.svg",
  "./assets/immersion-prev-figma.svg",
  "./assets/immersion-prev-active-figma.svg",
  "./assets/immersion-next-figma.svg",
  "./assets/immersion-next-muted-figma.svg",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png",
  "./assets/icons/apple-touch-icon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  if (url.pathname.endsWith("/cloud-config.js")) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_VERSION).then(cache => cache.put(request, copy));
      }
      return response;
    }))
  );
});
