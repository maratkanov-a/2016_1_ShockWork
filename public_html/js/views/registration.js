define([
    'tmpl/registration',
    'models/session',
    'materialize',
    'sweetalert'
], function (
    tmpl,
    session
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
            if (!$(canvas).is(":visible"))
                $(canvas).show();
            this.startWebCam();
            this.toggleElements();
        },
        toggleElements: function() {
            this.$el.find(canvas).toggle();
            this.$el.find(video).toggle();
            this.$el.find(snap).toggle();
            this.$el.find(resnap).toggle();
        },
        canvasToString: function (canvas) {
            return (this.isSnapped) ? canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, "") : "";
        },
        submit: function (e) {

            e.preventDefault();

            var $this = this;

            var email = this.$el.find('#email').val();
            var username = this.$el.find('#username').val();
            var password1 = this.$el.find('#password1').val();
            var password2 = this.$el.find('#password2').val();
            var imgData = this.canvasToString(canvas);

            var valid = session.validateRegistration(email, username, password1, password2);

            if (valid === 'None') {

                session.registration(username, password1, email, imgData).done(function() {
                    Backbone.history.navigate('', {trigger: true});
                    swal({   title: "Успешно",
                             text: "Вы успешно зарегистрировались! Теперь можете войти в онлайн игру.",
                             type: "success",
                             showCancelButton: false,
                             confirmButtonColor: "#DD6B55",
                             confirmButtonText: "Поехали!",
                             closeOnConfirm: false }).bind(this);
                })
                .fail(function(){
                    $this.$el.find('.form__error').hide();
                    $this.$el.find('.form__user__create__error').show();
                });

            } else if ( Array.isArray(valid) ) {
                this.$el.find('.form__error').hide();
                valid.forEach(function (item) {
                    $('.form__'+ item +'__error').text("Обязательное поле").show()
                });
            } else if (valid === 'passwords') {

                this.$el.find('.form__error').hide();
                this.$el.find('.form__password1__error, .form__password2__error').text('Пароли не совпадают').show();

            } else if (valid === 'bad_email') {

                this.$el.find('.form__error').hide();
                this.$el.find('.form__email__error').text('Пример: lala@mail.ru').show();

            } else if (valid === 'all') {

                this.$el.find('.form__error').hide();
                $.each(this.$el.find('.js-validate'), function () {
                    if ($(this).val() === '') {
                        $(this).parent().find('.form__error').text("Обязательное поле").show()
                    }
                });

            }

        }

    });

    return new View();
});