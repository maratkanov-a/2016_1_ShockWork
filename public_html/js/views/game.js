define([
    'backbone',
    'tmpl/game',
    'collections/cards',
    'sweetalert'
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
            this.showed = true;
            this.$el.show();
            this.trigger("show",this);

            this.socket = new WebSocket("wss://" + window.location.hostname + ":" + window.location.port + "/api/gameplay");
            this.socket.onopen = function () {
                //alert('Open connection')
            };
            this.socket.onclose = function () {
                Backbone.history.navigate('', {trigger: true})
            };
            this.socket.onmessage = function (msg) {
                console.log(msg.data);
                var msgData = JSON.parse(msg.data);
                switch (msgData.command) {
                    case "start":
                        this.cardsCollection = 0;
                        this.cardsCollection = msgData['cards'];
                        this.initializeGame();
                        $('body').addClass('loaded');
                        $('h1').css('color', '#222222');
                        if (msgData.turn) {
                            this.$el.find('#waiter').hide();
                        }
                        else {
                            this.$el.find('#waiter').show();
                        }
                        break;
                    case "nextTurn":
                        if (msgData.cards > 0) {
                            this.transferCards(msgData.cards);
                        }
                         if (msgData.turn) {
                            this.$el.find('#waiter').hide();
                        }
                        else {
                            this.$el.find('#waiter').show();
                        }
                        break;
                    case "endRound":
                        //show Stats
                        this.showStats(msgData);
                        this.$el.find('#waiter').hide();
                        //draw new cards
                        this.drawEnemyReal(msgData);
                        this.makePapauPschhhh(msgData);
                        //show restartButton
                        //make able to clats-clats it
                        this.$el.find('#restart_button').show();
                        break;
                    case "nextRound":
                        if (msgData.turn) {
                            this.$el.find('#waiter').hide();
                        }
                        else {
                            this.$el.find('#waiter').show();
                        }
                        this.refreshTable(msgData);
                        break;
                    case "endGame":
                        if (msgData.win) {
                            swal("Победа!", "Противник уничтожен!", "success")
                            Backbone.history.navigate('scoreboard', {trigger: true});
                            this.socket.close();
                        break;
                        } else {
                            sweetAlert("Поражение", "Унижено", "error");
                            Backbone.history.navigate('scoreboard', {trigger: true});
                            this.socket.close();
                        }
                        break;
                    case "enemyDisconnected":
                        //TODO показать что второй вышел и выйти на главный экран
                        swal({
                            title: "Ошибка!",
                            text: "Противник вышел из игры :(",
                            type: "error",
                            confirmButtonText: "Мразь!"
                        });
                        Backbone.history.navigate('', {trigger: true});
                        this.socket.close();
                        break;
                }}.bind(this);

        },
        hide: function() {
            if (this.showed) {
                this.socket.close();
                this.$el.find('#user_stack').html('');
                this.$('#sortable3').html('');
                this.$('#sortable2').html('');
                this.$('.js-insert-back').html('');
                $('body').removeClass('loaded');
            }
            this.showed = false;
            this.$el.hide();
        },
        goBack: function() {
            Backbone.history.navigate('', { trigger: true });
        },
        makePapauPschhhh: function(msgData){
            if (msgData.enemyPower > msgData.power){
                this.$el.find('.correct').prepend('<img class="flame__my" src="img/explosion.gif"  style = "margin-top:10px; margin-left:26%; position:absolute; z-index: 100;"/>');
            }
            else if (msgData.enemyPower < msgData.power) {
                 this.$el.find('.enemy__real__card').prepend('<img class="flame__enemy" src="img/explosion.gif"  style = "margin-top:10px; margin-left:25px; position:absolute; z-index: 100;"/>');
                }
            else {
                 this.$el.find('.correct').prepend('<img class="flame__my" src="img/explosion.gif" />');
                 this.$el.find('.enemy__real__card').prepend('<img class="flame__enemy" src="img/explosion.gif" />');

            }
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
            this.userStackTable = $(".score span.my");
            this.init_table();
            this.draw(this.user1_stack);
            this.draw_enemy(this.user2_stack_length);
        },
        refreshTable: function(msgData){
            this.$el.find('#user_stack').html('');
            var newStack = msgData.newCards;
            console.log(newStack);
            this.stack_to_delete = [];
            this.USER_power = 0;
            this.$('#sortable3').html('');
            this.$('#sortable2').html('');
            this.init_table();
            this.$el.find('#restart_button').hide();
            $(".not_my").text('?');
            this.draw(newStack);
            this.$('.js-insert-back').html('');
            this.draw_enemy(3);
        },
        drawEnemyReal: function(msgData){
            this.$el.find('#sortable3').html('');
            var newThis = this.$el;
            for (var i=0; i < msgData.enemyCards.length; i++ ){
                $('<li class="ui-state-default" style = "list-style: none;"><img src="img/cards/'+msgData.enemyCards[i].img+'.png" alt=""> </li>')
                .data('power', msgData.enemyCards[i].id)
                .attr('class', 'enemy__real__card').appendTo(newThis.find('#sortable3'));
            }
        },
        transferCards: function(number){
            for (var i=0; i< number; i++) {
                this.$el.find('.card__size').last().remove();
                this.$el.find('#sortable3').append('<img class="card__size__game" src="img/back.png">');
            }
        },
        showStats: function(msgData){
            $("#your_health").text(msgData.health);
            $("#enemy_health").text(msgData.enemyHealth);
            $(".not_my").text(msgData.enemyPower);
            $(".my").text(msgData.power);
        },
        init_table: function() {
            $(".score span.my").text('0');
            var newThis = this.$el;
            for (var i = 1; i <= 3; i++) {
                $('<div style = "height: 180px; width: 100%"> </div>')
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
            ui.draggable.data('this').$el.find('#button_done').show();
            ui.draggable.data('this').manaPush(ui.draggable.data('class'));
            var cardPower = ui.draggable.data('power');
            ui.draggable.data('this').stack_to_delete.push(ui.draggable.data('number'));
            ui.draggable.addClass( 'correct' );
            ui.draggable.draggable( 'disable' );
            $(this).droppable( 'disable' );
            ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
            ui.draggable.draggable( 'option', 'revert', false );
            ui.draggable.data('this').USER_power += cardPower;
            $(".score span.my").text(ui.draggable.data('this').USER_power);
        },
        draw: function(stack) {
            var count = stack.length;
            var newThis = this.$el;
            for (var i=0; i < count; i++ ){
                $('<li class="ui-state-default" style = "list-style: none;"><img src="img/cards/'+stack[i].img+'.png" alt=""> </li>')
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
            this.$el.find('#button_done').hide();
            console.log(this.stack_to_delete);
            this.socket.send(JSON.stringify({
                command: 'nextTurn',
                cards: this.stack_to_delete
            }));
        },

        restartButton: function(){
            this.socket.send(JSON.stringify({
                command: 'nextRound',
            }));
    }
    });

    return new View();
});