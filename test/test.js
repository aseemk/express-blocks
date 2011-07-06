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
