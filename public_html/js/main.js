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
        gameplay: 'lib/cards/function'
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
        navigator.serviceWorker.register('/serviceWorker.js').then(function(reg) {
            console.log('Registration succeeded. Scope is ' + reg.scope);
        }).catch(function(error) {
            console.log('Registration failed with ' + error);
        });
    }

    Backbone.history.start();
});
