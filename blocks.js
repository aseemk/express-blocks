//
// Block class - essentially an HTML buffer
//

function Block(name) {
    this.name = name;
    this.views = [];    // list of views in order rendered
    this.htmls = {};    // map from view to list of htmls
}

Block.prototype.addHtml = function (view, html) {
    // if we haven't seen this view before, add it:
    if (!this.htmls[view]) {
        this.views.push(view);
        this.htmls[view] = [];
    }
    
    // then add this html for this view:
    this.htmls[view].push(html);
};

Block.prototype.toHtml = function () {
    var html = [];
    var htmls = this.htmls;
    
    // important: we want to output HTML in reverse order of views, since
    // child views are rendered before parent views, but *within* a view,
    // we want to output HTML in the order given.
    this.views.reverse();
    this.views.forEach(function (view) {
        html.push(htmls[view].join(''));
    });
    this.views.reverse();
    
    return html.join('');
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
    
    // derive the current view that's calling this helper
    function getView(context) {
        return context.filename;
    }
    
    res.locals({
        
        // block(name, html) adds the given HTML to the named block;
        // block(name) returns the combined HTML for the named block
        block: function block(name, html) {
            var block = getBlock(name);
            if (html) {
                block.addHtml(getView(this), html);
            } else {
                return block.toHtml();
            }
        },
        
        blocks: blocks,
        
        // utility method for adding a script reference to 'scripts'
        script: function script(src) {
            getBlock('scripts').addHtml(getView(this),
                '<script src="' + src + '"></' + 'script>'
            );
        },
        
        scripts: getBlock('scripts'),
        
        // utility method for adding a stylesheet reference to 'stylesheets'
        stylesheet: function stylesheet(href, media) {
            getBlock('stylesheets').addHtml(getView(this),
                '<link rel="stylesheet" href="' + href +
                    (media ? ('" media="' + media) : '') + '" />'
            );
        },
        
        stylesheets: getBlock('stylesheets'),
        
    });
    
    next();
};
