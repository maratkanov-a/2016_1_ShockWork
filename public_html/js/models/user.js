define([
    'backbone'
], function(
    Backbone
){

    var User = Backbone.Model.extend({

        defaults: {
            name: '',
            health: 50
        },

        userUrl: '',

        updateHealth: function() {
            return this.save({}, {
                type: 'GET',
                wait: true,
                url: this.userUrl
            })
        }
    });

    return User;
});