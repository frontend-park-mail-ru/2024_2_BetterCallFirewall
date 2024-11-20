import { ACTION_APP_TYPES, ActionAppGoTo } from '../../actions/actionApp';
import { ActionFormError } from '../../actions/actionForm';
import { ActionProfileGetHeader } from '../../actions/actionProfile';
import { ActionUserAuth } from '../../actions/actionUser';
import { SignupFormConfig, SignupForm, Root } from '../../components';
import config, { PAGE_LINKS, validators } from '../../config';
import dispatcher from '../../dispatcher/dispatcher';
import { ERROR_MESSAGES_MAP } from '../../models/errorMessages';
import ajax from '../../modules/ajax';
import Validator from '../../modules/validation';
import { update } from '../../modules/vdom';
import { ChangeSignup } from '../../stores/storeSignup';
import { Components, View } from '../view';

export class ViewSignup extends View {
	private _config: SignupFormConfig;
	private _components: Components = {};

	constructor(config: SignupFormConfig, root: Root) {
		super(root);
		this._config = config;
	}

	get config(): SignupFormConfig {
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

	updateViewSignup(data: SignupFormConfig) {
		this._config = data;
		this._render();
	}

	render() {
		this._render();
	}

	_render() {
		const rootNode = this._root.node;
		this._root.clear();
		this._components.signup = new SignupForm(this._config, this._root);

		const rootVNode = this._root.newVNode();

		this._addSignupHandlers();

		update(rootNode, rootVNode);
	}

	private get signupForm(): SignupForm {
		const signupForm = this._components.signup as SignupForm;
		if (!signupForm) {
			throw new Error('login form not found');
		}
		return signupForm;
	}

	private _addSignupHandlers() {
		this.signupForm.formVNode.handlers.push({
			event: 'submit',
			callback: (event) => {
				event.preventDefault();
				if (this._config.inputs) {
					loginFormSubmit(this.signupForm);
				}
			},
		});
		this.signupForm.toLoginLinkVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				this.sendAction(new ActionAppGoTo(PAGE_LINKS.login));
			},
		});
		this.signupForm.titleLinkVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
			},
		});
		this.inputFieldHandler(this.signupForm);
	}

	private inputFieldHandler(signupForm: SignupForm) {
		const inputFields = signupForm.textInputFieldsVNodes;
		inputFields.forEach((input) => {
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
				const error = ERROR_MESSAGES_MAP[data.message];
				if (error) {
					dispatcher.getAction(new ActionFormError(error));
				} else {
					dispatcher.getAction(
						new ActionFormError('Что-то пошло не так'),
					);
				}
			}
		});
	}
};
