define([
    'backbone',
    'models/cards'
], function(
    Backbone,
    Cards
){

    var CardsCollection = Backbone.Collection.extend({
        model: Cards,
        getCards: function() {
            return this.sync()
        }
    });

    return CardsCollection.getCards();

});