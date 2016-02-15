var express = require('express'),
    errorHandler = require('errorhandler'),
    app = express();

var HOSTNAME = 'localhost',
    PORT = 8080,
    PUBLIC_DIR = __dirname + '/public_html';

var Nomer=0;
var log4js = require('log4js');
    var logger = log4js.getLogger();

app.use(function (req,res,done) {
	

     Nomer = Nomer +1;
    logger.debug(Nomer);

    done();
});




app
	.use('/', express.static(PUBLIC_DIR))
	.use(errorHandler());

app.listen(PORT, function () {
	console.log("Simple static server showing %s listening at http://%s:%s", PUBLIC_DIR, HOSTNAME, PORT);
});
