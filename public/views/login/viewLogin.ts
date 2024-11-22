import { ACTION_APP_TYPES, ActionAppGoTo } from '../../actions/actionApp';
import { ActionFormError } from '../../actions/actionForm';
import { ActionUserAuth } from '../../actions/actionUser';
import { ILoginFormConfig, LoginForm, Root } from '../../components';
import config, { PAGE_LINKS, validators } from '../../config';
import dispatcher from '../../dispatcher/dispatcher';
import ajax from '../../modules/ajax';
import Validator from '../../modules/validation';
import { update } from '../../modules/vdom';
import { ChangeLogin } from '../../stores/storeLogin';
import { Components, View } from '../view';

export type ComponentsLogin = {
	login?: LoginForm;
} & Components;

export class ViewLogin extends View {
	private _config: ILoginFormConfig;
	private _components: ComponentsLogin = {};

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
			case ACTION_APP_TYPES.goTo:
				this._config = change.data;
				this.render();
				break;
			default:
				this.updateViewLogin(change.data);
		}
	}

	updateViewLogin(data: ILoginFormConfig) {
		this._config = data;
		this._render();
	}

	render() {
		this._render();
	}

	protected _render() {
		const rootNode = this._root.node;

		this._root.removeChildren();
		this._components.login = new LoginForm(this._config, this._root);
		const rootVNode = this._root.newVNode();
		this._addLoginHandlers();

		update(rootNode, rootVNode);
	}

	private _addLoginHandlers() {
		const loginForm = this._components.login;
		if (!loginForm) {
			throw new Error('login form not found');
		}
		loginForm.formVNode.handlers.push({
			event: 'submit',
			callback: (event) => {
				event.preventDefault();
				if (this._config.inputs) {
					loginFormSubmit(loginForm);
				}
			},
		});
		loginForm.toSingupLinkVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				this.sendAction(new ActionAppGoTo(PAGE_LINKS.signup));
			},
		});
		loginForm.titleLinkVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
			},
		});

		this.inputFieldHandler(loginForm);
	}

	private inputFieldHandler(loginForm: LoginForm) {
		loginForm.textInputFieldsVNodes.forEach((input) => {
			input.handlers.push({
				event: 'input',
				callback: (event) => {
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
				},
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
			dispatcher.getAction(new ActionAppGoTo(PAGE_LINKS.feed));
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
