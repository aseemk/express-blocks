var express = require('express');
var app = express.createServer();

app.configure(function () {
    app.use(require('..'));
    app.use(app.router);
});

app.set('views', __dirname);
app.set('view engine', 'html');
app.register('.html', require('ejs'));

app.get('/', function (req, res) {
    // create an artificial delay to test concurrency
    setTimeout(function () {
        res.render('child');
    }, 1000);
});

// since this is a test server, don't listen -- just return the server.
// expresso will take care of listening.
module.exports = app;
