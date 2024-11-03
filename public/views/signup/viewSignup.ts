import { ACTION_APP_TYPES } from '../../actions/actionApp';
import {
	ActionSignupToLoginClick,
} from '../../actions/actionSignup';
import api from '../../api/api';
import {
	ISignupFormConfig,
	SignupForm,
	Root,
} from '../../components';
import config from '../../config';
import dispatcher from '../../dispatcher/dispatcher';
import Validator from '../../modules/validation';
// import dispatcher from '../../dispatcher/dispatcher';
import { ChangeSignup } from '../../stores/storeSignup';
import { BaseView, Components } from '../view';

export class ViewSignup extends BaseView {
	private _config: ISignupFormConfig;
	private _components: Components = {};

	constructor(config: ISignupFormConfig, root: Root) {
		super(root);
		this._config = config;
	}

	get config() {
		return this._config;
	}

	handleChange(change: ChangeSignup): void {
		switch (change.type) {
			case ACTION_APP_TYPES.actionAppInit:
				this._config = change.data;
				this.render();
				break;
			default:
				this.update(change.data);
		}
	}

	update(data: ISignupFormConfig) {
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

	private _addSignupHandlers() {
		const signupForm = this._components.signup as SignupForm;
		if (!signupForm) {
			throw new Error('login form not found');
		}
		signupForm.addHandler(signupForm.form, 'submit', (event: Event) => {
			event.preventDefault();
			if (this._config.inputs) {
				const validator = new Validator();
				const formData = validator.validateForm(signupForm.formData, signupForm.form);
				if (formData) {
					api.sendForm(config.URL.signup, formData);
				}
				// loginFormSubmit(signupForm);
			}
		});

		const toLoginLink = signupForm.items.toLoginLink;
		signupForm.addHandler(toLoginLink.htmlElement, 'click', (event) => {
			event.preventDefault();
			dispatcher.getAction(new ActionSignupToLoginClick());
		});

		const titleLinkHTML = signupForm.htmlElement.querySelector(
			'.title',
		) as HTMLElement;
		signupForm.addHandler(titleLinkHTML, 'click', (event) => {
			event.preventDefault();
		});
	}
}

// const loginFormSubmit = (
// 	signupForm: SignupForm,
// ) => {
// 	const validator = new Validator();
// 	const form = signupForm.form as HTMLFormElement;
// 	const formData = new FormData(form);
// 	const data = validator.validateForm(formData, signupForm.form);
// 	if (data) {
// 		for (const [key, value] of data.entries()) {
// 			console.log(key, value);
// 		}
// 	}
// 	if (data) {
// 		ajax.sendForm(config.URL.signup, data, async (response, error) => {
// 			if (error) {
// 				dispatcher.getAction(
// 					new ActionFormError('Что-то пошло не так'),
// 				);
// 				return;
// 			}
// 			if (response && response.ok) {
// 				dispatcher.getAction(new ActionSignupClickSuccess());
// 				dispatcher.getAction(new ActionProfileGetHeader());
// 			} else if (response) {
// 				const data = await response.json();
// 				if (data.message === 'wrong email or password') {
// 					dispatcher.getAction(
// 						new ActionFormError('Неверная почта или пароль'),
// 					);
// 				} else {
// 					dispatcher.getAction(
// 						new ActionFormError('Что-то пошло не так'),
// 					);
// 				}
// 			}
// 		});
// 	}
// };
