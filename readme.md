express-blocks
==============

Middleware for [Express](http://expressjs.com/) that adds basic block support
to views.

This was initially [prototyped](https://gist.github.com/903142) by
[Laurie Harper](https://github.com/laurie71). Thanks Laurie!

Installation
------------

Easy peasy:

    npm install express-blocks

Please note the version you install and **only specify that exact version as
your dependency** while this is in development. Breaking changes are likely!

Usage
-----

In your `app.js`, register this middleware:

    app.use(require('express-blocks'));

Then in your (top-level) layout, name and add placeholders for your desired
`blocks` (e.g. in [EJS](https://github.com/visionmedia/ejs) syntax):

    <%- blocks.foo %>
    ...
    <%- blocks.bar %>

And from your views (or intermediate layouts), add arbitrary HTML to those
blocks via the `block()` function:

    <%- block('foo', '<p>Hello world!</p>') %>

You can use the helper `script()` and `stylesheet()` functions to generate
generate staple `<script>` and `<link rel="stylesheet">` references for you:

    <%- script('/path/to/script.js') %>
    <%- stylesheet('/path/to/stylesheet.js') %>

Which are exposed to (top-level) layouts as blocks named `scripts` and
`stylesheets`, also aliased globally just like `body`:

    <%- scripts %>
    <%- stylesheets %>

As Borat would say, niiice!

Example
-------

Run the included Express example:

    node example/app.js

Then open your browser to http://localhost:8080/ to see it in action.

Testing
-------

You can verify that everything works as expected via:

    npm test

If you want to submit a pull request, be sure to add a test case, too!

License
-------

MIT License. Copyright &copy; 2011 Aseem Kishore and Laurie Harper.