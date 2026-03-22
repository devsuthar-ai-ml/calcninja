const CACHE_NAME = 'calcninja-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/js/tools.js',
  '/manifest.json',
  '/tools/emi-calculator.html',
  '/tools/sip-calculator.html',
  '/tools/gst-calculator.html',
  '/tools/income-tax-calculator.html',
  '/tools/fd-calculator.html',
  '/privacy.html',
  '/terms.html',
  '/disclaimer.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
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

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(() => {
        return caches.match('/index.html');
      });
    })
  );
});
