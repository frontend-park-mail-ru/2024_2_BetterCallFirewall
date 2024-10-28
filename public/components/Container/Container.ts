import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';

export interface IContainerConfig extends IBaseComponentConfig {
	className: string;
}

/**
 * class of Container
 */
export class Container extends BaseComponent {
	/**
	 * Instance of Container
	 *
	 * @param {IContainerConfig} config
	 * @param {IBaseComponent} parent
	 */
	constructor(config: IContainerConfig, parent: IBaseComponent) {
		super(config, parent);
	}

	/**
	 * Rendering Container with handlebars
	 *
	 * @returns {string} - generated HTML element
	 */
	render(): string {
		this._prerender();
		return this._render('Container.hbs');
	}

	update(data: IContainerConfig): void {
		this._config = data;
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = { ...this._config };
	}
}
