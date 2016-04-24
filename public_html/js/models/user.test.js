define(function (require) {

    QUnit.module("models/user");

    QUnit.test("UserModel - экземпляр Backbone.Model", function () {

        var UserModel = require('models/card'),
            user = new UserModel();

        QUnit.ok(user instanceof Backbone.Model);

    });

});
