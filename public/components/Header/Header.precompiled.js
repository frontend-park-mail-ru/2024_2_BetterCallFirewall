(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['Header.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"header\" data-section=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"key") : depth0), depth0))
    + "\">\r\n    <div class=\"header-search\">\r\n        <input type=\"text\" class=\"search-input\" placeholder=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"search") : depth0)) != null ? lookupProperty(stack1,"placeholder") : stack1), depth0))
    + "\">\r\n        <img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"search") : depth0)) != null ? lookupProperty(stack1,"img") : stack1), depth0))
    + "\" alt=\"поиск\">\r\n    </div>\r\n    <div class=\"header-account\">\r\n        <span>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</span>\r\n        <img src=\"\" alt=\"Выйти\">\r\n        <img src=\"\" alt=\"Avatar\">\r\n    </div>\r\n</div>";
},"useData":true});
})();