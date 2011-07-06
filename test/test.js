app = require('./app');
assert = require('assert');
jsdom = require('jsdom');

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

exports["test script ordering"] = function () {
    testRoot(function (res) {
        // between views, parent scripts should come before child scripts,
        // but within a view, scripts should be in the original order.
        jsdom.env(res.body, function (err, window) {
            if (err) {
                assert.fail('Unexpected: could not parse test site DOM');
            }

            scripts = window.document.getElementsByTagName('script');

            // convert to node's ES5 array and map <script> tags to srcs:
            scripts = Array.prototype.slice.call(scripts).map(function (script) {
                return script.src;
            })

            // the srcs should match this order exactly:
            assert.deepEqual(scripts, [
                'master1.js',
                'master2.js',
                'parent1.js',
                'parent2.js',
                'child1.js',
                'child2.js',
            ]);
        });
    });
};
