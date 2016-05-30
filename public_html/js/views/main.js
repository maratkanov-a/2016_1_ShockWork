define([
    'tmpl/main',
    'backbone'
], function(
    tmpl
){

    var View = Backbone.View.extend({
        template: tmpl,
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template());
        },
        show: function() {
            this.$el.show();
            this.trigger("show",this);
            $('body').addClass('loaded');
        },
        hide: function() {
            this.$el.hide();
        }

    });
        var music =new Audio();
        music.src = "media/backgroundmusic.ogg";
        music.volume = 1;
        music.play();

    return new View();
});