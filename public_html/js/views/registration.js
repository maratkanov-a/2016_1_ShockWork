define([
    'backbone',
    'tmpl/registration',
    'models/session',
    'views/view_manager',
    'materialize',
    'camera'
], function (
    Backbone,
    tmpl,
    session,
    manager
) {
    var View = Backbone.View.extend({
        events: {
            "click .js-go-back": "goBack",
            "submit .form": "submit"
        },

        template: tmpl,
        initialize: function () {
            manager.register(this);
            this.render()
        },
        render: function () {
            this.$el.html(this.template());
        },
        show: function() {
            this.$el.show();
            this.trigger("show",this);
        },
        hide: function() {
            this.$el.hide();
        },
        goBack: function () {
            Backbone.history.history.back();
        },
        submit: function (e) {

            e.preventDefault();

            var $this = this;

            var email = $('#email').val();
            var username = $('#username').val();
            var password1 = $('#password1').val();
            var password2 = $('#password2').val();

            var valid = session.validateRegistration(email, username, password1, password2);

            if (valid === 'None') {

                session.registration(username, password1, email).done(function() {
                	Backbone.history.navigate('game', {trigger: true});
                })
                .fail(function(){
                    $this.$el.find('.form__error').hide();
                    $this.$el.find('.form__user__create__error').show();
                });

            } else if ( Array.isArray(valid) ) {
                this.$el.find('.form__error').hide();
                valid.forEach(function (item) {
                    $('.form__'+ item +'__error').text("Required").show()
                });
            } else if (valid === 'passwords') {

                this.$el.find('.form__error').hide();
                this.$el.find('.form__password1__error, .form__password2__error').text('Passwords dont match').show();

            } else if (valid === 'bad_email') {

                this.$el.find('.form__error').hide();
                this.$el.find('.form__email__error').text('Example lala@mail.ru').show();

            } else if (valid === 'all') {

                this.$el.find('.form__error').hide();
                $.each(this.$el.find('.js-validate'), function () {
                    if ($(this).val() === '') {
                        $(this).parent().find('.form__error').text("Required").show()
                    }
                });

            }

        }
    });

    return new View();
});