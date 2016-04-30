define([
    'backbone'
], function(
    Backbone
){

    var View = Backbone.View.extend({

        views: [],

        register: function (currentView) {
            this.views.push(currentView);
            this.listenTo(currentView, 'show', this.onShow.bind(this, currentView));
        },

        onShow: function (currentView) {
            this.views.forEach(function (view) {
                if (view !== currentView) {
                    view.hide();
                }
            });
        }
    });

    return new View();
});