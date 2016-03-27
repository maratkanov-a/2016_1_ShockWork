$(document).ready(function () {

var registrWindow = $('.container');
var registrWindowheight = $('.container').innerHeight();
var windowHeight = $('body').innerHeight();

registrWindow.css('margin-top', (windowHeight-registrWindowheight)/2);

/*Dragable*/
      $(function() {
    $( "#sortable1, #sortable2" ).sortable({
      connectWith: ".connectedSortable"
    }).disableSelection();
  });
/*.Dragable*/
    

});