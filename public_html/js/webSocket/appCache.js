var CACHE_NAME = 'MMG-cache-v1';
var urlsToCache = [
    '/',
    '/index.html',
    '/css/main.css',
    '/js/router.js',
    '/js/main.js',
    '/img/la.jpg',
    '/js/webSocket/appCache.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
    // активация
    console.log('activate', event);
});

this.addEventListener('fetch', function(event) {
   var response;
   event.respondWith(
     fetch(event.request).then(function(resp) {
       response = resp;
       caches.open('MMG-cache-v1').then(function(cache) {
         cache.put(event.request, response);
       });
       return response.clone();
     }).catch(function(error) {
       console.log('Error: ' + error);
       return caches.match(event.request);
     })
   );
 });
