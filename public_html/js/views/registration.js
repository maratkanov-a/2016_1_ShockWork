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
            var valid = session.validateRegistration($('#email').val(), $('#username').val(), $('#password').val(), $('#password_conformation').val());
            if ( valid['fields'] === 'None' ) {

                session.registration();
                Backbone.history.navigate('game', { trigger: true });

            } else if( valid['fields'] === 'passwords' ) {

                this.$el.find('.form__error').hide();
                this.$el.find('.js-password1-error, .js-password2-error').text('Passwords dont match').show();

            } else if ( valid['fields'] === 'email' ) {

                this.$el.find('.form__error').hide();
                this.$el.find('.js-email-error').text('email must consist @ symbol').show();

            } else if ( valid['fields'] === 'all' ) {

                this.$el.find('.form__error').text('required').show();

            }
        }
    });

    return new View();
});