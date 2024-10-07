import FormButton from '../FormButton/FormButton.js';
import Input from '../Input/Input.js';
import FormLink from '../FormLink/FormLink.js';
import BaseComponent from '../BaseComponent.js';

export default class SignupForm extends BaseComponent {
	#configInputs;
	#configButton;
	#inputs = [];
	#className;
	#id;
	#items = {};
	/**
	 *
	 * @param {Object} config
	 * @param {HTMLElement} parent
	 */
	constructor(config, parent) {
		super(config, parent);
		const configInputs = config.inputs;
		const configButton = config.button;
		this.#configInputs = configInputs;
		this.#configButton = configButton;
		this.#className = 'form';
		this.#id = 'formSignUp';
	}

	/**
	 * Get inputs from config
	 *
	 * @returns {Array} - array of input
	 */
	get configInputsItems() {
		return Object.entries(this.#configInputs);
	}

	/**
	 * Getting items of this element
	 */
	get items() {
		return this.#items;
	}

	/**
	 * Render signup form and submit event handler
	 *
	 * @returns {string} - HTML string of form
	 */
	render() {
		this.configInputsItems.forEach(([key, value]) => {
			const input = new Input({ key, ...value });
			this.#items[key] = input;
			this.#inputs.push(input);
		});
		const button = new FormButton({
			key: 'submit',
			...this.#configButton,
		});
		this.#items.button = button;
		const toLoginLink = new FormLink(this.config.toLoginLink);
		this.#items.toLoginLink = toLoginLink;

		const template = Handlebars.templates['SignupForm.hbs'];
		const html = template({
			...this.config,
			inputs: this.#inputs.map((input) => input.render()),
			className: this.#className,
			id: this.#id,
			button: button.render(),
			toLoginLink: toLoginLink.render(),
		});
		this.parent.htmlElement.innerHTML += html;
		this.#inputs.forEach((input) => {
			input.appendToComponent(this);
		});
		toLoginLink.appendToComponent(this);

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
}
