import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';

export interface IPostConfig extends IBaseComponentConfig {
	id: number;
	key: string;
	avatar: string;
	title: string;
	text: string;
	img?: string;
	date: string;
}

export interface IPost extends IBaseComponent {}

/**
 * Class of post
 */
export class Post extends BaseComponent implements IPost {
	protected _config: IPostConfig;

	/**
	 * Instance of post
	 *
	 * @param {IPostConfig} config - post data
	 * @param {IBaseComponent} parent - parent element
	 */
	constructor(config: IPostConfig, parent: IBaseComponent | null) {
		super(config, parent);
		this._config = config;
	}

	get config(): IPostConfig {
		return this._config;
	}

	get editButton(): HTMLElement {
		const html = this.htmlElement.querySelector(
			'.post__header-edit',
		) as HTMLElement;
		if (!html) {
			throw new Error('editButton not found');
		}
		return html;
	}

	render(show: boolean = true): string {
		this._prerender();
		return this._render('Post.hbs', show);
	}

	update(data: IPostConfig): void {
		this._config = { ...this._config, ...data };
	}
	protected _prerender(): void {
		super._prerender();
		this._templateContext = { ...this.config };
	}
}
