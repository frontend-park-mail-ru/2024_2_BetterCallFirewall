import { ActionPostCommentEdit } from '../../actions/actionPost';
import { groupPageHref, profileHref } from '../../modules/urls';
import { VNode } from '../../modules/vdom';
import Component, { ComponentConfig } from '../Component';
import { Post } from '../Post/Post';

export interface CommentConfig extends ComponentConfig {
	id: number;
	authorId: number;
	communityId: number;
	avatar: string;
	authorName: string;
	createdAt: string;
	text: string;
	hasEditButton: boolean;
	hasDeleteButton: boolean;
}

export class Comment extends Component {
	protected _config: CommentConfig;

	constructor(config: CommentConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get config(): CommentConfig {
		return this._config;
	}

	get editButtonVNode(): VNode {
		return this._findVNodeByClass('comment__edit');
	}

	get deleteButtonVNode(): VNode {
		return this._findVNodeByClass('comment__delete');
	}

	addActionButtonHandlers(post: Post) {
		if (this._config.hasEditButton) {
			this.editButtonVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					const textarea = post.commentTextareaHTML;
					textarea.focus();
					textarea.value = this._config.text;
					this._sendAction(
						new ActionPostCommentEdit(
							post.config.id,
							this._config.id,
						),
					);
				},
			});
		}
	}

	render(): string {
		this._prerender();
		return this._render('Comment.hbs');
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
}
