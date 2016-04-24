define([
    'backbone'
], function(
    Backbone
){

    var View = Backbone.View.extend({

        views: [],

        register: function (view) {
            this.views.push(view);
        },

        // который вызовет метод hide у всех кроме newView
        show: function (newView) {

            this.views.forEach(function (view) {
                if (view !== newView) {
                    view.hide();
                } else {
                    view.$el.show();
                }

            });

        }

    });

    return new View();
});