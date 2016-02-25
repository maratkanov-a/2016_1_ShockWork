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

    //return ScoresCollection;

    var allScores = new ScoresCollection([
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

    return allScores;
});