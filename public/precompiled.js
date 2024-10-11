(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['FormLink.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "\" class=\"form-link\" data-key=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"key") : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</a>\n";
},"useData":true});
templates['Post.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"post\">\n    <div class=\"post-header\">\n        <div class=\"post-header-text\">\n            <span class=\"title\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</span>\n            <span class=\"date\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"date") : depth0), depth0))
    + "</span>\n        </div>\n    </div>\n    <hr>\n    <div class=\"post-content\">\n        <span class=\"post-text\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</span>\n    </div>\n    <div class=\"post-footer\">\n\n    </div>\n</div>\n";
},"useData":true});
templates['Input.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"className") : depth0), depth0))
    + "\" data-key=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"key") : depth0), depth0))
    + "\">\n    <label for=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</label>\n    <input type=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"type") : depth0), depth0))
    + "\" id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\" name=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\" placeholder=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "\">\n    <span class=\"error\"></span>\n</div>\n";
},"useData":true});
templates['ContentMessage.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"content-message\" data-section=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section") : depth0), depth0))
    + "\">\n    <span class=\"content-message-text\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</span>\n</div>";
},"useData":true});
templates['MenuLink.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "\" class=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"className") : depth0), depth0))
    + "\" data-key=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"key") : depth0), depth0))
    + "\">\n    <span class=\"menu-item\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</span>\n</a>\n";
},"useData":true});
templates['FormButton.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button type=\"submit\" class=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"className") : depth0), depth0))
    + "\" data-key=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"key") : depth0), depth0))
    + "\">\n    "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "\n</button>\n";
},"useData":true});
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

  return "<div class=\"cover\" data-key=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"key") : depth0), depth0))
    + "\">\n    <div class=\"signup\">\n        <div class=\"title-sign\"><a href=\"/feed\" class=\"title-link\"><h1>Vilka</h1></a></div>\n        <div class=\"name-sign\"><h2>Вход</h2></div>\n        <div class=\"form-sign\">\n            <form action=\"auth/login\" method=\"post\" class=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"className") : depth0), depth0))
    + "\" id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,(depth0 != null ? lookupProperty(depth0,"inputs") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":16},"end":{"line":9,"column":25}}})) != null ? stack1 : "")
    + "                <span class=\"error-message\"></span>\n                "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"button") || (depth0 != null ? lookupProperty(depth0,"button") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"button","hash":{},"data":data,"loc":{"start":{"line":11,"column":16},"end":{"line":11,"column":28}}}) : helper))) != null ? stack1 : "")
    + "\n                "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"toSignupLink") || (depth0 != null ? lookupProperty(depth0,"toSignupLink") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"toSignupLink","hash":{},"data":data,"loc":{"start":{"line":12,"column":16},"end":{"line":12,"column":34}}}) : helper))) != null ? stack1 : "")
    + "\n            </form>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['Container.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"className") : depth0), depth0))
    + "\" data-key=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"key") : depth0), depth0))
    + "\"></div>\n";
},"useData":true});
templates['Menu.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            "
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "")
    + "\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"menu\" data-key=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"key") : depth0), depth0))
    + "\">\n    <div class=\"menu-header\">\n        <div class=\"title-sign\"><a href=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? lookupProperty(stack1,"href") : stack1), depth0))
    + "\" data-key=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? lookupProperty(stack1,"key") : stack1), depth0))
    + "\"><h1>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? lookupProperty(stack1,"text") : stack1), depth0))
    + "</h1></a></div>\n    </div>\n    <div class=\"menu-items\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"links") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":8,"column":17}}})) != null ? stack1 : "")
    + "    </div>\n</div>\n";
},"useData":true});
templates['SignupForm.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
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

  return "<div class=\"cover\" data-key=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"key") : depth0), depth0))
    + "\">\n    <div class=\"signup\">\n        <div class=\"title-sign\"><a href=\"/feed\" class=\"title-link\"><h1>Vilka</h1></a></div>\n        <div class=\"name-sign\"><h2>Регистрация</h2></div>\n        <div class=\"form-sign\">\n            <form action=\"post\" class=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"className") : depth0), depth0))
    + "\" id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,(depth0 != null ? lookupProperty(depth0,"inputs") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":16},"end":{"line":9,"column":25}}})) != null ? stack1 : "")
    + "                <span class=\"error-message\"></span>\n                "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"button") || (depth0 != null ? lookupProperty(depth0,"button") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"button","hash":{},"data":data,"loc":{"start":{"line":11,"column":16},"end":{"line":11,"column":28}}}) : helper))) != null ? stack1 : "")
    + "\n                "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"toLoginLink") || (depth0 != null ? lookupProperty(depth0,"toLoginLink") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"toLoginLink","hash":{},"data":data,"loc":{"start":{"line":12,"column":16},"end":{"line":12,"column":33}}}) : helper))) != null ? stack1 : "")
    + "\n            </form>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['Header.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"header\" data-key=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"key") : depth0), depth0))
    + "\">\n    <div class=\"header-search\">\n    </div>\n    <div class=\"header-profile\">\n        <svg class=\"header-profile-logout\" viewBox=\"0 0 22 21\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M2.63981 2.47312H2.59293V2.52V18.48V18.5269H2.63981H8.3594C8.69771 18.5269 9.02175 18.6552 9.26034 18.883C9.49886 19.1106 9.63242 19.419 9.63242 19.74C9.63242 20.061 9.49886 20.3694 9.26034 20.597C9.02175 20.8248 8.69771 20.9531 8.3594 20.9531H1.3199C0.981592 20.9531 0.657548 20.8248 0.418958 20.597C0.180442 20.3694 0.046875 20.061 0.046875 19.74V1.26C0.046875 0.93898 0.180442 0.630642 0.418958 0.402952C0.657548 0.17519 0.981592 0.046875 1.3199 0.046875H8.3594C8.69771 0.046875 9.02175 0.17519 9.26034 0.402952C9.49886 0.630642 9.63242 0.93898 9.63242 1.26C9.63242 1.58102 9.49886 1.88936 9.26034 2.11705C9.02175 2.34481 8.69771 2.47312 8.3594 2.47312H2.63981ZM21.58 9.64246L21.58 9.64249C21.6985 9.75537 21.7924 9.88935 21.8564 10.0367C21.9204 10.184 21.9532 10.3419 21.9531 10.5012C21.953 10.6606 21.92 10.8184 21.8558 10.9657C21.7917 11.1129 21.6976 11.2468 21.5789 11.3596L21.5789 11.3596L17.1792 15.5596C16.9402 15.7878 16.6155 15.9164 16.2766 15.9164C15.9377 15.9164 15.6131 15.7878 15.3741 15.5596C15.1351 15.3315 15.0013 15.0226 15.0013 14.701C15.0013 14.3794 15.1351 14.0706 15.3741 13.8425L17.5211 11.7939L17.6058 11.7131H17.4887H8.3594C8.02108 11.7131 7.69704 11.5848 7.45845 11.357C7.21993 11.1294 7.08637 10.821 7.08637 10.5C7.08637 10.179 7.21993 9.87064 7.45845 9.64295C7.69704 9.41519 8.02108 9.28687 8.3594 9.28687H17.4887H17.6058L17.5211 9.20608L15.3752 7.15964C15.1362 6.93154 15.0024 6.62265 15.0024 6.30105C15.0024 5.97945 15.1362 5.67056 15.3752 5.44246C15.6142 5.21428 15.9388 5.08574 16.2777 5.08574C16.6166 5.08574 16.9413 5.21428 17.1803 5.44246L21.58 9.64246Z\" fill=\"white\" stroke=\"#475569\" stroke-width=\"0.09375\"/>\n        </svg>\n        <img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"profile") : depth0)) != null ? lookupProperty(stack1,"avatar") : stack1), depth0))
    + "\" alt=\"Avatar\" class=\"header-profile-avatar\">\n    </div>\n</div>\n";
},"useData":true});
})();