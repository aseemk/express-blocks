//
// Block class - essentially an HTML buffer
//

function Block(name) {
    this.name = name;
    this.htmls = [];
}

Block.prototype.addHtml = function (html) {
    this.htmls.push(html);
};

Block.prototype.toHtml = function () {
    // important: output HTML in reverse order; child pages/layouts are
    // executed first, but parent pages/layouts may have dependencies.
    this.htmls.reverse();
    var html = this.htmls.join('');
    this.htmls.reverse();
    return html;
};

// important: so that the block can be output in the view directly w/out
// having to explicitly call .toHtml() on it.
Block.prototype.toString = Block.prototype.toHtml;


//
// Middleware - adds view helpers to every request
//

module.exports = function(req, res, next) {
    // request-local hash of named blocks
    var blocks = {};
    
    // create the named block if it doesn't already exist
    function getBlock(name) {
        return blocks[name] = blocks[name] || new Block(name);
    }
    
    req.app.helpers({
        
        // block(name, html) adds the given HTML to the named block;
        // block(name) returns the combined HTML for the named block
        block: function block(name, html) {
            var block = getBlock(name);
            if (html) {
                block.addHtml(html);
            } else {
                return block.toHtml();
            }
        },
        
        blocks: blocks,
        
        // utility method for adding a script reference to 'scripts'
        script: function script(src) {
            getBlock('scripts').addHtml(
                '<script src="' + src + '"></' + 'script>'
            );
        },
        
        scripts: getBlock('scripts'),
        
        // utility method for adding a stylesheet reference to 'stylesheets'
        stylesheet: function stylesheet(href, media) {
            getBlock('stylesheets').addHtml(
                '<link rel="stylesheet" href="' + href +
                    (media ? ('" media="' + media) : '') + '" />'
            );
        },
        
        stylesheets: getBlock('stylesheets'),
        
    });
    
    next();
};
