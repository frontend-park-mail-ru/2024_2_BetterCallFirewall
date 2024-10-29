import { BaseView } from '../views/view';

type Route = {
	path: string;
	view: BaseView;
};

export type RouterConfig = Route[];

export class Router {
	private _config: RouterConfig;
	private _defaultView: BaseView;
	private _activeView?: BaseView;

	constructor(defaultView: BaseView, config: RouterConfig) {
		this._defaultView = defaultView;
		this._config = config;
	}

	goToPage(path: string) {
		for (const route of this._config) {
			const regex = new RegExp(
				// `^${route.path.replace(/:[^\s/]+/, '([\\w-]+)')}$`,
				`^${route.path}$`,
			);
			const match = path.match(regex);
			if (match) {
				if (this._activeView) {
					this._activeView.active = false;
				}

				this._activeView = route.view;
				this._activeView.active = true;

				history.pushState({}, '', path);
				return;
			}
		}
		if (this._activeView) {
			this._activeView.active = false;
		}
		this._activeView = this._defaultView;
		this._activeView.active = true;
	}

	get activeView(): BaseView | undefined {
		return this._activeView;
	}
}
