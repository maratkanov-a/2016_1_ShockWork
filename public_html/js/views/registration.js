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
            return this;
        },
        goBack: function() {
            Backbone.history.history.back();
        },
        submit: function(e) {
            e.preventDefault();

            var email = $('#email').val();
            var username = $('#username').val();
            var password1 = $('#password').val();
            var password2 = $('#password_conformation').val();

            var valid = session.validateRegistration(email, username, password1, password2);
            if ( valid['fields'] === 'None' ) {

                session.registration(username, password1, email);
                $(window).ajaxError(function() {
                        $('.form__error').hide();
                        $('.js-login-error').show();
                });
                $(window).ajaxSuccess(
                    function() {
                        Backbone.history.navigate('game', { trigger: true })
                });

            } else if( valid['fields'] === 'passwords' ) {

                this.$el.find('.form__error').hide();
                this.$el.find('.js-password1-error, .js-password2-error').text(valid['error']).show();

            } else if ( valid['fields'] === 'email' ) {

                this.$el.find('.form__error').hide();
                this.$el.find('.js-email-error').text(valid['error']).show();

            } else if ( valid['fields'] === 'all' ) {

                this.$el.find('.form__error').text(valid['error']).show();

            }
        }
    });

    return new View();
});