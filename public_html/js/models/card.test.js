define(function (require) {
    QUnit.module("models/card");

    QUnit.test("CardModel - экземпляр Backbone.Model", function () {

        var CardModel = require('models/card'),
            card = new CardModel();

        QUnit.ok(card instanceof Backbone.Model);

    });

});
