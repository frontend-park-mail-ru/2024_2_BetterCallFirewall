import FormButton from '../FormButton/FormButton.js';
import Input from '../Input/Input.js';
import FormLink from '../FormLink/FormLink.js';

export default class SignupForm {
	#config;
	#configInputs;
	#configButton;
	#parent;
	#inputs = [];
	#className;
	#id;
	#handlers = {};
	#items = {};
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

	get items() {
		return this.#items;
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
		this.configInputsItems.forEach(([section, value]) => {
			const input = new Input({ section, ...value });
			this.#items[section] = input;
			this.#inputs.push(input);
		});
		const button = new FormButton({
			section: 'submit',
			...this.#configButton,
		});
		this.#items.button = button;
		const toLoginLink = new FormLink(this.#config.toLoginLink);
		this.#items.toLoginLink = toLoginLink;

		const template = Handlebars.templates['SignupForm.hbs'];
		const html = template({
			...this.#config,
			inputs: this.#inputs.map((input) => input.render()),
			className: this.#className,
			id: this.#id,
			button: button.render(),
			toLoginLink: toLoginLink.render(),
		});
		this.#parent.innerHTML += html;
		this.#inputs.forEach((input) => {
			input.parent = this.htmlElement;
		});
		toLoginLink.parent = this.htmlElement;

		return html;
	}

	/**
	 * Printing error above submit button
	 * @param {string} error
	 */
	printError(error) {
		if (error) {
			this.htmlElement.querySelector('.error-message').textContent =
				error;
		}
	}

	/**
	 * Clear error above submit button
	 */
	clearError() {
		this.htmlElement.querySelector('.error-message').textContent = '';
	}

	remove() {
		Object.entries(this.#handlers).forEach(([, obj]) => {
			obj.target.removeEventListener(obj.event, obj.handler);
		});
		this.htmlElement.remove();
	}
}
