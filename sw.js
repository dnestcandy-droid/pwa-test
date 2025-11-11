// Service Worker for GitHub Pages
const CACHE_NAME = 'dnestglobal-github-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './favicon-32x32.png'
];

self.addEventListener('install', (event) => {
  console.log('🟢 Service Worker: Installing');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('🟢 Cache opened');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('🟢 All resources cached');
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('🟢 Service Worker: Activated');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
