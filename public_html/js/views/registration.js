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
            var password1 = $('#password1').val();
            var password2 = $('#password2').val();

            var valid = session.validateRegistration(email, username, password1, password2);
            if ( valid === 'None' ) {

                session.registration(username, password1, email);
                $(window).ajaxError(function() {
                        $('.form__error, .form__email__error').hide();
                        $('.js-login-error').show();
                });
                $(window).ajaxSuccess(
                    function() {
                        Backbone.history.navigate('game', { trigger: true })
                });

            } else if( valid === 'Passwords dont match' ) {

                this.$el.find('.form__error, .form__email__error').hide();
                this.$el.find('.js-password1-error, .js-password2-error').text(valid).show();

            } else if ( valid === 'Example lala@mail.ru' ) {

                this.$el.find('.form__error, .form__email__error').hide();
                this.$el.find('.js-email-error').text(valid).show();

            } else if ( valid === 'Required' ) {

                this.$el.find('.form__error, .form__email__error').hide();
                $.each(this.$el.find('.js-validate'), function() {
                    if ($(this).val() === '') {
                        $(this).parent().find('.form__error').text(valid).show()
                    }
                });

            }
        }
    });

    return new View();
});