define([
    'tmpl/scoreboard',
    'collections/scores'
], function(
    tmpl,
    ScoresCollection
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
            this.trigger("show",this);
            ScoresCollection.reset();
            ScoresCollection.fetch({remove: false}).done(
            	function() {
                    this.render();
                }.bind(this));
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