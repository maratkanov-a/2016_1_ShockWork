define(function (require) {
    QUnit.module("models/session");

    QUnit.test("При fetch вызывается метод sync", function () {

        var SessionModel = require('./session'),
            Backbone = require('backbone'),
            session = new SessionModel();

        sinon.spy(Backbone, 'sync');

        session.fetch();

        QUnit.ok(Backbone.sync.calledOnce);

    });

    QUnit.test('Check login validation', function() {
        var SessionModel = require('./session'),
            session = new SessionModel();

        var empty = session.validateLogin('', '');
        var onlyUsername = session.validateLogin('12', '');
        var onlyPassword = session.validateLogin('', '12');
        var allData = session.validateLogin('12', '12');

        assert.equal( empty, false );
        assert.equal( onlyUsername, false );
        assert.equal( onlyPassword, false );
        assert.equal( allData, true );
    });

    QUnit.test('Check registration validation', function() {
        var SessionModel = require('./session'),
            session = new SessionModel();

        var empty = session.validateRegistration('', '', '', '');
        var onlyEmail = session.validateRegistration('12@mail.ru', '', '', '');
        var badEmail1 = session.validateRegistration('12mail.ru', '', '', '');
        var badEmail2 = session.validateRegistration('12@.ru', '', '', '');
        var badEmail3 = session.validateRegistration('12@mail', '', '', '');
        var badEmail4 = session.validateRegistration('@mail.ru', '', '', '');
        var badEmail5 = session.validateRegistration('mail.ru', '', '', '');
        var onlyUsername = session.validateRegistration('', '12', '', '');
        var onlyFirstPassword = session.validateRegistration('', '', '12', '');
        var onlySecondPassword = session.validateRegistration('', '', '', '12');
        var email_Username = session.validateRegistration('12@mail.ru', '12', '', '');
        var email_Username_firstPassword = session.validateRegistration('12@mail.ru', '12', '12', '');
        var email_Username_SecondPassword = session.validateRegistration('12@mail.ru', '12', '', '12');
        var allData = session.validateRegistration('12@mail.ru', '12', '12', '12');

        assert.equal( empty, false );
        assert.equal( onlyEmail, false );
        assert.equal( badEmail1, false );
        assert.equal( badEmail2, false );
        assert.equal( badEmail3, false );
        assert.equal( badEmail4, false );
        assert.equal( badEmail5, false );
        assert.equal( onlyUsername, false );
        assert.equal( onlyFirstPassword, false );
        assert.equal( onlySecondPassword, false );
        assert.equal( email_Username, false );
        assert.equal( email_Username_firstPassword, false );
        assert.equal( email_Username_SecondPassword, false );
        assert.equal( allData, true );
    })
});