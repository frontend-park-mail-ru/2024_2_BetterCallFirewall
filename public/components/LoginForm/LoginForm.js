import Input from '../Input/Input.js';
import FormButton from '../FormButton/FormButton.js';

export default class LoginForm {
	#config = {};
	#configInputs;
	#configButton;
	#inputs = [];
	#parent;
	#className;
	#handlers = {};
	/**
	 *
	 * @param {Object} config
	 * @param {HTMLElement} parent
	 */
	constructor(config, parent) {
		this.#config = config;
		this.#configInputs = config.inputs;
		this.#configButton = config.button;
		this.#parent = parent;
		this.#className = 'form';
	}
	get configInputsItems() {
		return Object.entries(this.#configInputs);
	}
	get htmlElement() {
		console.log(this.#config.section);
		return this.#parent.querySelector(
			`div[data-section=${this.#config.section}]`,
		);
	}
	render() {
		this.configInputsItems.forEach(([key, value]) => {
			const input = new Input({ key, ...value });
			this.#inputs.push(input);
		});
		const button = new FormButton({ ...this.#configButton });

		const template = Handlebars.templates['LoginForm.hbs'];
		const html = template({
			inputs: this.#inputs.map((input) => input.render()),
			className: this.#className,
			button: button.render(),
		});
		this.#parent.innerHTML += html;
		this.#inputs.forEach((input) => {
			input.parent = this.htmlElement;
		});

		return html;
	}
	addHandler(target, event, handler) {
		target.addEventListener(event, handler);
		this.#handlers[`${target.dataset['section']}-${event}`] = {
			target,
			event,
			handler,
		};
	}
}
