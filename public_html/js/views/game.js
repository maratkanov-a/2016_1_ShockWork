define([
    'tmpl/game',
    'sweetalert',
    'jquery_ui'
], function(
    tmpl
) {

    var View = Backbone.View.extend({
        events: {
            "click .js-go-back": "goBack",
            "click #restart_button": "restartButton",
            "click #button_done": "done"
        },

        template: tmpl,

        initialize: function() {
            this.showed = false;
            this.CLOSE_NORMAL = 1000;
            this.CLOSE_ABNORMAL = 1006;
        },

        render: function() {
            this.$el.html(this.template());
        },
        show: function() {
            this.render();
            $('body').removeClass('loaded');
            this.showed = true;
            this.$el.show();
            this.trigger("show", this);

            this.socket = new WebSocket("wss://" + window.location.hostname + ":" + window.location.port + "/api/gameplay");
            this.socket.onclose = this.closeHandler.bind(this);
            this.socket.onmessage = this.messageHandler.bind(this);
        },
        hide: function() {
            if (this.showed) {
                this.socket.close(this.CLOSE_NORMAL);
                this.$el.find('#user_stack').html('');
                this.$('#sortable3').html('');
                this.$('#sortable2').html('');
                this.$('.js-insert-back').html('');
                this.$el.find(".not_my").text('?');
                this.$el.find(".my").text('0');
                $('body').removeClass('loaded');
            }
            this.showed = false;
            this.$el.hide();
        },
        goBack: function() {
            Backbone.history.navigate('', {
                trigger: true
            });
        },
        messageHandler: function(msg) {
            var msgData = JSON.parse(msg.data);
            switch (msgData.command) {
                case "start":
                    this.cardsCollection = msgData['cards'];
                    this.initializeGame(msgData);
                    $('body').addClass('loaded');
                    this.toogleWaiter(msgData.turn);
                    break;
                case "nextTurn":
                    if (msgData.cards > 0) {
                        this.transferCards(msgData.cards);
                    }
                    this.toogleWaiter(msgData.turn);
                    break;
                case "endRound":
                    if (msgData.enemyTransferCards > 0) {
                        this.transferCards(msgData.enemyTransferCards);
                    }
                    this.showHealth(msgData);
                    this.showPower(msgData);
                    this.toogleWaiter(true);                    
                    this.drawEnemyReal(msgData);
                    this.makePapauPschhhh(msgData.enemyPower > msgData.power, msgData.enemyPower === msgData.power);
                    this.$el.find('#restart_button').show();
                    break;
                case "nextRound":
                    this.toogleWaiter(msgData.turn);
                    this.refreshTable(msgData);
                    break;
                case "endGame":
                    if (msgData.mana) {
                        this.makePapauPschhhh(false);
                        swal({
                                title: "Победа",
                                text: "Ты собрал вместе команду мечты",
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Ура!"
                            },
                            function() {
                                this.socket.close(this.CLOSE_NORMAL);
                            }.bind(this));
                        break;
                    }
                    var rounds = (msgData.rounds) ? "Раунды подошли к концу.\n" : "";
                    if (msgData.win) {
                    	this.makePapauPschhhh(false);
                        swal({
                                title: "Победа",
                                text: rounds + "Враг повержен.",
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Я крут!",
                                closeOnConfirm: false
                            },
                            function() {
                                swal("Поздравляем!", "Как насчет попробовать еще раз?", "success");
                                this.socket.close(this.CLOSE_NORMAL);
                            }.bind(this));
                    } else {
                        this.makePapauPschhhh(true);
                        swal({
                                title: "Поражение",
                                text: rounds + "Вас унизили.",
                                type: "error",
                                showCancelButton: false,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Мне просто не повезло",
                                closeOnConfirm: false
                            },
                            function() {
                                swal("Не отчаивайся", "Тебе повезет в следующий раз", "success");
                                this.socket.close(this.CLOSE_NORMAL);
                            }.bind(this));
                    }
                    break;
                case "enemyDisconnected":
                    swal({
                            title: "Ошибка",
                            text: "Противник вышел из игры",
                            type: "error",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Мразь!",
                        },
                        function() {
                            this.socket.close(this.CLOSE_NORMAL);
                        }.bind(this));
                    break;
            }
        },
        closeHandler: function(event) {
            Backbone.history.navigate('', {
                trigger: true
            });
            if (event.code == this.CLOSE_ABNORMAL) {
                swal("Отключение", "Похоже, что ты долго висишь без дела", "error");
            } else if (event.code != this.CLOSE_NORMAL) {
                swal("Опаньки...", "Соединение с сервером внезапно прервалось", "error");
            }
        },
        toogleWaiter: function(turn) {
            if (turn) {
                this.$el.find('#waiter').hide();
            } else {
                this.$el.find('#waiter').show();
            }
        },
        cardZoom: function() {
            $(".js-zoom-card").attr({
                src: $(this).attr('src')
            });
            $("#dialog").clone().dialog();
        },
        makePapauPschhhh: function(enemyWin, draw) {
            this.$el.find("#sortable2").find(".flame__my").remove();
            this.$el.find("#sortable3").find(".flame__enemy").remove();
            if (enemyWin || draw) {
                this.$el.find('.flame__my').clone().insertBefore(this.$el.find('.correct')).show();
            }
            if (!enemyWin || draw) {
                this.$el.find('.flame__enemy').clone().insertBefore(this.$el.find('.enemy__real__card')).show();
            }
        },
        initializeGame: function(msgData) {
            this.round = 1;
            this.cards_counter = 0;
            this.mana_stack = [];
            this.AI_power = 0;
            this.USER_power = 0;
            this.stack_to_delete = [];
            this.user1_stack = this.cardsCollection;
            this.AI_stack = [];
            this.user2_stack_length = 3;
            this.init_table();
            this.showHealth(msgData);
            this.draw(this.user1_stack);
            this.draw_enemy(this.user2_stack_length);
        },
        refreshTable: function(msgData) {
            this.$el.find('#user_stack').html('');
            var newStack = msgData.newCards;
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
        drawEnemyReal: function(msgData) {
            this.$el.find('#sortable3').html('');
            var newThis = this.$el;
            for (var i = 0; i < msgData.enemyCards.length; i++) {
                var cardPath = "img/cards/" + msgData.enemyCards[i].img + ".png";
                this.$el.find('#one_card').clone().removeClass('.hidden-card').removeAttr('id').find('img').attr("src", cardPath)
                    .data('power', msgData.enemyCards[i].id)
                    .attr('class', 'enemy__real__card').appendTo(newThis.find('#sortable3'))
                    .dblclick(this.cardZoom);
            }
        },
        transferCards: function(number) {
            for (var i = 0; i < number; i++) {
                this.$el.find('.card__size').last().remove();
                this.$el.find("#one_back_card").clone().removeClass('hidden-card').removeAttr('id').addClass('card__size__game').appendTo(this.$el.find('#sortable3'));
            }
        },
        showHealth: function(msgData) {
            this.$el.find("#enemy_health").text(msgData.enemyHealth);
            this.$el.find("#your_health").text(msgData.health);
        },
        showPower: function(msgData) {
            this.$el.find(".not_my").text(msgData.enemyPower);
            this.$el.find(".my").text(msgData.power);
        },
        init_table: function() {
            this.$el.find(".score span.my").text('0');
            var newThis = this.$el;
            for (var i = 1; i <= 3; i++) {
                $('<div> </div>')
                    .data('user', 1)
                    .attr('class', 'card__place')
                    .appendTo(newThis.find('#sortable2')).droppable({
                        accept: '.playing_card',
                        hoverClass: 'hovered',
                        drop: this.handleDrop
                    });
            }
        },
        manaPush: function(mana) {
            this.mana_stack.push(mana);
        },
        handleDrop: function(event, ui) {
            $(ui.draggable).appendTo($(this));
            ui.draggable.data('this').manaPush(ui.draggable.data('class'));
            var cardPower = ui.draggable.data('power');
            ui.draggable.data('this').stack_to_delete.push(ui.draggable.data('number'));
            ui.draggable.addClass('correct');
            ui.draggable.draggable('disable');
            $(this).droppable('disable');
            ui.draggable.position({
                of: $(this),
                my: 'left top',
                at: 'left top'
            });
            ui.draggable.draggable('option', 'revert', false);
            ui.draggable.data('this').USER_power += cardPower;
            ui.draggable.data('this').$el.find(".score span.my").text(ui.draggable.data('this').USER_power);
            ui.draggable.data('this').$el.find('#button_done').show();
        },
        draw: function(stack) {
            var count = stack.length;
            var newThis = this.$el;
            for (var i = 0; i < count; i++) {
                var cardPath = "img/cards/" + stack[i].img + ".png";
                this.$el.find('#one_card').clone().removeClass('.hidden-card').find('img').attr("src", cardPath)
                    .data('power', stack[i].power)
                    .data('class', stack[i].mana)
                    .data('this', this)
                    .data('number', stack[i].id)
                    .attr('id', 'card_user1_' + stack[i].id)
                    .attr('class', 'playing_card').appendTo(newThis.find('#user_stack'))
                    .draggable({
                        containment: '#content',
                        stack: '#sortable1',
                        cursor: '-webkit-grabbing',
                        revert: true,
                        scroll: false
                    })
                    .dblclick(this.cardZoom);;
            }
        },
        draw_enemy: function(number) {
            for (var i = 0; i < number; i++) {
                this.$el.find("#one_back_card").clone().removeClass('hidden-card').removeAttr('id').addClass('card__size').appendTo(this.$el.find('.js-insert-back'));
            }
        },

        done: function() {
            this.$el.find('.playing_card').draggable('disable');
            this.$el.find('#button_done').hide();
            this.socket.send(JSON.stringify({
                command: 'nextTurn',
                cards: this.stack_to_delete
            }));
        },

        restartButton: function() {
            this.$el.find('#restart_button').hide();
            this.toogleWaiter(false);
            this.socket.send(JSON.stringify({
                command: 'nextRound'
            }));
        }
    });

    return new View();
});