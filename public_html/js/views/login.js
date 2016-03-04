define([
    'backbone',
    'tmpl/login',
    'models/session',
    'materialize'
], function(
    Backbone,
    tmpl,
    session
){

    var View = Backbone.View.extend({
        events: {
            "click .js-go-back":   "goBack",
            "submit .form": "submit"
        },

        template: tmpl,
        initialize: function () {
            
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        },
        goBack: function() {
            Backbone.history.history.back()
        },

        submit: function(e) {
            e.preventDefault();
            if ( session.validateLogin($('#username').val(), $('#password').val()) ) {
                session.login();
                Backbone.history.navigate('game', { trigger: true });
            } else {
                 $('.js-username-error, .js-password-error').text('Required').show();
            }

        }
    });

    return new View();
});