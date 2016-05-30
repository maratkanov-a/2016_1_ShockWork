define([
    'backbone'
], function(
){

    var Score = Backbone.Model.extend({
        defaults: {
            username: '',
            score: 0
        }
    });

    return Score;
});