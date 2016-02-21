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
            this.render()
        },
        render: function () {
            return this;
        },
        show: function () {
            $('#page').html(this.template);
            this.setElement($('#go-back'));
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