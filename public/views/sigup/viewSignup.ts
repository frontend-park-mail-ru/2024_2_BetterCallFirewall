import { ISignupFormConfig, SignupForm, Root } from '../../components';
import { BaseView, Components, ViewData } from '../view';

export class ViewSignup extends BaseView {
	private _config: ISignupFormConfig;
	private _components: Components = {};

	constructor(config: ISignupFormConfig, root: Root) {
		super(root);
		this._config = config;
		this._root = new Root();
	}

	get config() {
		return this._config;
	}

	update(data: ViewData) {
		this._config = data as ISignupFormConfig;
		this.clear();
		this.render();
	}

	clear(): void {
		Object.keys(this._root.children).forEach((key) => {
			this._root.children[key].remove();
		});
	}

	render() {
		const config = this._config;
		const login = new SignupForm(config, this._root);
		login.render();
		this._components.login = login;
	}
}
