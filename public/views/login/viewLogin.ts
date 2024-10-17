import { ILoginFormConfig, LoginForm, Root } from "../../components";
import { BaseView, Components, ViewData } from "../view";


export class ViewLogin extends BaseView {
    private _config: ILoginFormConfig;
    private _components: Components = {};

    constructor(config: ILoginFormConfig, root: Root) {
        super(root);
        this._config = config;
        this._root = new Root();
    }

    get config() {
		return this._config;
	}

    update(data: ViewData) {
		this._config = data as ILoginFormConfig;
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
		const login = new LoginForm(config, this._root);
        login.render();
		this._components.login = login;
    }
}