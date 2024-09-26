export default class FormButton {
	#config;
	#className;
	constructor(config) {
		this.#config = config;
		this.#className = 'form-button';
	}

	render() {
		const template = Handlebars.templates['FormButton.hbs'];
		const html = template({
			...this.#config,
			className: this.#className,
		});
		return html;
	}
}
