app = require('./app');
assert = require('assert');

function testRoot(exp) {
    assert.response(app, {
        url: '/'
    }, exp);
}

exports["test basic not-broken-ness"] = function () {
    testRoot({
        status: 200,
        body: /Express\-Blocks Test Site/
    });
};

exports["test basic layout ordering"] = function () {
    testRoot(function (res) {
        var body = res.body;
        var i1 = body.indexOf('<h1>Master</h1>');
        var i2 = body.indexOf('<h2>Parent</h2>');
        var i3 = body.indexOf('<h3>Child</h3>');
        assert.ok(i1 < i2 && i2 < i3);
    });
};
