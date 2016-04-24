define([
    'backbone'
], function(
    Backbone
){

    var User = Backbone.Model.extend({
        defaults: {
            name: '',
            health: 50
        }
    });

    return User;
});