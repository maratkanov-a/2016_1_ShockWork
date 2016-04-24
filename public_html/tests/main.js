// QUnit.config.autostart = false;
require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "../js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        materialize: 'lib/materialize.min',
        hammerjs: 'lib/hammerjs',
        gameplay: 'lib/cards/function',
        jquery_ui: 'lib/cards/jquery-ui',
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

var tests = [
    'models/score.test',
    'models/session.test',
    'models/card.test',
    'models/user.test',
    'collections/scores.test',
    'collections/cards.test',
    'views/view_manager.test'
];

require(tests, function () {
    QUnit.load();
    QUnit.start();
});
