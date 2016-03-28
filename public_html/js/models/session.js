define([
    'backbone'
], function (Backbone) {

    var SessionModel = Backbone.Model.extend({
        urlLogin: '/api/session/',
        urlRegistration: '/api/user/',

        login: function (username, password) {
            return this.save({ login: username, password: password }, {
                type: 'PUT',
                wait: true,
                url: this.urlLogin
            })
        },

        isLoggedIn: function () {
            return this.save({}, {
                type: 'GET',
                wait: true,
                url: this.urlLogin
            });
        },

        logout: function () {
            $.ajax({
                type: 'DELETE',
                url: this.urlLogin,
                success: function () {
                    //    TODO
                },
                error: function () {
                    //    TODO
                }

            });
        },

        registration: function (username, password, email) {
            return this.save({ login: username, password: password, email: email}, {
                type: 'PUT',
                wait: true,
                url: this.urlRegistration
            });
        },

        validateLogin: function (username, password) {
            if (username && password) {
            } else {
                return false
            }
            return true;
        },

        validateRegistration: function (email, username, password1, password2) {
            var errors = {
                'all': 'all',
                'passwords': 'passwords',
                'email_validation': 'bad_email',
                'None': 'None'
            };
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!(email && username && password1 && password2)) {
                return errors['all']
            } else if (!(password1 === password2)) {
                return errors['passwords']
            } else if (!re.test(email)) {
                return errors['email_validation'];
            }
            return errors['None'];
        }

    });


    return new SessionModel();

});