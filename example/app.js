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
    res.render('page');
});

app.listen(8080);
console.log('listening on port 8080...');