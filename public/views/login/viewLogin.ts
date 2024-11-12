import { ACTION_APP_TYPES, ActionAppGoTo } from '../../actions/actionApp';
import { ActionFormError } from '../../actions/actionForm';
import { ActionUserAuth } from '../../actions/actionUser';
import { ILoginFormConfig, LoginForm, Root } from '../../components';
import config, { PAGE_LINKS, validators } from '../../config';
import dispatcher from '../../dispatcher/dispatcher';
import ajax from '../../modules/ajax';
import Validator from '../../modules/validation';
import { ChangeLogin } from '../../stores/storeLogin';
import { BaseView, Components } from '../view';

export class ViewLogin extends BaseView {
	private _config: ILoginFormConfig;
	private _components: Components = {};

	constructor(config: ILoginFormConfig, root: Root) {
		super(root);
		this._config = config;
	}

	get config(): ILoginFormConfig {
		return this._config;
	}

	handleChange(change: ChangeLogin): void {
		switch (change.type) {
			case ACTION_APP_TYPES.actionAppInit:
				this._config = change.data;
				this.render();
				break;
			default:
				this.updateViewLogin(change.data);
		}
	}

	updateViewLogin(data: ILoginFormConfig) {
		this._config = data;
		this.render();
	}

	render() {
		this.clear();

		const config = this._config;
		const login = new LoginForm(config, this._root);
		login.render();
		this._components.login = login;
		this._addLoginHandlers();
	}

	update(config: object): void {
		this.updateViewLogin(config as ILoginFormConfig);
	}

	private _addLoginHandlers() {
		const loginForm = this._components.login as LoginForm;
		if (!loginForm) {
			throw new Error('login form not found');
		}
		loginForm.addHandler(loginForm.form, 'submit', (event: Event) => {
			event.preventDefault();
			if (this._config.inputs) {
				loginFormSubmit(loginForm);
			}
		});

		const toSignupLink = loginForm.items.toSignupLink;
		loginForm.addHandler(toSignupLink.htmlElement, 'click', (event) => {
			event.preventDefault();
			this.sendAction(new ActionAppGoTo(PAGE_LINKS.signup));
		});

		const titleLinkHTML = loginForm.htmlElement.querySelector(
			'.title',
		) as HTMLElement;
		loginForm.addHandler(titleLinkHTML, 'click', (event) => {
			event.preventDefault();
		});

		this.inputFieldHandler(loginForm);
	}

	private inputFieldHandler(loginForm: LoginForm) {
		const inputFields = document.querySelectorAll('input, textarea');
		inputFields.forEach((input) => {
			loginForm.addHandler(input as HTMLElement, 'input', (event) => {
				const target = event.target as HTMLInputElement;
				const parentElem = target.parentElement as HTMLElement;

				const validator = validators[target.name];
				let error = '';

				if (validator) {
					if (
						target.type === 'file' &&
						target.files &&
						target.files[0]
					) {
						error = validator(target.files[0]);
					} else {
						error = validator(target.value.trim());
					}
				}

				const valid = new Validator();
				if (error) {
					valid.printError(parentElem as HTMLInputElement, error);
				} else {
					valid.errorsDelete(parentElem);
				}
			});
		});
	}
}

const loginFormSubmit = (loginForm: LoginForm) => {
	const validator = new Validator();
	const data = validator.validateForm(loginForm.formData, loginForm.form);
	if (!data) {
		return;
	}
	Object.entries(loginForm.config.inputs).forEach(([, input]) => {
		if (input.type !== 'password') {
			input.text = data.get(input.name)?.toString();
		}
	});
	ajax.sendForm(config.URL.login, data, async (response, error) => {
		if (error) {
			dispatcher.getAction(new ActionFormError('Что-то пошло не так'));
			return;
		}
		if (response && response.ok) {
			dispatcher.getAction(new ActionUserAuth());
		} else if (response) {
			const data = await response.json();
			if (data.message === 'wrong email or password') {
				dispatcher.getAction(
					new ActionFormError('Неверная почта или пароль'),
				);
			} else {
				dispatcher.getAction(
					new ActionFormError('Что-то пошло не так'),
				);
			}
		}
	});
};
