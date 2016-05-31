self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('MMG-v2').then(function(cache) {
      return cache.addAll([
                  '/',
                  '/index.html',
                  '/js/build.min.js',
				  '/js/app.js',
				  '/js/router.js',
				  '/js/collections/scores.js',
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
				  '/font/roboto/Roboto-Regular.ttf',
				  '/font/roboto/Roboto-Regular.woff',
				  '/font/roboto/Roboto-Regular.woff2',
				  '/css/build.min.css',
				  '/img/back.png',
				  '/img/explosion.gif',
				  '/img/la.jpg',
				  '/img/cards/base-bg.png',
				  '/img/cards/bg.jpg',
				  '/img/cards/button.png',
				  '/img/cards/Button_downed.png',
				  '/img/cards/Button_not_down.png',
				  '/img/cards/stol.jpg',
				  '/img/cards/bekbulatov_card.png',
				  '/img/cards/burlak_card.png',
				  '/img/cards/didikin_card.png',
				  '/img/cards/dudina_card.png',
				  '/img/cards/frolov_card.png',
				  '/img/cards/isaikin_card.png',
				  '/img/cards/ivanov_card.png',
				  '/img/cards/korepanov_card.png',
				  '/img/cards/mazcevitc_card.png',
				  '/img/cards/meleshenko_card.png',
				  '/img/cards/mezin_card.png',
				  '/img/cards/mogilin_card.png',
				  '/img/cards/petrov_card.png',
				  '/img/cards/sherbinin_card.png',
				  '/img/cards/shubin_card.png',
				  '/img/cards/smal_card.png',
				  '/img/cards/soloviev_card.png',
				  '/img/cards/stupnikov_card.png',
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
