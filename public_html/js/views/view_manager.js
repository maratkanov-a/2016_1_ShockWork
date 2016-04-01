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

    var View = Backbone.View.extend({

        views: [ mainView, gameView, loginView, scoreboardView, registrationView ],

        display: function () {
            _.each(this.views || [], function(view) {
                view.hide();
            });
        }
    });

    return new View();
});