define([
    'backbone', 'require', 'views/main', 'views/game', 'views/login', 'views/scoreboard', 'views/registration'
], function(
    Backbone
){



    var Router = Backbone.Router.extend({
        routes: {
            '': 'mainAction',
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'registration': 'registrationAction',
            '*default': 'defaultActions'
        },
        mainAction: function () {
            require('views/main').show();
        },
        scoreboardAction: function () {
            require('views/scoreboard').show();
        },
        gameAction: function () {
           require('views/game').show();
        },
        loginAction: function () {
            require('views/login').show();
        },
        registrationAction: function () {
            require('views/registration').show();
        },
        defaultActions: function() {
        //    lala
        }
    });

    return new Router();
});