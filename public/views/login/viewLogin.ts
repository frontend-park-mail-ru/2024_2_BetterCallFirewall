import { ACTION_APP_TYPES } from '../../actions/actionApp';
import {
	ActionLoginToSignupClick,
} from '../../actions/actionLogin';
import api from '../../api/api';
import {
	ILoginFormConfig,
	LoginForm,
	Root,
} from '../../components';
import config from '../../config';
import dispatcher from '../../dispatcher/dispatcher';
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

	get config() {
		return this._config;
	}

	handleChange(change: ChangeLogin): void {
		console.log('change:', change);
		switch (change.type) {
			case ACTION_APP_TYPES.actionAppInit:
				this._config = change.data;
				this.render();
				break;
			default:
				this.update(change.data);
		}
	}

	update(data: ILoginFormConfig) {
		this._config = data;
		this.render();
	}

	render() {
		console.log('ViewLogin: render');
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
			if (this._config.inputs) {
				const validator = new Validator();
				const formData = validator.validateForm(loginForm.formData, loginForm.form);
				if (formData) {
					api.sendForm(config.URL.login, formData);
				}
			}
		});

		const toSignupLink = loginForm.items.toSignupLink;
		loginForm.addHandler(toSignupLink.htmlElement, 'click', (event) => {
			event.preventDefault();
			dispatcher.getAction(new ActionLoginToSignupClick());
		});

		const titleLinkHTML = loginForm.htmlElement.querySelector(
			'.title',
		) as HTMLElement;
		loginForm.addHandler(titleLinkHTML, 'click', (event) => {
			event.preventDefault();
		});
	}
}
