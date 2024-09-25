import Input from '../Input/Input.js';
import FormButton from '../FormButton/FormButton.js';

export default class LoginForm {
	#configInputs;
	#configButton;
	#inputs = [];
	#parent;
	#className;
	/**
	 *
	 * @param {Object} config
	 * @param {HTMLElement} parent
	 */
	constructor(configInputs, configButton, parent) {
		this.#configInputs = configInputs;
		this.#configButton = configButton;
		this.#parent = parent;
		this.#className = 'form';
	}
	get configInputsItems() {
		return Object.entries(this.#configInputs);
	}
	
	render() {
		this.configInputsItems.forEach(([key, value]) => {
			const input = new Input({key, ...value});
			this.#inputs.push(input);
		});
		const button = new FormButton(this.#configButton.text);

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
}
