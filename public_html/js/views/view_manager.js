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

        initialize: function() {

            var views = [ mainView, gameView, loginView, scoreboardView, registrationView ];

            this.on('show', function() {
                _.each(views || [], function (view) {
                    if (view) {
                        view.hide();
                    }
                });
            });
        }
    });

    return new View();
});