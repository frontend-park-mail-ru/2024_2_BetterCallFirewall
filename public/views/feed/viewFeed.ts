import { ACTION_APP_TYPES, ActionAppGoTo } from '../../actions/actionApp';
import {
	ACTION_FEED_TYPES,
	ActionFeedPostsRequest,
} from '../../actions/actionFeed';
import { ActionPostEditGoTo } from '../../actions/actionPostEdit';
import { IPostConfig, Post, Root } from '../../components';
import { ChangeFeed } from '../../stores/storeFeed';
import { HomeConfig, ViewHome } from '../home/viewHome';

export interface ViewFeedConfig extends HomeConfig {
	posts: IPostConfig[];
	pendingPostRequest: boolean;
}

export class ViewFeed extends ViewHome {
	protected _configFeed: ViewFeedConfig;

	constructor(config: ViewFeedConfig, root: Root) {
		super(config, root);
		this._configFeed = config;
	}

	get config(): ViewFeedConfig {
		return this._configFeed;
	}

	handleChange(change: ChangeFeed): void {
		this._configFeed = Object.assign(this._configFeed, change.data);
		super.handleChange(change);
		switch (change.type) {
			case ACTION_FEED_TYPES.postsRequest:
				this.content.showLoader();
				break;
			case ACTION_FEED_TYPES.postCreateSuccess:
				this.sendAction(new ActionAppGoTo(this._profileLinkHref));
				this.updateViewFeed(change.data);
				break;
			case ACTION_APP_TYPES.goTo:
				if (!this._configFeed.posts.length) {
					this.sendAction(
						new ActionFeedPostsRequest(this.lastPostId),
					);
				}
				break;
			case ACTION_FEED_TYPES.postsRequestSuccess:
			case ACTION_FEED_TYPES.postsRequestFail:
				this.content.hideLoader();
				this.updateViewFeed(change.data);
				break;
		}
	}

	render(): void {
		this._render();

		if (this._isNearBottom()) {
			this.sendAction(new ActionFeedPostsRequest(this.lastPostId));
		}
	}

	updateViewFeed(data: ViewFeedConfig) {
		this.updateViewHome(data);
		this._configFeed = { ...this._configFeed, ...data };
		this._render();
	}

	update(config: object): void {
		this.updateViewFeed(config as ViewFeedConfig);
	}

	protected _render(): void {
		super._render();
		this._renderPosts();
		this._printMessage();
		this._addHandlers();
	}

	private get lastPostId(): number | undefined {
		const posts = this._configFeed.posts;
		if (posts.length) {
			return posts[posts.length - 1].id;
		}
	}

	private _renderPosts(): void {
		this._configFeed.posts.forEach((postData) => {
			const post = new Post(postData, this.content);
			post.render();
			this._addPostHandlers(post);
		});
	}

	private _addPostHandlers(post: Post) {
		if (post.config.hasEditButton) {
			post.addHandler(post.editButton, 'click', (event) => {
				event.preventDefault();
				this.sendAction(new ActionPostEditGoTo(post.config));
			});
		}
	}

	private _addHandlers() {
		this._addScrollHandler();
	}

	private _addScrollHandler() {
		let debounceTimeout: NodeJS.Timeout;
		const handler = () => {
			if (this._isNearBottom()) {
				clearTimeout(debounceTimeout);
				debounceTimeout = setTimeout(() => {
					if (!this.config.pendingPostRequest) {
						this.sendAction(
							new ActionFeedPostsRequest(this.lastPostId),
						);
					}
				}, 200);
			}
		};

		this.content.addHandler(document, 'scroll', handler);
	}
}
