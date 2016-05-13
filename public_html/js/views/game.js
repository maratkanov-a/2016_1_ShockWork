define([
    'backbone',
    'tmpl/game',
    'collections/cards'
], function(
    Backbone,
    tmpl,
    cardCollection
){

    var View = Backbone.View.extend({
        events: {
            "click .js-go-back":   "goBack",
            "click #restart_button" : "restartButton",
            "click #button_done":"done"
        },

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

            this.socket = new WebSocket("ws://" + window.location.hostname + ":" + window.location.port + "/api/gameplay");
            this.socket.onopen = function () {
                alert('Open connection')
            };
            this.socket.onclose = function () {
                Backbone.history.navigate('', {trigger: true})
            };
            this.socket.onmessage = function (msg) {
                this.cardsCollection =  JSON.parse(msg.data)['cards'];
                this.initializeGame();
                $('body').addClass('loaded');
                $('h1').css('color', '#222222');
            }.bind(this);

        },
        hide: function() {
            this.$el.hide();
        },
        goBack: function() {
            Backbone.history.navigate('', { trigger: true });
        },
        initializeGame: function(){
            this.round = 1;
            this.cards_counter = 0;
            this.mana_stack = [];
            this.AI_power = 0;
            this.USER_power = 0;
            this.AI_health = 50;
            this.USER_health =50;
            this.stack_to_delete = [];
            this.user1_stack = this.cardsCollection;
            this.AI_stack = [];
            this.user2_stack_length = 3;

            this.userStackTable = $(".score span");

            this.init_table();
            this.draw(this.user1_stack);
            this.draw_enemy(this.user2_stack_length)
        },
        init_table: function() {
            $(".score span").text('0');
            var newThis = this.$el;
            for (var i = 1; i <= 3; i++) {
                $('<div style = "height: 205px; width: 100%"> </div>')
                    .data('user', 1)
                    .appendTo(newThis.find('#sortable2')).droppable({
                        accept: '.playing_card',
                        hoverClass: 'hovered',
                        drop: this.handleDrop
                    });
            }
        },
        manaPush: function(mana){
            this.mana_stack.push(mana);
        },
        handleDrop: function(event, ui){
            ui.draggable.data('this').manaPush(ui.draggable.data('class'));
            var cardPower = ui.draggable.data('power');
            ui.draggable.data('this').stack_to_delete.push(ui.draggable.data('number'));
            ui.draggable.addClass( 'correct' );
            ui.draggable.draggable( 'disable' );
            $(this).droppable( 'disable' );
            ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
            ui.draggable.draggable( 'option', 'revert', false );
            $(".score span").text(parseInt($(".score span").text())+cardPower);
            ui.draggable.data('this').USER_power += cardPower;
        },
        draw: function(stack) {
            var count = stack.length;
            var newThis = this.$el;
            for (var i=0; i < count; i++ ){
                $('<li class="ui-state-default"><img src="img/cards/'+stack[i].img+'.png" alt=""> </li>')
                .data('power', stack[i].power)
                .data('class', stack[i].mana)
                    .data('this',this)
                .data('number', stack[i].id)
                .attr('id', 'card_user1_' + stack[i].id)
                .attr('class', 'playing_card').appendTo(newThis.find('#user_stack'))
                .draggable({
                    containment: '#content',
                    stack: '#sortable1',
                    cursor: '-webkit-grabbing',
                    revert: true,
                    scroll: false
                });
            }
        },
        draw_enemy: function(number) {
            for (var i=0; i< number; i++) {
                this.$el.find('.js-insert-back').append('<img class="card__size" src="img/back.png">')
            }
        },

        done: function () {
            this.result(this.USER_power, this.aiSimulation(this.AI_stack));
            debugger;
            this.socket.send(this.stack_to_delete);
        },

        restartButton: function(){
            this.round++;
            if (this.round > 5) alert ('game over!');
            this.stack_to_delete.sort();
            this.stack_to_delete.reverse();
            var newThis = this;
            this.stack_to_delete.forEach(function(item, i, stack){
                newThis.user1_stack.splice(item,1);
                console.log(newThis.user1_stack);
            });
            this.AI_power = 0;
            this.USER_power = 0;
            this.mana_stack = [];
            this.$('.result').hide();
            this.$('#sortable2').html('');
            this.$('#sortable3').html('');
            this.$('#user_stack').html('');
            this.draw(this.user1_stack);
            this.init_table();
    }
    });

    return new View();
});