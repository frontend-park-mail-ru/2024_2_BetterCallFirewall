(function () {
	var template = Handlebars.template,
		templates = (Handlebars.templates = Handlebars.templates || {});
	templates['Header.hbs'] = template({
		compiler: [8, '>= 4.3.0'],
		main: function (container, depth0, helpers, partials, data) {
			var stack1,
				alias1 = container.lambda,
				alias2 = container.escapeExpression,
				lookupProperty =
					container.lookupProperty ||
					function (parent, propertyName) {
						if (
							Object.prototype.hasOwnProperty.call(
								parent,
								propertyName,
							)
						) {
							return parent[propertyName];
						}
						return undefined;
					};

			return (
				'<div class="header" data-section="' +
				alias2(
					alias1(
						depth0 != null ? lookupProperty(depth0, 'key') : depth0,
						depth0,
					),
				) +
				'">\n    <span>' +
				alias2(
					alias1(
						depth0 != null
							? lookupProperty(depth0, 'text')
							: depth0,
						depth0,
					),
				) +
				'</span>\n</div>'
			);
		},
		useData: true,
	});
})();
