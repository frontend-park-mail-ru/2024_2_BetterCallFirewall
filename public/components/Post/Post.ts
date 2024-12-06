import {
	ActionCommentCreate,
	ActionCommentEdit,
	ActionCommentRequest,
} from '../../actions/actionComment';
import {
	ActionPostCommentsOpenSwitch,
	ActionPostLike,
	ActionPostUnlike,
} from '../../actions/actionPost';
import { CommentPayload } from '../../models/comment';
import { throttle } from '../../modules/throttle';
import { INPUT_LIMITS } from '../../modules/validation';
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
	commentsCount: number;
	commentsConfigs: CommentConfig[];
	commentsOpen: boolean;
	commentEditId: number;
}

/**
 * Class of post
 */
export class Post extends Component {
	protected _config: PostConfig;
	private _comments: Comment[] = [];

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

	get isMoreComments(): boolean {
		return this._config.commentsConfigs.length
			? this._config.commentsCount > this._config.commentsConfigs.length
			: false;
	}

	get hasCloseCommentsButton(): boolean {
		return this._config.commentsConfigs.length ? true : false;
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
		return this.commentTextareaVNode.element as HTMLTextAreaElement;
	}

	get commentButtonVNode(): VNode {
		return this._findVNodeByClass('post__comment-button');
	}

	get moreCommentsButtonVNode(): VNode {
		return this._findVNodeByClass('comments__more-button');
	}

	get closeCommentsButtonVNode(): VNode {
		return this._findVNodeByClass('comments__close-button');
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
		this.commentButtonVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				this._sendAction(
					new ActionPostCommentsOpenSwitch(
						!this._config.commentsOpen,
						this._config.id,
					),
				);
			},
		});
		this.commentFormVNode.handlers.push({
			event: 'submit',
			callback: (event) => {
				event.preventDefault();
				this._sendComment();
			},
		});
		if (this.isMoreComments) {
			this.moreCommentsButtonVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this._sendAction(
						new ActionCommentRequest(
							this._config.id,
							this._config.commentsConfigs[
								this._config.commentsConfigs.length - 1
							].id,
						),
					);
				},
			});
		}
		if (this.hasCloseCommentsButton) {
			this.closeCommentsButtonVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.commentButtonVNode.element.scrollIntoView({
						behavior: 'smooth',
					});
					this._sendAction(
						new ActionPostCommentsOpenSwitch(
							false,
							this._config.id,
						),
					);
				},
			});
		}
		this._comments.forEach((comment) => {
			comment.addActionButtonHandlers(this);
		});
	}

	render(): string {
		this._prerender();
		return this._render('Post.hbs');
	}

	protected _prerender(): void {
		super._prerender();
		this._comments = this._config.commentsConfigs.map((config) => {
			return new Comment(config, this);
		});
		this._templateContext = {
			...this._templateContext,
			comments: this._comments.map((comment) => {
				return comment.render();
			}),
			isMoreComments: this.isMoreComments,
			hasCloseCommentsButton: this.hasCloseCommentsButton,
			commentTextLimit: INPUT_LIMITS.commentText,
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
		const textarea = this.commentTextareaVNode
			.element as HTMLTextAreaElement;
		const text = textarea.value;
		if (!text) {
			return;
		}
		const commentPayload: CommentPayload = {
			text,
			file: '',
		};
		textarea.value = '';
		if (this._config.commentEditId) {
			this._sendAction(
				new ActionCommentEdit(
					this._config.id,
					this._config.commentEditId,
					this._config.commentsConfigs.filter((config) => {
						return config.id === this._config.commentEditId;
					})[0],
					commentPayload,
				),
			);
		} else {
			this._sendAction(
				new ActionCommentCreate(this._config.id, commentPayload),
			);
		}
	}
}
