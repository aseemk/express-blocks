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

Testing
-------

Run the included Express test app:

    node test/app.js

Then open your browser to http://localhost:8080/ -- you should see:

* A page with three sections.
* Three "Hello from ..." lines in the top section.

And if you view source on the page, you should see three script references and
three stylesheet references. Most importantly, both sets should be in order of
'layout', 'page1' and 'page2'.

License
-------

MIT License. Copyright &copy; 2011 Aseem Kishore and Laurie Harper.