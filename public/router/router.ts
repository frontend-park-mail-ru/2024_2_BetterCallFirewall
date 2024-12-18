import { View } from '../views/view';

type Route = {
	path: string;
	view: View;
};

export type RouterConfig = Route[];

export class Router {
	private _config: RouterConfig;
	private _defaultView: View;
	private _activeView?: View;
	private _path: string = '';

	constructor(defaultView: View, config: RouterConfig) {
		this._defaultView = defaultView;
		this._config = config;

		window.onpopstate = () => {
			this._path = location.pathname;
			this.goToPage(this.path, false);
			this.activeView?.render();
		};
	}

	/**
	 * Переключает активную view в соответствии с path
	 * @param path Путь
	 * @param pushState Сохранить в историю
	 */
	goToPage(path: string, pushState: boolean = true) {
		this._path = path;
		for (const route of this._config) {
			const regex = new RegExp(`^${route.path}(/?.*)?$`);
			const match = path.match(regex);
			if (match) {
				if (this._activeView) {
					if (pushState) {
						history.pushState({}, '', path);
					}
					this._activeView.active = false;
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

	get activeView(): View | undefined {
		return this._activeView;
	}

	/**
	 * URL внутри домена (начиная с первого /)
	 */
	get path(): string {
		return this._path;
	}

	/**
	 * Полный URL
	 */
	get href() {
		return window.location.href;
	}

	get chatId(): number | undefined {
		const regex = /^\/chat\/(\d+)$/;
		const match = this.path.match(regex);
		if (match) {
			const id = Number(match[1]);
			return id;
		}
	}

	idFromPath(url: string): number | undefined {
		const regex = new RegExp(`^${url}/(\\d+)$`);
		const match = this.path.match(regex);
		if (match) {
			return Number(match[1]);
		}
	}
}
