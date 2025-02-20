// Update the version if you modify cached files
const CACHE_NAME = 'pwa-deep-link-test-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/subpage/index.html',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// On install, cache all the essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// On fetch, try cache first, then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});