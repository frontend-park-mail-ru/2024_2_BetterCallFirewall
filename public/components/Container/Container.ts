import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';

export interface IContainerConfig extends IBaseComponentConfig {
	className: string;
}

export interface IContainer extends IBaseComponent {}

/**
 * class of Container
 */
export class Container extends BaseComponent implements IContainer {
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
		const template = Handlebars.templates['Container.hbs'];
		const html = template(this._config);
		if (this.parent) {
			this.parent.htmlElement.insertAdjacentHTML('beforeend', html);
		}
		return html;
	}

	update(data: IContainerConfig): void {
		this._config = data;
	}
}
