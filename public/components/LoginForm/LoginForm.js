import Input from '../Input/Input.js';
import FormButton from '../FormButton/FormButton.js';
import Ajax from '../../modules/ajax.js';
import {validateForm} from '../../modules/validation.js';


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
	 *
	 * @param {Object} config
	 * @param {HTMLElement} parent
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
	get configInputsItems() {
		return Object.entries(this.#configInputs);
	}
	get htmlElement() {
		return this.#parent.querySelector(
			`div[data-section="${this.#config.section}"]`,
		);
	}
	/**
	 * @returns {FormButton}
	 */

	get form() {
		return this.#id;
	}
	/**
	 * @returns {FormData}
	 */
	get formData() {
		return new FormData(
			this.#parent.querySelector(`form.${this.#className}`),
		);
	}
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
					console.log('response:', response);
					console.log('error:', error);
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
