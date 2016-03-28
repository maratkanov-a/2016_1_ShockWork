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
            this.delegateEvents();
            return this;
        },
        goBack: function() {
            Backbone.history.history.back()
        },

        submit: function(e) {

            e.preventDefault();

            var $this = this;

            var username = $('#username').val();
            var password = $('#password').val();

            if ( session.validateLogin(username, password) ) {

                session.login(username, password)
                    .done(function() {
                        Backbone.history.navigate('game', { trigger: true });
                    })
                    .fail(function(){
                        $this.$el.find('.form__error').hide();
                        $this.$el.find('.form__login__error').show();
                    });

            } else {

                this.$el.find('.form__error').hide();
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