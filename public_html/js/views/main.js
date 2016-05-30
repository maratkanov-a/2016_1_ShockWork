define([
    'tmpl/main',
    'backbone'
], function(
    tmpl
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
            this.trigger("show",this);
            $('body').addClass('loaded');
        },
        hide: function() {
            this.$el.hide();
        }

    });

    return new View();
});