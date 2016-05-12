self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('MMG-v1').then(function(cache) {
      return cache.addAll([
                 '/',
                 '/css/main.css',
                 '/img/la.jpg'
                 ]);
    })
  );
  console.log("SW installed");

});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
