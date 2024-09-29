export default class Validator {
	/**
	 * Deleting content in elements with class '.error'
	 * 
	 * @param {HTMLElement} parentElem - parent element of element with class '.error'
	 */
	errorsDelete (parentElem) {
		const errors = parentElem.querySelectorAll('.error');
		errors.forEach((error) => (error.textContent = ''));
	};

	/**
	 * Validation of password confirmation
	 * 
	 * @param {HTMLElement} confirm - Confirmation of password
	 * @returns {string} - returns error
	 */
	 static validateConfirmation (confirm) {
		const confirmValue = confirm.value;
		if (!confirmValue) {
			return 'Пароль не может быть пустым';
		}
		const password = document.getElementById('password').value;
		if (confirmValue !== password) {
			return 'Пароли не совпадают';
		}
		return '';
	};

	/**
	 * Validation of password
	 * 
	 * @param {HTMLElement} password 
	 * @returns {String} - return error
	 */
	 static validatePassword (password) {
		const passwordValue = password.value;
		if (!passwordValue) {
			return 'Пароль не может быть пустым';
		}
		if (passwordValue.length < 6) {
			return 'Слишком маленькая длина пароля';
		}
		return '';
	};

	/**
	 * Validation of email
	 * 
	 * @param {HTMLElement} email 
	 * @returns {String} - return error
	 */
	 static validateEmail (email) {
		const emailRegex = /^[\w-.]+@([\w-]+\.)\w{2,4}$/;
		const emailValue = email.value.trim();
		if (!emailValue) {
			return 'Email не может быть пустым';
		}

		if (!emailRegex.test(emailValue)) {
			return 'Не корректный email';
		}

		return '';
	};

	/**
	 * Validation of name
	 * 
	 * @param {HTMLElement} name 
	 * @returns {String} - return error
	 */
	 static validateName (name) {
		const nameValue = name.value.trim();
		if (!nameValue) {
			return 'Поле не может быть пустым';
		}
		if (nameValue.length < 3) {
			return 'Поле должно содержать не менее 3 символов.';
		} else if (nameValue.length > 20) {
			return 'Поле должно содержать не более 20 символов.';
		}
		return '';
	};

	/**
	 * Printing error under input in page
	 * 
	 * @param {HTMLInputElement} parentElem 
	 * @param {String} error - value to print
	 */
	 printError (parentElem, error) {
		if (error) {
			parentElem.querySelector('.error').textContent = error;
		}
	};

	/**
	 * Config object to array key-value
	 * 
	 * @param {Object} config 
	 */
	configItems (config) {
		return Object.entries(config);
	};

	/**
	 * Validation based on config
	 * 
	 * @param {Object} config 
	 * @param {HTMLElement} form 
	 * @returns {Object|null} - correct data
	 */
	 validateForm (config, form) {
		const data = {};
		let isValid = true;
		this.errorsDelete(form.parentNode);

		const inputs = this.configItems(config);
		inputs.forEach(([key, value]) => {
			const input = form.querySelector(`#${value.name}`);
			data[input.name] = input.value.trim();

			const validator = value.validator;
			const error = validator(input);
			if (error) {
				isValid = false;
			}
			this.printError(input.parentNode, error);
		});

		if (!isValid) {
			return null;
		}
		return data;
	};

}