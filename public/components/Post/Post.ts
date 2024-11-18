// import BaseComponent, {
// 	IBaseComponent,
// 	IBaseComponentConfig,
// } from '../BaseComponent';

// export interface IPostConfig extends IBaseComponentConfig {
// 	id: number;
// 	key: string;
// 	avatar: string;
// 	title: string;
// 	text: string;
// 	img?: string;
// 	date: string;
// 	hasDeleteButton: boolean;
// 	hasEditButton: boolean;
// }

// export interface IPost extends IBaseComponent {}

// /**
//  * Class of post
//  */
// export class Post extends BaseComponent implements IPost {
// 	protected _config: IPostConfig;

// 	/**
// 	 * Instance of post
// 	 *
// 	 * @param {IPostConfig} config - post data
// 	 * @param {IBaseComponent} parent - parent element
// 	 */
// 	constructor(config: IPostConfig, parent: IBaseComponent | null) {
// 		super(config, parent);
// 		this._config = config;
// 	}

// 	get config(): IPostConfig {
// 		return this._config;
// 	}

// 	get editButton(): HTMLElement {
// 		const html = this.htmlElement.querySelector(
// 			'.post__header-edit',
// 		) as HTMLElement;
// 		if (!html) {
// 			throw new Error('editButton not found');
// 		}
// 		return html;
// 	}

// 	get deleteButton(): HTMLElement {
// 		const html = this.htmlElement.querySelector(
// 			'.post__header-delete',
// 		) as HTMLElement;
// 		if (!html) {
// 			throw new Error('deleteButton not found');
// 		}
// 		return html;
// 	}

// 	render(show: boolean = true): string {
// 		this._prerender();
// 		const renderResult = this._render('Post.hbs', show);
// 		return renderResult;
// 	}

// 	update(data: IPostConfig): void {
// 		this._config = { ...this._config, ...data };
// 	}
// 	protected _prerender(): void {
// 		super._prerender();
// 		this._templateContext = { ...this.config };
// 	}
// }

import Component, { ComponentConfig } from '../Component';

export interface PostConfig extends ComponentConfig {
	id: number;
	key: string;
	avatar: string;
	title: string;
	text: string;
	img?: string;
	date: string;
	hasDeleteButton: boolean;
	hasEditButton: boolean;
}

/**
 * Class of post
 */
export class Post extends Component {
	protected _config: PostConfig;

	/**
	 * Instance of post
	 *
	 * @param {PostConfig} config - post data
	 * @param {Component} parent - parent element
	 */
	constructor(config: PostConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get config(): PostConfig {
		return this._config;
	}

	// get editButton(): HTMLElement {
	// 	const html = this.htmlElement.querySelector(
	// 		'.post__header-edit',
	// 	) as HTMLElement;
	// 	if (!html) {
	// 		throw new Error('editButton not found');
	// 	}
	// 	return html;
	// }

	// get deleteButton(): HTMLElement {
	// 	const html = this.htmlElement.querySelector(
	// 		'.post__header-delete',
	// 	) as HTMLElement;
	// 	if (!html) {
	// 		throw new Error('deleteButton not found');
	// 	}
	// 	return html;
	// }

	render(): string {
		this._prerender();
		const renderResult = this._render('Post.hbs');
		return renderResult;
	}
}
