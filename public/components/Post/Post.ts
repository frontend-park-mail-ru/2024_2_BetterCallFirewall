import { ActionCommentCreate } from '../../actions/actionComment';
import { ActionPostLike, ActionPostUnlike } from '../../actions/actionPost';
import { CommentPayload } from '../../models/comment';
import { throttle } from '../../modules/throttle';
import { findVNodeByClass, VNode } from '../../modules/vdom';
import { Comment, CommentConfig } from '../Comment/Comment';
import Component, { ComponentConfig } from '../Component';

export interface PostConfig extends ComponentConfig {
	id: number;
	groupId?: number;
	key: string;
	avatar: string;
	title: string;
	text: string;
	img?: string;
	date: string;
	hasDeleteButton: boolean;
	hasEditButton: boolean;
	likes: number;
	likedByUser: boolean;
	authorHref: string;
	commentsConfigs: CommentConfig[];
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

	get editButtonVNode(): VNode {
		const vnode = findVNodeByClass(this.vnode, 'post__header-edit');
		if (!vnode) {
			throw new Error('editButton vnode not found');
		}
		return vnode;
	}

	get deleteButtonVNode(): VNode {
		const vnode = findVNodeByClass(this.vnode, 'post__header-delete');
		if (!vnode) {
			throw new Error('deleteButton vnode not found');
		}
		return vnode;
	}

	get likeButtonVNode(): VNode {
		return this._findVNodeByClass('post__like-button');
	}

	get authorLinkVNode(): VNode {
		return this._findVNodeByClass('post__author-link');
	}

	get commentFormVNode(): VNode {
		return this._findVNodeByKey('comment-form');
	}

	get commentTextareaVNode(): VNode {
		return this._findVNodeByKey('comment-textarea');
	}

	get commentTextareaHTML(): HTMLTextAreaElement {
		return this._findHTML(
			`[data-key=${this._config.key}] [data-key=comment-textarea]`,
		) as HTMLTextAreaElement;
	}

	addLikeHandler() {
		this.likeButtonVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				this._like();
			},
		});
	}

	addCommentHandlers() {
		this.commentFormVNode.handlers.push({
			event: 'submit',
			callback: (event) => {
				event.preventDefault();
				this._sendComment();
			},
		});
	}

	render(): string {
		this._prerender();
		return this._render('Post.hbs');
	}

	protected _prerender(): void {
		super._prerender();
		const comments = this._config.commentsConfigs.map((config) => {
			return new Comment(config, this);
		});
		this._templateContext = {
			...this._templateContext,
			comments: comments.map((comment) => {
				return comment.render();
			}),
		};
	}

	private _like = throttle(() => {
		if (this._config.likedByUser) {
			this._sendAction(new ActionPostUnlike(this._config.id));
		} else {
			this._sendAction(new ActionPostLike(this._config.id));
		}
	}, 1000);

	private _sendComment() {
		const text = this.commentTextareaHTML.value;
		if (!text) {
			return;
		}
		const commentPayload: CommentPayload = {
			text,
			file: '',
		};
		this._sendAction(
			new ActionCommentCreate(this._config.id, commentPayload),
		);
	}
}
