import { Input } from '../config.ts'
export default class Validator {
	/**
	 * Deleting content in elements with class '.error'
	 *
	 * @param {HTMLInputElement} parentElem - parent element of element with class '.error'
	 */
	errorsDelete(parentElem: HTMLElement): void {
		const errors: NodeListOf<HTMLElement> = parentElem.querySelectorAll('.error');
		errors.forEach((error) => (error.textContent = ''));
	}

	/**
	 * Validation of password confirmation
	 *
	 * @param {HTMLInputElement} confirm - Confirmation of password
	 * @returns {string} - returns error
	 */
	static validateConfirmation(confirm: HTMLInputElement): string {
		const confirmValue = confirm.value;
		if (!confirmValue) {
			return 'Пароль не может быть пустым';
		}
        const passwordInput: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
		const password: string = passwordInput?.value;
		if (confirmValue !== password) {
			return 'Пароли не совпадают';
		}
		return '';
	}

	/**
	 * Validation of password
	 *
	 * @param {HTMLElement} password
	 * @returns {String} - return error
	 */
	static validatePassword(password: HTMLInputElement): string {
		const passwordValue: string = password.value;
		if (!passwordValue) {
			return 'Пароль не может быть пустым';
		}
		if (passwordValue.length < 6) {
			return 'Пароль должен содержать как минимум 6 символов.';
		}
		if (passwordValue.length > 72) {
			return 'Пароль должен содержать не более 72 символов';
		}
		return '';
	}

	/**
	 * Validation of email
	 *
	 * @param {HTMLElement} email
	 * @returns {String} - return error
	 */
	static validateEmail(email: HTMLInputElement): string {
		const emailRegex: RegExp = /^[\w-.]+@([\w-]+\.)\w{2,4}$/;
		const emailValue: string = email.value.trim();
		if (!emailValue) {
			return 'Email не может быть пустым';
		}

		if (!emailRegex.test(emailValue)) {
			return 'Некорректный email';
		}

		return '';
	}

	/**
	 * Validation of name
	 *
	 * @param {HTMLElement} name
	 * @returns {String} - return error
	 */
	static validateName(name: HTMLInputElement): string {
		const nameValue: string = name.value.trim();
		if (!nameValue) {
			return 'Поле не может быть пустым';
		}
		if (nameValue.length < 3) {
			return 'Поле должно содержать не менее 3 символов.';
		} else if (nameValue.length > 20) {
			return 'Поле должно содержать не более 20 символов.';
		}
		return '';
	}

	/**
	 * Printing error under input in page
	 *
	 * @param {HTMLInputElement} parentElem
	 * @param {String} error - value to print
	 */
	printError(parentElem: HTMLInputElement, error: string): void {
		if (error) {
            const errorElem: HTMLElement = parentElem.querySelector('.error') as HTMLElement;
			errorElem.textContent = error;
		}
	}

	/**
	 * Config object to array key-value
	 *
	 * @param {Object} config
	 */
	configItems(config: Record<string, Input>): Array<[string, any]> {
		return Object.entries(config);
	}

	/**
	 * Validation based on config
	 *
	 * @param {Object} config
	 * @param {HTMLElement} form
	 * @returns {Object|null} - correct data
	 */
	validateForm(config: Record<string, Input>, form: HTMLElement): any {
		const data = {};
		let isValid: boolean = true;
		this.errorsDelete(form.parentNode as HTMLElement);

		const inputs = this.configItems(config);
		inputs.forEach(([, value]) => {
			const input: HTMLInputElement = form.querySelector(`#${value.name}`) as HTMLInputElement;
			data[input.name] = input.value.trim();

			const validator: (name: HTMLElement) => string = value.validator;
			const error: string = validator(input);
			if (error) {
				isValid = false;
			}
			this.printError(input.parentNode as HTMLInputElement, error);
		});

		if (!isValid) {
			return null;
		}
		return data;
	}
}
