import { ACTION_APP_TYPES, ActionAppGoTo } from '../../actions/actionApp';
import { ActionFormError } from '../../actions/actionForm';
import { ActionProfileGetHeader } from '../../actions/actionProfile';
import { ActionUserAuth } from '../../actions/actionUser';
import { ISignupFormConfig, SignupForm, Root } from '../../components';
import config, { PAGE_LINKS, validators } from '../../config';
import dispatcher from '../../dispatcher/dispatcher';
import ajax from '../../modules/ajax';
import Validator from '../../modules/validation';
import { ChangeSignup } from '../../stores/storeSignup';
import { BaseView, Components } from '../view';

export class ViewSignup extends BaseView {
	private _config: ISignupFormConfig;
	private _components: Components = {};

	constructor(config: ISignupFormConfig, root: Root) {
		super(root);
		this._config = config;
	}

	get config(): ISignupFormConfig {
		return this._config;
	}

	handleChange(change: ChangeSignup): void {
		switch (change.type) {
			case ACTION_APP_TYPES.actionAppInit:
			case ACTION_APP_TYPES.goTo:
				this._config = change.data;
				this.render();
				break;
			default:
				this.updateViewSignup(change.data);
		}
	}

	updateViewSignup(data: ISignupFormConfig) {
		this._config = data;
		this.render();
	}

	render() {
		this.clear();

		const config = this._config;
		const signupForm = new SignupForm(config, this._root);
		signupForm.render();
		this._components.signup = signupForm;
		this._addSignupHandlers();
	}

	update(config: object): void {
		this.updateViewSignup(config as ISignupFormConfig);
	}

	private _addSignupHandlers() {
		const signupForm = this._components.signup as SignupForm;
		if (!signupForm) {
			throw new Error('login form not found');
		}
		signupForm.addHandler(signupForm.form, 'submit', (event: Event) => {
			event.preventDefault();
			if (this._config.inputs) {
				loginFormSubmit(signupForm);
			}
		});

		const toLoginLink = signupForm.items.toLoginLink;
		signupForm.addHandler(toLoginLink.htmlElement, 'click', (event) => {
			event.preventDefault();
			this.sendAction(new ActionAppGoTo(PAGE_LINKS.signup));
		});

		const titleLinkHTML = signupForm.htmlElement.querySelector(
			'.title',
		) as HTMLElement;
		signupForm.addHandler(titleLinkHTML, 'click', (event) => {
			event.preventDefault();
		});

		this.inputFieldHandler(signupForm);
	}

	private inputFieldHandler(signupForm: SignupForm) {
		const inputFields = document.querySelectorAll('input, textarea');
		inputFields.forEach((input) => {
			signupForm.addHandler(input as HTMLElement, 'input', (event) => {
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

const loginFormSubmit = (signupForm: SignupForm) => {
	const validator = new Validator();
	const data = validator.validateForm(signupForm.formData, signupForm.form);
	if (!data) {
		return;
	}
	Object.entries(signupForm.config.inputs).forEach(([, input]) => {
		if (input.type !== 'password') {
			input.text = data.get(input.name)?.toString();
		}
	});
	if (data) {
		ajax.sendForm(config.URL.signup, data, async (response, error) => {
			if (error) {
				dispatcher.getAction(
					new ActionFormError('Что-то пошло не так'),
				);
				return;
			}
			if (response && response.ok) {
				dispatcher.getAction(new ActionUserAuth());
				dispatcher.getAction(new ActionProfileGetHeader());
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
	}
};
