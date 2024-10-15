import { IHomeConfig } from '../../app';
import {
	IContainerConfig,
	IContentConfig,
	IHeaderConfig,
	IMenuConfig,
	Root,
} from '../../components';
import { BaseView, ViewData } from '../view';

export interface MainConfig {
	key: string;
	className: string;
	section: string;
	header: IHeaderConfig;
	content: IContentConfig;
	aside: IContainerConfig;
}

export interface HomeConfig {
	menu: IMenuConfig;
	main: MainConfig;
}

export class ViewHome extends BaseView {
	private _config: HomeConfig;

	constructor(config: HomeConfig, root: Root) {
		super(root);
		this._config = config;
		this._root = new Root();
	}

	update(data: ViewData) {
		this._config = data as IHomeConfig;
		this.clear();
		this.render();
	}

	clear(): void {
		Object.keys(this._root.children).forEach((key) => {
			this._root.children[key].remove();
		});
	}
	render(): void {
		this.renderMenu();
	}

	private renderMenu() {}
}
