define([
    'backbone',
    'tmpl/scoreboard'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        events: {
            "click":   "goBack"
        },

        template: tmpl,
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        },
        show: function () {
            $('#page').html(this.$el);
        },
        hide: function () {
            // TODO
        },
        goBack: function() {
            Backbone.history.history.back()
        }
    });

    return new View();
});