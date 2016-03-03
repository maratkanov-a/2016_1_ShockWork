define([
    'backbone',
    'views/main',
    'views/game',
    'views/login',
    'views/scoreboard',
    'views/registration'
], function(
    Backbone,
    mainView,
    gameView,
    loginView,
    scoreboardView,
    registrationView
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
            $('#page').html(mainView.show().el);
        },
        scoreboardAction: function () {
            $('#page').html(scoreboardView.show().el);
        },
        gameAction: function () {
            $('#page').html(gameView.show().el);
        },
        loginAction: function () {
            $('#page').html(loginView.show().el);
        },
        registrationAction: function () {
            $('#page').html(registrationView.show().el);
        },
        defaultActions: function() {

        }
    });

    return new Router();
});