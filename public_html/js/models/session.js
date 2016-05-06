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
            return this.fetch({
                wait: true,
                url: this.urlLogin
            });
        },

        logout: function () {
            return this.destroy({
                wait: true,
                url: this.urlLogin
            });
        },

        registration: function (username, password, email, imgData) {
            return this.save({login: username, password: password, email: email, imgData: imgData}, {
                type: 'PUT',
                wait: true,
                url: this.urlRegistration
            });
        },

        validateLogin: function (username, password) {
            var errors = {
                'all': [],
                'username': 'username',
                'password': 'password',
                'None': 'None'
            };
            if (username && password) {
            } else {
                if (!(username)) {
                    errors['all'].push(errors['username'])
                }
                if (!(password)) {
                    errors['all'].push(errors['password'])
                }
                return errors['all']
            }
            return errors['None']
        },

        validateRegistration: function (email, username, password1, password2) {
            var errors = {
                'all': [],
                'passwords': 'passwords',
                'email_validation': 'bad_email',
                'None': 'None',
                'email': 'email',
                'username': 'username',
                'password1': 'password1',
                'password2': 'password2'
            };
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!(email && username && password1 && password2)) {
                if (!(email)) {
                    errors['all'].push(errors['email'])
                }
                if (!(username)) {
                    errors['all'].push(errors['username'])
                }
                if (!(password1)) {
                    errors['all'].push(errors['password1'])
                }
                if (!(password2)) {
                    errors['all'].push(errors['password2'])
                }
                return errors['all']
            } else if (!(password1 == password2)) {
                return errors['passwords']
            } else if (!re.test(email)) {
                return errors['email_validation'];
            }
            return errors['None'];
        }

    });


    return new SessionModel();

});