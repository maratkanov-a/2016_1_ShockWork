define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores'
], function(
    Backbone,
    tmpl,
    ScoresCollection
){

    var View = Backbone.View.extend({
        events: {
            "click .js-go-back":   "goBack"
        },

        template: tmpl,
        initialize: function () {
            
        },
        render: function () {
            this.$el.html(this.template( { scores : ScoresCollection.toJSON() } ));
            return this;
        },
        show: function () {
            $('#page').html(this.$el);
            this.render();
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