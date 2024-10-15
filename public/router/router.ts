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
		console.log('path:', path);
		for (const route of this._config) {
			console.log('route:', route);
			if (path === route.path) {
				console.log('correct path');
				this._activeView = route.view;
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
