define([
    'backbone',
    'models/cards'
], function(
    Backbone,
    Cards
){

    var CardsCollection = Backbone.Collection.extend({

        model: Cards,
        cardsUrl: '',

        getCards: function() {
            return this.save({}, {
                type: 'GET',
                wait: true,
                url: this.cardsUrl
            })
        }
    });

    return CardsCollection.getCards();

});