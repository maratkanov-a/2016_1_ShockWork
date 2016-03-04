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
        var badEmail1 = session.validateRegistration('12mail.ru', '1', '1', '1');
        var badEmail2 = session.validateRegistration('12@.ru', '1', '1', '1');
        var badEmail3 = session.validateRegistration('12@mail', '1', '1', '1');
        var badEmail4 = session.validateRegistration('@mail.ru', '1', '1', '1');
        var badEmail5 = session.validateRegistration('mail.ru', '1', '1', '1');
        var onlyUsername = session.validateRegistration('', '12', '', '');
        var onlyFirstPassword = session.validateRegistration('', '', '12', '');
        var onlySecondPassword = session.validateRegistration('', '', '', '12');
        var email_Username = session.validateRegistration('12@mail.ru', '12', '', '');
        var email_Username_firstPassword = session.validateRegistration('12@mail.ru', '12', '12', '');
        var email_Username_SecondPassword = session.validateRegistration('12@mail.ru', '12', '', '12');
        var differentPasswords = session.validateRegistration('12@mail.ru', '12', '1', '12');
        var allData = session.validateRegistration('12@mail.ru', '12', '12', '12');

        assert.equal( empty['error'], 'all' );
        assert.equal( onlyEmail['error'], 'all' );
        assert.equal( badEmail1['error'], 'email' );
        assert.equal( badEmail2['error'], 'email' );
        assert.equal( badEmail3['error'], 'email' );
        assert.equal( badEmail4['error'], 'email' );
        assert.equal( badEmail5['error'], 'email' );
        assert.equal( onlyUsername['error'], 'all' );
        assert.equal( onlyFirstPassword['error'], 'all' );
        assert.equal( onlySecondPassword['error'], 'all' );
        assert.equal( email_Username['error'], 'all' );
        assert.equal( email_Username_firstPassword['error'], 'all' );
        assert.equal( email_Username_SecondPassword['error'], 'all' );
        assert.equal( differentPasswords['error'], 'passwords' );
        assert.equal( allData['error'], 'None' );
    })
});