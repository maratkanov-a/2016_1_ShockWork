var express = require('express'),
    errorHandler = require('errorhandler'),
    app = express(),
	proxy = require('express-http-proxy');

var HOSTNAME = 'localhost',
    PORT = 8080,
    PUBLIC_DIR = __dirname + '/public_html';

var counter = 1;
var now = new Date();

app.use(function (req, res, done) {
	console.log("[" + now + "]"+ " [" + counter++ + "]");
	done();
});

app
	.use('/', express.static(PUBLIC_DIR))
	.use(errorHandler());

app.listen(PORT, function () {
	console.log("Simple static server showing %s listening at http://%s:%s", PUBLIC_DIR, HOSTNAME, PORT);
});

app.use('/api', proxy('127.0.0.1:8081', {
	forwardPath: function(req, res) {
		var url = '/api' + req.url; 
		console.log('Proxy to ' + url);
		return require('url').parse(url).path;
	}
}));
