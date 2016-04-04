//note-to-me: Добавил колоду, кнопки
//to-do: навесить обработку на нажатие кнопки, переделать логику раундов, добавить массив для логики ИИ






$(document).ready(function () {

var registrWindow = $('.container');
var registrWindowheight = $('.container').innerHeight();
var windowHeight = $('body').innerHeight();

registrWindow.css('margin-top', (windowHeight-registrWindowheight)/2);

///*Dragable*/
//    $(function() {
//        $( "#sortable1, #sortable2" ).sortable({
//        connectWith: ".connectedSortable"
//    }).disableSelection();
//  });
///*.Dragable*/

    //мой код
    //ОНО ХОЧЕТ РЕФАКТОРИНГА


    //украл со стэковерфлоу
    function shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }

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
    shuffle(user1_stack);
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
    shuffle(AI_stack); // вот в этот массив апиха отдает то, что выкинул юзер или ИИ
    init_table();
    draw(user1_stack);



    //рисуем карты юзера
    function draw(stack) {
        stack_to_delete = [];
        cards_counter = 0;
        count = 3;
        if (stack.length < 3) var count = stack.length;
        for (var i=0; i < count; i++ ){
            $('<li class="ui-state-default"><img src="img/'+stack[i].img+'.png" alt=""> </li>')
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
                    scroll: false,
                });
        }
    }

    //генерим стол со всей шнягой
    function init_table() {
        $(".score span").text('0');
        for (var i = 1; i <= 3; i++) {
            $('<div style = "height: 205px; width: 100%"> </div>').data('user', 1).appendTo('#sortable2').droppable({
                accept: '.playing_card',
                hoverClass: 'hovered',
                drop: handleDrop
            });
        }
    }

    //обрабатываем событие опускания карты
    function handleDrop(event, ui ){
        mana_stack.push(ui.draggable.data('class'));
        var cardPower = ui.draggable.data('power');
        stack_to_delete.push(ui.draggable.data('number'));
        ui.draggable.addClass( 'correct' );
        ui.draggable.draggable( 'disable' );
        $(this).droppable( 'disable' );
        ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
        ui.draggable.draggable( 'option', 'revert', false );
        $(".score span").text(parseInt($(".score span").text())+cardPower);
    }




    function aiSimulation(stack){
        cards_counter = 0;
        count = 3;
        if (stack.length < 3) var count = stack.length;
        for (var i=0; i < count; i++ ){
            $('<li class="ui-state-default"><img src="img/'+stack[i].img+'.png" alt=""> </li>')
                .data('power', stack[i].power)
                .data('class', stack[i].mana)
                .attr('id', 'card_ai_' + stack[i].id)
                .attr('class', 'playing_card')
                .appendTo('#sortable3');
                AI_power+=stack[i].power;
        }
        AI_stack.splice(0,3);
        return AI_power
    }


    $('#button_done').on('click', function(){
        result(parseInt($(".score span").text()),aiSimulation(AI_stack))
    })


    function result(user, ai){
        if (mana_stack[0]==mana_stack[1] && mana_stack[1] == mana_stack[2]){
            alert("Mana win");
        }
        if (user > ai){
            AI_health-=(user-ai);
            $('#enemy_health').text(AI_health);
        }
        if (user < ai){
            USER_health-=(ai-user);
            $('#your_health').text(USER_health);
        }
        if (USER_health <= 0) alert('you loose');
        if (AI_health<=0) alert ('you win');
        $('#restart_button').show();
    }


    $('#restart_button').on('click',function(){
        new_round()
    });


    function new_round(){
        round++;
        if (round > 5) alert ('game over!');
        stack_to_delete.sort();
        stack_to_delete.reverse();
        stack_to_delete.forEach(function(item, i, stack){
            user1_stack.splice(item,1);
        });
        AI_power = 0;
        mana_stack = [];
        mana_win = 0;
        $('.result').hide();
        $('#sortable2').html('');
        $('#sortable3').html('');
        $('#user_stack').html('');
        draw(user1_stack);
        init_table();
    }






});