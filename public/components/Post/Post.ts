import {
	ActionCommentCancelEdit,
	ActionCommentCreate,
	ActionCommentEdit,
	ActionCommentRequest,
} from '../../actions/actionComment';
import {
	ActionPostCommentsOpenSwitch,
	ActionPostCommentsSortChange,
	ActionPostExpandSwitch,
	ActionPostLike,
	ActionPostUnlike,
} from '../../actions/actionPost';
import { CommentPayload } from '../../models/comment';
import { filePayloadFromURL } from '../../models/file';
import { throttle } from '../../modules/throttle';
import { INPUT_LIMITS } from '../../modules/validation';
import { findVNodeByClass, VNode } from '../../modules/vdom';
import { Attachment } from '../Attachment/Attachment';
import {
	ChatAttachmentInput,
	ChatAttachmentInputConfig,
} from '../ChatAttachmentInput/ChatAttachmentInput';
import { Comment, CommentConfig } from '../Comment/Comment';
import Component, { ComponentConfig } from '../Component';

export enum SortOptions {
	Asc = 'asc',
	Desc = 'desc',
}

export interface PostConfig extends ComponentConfig {
	id: number;
	groupId?: number;
	key: string;
	avatar: string;
	title: string;
	text: string;
	files: string[];
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
	commentsSort: string;
	commentAttachmentInput: ChatAttachmentInputConfig;
	expanded: boolean;
}

/**
 * Class of post
 */
export class Post extends Component {
	protected _config: PostConfig;
	private _comments: Comment[] = [];
	private _commentAttachmentInput: ChatAttachmentInput;

	/**
	 * Instance of post
	 *
	 * @param {PostConfig} config - post data
	 * @param {Component} parent - parent element
	 */
	constructor(config: PostConfig, parent: Component) {
		super(config, parent);
		this._config = config;
		this._commentAttachmentInput = new ChatAttachmentInput(
			config.commentAttachmentInput,
			this,
		);
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
		return this._config.commentsConfigs.length > 0;
	}

	get hasSortSelect(): boolean {
		return this._config.commentsConfigs.length > 1;
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

	get commentsSortSelectVNode(): VNode {
		return this._findVNodeByClass('comments__sort-select');
	}

	get expandButtonVNode(): VNode {
		return this._findVNodeByClass('post__expand-button');
	}

	get contentVNode(): VNode {
		return this._findVNodeByClass('post__content');
	}

	get commentAttachButton(): VNode {
		return this._findVNodeByClass('post__comments-attach-button');
	}

	get isCommentEdit(): boolean {
		return this._config.commentEditId ? true : false;
	}

	get cancelEditButtonVNode(): VNode {
		return this._findVNodeByClass('post__comment-edit-cancel');
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
						this._config.commentsSort,
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
		this.commentTextareaVNode.handlers.push({
			event: 'keydown',
			callback: (event) => {
				const keyboardEvent = event as KeyboardEvent;
				if (keyboardEvent.key === 'Enter' && keyboardEvent.shiftKey) {
					return;
				}
				if (keyboardEvent.key === 'Enter') {
					event.preventDefault();
					this._sendComment();
				}
			},
		});
		if (this.isCommentEdit) {
			this.cancelEditButtonVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.commentTextareaHTML.value = '';
					this._sendAction(
						new ActionCommentCancelEdit(
							this._config.id,
							this._config.commentEditId,
						),
					);
				},
			});
		}
		if (this.isMoreComments) {
			this.moreCommentsButtonVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this._sendAction(
						new ActionCommentRequest(
							this._config.id,
							this._config.commentsSort,
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
						block: 'center',
					});
					this._sendAction(
						new ActionPostCommentsOpenSwitch(
							false,
							this._config.id,
							this._config.commentsSort,
						),
					);
				},
			});
		}
		if (this.hasSortSelect) {
			this.commentsSortSelectVNode.handlers.push({
				event: 'change',
				callback: (event) => {
					event.preventDefault();
					this._sendAction(
						new ActionPostCommentsSortChange(
							this._config.id,
							(event.target as HTMLSelectElement).value,
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

	onMount(): void {
		(this.expandButtonVNode.element as HTMLElement).style.display =
			this._isContentHeightBig() ? 'block' : 'none';
	}

	protected _addHandlers(): void {
		super._addHandlers();
		this.expandButtonVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				this._sendAction(
					new ActionPostExpandSwitch(
						this._config.id,
						!this._config.expanded,
					),
				);
				if (this._config.expanded) {
					this.commentButtonVNode.element.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
					});
				}
			},
		});
		this.commentAttachButton.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				(
					this._commentAttachmentInput.inputVNode
						.element as HTMLElement
				).click();
			},
		});
	}

	protected _prerender(): void {
		super._prerender();
		this._comments = this._config.commentsConfigs.map((config) => {
			return new Comment(config, this);
		});
		const attachments = this._config.files.map((file, i) => {
			return new Attachment(
				{
					key: `attachment-${i}`,
					file: filePayloadFromURL(file),
					hasDeleteButton: false,
				},
				this,
			).render();
		});
		this._commentAttachmentInput = new ChatAttachmentInput(
			this._config.commentAttachmentInput,
			this,
		);
		this._templateContext = {
			...this._templateContext,
			comments: this._comments.map((comment) => {
				return comment.render();
			}),
			isMoreComments: this.isMoreComments,
			hasSortSelect: this.hasSortSelect,
			sortOptions: SortOptions,
			hasCloseCommentsButton: this.hasCloseCommentsButton,
			commentTextLimit: INPUT_LIMITS.commentText,
			attachments,
			commentAttachmentInput: this._commentAttachmentInput.render(),
			isEdit: this.isCommentEdit,
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
		const files = this._commentAttachmentInput.config.files.map(
			(file) => file.src,
		);
		if (!text && !files.length) {
			return;
		}
		const commentPayload: CommentPayload = {
			text,
			file: files,
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

	private _isContentHeightBig() {
		const rootFontSize = parseFloat(
			getComputedStyle(document.documentElement).fontSize,
		);
		return this.contentVNode.element.scrollHeight > rootFontSize * 40;
	}
}
