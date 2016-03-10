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
            this.delegateEvents();
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

            } else if( valid === 'passwords' ) {

                this.$el.find('.form__error, .form__email__error').hide();
                this.$el.find('.js-password1-error, .js-password2-error').text('Passwords dont match').show();

            } else if ( valid === 'bad_email' ) {

                this.$el.find('.form__error, .form__email__error').hide();
                this.$el.find('.js-email-error').text('Example lala@mail.ru').show();

            } else if ( valid === 'all' ) {

                this.$el.find('.form__error, .form__email__error').hide();
                $.each(this.$el.find('.js-validate'), function() {
                    if ($(this).val() === '') {
                        $(this).parent().find('.form__error').text("Required").show()
                    }
                });

            }
        }
    });

    return new View();
});