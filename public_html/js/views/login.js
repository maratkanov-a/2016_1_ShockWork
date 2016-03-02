define([
    'backbone',
    'tmpl/login',
    'models/session'
], function(
    Backbone,
    tmpl,
    session
){

    var View = Backbone.View.extend({
        events: {
            "click .js-go-back":   "goBack",
            "click .js-submit": "submit"
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
            Backbone.history.history.back()
        },

        submit: function(e) {
            e.preventDefault();
            if ( session.validateLogin($('#username').val(), $('#password').val()) ) {
                session.login();
                Backbone.history.navigate('game', { trigger: true });
            }

        }
    });

    return new View();
});