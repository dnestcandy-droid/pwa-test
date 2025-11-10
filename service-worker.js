const CACHE_NAME = 'dnestglobal-v2.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon-32x32.png',
  '/favicon-16x16.png'
];

// Install event
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  self.skipWaiting(); // Activate immediately
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ Cache opened');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('❌ Cache addAll failed:', error);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('🎯 Service Worker activated');
  event.waitUntil(self.clients.claim()); // Take control immediately
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});