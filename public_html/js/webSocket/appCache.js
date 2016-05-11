self.addEventListener('install', function(event) {
    // инсталляция
    console.log('install', event);
});

self.addEventListener('activate', function(event) {
    // активация
    console.log('activate', event);
});


// наименование для нашего хранилища кэша
var CACHE_NAME = 'MMG_serviceworker_1',
// ссылки на кэшируемые файлы
    cacheUrls = [
        '/',
        '/index.html',
        '/css/main.css',
        '/img/la.jpg',
        '/js/main.js'
];

self.addEventListener('install', function(event) {
    // задержим обработку события
    // если произойдёт ошибка, serviceWorker не установится
    event.waitUntil(
        // находим в глобальном хранилище Cache-объект с нашим именем
        // если такого не существует, то он будет создан
        caches.open(CACHE_NAME).then(function(cache) {
            // загружаем в наш cache необходимые файлы
            return cache.addAll(cacheUrls);
        })
    );
});


