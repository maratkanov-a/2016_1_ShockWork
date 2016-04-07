define([
    'backbone',
    'tmpl/main',
    'views/view_manager'
], function(
    Backbone,
    tmpl,
    manager
){

    var View = Backbone.View.extend({
        template: tmpl,
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template());
        },
        show: function() {
            this.$el.show();
            manager.trigger('show', this);
        },
        hide: function() {
            this.$el.hide();
        }

    });

    return new View();
});