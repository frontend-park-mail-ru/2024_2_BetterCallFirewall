import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';

export interface IPostConfig extends IBaseComponentConfig {
	title: string;
	text: string;
	date: string;
}

export interface IPost extends IBaseComponent {}

/**
 * Class of post
 */
export class Post extends BaseComponent implements IPost {
	protected config: IPostConfig | null;

	/**
	 * Instance of post
	 *
	 * @param {IPostConfig} config - post data
	 * @param {IBaseComponent} parent - parent element
	 */
	constructor(config: IPostConfig, parent: IBaseComponent) {
		super(config, parent);
		this.config = config;
	}

	/**
	 * Post rendering with handlebars
	 *
	 * @returns {string} - generated HTML code
	 */
	render(): string {
		const template = Handlebars.templates['Post.hbs'];
		const html = template(this.config);
		if (this.parent) {
			this.parent.htmlElement.insertAdjacentHTML('beforeend', html);
		}
		return html;
	}
}
