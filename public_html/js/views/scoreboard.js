define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores',
    'views/view_manager'
], function(
    Backbone,
    tmpl,
    ScoresCollection,
    manager
){

    var View = Backbone.View.extend({
        events: {
            "click .js-go-back":   "goBack"
        },

        template: tmpl,
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template( { scores : ScoresCollection.toJSON() } ));
        },
        show: function() {
            this.$el.show();
            manager.trigger('show', this);
        },
        hide: function() {
            this.$el.hide();
        },
        goBack: function() {
            Backbone.history.history.back()
        }
    });

    return new View();
});