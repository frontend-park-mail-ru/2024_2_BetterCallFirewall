import Input from '../Input/Input';
import FormButton from '../FormButton/FormButton';
import FormLink from '../FormLink/FormLink';
import BaseComponent from '../BaseComponent';

import { Input as InputConfig } from '../../config';

export default class LoginForm extends BaseComponent {
	#configInputs: { [key: string]: InputConfig };
	#configButton;
	#inputs: Input[] = [];
	#className;
	#items: { [key: string]: any } = {};
	#id;
	/**
	 * constructor of instance LoginForm
	 *
	 * @param {Object} config - configuration for the form
	 * @param {HTMLElement} parent - the parent HTML element
	 */
	constructor(config, parent) {
		super(config, parent);
		this.#configInputs = config.inputs;
		this.#configButton = config.button;
		this.#className = 'form';
		this.#id = 'formLogin';
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
	 * Render login form and submit event handler
	 *
	 * @returns {string} - HTML string of form
	 */
	render() {
		this.configInputsItems.forEach(([key, value]) => {
			const input = new Input({ key, ...value }, this.htmlElement);
			this.#items[key] = input;
			this.#inputs.push(input);
		});
		const button = new FormButton({ ...this.#configButton }, this.htmlElement);
		this.#items.button = button;
		const toSignupLink = new FormLink(this.config.toSignupLink, this.htmlElement);
		this.#items.toSignupLink = toSignupLink;

		const template = Handlebars.templates['LoginForm.hbs'];
		const html = template({
			inputs: this.#inputs.map((input) => input.render()),
			className: this.#className,
			key: this.config.key,
			id: this.#id,
			button: button.render(),
			toSignupLink: toSignupLink.render(),
		});
		this.parent.htmlElement.innerHTML += html;
		button.appendToComponent(this);
		this.#inputs.forEach((input) => {
			input.appendToComponent(this);
		});
		toSignupLink.appendToComponent(this);

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
