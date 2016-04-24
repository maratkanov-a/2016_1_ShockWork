define([
    'backbone',
    'tmpl/login',
    'models/session',
    'views/view_manager',
    'materialize'
], function(
    Backbone,
    tmpl,
    session,
    manager
){

    var View = Backbone.View.extend({
        events: {
            "click .js-go-back":   "goBack",
            "submit .form": "submit"
        },

        template: tmpl,

        initialize: function () {
            manager.register(this);
            this.render();
        },
        render: function () {
            this.$el.html(this.template());
        },
        show: function() {
            manager.show(this);
        },
        hide: function() {
            this.$el.hide();
        },
        goBack: function() {
            Backbone.history.history.back()
        },

        submit: function(e) {

            e.preventDefault();

            var $this = this;

            var username = $('#username').val();
            var password = $('#password').val();

            var valid = session.validateLogin(username, password);

            if ( valid === 'None' ) {

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
                valid.forEach(function (item) {
                    $('.form__'+ item +'__error').text("Required").show()
                });

            }

        }
    });

    return new View();
});