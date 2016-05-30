require.config({
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        materialize: 'lib/materialize.min',
        hammerjs: 'lib/hammerjs',
        jquery_ui: 'lib/cards/jquery-ui',
        sweetalert: 'lib/sweetalert.min'
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
    'router'
], function(
    router
){
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(
           '/appCache.js'
        ).then(function(registration) {
            console.log('ServiceWorker registration');
        }).catch(function(err) {
             console.log('ServiceWorker registration failed');
        });
    }



    Backbone.history.start();
});
