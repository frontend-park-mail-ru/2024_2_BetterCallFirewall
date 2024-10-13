import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';

type Profile = {
	avatar: string;
};

export interface IHeaderConfig extends IBaseComponentConfig {
	profile: Profile;
}

export interface IHeader extends IBaseComponent {}

/**
 * Class of header
 */
export class Header extends BaseComponent implements IHeader {
	/**
	 * Instance of Header
	 *
	 * @param {IHeaderConfig} config
	 * @param {IBaseComponent} parent
	 */
	constructor(config: IHeaderConfig, parent: IBaseComponent) {
		super(config, parent);
	}

	/**
	 * Rendering header with handlebars
	 *
	 * @returns {string} - generated HTML element
	 */
	render(): string {
		const template = Handlebars.templates['Header.hbs'];
		const html = template(this.config);
		if (this.parent) {
			this.parent.htmlElement.innerHTML += html;
		}
		return html;
	}
}
