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
            "click #go-back":   "goBack"
        },

        template: tmpl,
        initialize: function () {
            this.render();
        },
        render: function () {
            var allScores = new Backbone.Collection([
                {
                    name: 'a',
                    score: 26
                },
                {
                    name: 'b',
                    score: 3
                },
                {
                    name: 'c',
                    score: 1
                },
                {
                    name: 'd',
                    score: 55
                },
                {
                    name: 'e',
                    score: 66
                },
                {
                    name: 'f',
                    score: 19
                }
            ]);
            this.$el.html(this.template( { scores : allScores.sort().toJSON() } ));
            return this;
        },
        show: function () {
            $('#page').html(this.$el);
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