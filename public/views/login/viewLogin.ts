import { ActionLoginToSignupClick } from '../../actions/actionLogin';
import { ActionLoginClickSuccess } from '../../actions/actionUser';
import app from '../../app';
import {
	IInputConfig,
	ILoginFormConfig,
	LoginForm,
	Root,
} from '../../components';
import config, { PAGE_LINKS } from '../../config';
import dispatcher from '../../dispatcher/dispatcher';
// import dispatcher from '../../dispatcher/dispatcher';
import ajax from '../../modules/ajax';
import Validator from '../../modules/validation';
import { BaseView, Components, ViewData } from '../view';

export class ViewLogin extends BaseView {
	private _config: ILoginFormConfig;
	private _components: Components = {};

	constructor(config: ILoginFormConfig, root: Root) {
		super(root);
		this._config = config;
		// this._root = new Root();
	}

	get config() {
		return this._config;
	}

	update(data: ViewData) {
		this._config = data as ILoginFormConfig;
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

	private _addLoginHandlers() {
		const loginForm = this._components.login as LoginForm;
		if (!loginForm) {
			throw new Error('login form not found');
		}
		loginForm.addHandler(loginForm.form, 'submit', (event: Event) => {
			event.preventDefault();
			loginFormSubmit(loginForm, this._config.inputs);
		});

		const toSignupLink = loginForm.items.toSignupLink;
		loginForm.addHandler(toSignupLink.htmlElement, 'click', (event) => {
			event.preventDefault();
			dispatcher.getAction(new ActionLoginToSignupClick());
		});

		const titleLinkHTML = loginForm.htmlElement.querySelector(
			'.title-link',
		) as HTMLElement;
		loginForm.addHandler(titleLinkHTML, 'click', (event) => {
			event.preventDefault();
		});
	}
}

const loginFormSubmit = (
	loginForm: LoginForm,
	inputs: Record<string, IInputConfig>,
) => {
	const validator = new Validator();
	const data = validator.validateForm(inputs, loginForm.form);
	if (data) {
		ajax.sendForm(config.URL.login, data, async (response, error) => {
			if (error) {
				loginForm.printError('Что-то пошло не так');
				return;
			}
			if (response && response.ok) {
				app.router.goToPage(PAGE_LINKS.feed);
				dispatcher.getAction(new ActionLoginClickSuccess());
			} else if (response) {
				const data = await response.json();
				if (data.message === 'wrong email or password') {
					loginForm.printError('Неверная почта или пароль');
				} else {
					loginForm.printError('Что-то пошло не так');
				}
			}
		});
	}
};
