define([
    'backbone'
], function(
    Backbone
){

    var User = Backbone.Model.extend({
        defaults: {
            name: '',
            email: '',
            password: ''
        },
        register: function() {
        //      TODO
        },
        login: function() {
        //    TODO
        }
    });

    return new User();
});