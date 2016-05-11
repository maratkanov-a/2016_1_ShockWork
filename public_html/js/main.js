require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        materialize: 'lib/materialize.min',
        hammerjs: 'lib/hammerjs',
        jquery_ui: 'lib/cards/jquery-ui',
        gameplay: 'lib/cards/function',
        socket: 'webSocket/webSocket',
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery', 'jquery_ui'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'materialize': {
            deps: ['jquery', 'hammerjs']
        }
    }

});

define([
    'backbone',
    'router'
], function(
    Backbone,
    router
){
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(
           '/js/webSocket/appCache.js'
        ).then(function(registration) {
            // при удачной регистрации имеем объект типа ServiceWorkerRegistration
            console.log('ServiceWorker registration', registration);
            // строкой ниже можно прекратить работу serviceWorker’а
            //registration.unregister();
        }).catch(function(err) {
            throw new Error('ServiceWorker error: ' + err);
        });
    }

    Backbone.history.start();
});
