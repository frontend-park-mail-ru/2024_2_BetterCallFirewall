import { ACTION_APP_TYPES } from '../../actions/actionApp';
import { ActionFormError } from '../../actions/actionForm';
import { ActionProfileGetHeader } from '../../actions/actionProfile';
import {
	ActionSignupClickSuccess,
	ActionSignupToLoginClick,
} from '../../actions/actionSignup';
import {
	ISignupFormConfig,
	SignupForm,
	Root,
} from '../../components';
import config, { validators } from '../../config';
import dispatcher from '../../dispatcher/dispatcher';
// import dispatcher from '../../dispatcher/dispatcher';
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
				loginFormSubmit(signupForm);
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

		this.InputFieldHandler();
	}

	private InputFieldHandler() {
		const inputFields = document.querySelectorAll('input, textarea');
		console.log('input fields handler ', inputFields);
		inputFields.forEach((input) => {
			input.addEventListener('input', (event) => {
			  const target = event.target as HTMLInputElement;
			  const parentElem = target.parentElement as HTMLElement;
			  
			  const validator = validators[target.name];
			  let error = '';
		  
			  if (validator) {
				if (target.type === 'file' && target.files && target.files[0]) {
				  error = validator(target.files[0]);
				} else {
				  error = validator(target.value.trim());
				}
			  }

			  const valid = new Validator();
			  if (error) {
				valid.printError(target, error);
			  } else {
				valid.errorsDelete(parentElem);
			  }
			});
		  });
	}
}

const loginFormSubmit = (
	signupForm: SignupForm,
) => {
	const validator = new Validator();
	const data = validator.validateForm(signupForm.formData, signupForm.form);
	if (data) {
		ajax.sendForm(config.URL.signup, data, async (response, error) => {
			if (error) {
				dispatcher.getAction(
					new ActionFormError('Что-то пошло не так'),
				);
				return;
			}
			if (response && response.ok) {
				dispatcher.getAction(new ActionSignupClickSuccess());
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


