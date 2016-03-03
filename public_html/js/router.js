define([
'backbone', 'views/main', 'views/game', 'views/login', 'views/scoreboard', 'views/registration'
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
            mainView.show();
        },
        scoreboardAction: function () {
            scoreboardView.show();
        },
        gameAction: function () {
           gameView.show();
        },
        loginAction: function () {
            loginView.show();
        },
        registrationAction: function () {
            registrationView.show();
        },
        defaultActions: function() {

        }
    });

    return new Router();
});