define([
    'backbone',
    'tmpl/registration',
    'models/session',
    'views/view_manager',
    'materialize'
], function (
    Backbone,
    tmpl,
    session,
    manager
) {

    var View = Backbone.View.extend({
        events: {
            "click .js-go-back": "goBack",
            "submit .form": "submit",
            "click .js-make-photo": "makePhoto",
            "click .js-remake-photo": "remakePhoto",
            "js-video": "show"
        },

        template: tmpl,

        initialize: function () {
            manager.register(this);
            this.render();

            this.isSnapped = false;
            this.canvas = this.$el.find("#canvas");
            this.context = this.canvas[0].getContext('2d');
            this.video = this.$el.find("#video");
            this.videoObj = { "video": true, "audio": false };
        },
        render: function () {
            this.$el.html(this.template());
        },
        show: function() {
            this.$el.show();
            this.trigger("show",this);
            if ($(video).is(":visible")) 
                this.startWebCam();
        },
        hide: function() {
        	this.stopWebCam();
            this.$el.hide();
        },
        goBack: function () {
            Backbone.history.history.back();
        },
        startWebCam: function() {
            if (navigator.webkitGetUserMedia) {
                this.usermedia = navigator.webkitGetUserMedia(this.videoObj, function (localMediaStream) {
                    this.video.src = window.URL.createObjectURL(localMediaStream);
                    this.video.play();
                    this.webcamStream=localMediaStream;
                }, function () {
                    $(video).hide();
                    $(snap).hide();
                });
            }
        },
        stopWebCam: function() {
            if (typeof(webcamStream) != "undefined")
        	   webcamStream.getVideoTracks()[0].stop();
        },
        makePhoto: function(){
            this.isSnapped = true;
        	this.context.drawImage(video, 0, 0, 640, 480);
        	this.toggleElements();
            this.stopWebCam();
        },
        remakePhoto: function() {
            this.isSnapped = false;
            if (!$(canvas).is(":visible")) { 
                $(canvas).show();
                $(".nav").css("margin-top", 20);
            }
        	this.startWebCam();
			this.toggleElements();
        },
        toggleElements: function() {
        	$(canvas).toggle();
        	$(video).toggle();
        	$(snap).toggle();
        	$(resnap).toggle();
        },
        canvasToString: function (canvas) {
			return (this.isSnapped) ? canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, "") : "";
		},
        submit: function (e) {

            e.preventDefault();

            var $this = this;

            var email = $('#email').val();
            var username = $('#username').val();
            var password1 = $('#password1').val();
            var password2 = $('#password2').val();
            var imgData = this.canvasToString(canvas);

            var valid = session.validateRegistration(email, username, password1, password2);

            if (valid === 'None') {

                session.registration(username, password1, email, imgData).done(function() {
                	Backbone.history.navigate('game', {trigger: true});
                })
                .fail(function(){
                    $this.$el.find('.form__error').hide();
                    $this.$el.find('.form__user__create__error').show();
                });

            } else if ( Array.isArray(valid) ) {
                this.$el.find('.form__error').hide();
                valid.forEach(function (item) {
                    $('.form__'+ item +'__error').text("Required").show()
                });
            } else if (valid === 'passwords') {

                this.$el.find('.form__error').hide();
                this.$el.find('.form__password1__error, .form__password2__error').text('Passwords dont match').show();

            } else if (valid === 'bad_email') {

                this.$el.find('.form__error').hide();
                this.$el.find('.form__email__error').text('Example lala@mail.ru').show();

            } else if (valid === 'all') {

                this.$el.find('.form__error').hide();
                $.each(this.$el.find('.js-validate'), function () {
                    if ($(this).val() === '') {
                        $(this).parent().find('.form__error').text("Required").show()
                    }
                });

            }

        }

    });

    return new View();
});