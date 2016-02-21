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
            //this.render()
        },
        render: function () {
            //this.show()
        },
        show: function () {
            $('#page').html(this.template)
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return new View();
});