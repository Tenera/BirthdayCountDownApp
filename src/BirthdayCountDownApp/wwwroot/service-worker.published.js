/* service-worker.published.js
   This worker is used in published builds. The build will generate
   `service-worker-assets.js` containing the hashed asset list.
*/

self.importScripts('service-worker-assets.js');

const assets = self.assetsManifest && self.assetsManifest.assets ? self.assetsManifest.assets.map(a => a.url) : [];
const additional = [ './', 'index.html' ];
const toCache = assets.concat(additional);
const cacheName = 'blazor-cache-' + (self.assetsManifest && self.assetsManifest.version ? self.assetsManifest.version : Date.now());

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(toCache)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== cacheName).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  // Try cache first, then network
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
