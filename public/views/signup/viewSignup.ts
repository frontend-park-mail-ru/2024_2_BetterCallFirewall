import {
	ActionFormError,
	ActionSignupClickSuccess,
} from '../../actions/actionUser';
import app from '../../app';
import {
	ISignupFormConfig,
	SignupForm,
	Root,
	IInputConfig,
} from '../../components';
import config, { PAGE_LINKS } from '../../config';
import dispatcher from '../../dispatcher/dispatcher';
// import dispatcher from '../../dispatcher/dispatcher';
import ajax from '../../modules/ajax';
import Validator from '../../modules/validation';
import { BaseView, Components, ViewData } from '../view';

export class ViewSignup extends BaseView {
	private _config: ISignupFormConfig;
	private _components: Components = {};

	constructor(config: ISignupFormConfig, root: Root) {
		super(root);
		this._config = config;
		// this._root = new Root();
	}

	get config() {
		return this._config;
	}

	update(data: ViewData) {
		this._config = data as ISignupFormConfig;
		// this.clear();
		this.render();
	}

	render() {
		this.clear();

		const config = this._config;
		const login = new SignupForm(config, this._root);
		login.render();
		this._components.login = login;
		this._addSignupHandlers();
	}

	private _addSignupHandlers() {
		const signupForm = this._components.login as SignupForm;
		if (!signupForm) {
			throw new Error('login form not found');
		}
		signupForm.addHandler(signupForm.form, 'submit', (event: Event) => {
			event.preventDefault();
			loginFormSubmit(signupForm, this._config.inputs);
		});
	}
}

const loginFormSubmit = (
	signupForm: SignupForm,
	inputs: Record<string, IInputConfig>,
) => {
	const validator = new Validator();
	const data = validator.validateForm(inputs, signupForm.form);
	if (data) {
		ajax.sendForm(config.URL.signup, data, async (response, error) => {
			if (error) {
				dispatcher.getAction(
					new ActionFormError('Что-то пошло не так'),
				);
				return;
			}
			if (response && response.ok) {
				app.router.goToPage(PAGE_LINKS.feed);
				dispatcher.getAction(new ActionSignupClickSuccess());
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
