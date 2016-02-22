define([
    'backbone',
    'models/score'
], function(
    Backbone,
    Score
){

    var ScoresCollection = Backbone.Collection.extend({
        model: Score,
        comparator: function( collection ) {
            return ( collection.get('score') );
        }
    });

    return ScoresCollection;
});