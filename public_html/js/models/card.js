define([
    'backbone'
], function(
    Backbone1
){

    var Card = Backbone.Model.extend({
        defaults: {
             "id": 0,
             "img": "",
             "power": 0,
             "mana": 0
        }
    });

    return Card;
});