const errorsDelete = (parentElem) => {
	const errors = parentElem.querySelectorAll('.error');
	errors.forEach((error) => (error.textContent = ''));
};

export const validateConfirmation = (confirm) => {
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

export const validatePassword = (password) => {
	const passwordValue = password.value;
	if (!passwordValue) {
		return 'Пароль не может быть пустым';
	}
	if (passwordValue.length < 6) {
		return 'Слишком маленькая длина пароля';
	}
	return '';
};

export const validateEmail = (email) => {
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

export const validateName = (name) => {
	const nameValue = name.value.trim();
	if (!nameValue) {
		return `${name.text} не может быть пустым`;
	}
	if (nameValue.length < 3) {
		return `${name.text} должно быть не менее 3 символов.`;
	} else if (nameValue.length > 20) {
		return `${name.text} должно быть не более 20 символов.`;
	}
	return '';
};

const printError = (parentElem, error) => {
	if (error) {
		parentElem.querySelector('.error').textContent = error;
	}
};

const configItems = (config) => {
	return Object.entries(config);
};

export const validateForm = (config, form) => {
	const data = {};
	let isValid = true;
	errorsDelete(form.parentNode);

	const inputs = configItems(config);
	inputs.forEach(([key, value]) => {
		const input = form.querySelector(`#${value.name}`);
		data[input.name] = input.value.trim();

		const validator = value.validator;
		const error = validator(input);
		if (error) {
			isValid = false;
		}
		printError(input.parentNode, error);
	});

	if (!isValid) {
		return null;
	}
	return data;
};
