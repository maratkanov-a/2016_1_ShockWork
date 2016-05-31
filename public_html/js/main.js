define([
    'router'
], function(
    router
){
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(
           '/js/appCache.js'
        ).then(function(registration) {
            console.log('ServiceWorker registration');
        }).catch(function(err) {
             console.log('ServiceWorker registration failed');
        });
    }



    Backbone.history.start();
});
