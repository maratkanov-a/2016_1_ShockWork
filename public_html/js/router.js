define([
    'backbone',
    'views/main',
    'views/game',
    'views/login',
    'views/scoreboard',
    'views/registration',
    'views/offline',
    'models/session',
    'views/view_manager'
], function(
    Backbone,
    mainView,
    gameView,
    loginView,
    scoreboardView,
    registrationView,
    offlineView,
    session,
    manager
){

    var Router = Backbone.Router.extend({
        routes: {
            '': 'mainAction',
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'registration': 'registrationAction',
            'tryit': 'offlineGameAction',
            '*default': 'defaultActions'
        },

        initialize: function(){
            manager.register(mainView);
            manager.register(gameView);
            manager.register(loginView);
            manager.register(scoreboardView);
            manager.register(registrationView);
            manager.register(offlineView);
        },

        mainAction: function () {
            mainView.show();
        },
        scoreboardAction: function () {
            scoreboardView.show();
        },
        gameAction: function () {

            session.isLoggedIn()
                .done(function() {
                    gameView.show();
                })
                .fail(function(){
                    Backbone.history.navigate('login', { trigger: true });
                });
        },
        loginAction: function () {
            loginView.show();
        },
        registrationAction: function () {
            registrationView.show();
        },
        offlineGameAction: function () {
            offlineView.show();
        },
        defaultActions: function() {
             //TODO: 404 or remove mainAction
            mainView.show();
        }
    });

    return new Router();
});