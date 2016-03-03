define([
    'backbone',
    'tmpl/registration',
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
        },
        show: function () {
            $('#page').html(this.el);
            this.render();
        },
        hide: function () {
            this.$el.hide();
            this.$el.off();
        },
        goBack: function() {
            Backbone.history.history.back();
        },
        submit: function(e) {
            e.preventDefault();
            if ( session.validateRegistration($('#email').val(), $('#username').val(), $('#password').val(), $('#password_conformation').val()) ) {
                session.registration();
                Backbone.history.navigate('game', { trigger: true });
            }
        }
    });

    return new View();
});