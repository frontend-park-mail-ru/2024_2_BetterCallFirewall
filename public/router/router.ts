import { ViewProfile } from '../views/profile/profileView';
import { BaseView } from '../views/view';

type Route = {
	path: string;
	view: BaseView;
};

export type RouterConfig = Route[];

export class Router {
	private _config: RouterConfig;
	private _activeView?: BaseView;

	constructor(config: RouterConfig) {
		this._config = config;
	}

	async goToPage(path: string) {
		for (const route of this._config) {
			const regex = new RegExp(
				`^${route.path.replace(/:[^\s/]+/, '([\\w-]+)')}$`
			);
			const match = path.match(regex);

			if (match) {
				if (this._activeView) {
					this._activeView.active = false;
				}

				this._activeView = route.view;
				this._activeView.active = true;

				if (this._activeView instanceof ViewProfile) {
					const user = match[1];
					this._activeView.setUser(user); // tmp
				}
				break;
			}
		}
	}

	get activeView(): BaseView | null {
		if (this._activeView) {
			return this._activeView;
		}
		return null;
	}
}
