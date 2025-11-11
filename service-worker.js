const CACHE_NAME = 'dnestglobal-mobile-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon-32x32.png'
];

self.addEventListener('install', (event) => {
  console.log('🟢 Service Worker: Installing');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('🟢 Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  console.log('🟢 Service Worker: Activated');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
