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

	goToPage(path: string) {
		for (const route of this._config) {
			if (path === route.path) {
				if (this._activeView) {
					this._activeView.active = false;
				}
				this._activeView = route.view;
				this._activeView.active = true;

				history.pushState({}, '', path);
				// this._activeView.render(); // ??
				break;
			}
		}
	}

	get activeView(): BaseView | undefined {
		return this._activeView;
	}
}
