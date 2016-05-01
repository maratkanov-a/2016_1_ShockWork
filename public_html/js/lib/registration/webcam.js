//Добавляем событие
 window.addEventListener("DOMContentLoaded", function() {
 	// Создаем элементы, настройки
 	var canvas = document.getElementById("canvas"),
 		context = canvas.getContext("2d"),
 		video = document.getElementById("video"),
 		videoObj = { "video": true },
 		errBack = function(error) {
 			console.log("Video error: ", error.code);
 		};

 	// Вставляем видео в зависимости от браузера
 	if(navigator.getUserMedia) { // Сток
 		navigator.getUserMedia(videoObj, function(stream) {
 			video.src = stream;
 			video.play();
 		}, errBack);
 	} else if(navigator.webkitGetUserMedia) { //
 		navigator.webkitGetUserMedia(videoObj, function(stream){
 			video.src = window.webkitURL.createObjectURL(stream);
 			video.play();
 		}, errBack);
 	}
 	else if(navigator.mozGetUserMedia) { // Мз.ск
 		navigator.mozGetUserMedia(videoObj, function(stream){
 			video.src = window.URL.createObjectURL(stream);
 			video.play();
 		}, errBack);
 	}
     //фотка
 	document.getElementById("snap").addEventListener("click", function() {
     	context.drawImage(video, 0, 0, 640, 480);
     });

 }, false);