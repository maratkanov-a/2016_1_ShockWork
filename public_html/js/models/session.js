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
            if ( !(username.val() && password.val()) ) {
                $('.js-username-error, .js-password-error').text('required').show();
                return false
            }
            return true;
        },

        validateRegistration: function(email, username, password1, password2) {
            if ( !(email.val() && username.val() && password1.val() && password2.val()) ) {
                $('.form__error').text('required').show();
                return false
            } else if ( !(password1.val() === password2.val()) ){
                $('.form__error').hide();
                $('.js-password1-error, .js-password2-error').text('Passwords dont match').show();
                return false
            }
            return true;
        }

    });



    return new SessionModel();

});