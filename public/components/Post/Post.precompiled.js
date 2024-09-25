(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['Post.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"post\">\r\n    <div class=\"post-header\">\r\n        <img src=\"\" alt=\"\">\r\n        <div class=\"post-header-text\">\r\n            <span>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</span>\r\n            <span>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"date") : depth0), depth0))
    + "</span>\r\n        </div>\r\n    </div>\r\n    <div class=\"post-content\">\r\n        <span class=\"post-text\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</span>\r\n    </div>\r\n    <div class=\"post-footer\">\r\n\r\n    </div>\r\n</div>";
},"useData":true});
})();