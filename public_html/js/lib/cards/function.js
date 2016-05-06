function aiSimulation(stack){
    cards_counter = 0;
    count = 3;
    if (stack.length < 3) var count = stack.length;
    for (var i=0; i < count; i++ ){
        $('<li class="ui-state-default"><img src="img/cards/'+stack[i].img+'.png" alt=""> </li>')
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