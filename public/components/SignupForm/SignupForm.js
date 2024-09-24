import Input from '../Input/Input.js';

export default class SignupForm {
	#config;
	#parent;
	#inputs = [];
	#className;
	/**
	 *
	 * @param {Object} config
	 * @param {HTMLElement} parent
	 */
	constructor(config, parent) {
		this.#config = config;
		this.#parent = parent;
		this.#className = 'signup-form';
	}
	get configItems() {
		return Object.entries(this.#config);
	}
	render() {
		this.configItems.forEach(([key, value]) => {
			const input = new Input({key, ...value});
			this.#inputs.push(input);
			console.log(key, value);
		});
		const template = Handlebars.templates['SignupForm.hbs'];
		console.log(this.#inputs);
		const html = template({
			inputs: this.#inputs.map((input) => input.render()),
			className: this.#className,
		});
		this.#parent.innerHTML += html;
		this.#inputs.forEach((input) => {
			input.parent = this.htmlElement;
		});

		return html;
	}
}
