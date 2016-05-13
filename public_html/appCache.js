self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('MMG-v1').then(function(cache) {
      return cache.addAll([
      			 '/',
                 '/css/main.css',
                 '/css/materialize.min.css',
                 '/css/loader.css',
                 '/css/cards/jquery-ui.css',
                 '/css/cards/style.css',
                 '/css/cards/template.css',
                 '/js/main.js',
                 '/js/router.js',
                 '/js/collections/cards.js',
                 '/js/collections/scores.js',
                 '/js/lib/require.js',
                 '/js/lib/backbone.js', 
                 '/js/lib/hammerjs.js', 
                 '/js/lib/jquery.js', 
                 '/js/lib/materialize.min.js',
                 '/js/lib/underscore.js',
                 '/js/lib/cards/css3-mediaqueries.js',
				 '/js/lib/cards/html5.js',
				 '/js/lib/cards/jquery-1.10.2.js',
				 '/js/lib/cards/jquery-latest.min.js',
				 '/js/lib/cards/jquery-ui.js',
				 '/js/models/card.js',
				 '/js/models/score.js',
				 '/js/models/session.js',
				 '/js/tmpl/game.js',
				 '/js/tmpl/input_field_template.js',
				 '/js/tmpl/login.js',
				 '/js/tmpl/main.js',
				 '/js/tmpl/registration.js',
				 '/js/tmpl/scoreboard.js',
				 '/js/views/game.js',
				 '/js/views/login.js',
				 '/js/views/main.js',
				 '/js/views/offline.js',
				 '/js/views/registration.js',
				 '/js/views/scoreboard.js',
				 '/js/views/view_manager.js',
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
