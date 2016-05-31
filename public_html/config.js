require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        materialize: 'lib/materialize',
        hammerjs: 'lib/hammerjs',
        jquery_ui: 'lib/cards/jquery-ui',
        sweetalert: 'lib/sweetalert-dev'

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