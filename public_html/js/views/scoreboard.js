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
            manager.register(this);
            this.render();
        },
        render: function () {
            this.$el.html(this.template( { scores : ScoresCollection.toJSON() } ));
        },
        show: function() {
            this.$el.show();
            this.trigger("show",this);
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