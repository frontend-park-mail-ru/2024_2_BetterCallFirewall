import Input from '../Input/Input.js';
import FormButton from '../FormButton/FormButton.js';
import {validateForm} from '../../modules/validation.js';


export default class LoginForm {
	#config = {};
	#configInputs;
	#configButton;
	#inputs = [];
	#parent;
	#className;
<<<<<<< HEAD
	#button;
=======
	#id;
>>>>>>> dev
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
		this.#id = 'formLogin';
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
	get submitButton() {
		return this.#button;
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
		validateForm(this.#configInputs, form);

		return html;
	}
	remove() {
		Object.keys(this.#inputs).forEach((key) => {
			this.#inputs[key].remove();
		});
		this.#button.remove();
		this.#parent.removeChild(this.htmlElement);
	}
}
