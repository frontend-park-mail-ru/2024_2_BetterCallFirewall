import { IInputConfig } from '../components/index';
import { validators } from '../config';
export default class Validator {
	/**
	 * Deleting content in elements with class '.error'
	 *
	 * @param {HTMLInputElement} parentElem - parent element of element with class '.error'
	 */
	errorsDelete(parentElem: HTMLElement): void {
		const errors: NodeListOf<HTMLElement> =
			parentElem.querySelectorAll('.form__input-error');
		errors.forEach((error) => (error.textContent = ''));
	}

	static shieldingData(data: string): string {
		return data
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	static validateImg(file: File): string {
		if (!file || !file.name) {
			return '';
		}

		const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
		if (!validImageTypes.includes(file.type)) {
			return 'Разрешены только изображения (JPEG, PNG, GIF, WEBP)';
		}

		const maxSizeInMB = 5;
		const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
		if (file.size > maxSizeInBytes) {
			return `Размер файла не должен превышать ${maxSizeInMB} МБ`;
		}

		return '';
	}

	/**
	 * Validation of password confirmation
	 *
	 * @param {HTMLInputElement} confirm - Confirmation of password
	 * @returns {string} - returns error
	 */
	static validateConfirmation(confirm: string): string {
		const confirmValue = Validator.shieldingData(confirm);
		if (!confirmValue) {
			return 'Пароль не может быть пустым';
		}
		const passwordInput: HTMLInputElement = document.getElementById(
			'password',
		) as HTMLInputElement;
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
	static validatePassword(password: string): string {
		const passwordValue: string = Validator.shieldingData(password);
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

	static validatePost(post: string): string {
		const postValue: string = Validator.shieldingData(post);
		if (postValue.length > 2000) {
			return 'Пост не должен превышать 2000 символов';
		}
		return '';
	}

	/**
	 * Validation of email
	 *
	 * @param {HTMLElement} email
	 * @returns {String} - return error
	 */
	static validateEmail(email: string): string {
		const emailRegex: RegExp = /^[\w-.]+@([\w-]+\.)\w{2,4}$/;
		const emailValue: string = Validator.shieldingData(email);
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
	static validateName(name: string): string {
		const nameValue: string = Validator.shieldingData(name);
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
			const errorElem: HTMLElement = parentElem.querySelector(
				'.form__input-error',
			) as HTMLElement;
			errorElem.textContent = error;
		}
	}

	/**
	 * Config object to array key-value
	 *
	 * @param {Object} config
	 */
	configItems(
		config: Record<string, IInputConfig>,
	): Array<[string, IInputConfig]> {
		return Object.entries(config);
	}

	validateForm(formData: FormData, form: HTMLElement) {
		this.errorsDelete(form.parentNode as HTMLElement);
		let hasErrors = false;

		for (const [key, value] of formData.entries()) {
			let updatedValue = value;
			let error: string = '';
			if (typeof value === 'string') {
				updatedValue = value.trim();
			}
			const validator = validators[key];
			if (validator) {
				error = validator(updatedValue);
				if (error) {
					this.printError(
						form.querySelector(`[name="${key}"]`)
							?.parentElement as HTMLInputElement,
						error,
					);
					hasErrors = true;
				} else {
					formData.set(key, updatedValue);
				}
			}
		}

		if (hasErrors) {
			return null;
		}
		return formData;
	}
}
