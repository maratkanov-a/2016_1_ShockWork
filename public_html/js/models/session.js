define([
    'backbone'
], function (
    Backbone
) {

    var SessionModel = Backbone.Model.extend({
        url: '/api/v1/session',

        login: function() {

        },

        logout: function() {

        },

        registration: function() {

        },

        validateLogin: function(username, password) {
            if (username && password) {
            } else {
                return false
            }
            return true;
        },

        validateRegistration: function(email, username, password1, password2) {
            var errors = [
                {'fields': 'all', 'error': 'required'},
                {'fields': 'passwords', 'error': 'Passwords dont match'},
                {'fields': 'email', 'error': 'Example lala@mail.ru'},
                {'fields': 'None', error: 'None'}
            ];
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if ( !(email && username && password1 && password2) ) {
                return errors[0]
            } else if ( !(password1 === password2) ){
                return errors[1]
            } else if (!re.test(email)) {
                return errors[2];
            }
            return errors[3];
        }

    });



    return new SessionModel();

});