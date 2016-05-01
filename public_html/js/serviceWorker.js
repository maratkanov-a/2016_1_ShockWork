this.addEventListener('fetch', function(event) {
   var response;
   event.respondWith(
     fetch(event.request).then(function(resp) {
       response = resp;
       caches.open('la').then(function(cache) {
         cache.put(event.request, response);
       });
       return response.clone();
     }).catch(function(error) {
       console.log('Error: ' + error);
       return caches.match(event.request);
     })
   );
 });

 this.addEventListener('install', function(event) {
   event.waitUntil(
     caches.open('la').then(function(cache) {
       return cache.addAll([
         '/',
         '/index.html',
         '/css/main.css',
         '/css/materialize.min.css',
         '/js/lib/require.js'
       ]);
     })
   );
 });

 this.addEventListener('activate', function(event) {
   var cacheWhitelist = ['la'];
   event.waitUntil(
     caches.keys().then(function(keyList) {
       return Promise.all(keyList.map(function(key) {
         if (cacheWhitelist.indexOf(key) === -1) {
           return caches.delete(key);
         }
       }));
     })
   );
 });