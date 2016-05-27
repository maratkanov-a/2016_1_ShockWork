self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('MMG-v1').then(function(cache) {
      return cache.addAll([
                    '/',
                  '/js/main.js',
                  '/css/main.css',
                  '/img/la.jpg',
                  '/js/router.js',
                  /*'/css/loader.css',
                   '/css/materialize.min.css',*/
                    '/js/lib/require.js',
                  '/js/router.js',
                    /*'/js/lib/jquery.js',
                    '/js/lib/underscore.js',*/
                    'appCache.js',
                    '/js/build/app.js',
                    '/css/main.min.css'


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
