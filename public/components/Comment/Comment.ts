import { groupPageHref, profileHref } from '../../modules/urls';
import Component, { ComponentConfig } from '../Component';

export interface CommentConfig extends ComponentConfig {
	id: number;
	authorId: number;
	communityId: number;
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

	protected _prerender(): void {
		super._prerender();
		const authorHref = this._config.communityId
			? groupPageHref(this._config.communityId)
			: profileHref(this._config.authorId);
		this._templateContext = {
			...this._templateContext,
			authorHref,
		};
	}

	render(): string {
		this._prerender();
		return this._render('Comment.hbs');
	}
}
