define([
    'backbone',
    'models/score'
], function(
    Backbone,
    Score
){

    var ScoresCollection = Backbone.Collection.extend({

        model: Score,
        url: 'http://localhost:8081/api/scoreboard',

        comparator: function( collection ) {
            return ( -collection.get('score') );
        }
    });

    return new ScoresCollection();
});