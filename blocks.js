var debug = require('util').debug;

// helper prototype for rendering block scripts, stylesheet links, etc
var blocktag = {
    toString: function() {
        var tag = this.tag,
            html = '<'+tag,
            that = this;
        
        Object.getOwnPropertyNames(this).forEach(function(prop) {
            if (prop !== 'tag') {
                html += ' '+prop+'="'+that[prop]+'"';
            }
        });
        
        if (tag === 'script') {
            html += '></script>';
        } else {
            html += ' />';
        }
        
        return html;
    }
}

module.exports = function(app) {
    return function(req, res, next) {
        // request-local hash of named blocks
        var blocks = {};

        // dynamic helper for defining/rendering blocks
        function block(name) {
            var block, html;

            if (arguments.length === 0) return next(new Error('unnamed block'));
            block = blocks[name];

            if (arguments.length === 1) {
                // render block contents
                html = '';
                if (block) {
                    block.forEach(function(item) {
                        html = String(item) + html;
                    });
                }
                debug('block: '+name+': '+JSON.stringify(block));
                debug('html: '+html);
                return html;
            } else {
                // define/append block contents
                if (! block) block = blocks[name] = [];
                block.push(Array.prototype.slice.call(arguments, 1));
                debug('block: '+name+': '+JSON.stringify(block));
                return '';
            }
        };
        
        // utility method for adding a script to a block
        block.script = function(src) {
            return Object.create(blocktag, {
                src : { enumerable: true, value: src },
                tag : { enumerable: true, value: 'script' },
                type: { enumerable: true, value:  'text/javascript' }
            });
        };
        
        // utility method for adding a stylesheet to a block
        block.stylesheet = function(href, media) {
            var tag = Object.create(blocktag, {
                href: { enumerable: true, value: href },
                tag : { enumerable: true, value: 'link' },
                type: { enumerable: true, value: 'text/css' },
                rel : { enumerable: true, value: 'stylesheet' }
            });
            if (media) {
                tag.media = media;
            }
            return tag;
        };

        debug('add helpers');
        // res.local('block', block);
        // req.app.dynamicHelpers(block);
        // req.app.helpers(block);
        app.helpers({block:block});
        next();
    };
};
