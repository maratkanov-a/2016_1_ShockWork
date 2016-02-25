define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        template: tmpl,
        initialize: function () {

        },
        render: function () {
            this.$el.html(this.template());
        },
        show: function () {
            $('#page').html(this.$el);
            this.render();
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return new View();
});