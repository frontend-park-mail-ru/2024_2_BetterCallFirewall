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

	render(show: boolean = true): string {
		this._prerender();
		return this._render('Post.hbs', show);
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = { ...this.config };
	}
}
