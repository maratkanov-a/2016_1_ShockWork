define([
    'backbone',
    'tmpl/registration',
    'router'
], function(
    Backbone,
    tmpl,
    router
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
            return this;
        },
        show: function () {
            $('#page').html(this.$el);
            this.render();
        },
        hide: function () {
            // TODO
        },
        goBack: function() {
            Backbone.history.history.back();
        },
        submit: function(e) {
            e.preventDefault();
            Backbone.history.navigate('game', { trigger: true });
        }
    });

    return new View();
});