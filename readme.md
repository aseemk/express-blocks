express-blocks
==============

Middleware for [Express](http://expressjs.com/) that adds basic block support
to views, in the form of a helper `block()` method.

This was authored by [Laurie Harper](https://github.com/laurie71) in the form
of a proof-of-concept [gist](https://gist.github.com/903142). I've simply
packaged it up as an official npm module.

Installation
------------

Easy peasy:

    npm install express-blocks

Please note the version you install and **only specify that exact version as
your dependency** while this is in development. Breaking changes are likely!

Usage
-----

In your `app.js`, register this middleware:

    app.use(require('express-blocks')(app));

Then in your (top-level) layout, add the desired block placeholders (e.g. in
[EJS](https://github.com/visionmedia/ejs) syntax):

    <%- block('head') %>
    ...
    <%- block('foot') %>

And from your views (or intermediate layouts), add arbitrary HTML to those
blocks:

    <%- block('head', '<meta name="description" value="Hello world." />') %>

You can use the helper `block.script` and `block.stylesheet` functions to
generate staple `<script>` and `<link rel="stylesheet">` references for you:

    <%- block('head', block.script('/path/to/script.js')) %>
    <%- block('head', block.stylesheet('/path/to/stylesheet.js')) %>

As Borat would say, niiice!

Testing
-------

Run the included Express test app:

    node test/app.js

Then open your browser to http://localhost:8080/, view source, and you should
see two stylesheet references and two script references.

License
-------

MIT. (c) 2011 Laurie Harper and Aseem Kishore.