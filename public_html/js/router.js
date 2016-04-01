define([
    'backbone',
    'views/main',
    'views/game',
    'views/login',
    'views/scoreboard',
    'views/registration',
    'models/session',
    'view_manager'
], function(
    Backbone,
    mainView,
    gameView,
    loginView,
    scoreboardView,
    registrationView,
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
            '*default': 'defaultActions'
        },

        $page: $('#page'),

        mainAction: function () {
            this.$page.append(mainView.el);
            manager.display();
            mainView.show();
        },
        scoreboardAction: function () {
            this.$page.append(scoreboardView.el);
            manager.display();
            scoreboardView.show();
        },
        gameAction: function () {

            session.isLoggedIn()
                .done(function() {
                    $('#page').append(gameView.el);
                    manager.display();
                    gameView.show();
                })
                .fail(function(){
                    Backbone.history.navigate('login', { trigger: true });
                });
        },
        loginAction: function () {
            this.$page.append(loginView.el);
            manager.display();
            loginView.show();
        },
        registrationAction: function () {
            this.$page.append(registrationView.el);
            manager.display();
            registrationView.show();
        },
        defaultActions: function() {
            //// TODO: 404 or remove mainAction
            this.$page.append(mainView.el);
            manager.display();
            mainView.show();
        }
    });

    return new Router();
});