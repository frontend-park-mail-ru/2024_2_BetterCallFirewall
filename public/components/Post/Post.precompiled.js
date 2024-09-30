(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['Post.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"post\">\n    <div class=\"post-header\">\n        <img src=\"\" alt=\"\">\n        <div class=\"post-header-text\">\n            <span>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</span>\n            <span>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"date") : depth0), depth0))
    + "</span>\n        </div>\n    </div>\n    <div class=\"post-content\">\n        <span class=\"post-text\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</span>\n    </div>\n    <div class=\"post-footer\">\n\n    </div>\n</div>";
},"useData":true});
})();