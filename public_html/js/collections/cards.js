define([
    'backbone',
    'models/card'
], function(
    Backbone,
    Cards
){

    var CardsCollection = Backbone.Collection.extend({

        model: Cards,
        url: 'ws://localhost:8081/api/gameplay/cards/'
    });

    return new CardsCollection().getCards();

});