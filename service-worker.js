const CACHE_NAME = 'dnestglobal-ios-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './favicon-32x32.png',
  './favicon-16x16.png',
  './apple-touch-icon.png'
];

// Install
self.addEventListener('install', (event) => {
  console.log('🟢 Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ Cache opened');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate
self.addEventListener('activate', (event) => {
  console.log('🟢 Service Worker activated');
  event.waitUntil(self.clients.claim());
});

// Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
