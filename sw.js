// Service Worker for GitHub Pages - must be in root directory
const CACHE_NAME = 'dnestglobal-gh-pages-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './favicon-32x32.png'
];

// Install
self.addEventListener('install', (event) => {
  console.log('🟢 Service Worker installing on GitHub Pages');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('🟢 Cache opened');
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
