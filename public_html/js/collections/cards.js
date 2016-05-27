define([
    'backbone',
    'models/card'
], function(
    Backbone1,
    Cards
){

    var CardsCollection = Backbone.Collection.extend({

        model: Cards,
        url: 'ws://0.0.0.0:8081/api/gameplay/cards/'
    });

    return CardsCollection;

});