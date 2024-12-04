import Component, { ComponentConfig } from '../Component';

export interface CommentConfig extends ComponentConfig {
	authorId: number;
	avatar: string;
	authorName: string;
	createdAt: string;
	text: string;
}

export class Comment extends Component {
	protected _config: CommentConfig;

	constructor(config: CommentConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	render(): string {
		this._prerender();
		return this._render('Comment.hbs');
	}
}
