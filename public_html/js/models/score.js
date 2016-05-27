define([
    'backbone'
], function(
    Backbone1
){

    var Score = Backbone.Model.extend({
        defaults: {
            username: '',
            score: 0
        }
    });

    return Score;
});