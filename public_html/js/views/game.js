define([
    'backbone',
    'tmpl/game',
    'gameplay'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        events: {
            "click .js-go-back":   "goBack",
            "click #restart_button" : "restart_button"
        },

        template: tmpl,
        initialize: function () {
            this.render()
        },
        render: function () {
            var round = 1;
            var cards_counter = 0;
            var mana_stack = [];
            var AI_power = 0;
            var AI_health = 50;
            var USER_health = 50;
            var stack_to_delete = new Array;
            var user1_stack = [
                {
                    "id": 1,
                    "img": "bekbulatov_card",
                    "power": 5,
                    "mana": 1
                },
                {
                    "id": 2,
                    "img": "burlak_card",
                    "power": 9,
                    "mana": 2
                },
                {
                    "id": 3,
                    "img": "didikin_card",
                    "power": 7,
                    "mana": 2
                },
                {
                    "id": 4,
                    "img": "dudina_card",
                    "power": 3,
                    "mana": 3
                },
                {
                    "id": 5,
                    "img": "frolov_card",
                    "power": 11,
                    "mana": 4
                },
                {
                    "id": 6,
                    "img": "isaikin_card",
                    "power": 8,
                    "mana": 5
                },
                {
                    "id": 7,
                    "img": "ivanov_card",
                    "power": 4,
                    "mana": 6
                },
                {
                    "id": 8,
                    "img": "korepanov_card",
                    "power": 8,
                    "mana": 6
                },
                {
                    "id": 9,
                    "img": "mazcevitc_card",
                    "power": 35,
                    "mana": 6
                },
                {
                    "id": 10,
                    "img": "meleshenko_card",
                    "power": 4,
                    "mana": 1
                },
                {
                    "id": 11,
                    "img": "mezin_card",
                    "power": 6,
                    "mana": 2
                },
                {
                    "id": 12,
                    "img": "mogilin_card",
                    "power": 19,
                    "mana": 5
                },
                {
                    "id": 13,
                    "img": "petrov_card",
                    "power": 12,
                    "mana": 10
                },
                {
                    "id": 14,
                    "img": "sherbinin_card",
                    "power": 61,
                    "mana": 5
                },
                {
                    "id": 15,
                    "img": "shubin_card",
                    "power": 45,
                    "mana": 4
                },
                {
                    "id": 16,
                    "img": "smal_card",
                    "power": 13,
                    "mana": 1
                },
                {
                    "id": 17,
                    "img": "soloviev_card",
                    "power": 9,
                    "mana": 4
                },
                {
                    "id": 18,
                    "img": "stupnikov_card",
                    "power": 1,
                    "mana": 5
                }
            ];

            this.$el.html(this.template());

            this.shuffle(user1_stack);
            //вот в этот массив апиха отдает текущие карты
            var AI_stack = [
                {
                    "id": 1,
                    "img": "bekbulatov_card",
                    "power": 5,
                    "mana": 1
                },
                {
                    "id": 2,
                    "img": "burlak_card",
                    "power": 9,
                    "mana": 2
                },
                {
                    "id": 3,
                    "img": "didikin_card",
                    "power": 7,
                    "mana": 2
                },
                {
                    "id": 4,
                    "img": "dudina_card",
                    "power": 3,
                    "mana": 3
                },
                {
                    "id": 5,
                    "img": "frolov_card",
                    "power": 11,
                    "mana": 4
                },
                {
                    "id": 6,
                    "img": "isaikin_card",
                    "power": 8,
                    "mana": 5
                },
                {
                    "id": 7,
                    "img": "ivanov_card",
                    "power": 4,
                    "mana": 6
                },
                {
                    "id": 8,
                    "img": "korepanov_card",
                    "power": 8,
                    "mana": 6
                },
                {
                    "id": 9,
                    "img": "mazcevitc_card",
                    "power": 35,
                    "mana": 6
                },
                {
                    "id": 10,
                    "img": "meleshenko_card",
                    "power": 4,
                    "mana": 1
                },
                {
                    "id": 11,
                    "img": "mezin_card",
                    "power": 6,
                    "mana": 2
                },
                {
                    "id": 12,
                    "img": "mogilin_card",
                    "power": 19,
                    "mana": 5
                },
                {
                    "id": 13,
                    "img": "petrov_card",
                    "power": 12,
                    "mana": 10
                },
                {
                    "id": 14,
                    "img": "sherbinin_card",
                    "power": 61,
                    "mana": 5
                },
                {
                    "id": 15,
                    "img": "shubin_card",
                    "power": 45,
                    "mana": 4
                },
                {
                    "id": 16,
                    "img": "smal_card",
                    "power": 13,
                    "mana": 1
                },
                {
                    "id": 17,
                    "img": "soloviev_card",
                    "power": 9,
                    "mana": 4
                },
                {
                    "id": 18,
                    "img": "stupnikov_card",
                    "power": 1,
                    "mana": 5
                }
            ];
            this.shuffle(AI_stack); // вот в этот массив апиха отдает то, что выкинул юзер или ИИ
            this.init_table();
            this.draw(user1_stack);
        },
        show: function() {
            this.$el.show();
        },
        hide: function() {
            this.$el.hide();
        },
        goBack: function() {
            Backbone.history.navigate('', { trigger: true });
        },
        shuffle: function(a) {
            var j, x, i;
            for (i = a.length; i; i -= 1) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }
        },
        init_table: function() {
            $(".score span").text('0');
            for (var i = 1; i <= 3; i++) {
                $('<div style = "height: 205px; width: 100%"> </div>').data('user', 1).appendTo('#sortable2').droppable({
                    accept: '.playing_card',
                    hoverClass: 'hovered',
                    drop: handleDrop
                });
            }
        },
        draw: function(stack) {
            stack_to_delete = [];
            alert(stack);
            cards_counter = 0;
            count = 3;
            if (stack.length < 3) var count = stack.length;
            for (var i=0; i < count; i++ ){
                $('<li class="ui-state-default"><img src="img/cards/'+stack[i].img+'.png" alt=""> </li>')
                    .data('power', stack[i].power)
                    .data('class', stack[i].mana)
                    .data('number', i)
                    .attr('id', 'card_user1_' + stack[i].id)
                    .attr('class', 'playing_card')
                    .appendTo('#user_stack').draggable({
                        containment: '#content',
                        stack: '#sortable1',
                        cursor: '-webkit-grabbing',
                        revert: true,
                        scroll: false
                    });
            }
        },
        restart_button: function(){
            new_round()
        }
    });

    return new View();
});