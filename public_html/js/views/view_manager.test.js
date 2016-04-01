define(function (require) {

    QUnit.module("views/view_manager");

    QUnit.test("Check work", function (assert) {

        var manager = require('views/view_manager');

        manager.display();

        _.each(manager.views || [], function(view) {
                view.hide();
                assert.equal($(this).is(":visible"), false)
            });
    });

});
