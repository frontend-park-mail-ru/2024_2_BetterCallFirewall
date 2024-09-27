import Input from '../Input/Input.js';
import FormButton from '../FormButton/FormButton.js';
import Ajax from '../../modules/ajax.js';
import { validateForm } from '../../modules/validation.js';

export default class LoginForm {
	#config = {};
	#configInputs;
	#configButton;
	#inputs = [];
	#parent;
	#className;
	#button;
	#id;
	#goToPage;
	#submitHandler;
	/**
	 * constructor of instance LoginForm
	 *
	 * @param {Object} config - configuration for the form
	 * @param {HTMLElement} parent - the parent HTML element
	 */
	constructor(config, parent, goToPage) {
		this.#config = config;
		this.#configInputs = config.inputs;
		this.#configButton = config.button;
		this.#parent = parent;
		this.#className = 'form';
		this.#id = 'formLogin';
		this.#goToPage = goToPage;
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
	 * Getting html element which contains the form
	 * 
	 * @returns {HTMLElement} - HTML element of form
	 */
	get htmlElement() {
		return this.#parent.querySelector(
			`div[data-section="${this.#config.section}"]`,
		);
	}

	/**
	 * Render login form and submit event handler
	 * 
	 * @returns {string} - HTML string of form
	 */
	render() {
		this.configInputsItems.forEach(([section, value]) => {
			const input = new Input({ section, ...value });
			this.#inputs.push(input);
		});
		const button = new FormButton({ ...this.#configButton });
		this.#button = button;

		const template = Handlebars.templates['LoginForm.hbs'];
		const html = template({
			inputs: this.#inputs.map((input) => input.render()),
			className: this.#className,
			section: this.#config.section,
			id: this.#id,
			button: button.render(),
		});
		this.#parent.innerHTML += html;
		const itemsParent = this.htmlElement.querySelector('form');
		button.parent = itemsParent;
		this.#inputs.forEach((input) => {
			input.parent = itemsParent;
		});

		const form = document.getElementById(this.#id);
		const submitHandler = (e) => {
			e.preventDefault();
			const data = validateForm(this.#configInputs, form);
			if (data) {
				Ajax.sendForm('/auth/login', data, (response, error) => {
					if (response.ok) {
						this.#goToPage('/feed', true);
					} else {
						console.log('status:', response.statusText);
					}
				});
			}
		};
		form.addEventListener('submit', submitHandler);
		this.#submitHandler = submitHandler;

		return html;
	}

	/**
	 * Removing the login form and event handlers
	 */
	remove() {
		const form = document.getElementById(this.#id);
		form.removeEventListener('submit', this.#submitHandler);

		Object.keys(this.#inputs).forEach((key) => {
			this.#inputs[key].remove();
		});
		this.#button.remove();
		this.#parent.removeChild(this.htmlElement);
	}
}
