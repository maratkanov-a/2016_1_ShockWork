define([
    'tmpl/login',
    'models/session',
    'materialize'
], function(
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
            this.render();
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
        goBack: function() {
            Backbone.history.history.back()
        },

        submit: function(e) {

            e.preventDefault();

            var $this = this;

            var username = this.$el.find('#username').val();
            var password = this.$el.find('#password').val();

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
                    $this.$el.find('.form__'+ item +'__error').text("Обязательное поле").show();
                });

            }

        }
    });

    return new View();
});