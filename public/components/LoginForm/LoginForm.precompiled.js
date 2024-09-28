(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['LoginForm.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                    "
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "")
    + "\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=container.hooks.helperMissing, alias5="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"cover\" data-section=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section") : depth0), depth0))
    + "\">\n    <div class=\"signup\">\n        <div class=\"title-sign\"><a href=\"/feed\"><h1>Vilka</h1></a></div>\n        <div class=\"name-sign\"><h2>Вход</h2></div>\n        <div class=\"form-sign\">\n            <form action=\"auth/login\" method=\"post\" class=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"className") : depth0), depth0))
    + "\" id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,(depth0 != null ? lookupProperty(depth0,"inputs") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":16},"end":{"line":9,"column":25}}})) != null ? stack1 : "")
    + "                "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"button") || (depth0 != null ? lookupProperty(depth0,"button") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"button","hash":{},"data":data,"loc":{"start":{"line":10,"column":16},"end":{"line":10,"column":28}}}) : helper))) != null ? stack1 : "")
    + "\n                "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"toSignupLink") || (depth0 != null ? lookupProperty(depth0,"toSignupLink") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"toSignupLink","hash":{},"data":data,"loc":{"start":{"line":11,"column":16},"end":{"line":11,"column":34}}}) : helper))) != null ? stack1 : "")
    + "\n            </form>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
})();