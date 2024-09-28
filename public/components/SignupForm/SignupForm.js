import FormButton from '../FormButton/FormButton.js';
import Input from '../Input/Input.js';
import { validateForm } from '../../modules/validation.js';

export default class SignupForm {
	#config;
	#configInputs;
	#configButton;
	#parent;
	#inputs = [];
	#className;
	#id;
	#handlers = {};
	/**
	 *
	 * @param {Object} config
	 * @param {HTMLElement} parent
	 */
	constructor(config, parent) {
		this.#config = config;
		const configInputs = config.inputs;
		const configButton = config.button;
		this.#configInputs = configInputs;
		this.#configButton = configButton;
		this.#parent = parent;
		this.#className = 'form';
		this.#id = 'formSignUp';
	}
	get configInputsItems() {
		return Object.entries(this.#configInputs);
	}
	get htmlElement() {
		return this.#parent.querySelector(
			`div[data-section="${this.#config.section}"]`,
		);
	}

	addHandler(target, event, handler) {
		this.#handlers[`${target.className}-${event}`] = {
			target,
			event,
			handler,
		};
		target.addEventListener(event, handler);
	}

	render() {
		this.configInputsItems.forEach(([key, value]) => {
			const input = new Input({ key, ...value });
			this.#inputs.push(input);
		});
		const button = new FormButton({
			section: 'submit',
			...this.#configButton,
		});

		const template = Handlebars.templates['SignupForm.hbs'];
		const html = template({
			...this.#config,
			inputs: this.#inputs.map((input) => input.render()),
			className: this.#className,
			id: this.#id,
			button: button.render(),
		});
		this.#parent.innerHTML += html;
		this.#inputs.forEach((input) => {
			input.parent = this.htmlElement;
		});

		return html;
	}

	remove() {
		Object.entries(this.#handlers).forEach(([, obj]) => {
			obj.target.removeEventListener(obj.event, obj.handler);
		});
		this.htmlElement.remove();
	}
}
