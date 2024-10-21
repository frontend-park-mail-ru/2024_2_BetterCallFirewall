import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';

export interface IPostConfig extends IBaseComponentConfig {
	id: number;
	title: string;
	text: string;
	date: string;
}

export interface IPost extends IBaseComponent {}

/**
 * Class of post
 */
export class Post extends BaseComponent implements IPost {
	protected _config: IPostConfig | null;

	/**
	 * Instance of post
	 *
	 * @param {IPostConfig} config - post data
	 * @param {IBaseComponent} parent - parent element
	 */
	constructor(config: IPostConfig, parent: IBaseComponent) {
		super(config, parent);
		this._config = config;
	}

	/**
	 * Post rendering with handlebars
	 *
	 * @returns {string} - generated HTML code
	 */
	render(): string {
		const template = Handlebars.templates['Post.hbs'];
		const html = template(this._config);
		if (this._parent) {
			this._parent.htmlElement.insertAdjacentHTML('beforeend', html);
		}
		return html;
	}

	update(data: IPostConfig): void {
		this._config = { ...this._config, ...data };
	}
}
