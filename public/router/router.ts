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
	private _path: string = '';

	constructor(defaultView: BaseView, config: RouterConfig) {
		this._defaultView = defaultView;
		this._config = config;

		window.onpopstate = (event) => {
			this._path = location.pathname;
			this.goToPage(this.path);
			this.activeView?.update(event.state);
		};
	}

	goToPage(path: string) {
		this._path = path;
		for (const route of this._config) {
			const regex = new RegExp(`^${route.path}$`);
			const match = path.match(regex);
			if (match) {
				if (this._activeView) {
					this._activeView.active = false;
					history.pushState(this._activeView.config, '', path);
				}

				this._activeView = route.view;
				this._activeView.active = true;

				window.scrollTo(0, 0);

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

	get path(): string {
		return this._path;
	}

	get chatId(): number | undefined {
		const regex = /^\/chat\/(\d+)$/;
		const match = this.path.match(regex);
		if (match) {
			const id = Number(match[1]);
			return id;
		}
	}
}
