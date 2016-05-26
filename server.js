var express = require('express'),
    errorHandler = require('errorhandler'),
    app = express(),
    proxy = require('http-proxy-middleware');

var HOSTNAME = 'localhost',
    PORT = 8080,
    PUBLIC_DIR = __dirname + '/public_html';

var counter = 1;
var now = new Date();

app.use(function (req, res, done) {
    console.log("[" + now + "]" + " [" + counter++ + "]");
    done();
});

app
    .use('/', express.static(PUBLIC_DIR))
    .use(errorHandler());

app.listen(PORT, function () {
    console.log("Simple static server showing %s listening at http://%s:%s", PUBLIC_DIR, HOSTNAME, PORT);
});

var context = '/api';

var options = {
    target: 'http://localhost:8081',
    ws: true,
};

app.use(proxy(context, options));
