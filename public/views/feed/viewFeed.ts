import { ACTION_APP_TYPES } from '../../actions/actionApp';
import {
	ACTION_FEED_TYPES,
	ActionFeedPostsRequest,
	ActionFeedUpdate,
} from '../../actions/actionFeed';
import { ActionPostLike, ActionPostLikeCount } from '../../actions/actionPost';
import { PostConfig, Post, Root } from '../../components';
import { update } from '../../modules/vdom';
import { ChangeFeed } from '../../stores/storeFeed';
import { ComponentsHome, HomeConfig, ViewHome } from '../home/viewHome';

export interface ViewFeedConfig extends HomeConfig {
	posts: PostConfig[];
	pendingPostRequest: boolean;
}

export type FeedComponents = {
	posts?: Post[];
} & ComponentsHome;

export class ViewFeed extends ViewHome {
	protected _configFeed: ViewFeedConfig;
	protected _components: FeedComponents = {};

	constructor(config: ViewFeedConfig, root: Root) {
		super(config, root);
		this._configFeed = config;
	}

	get config(): ViewFeedConfig {
		return this._configFeed;
	}

	handleChange(change: ChangeFeed): void {
		super.handleChange(change);
		switch (change.type) {
			case ACTION_APP_TYPES.goTo:
				if (
					!this._configFeed.posts.length &&
					!this._configFeed.pendingPostRequest
				) {
					this.sendAction(
						new ActionFeedPostsRequest(this.lastPostId),
					);
				}
				this.sendAction(new ActionFeedUpdate());
				break;
			case ACTION_FEED_TYPES.postsRequestSuccess:
				this.updateViewFeed(change.data);
				this._components.posts?.forEach((post) => {
					this.sendAction(new ActionPostLikeCount(post.config.id));
				});
				break;
			default:
				this.updateViewFeed(change.data);
		}
	}

	render(): void {
		this._render();

		if (this._isNearBottom() && !this._configFeed.pendingPostRequest) {
			this.sendAction(new ActionFeedPostsRequest(this.lastPostId));
		}
	}

	updateViewFeed(data: ViewFeedConfig) {
		this.updateViewHome(data);
		this._configFeed = { ...this._configFeed, ...data };
		this._render();
	}

	protected _render(): void {
		const rootNode = this._root.node;

		super._render();
		this._renderPosts();

		const rootVNode = this._root.newVNode();

		this._addHandlers();

		update(rootNode, rootVNode);
	}

	protected _addHandlers() {
		super._addHandlers();
		this._addScrollHandler();
		this._addPostsHandler();
	}

	private get lastPostId(): number | undefined {
		const posts = this._configFeed.posts;
		if (posts.length) {
			return posts[posts.length - 1].id;
		}
	}

	private _renderPosts(): void {
		this._components.posts = this._configFeed.posts.map((postConfig) => {
			return new Post(postConfig, this.content);
		});
	}

	private _addScrollHandler() {
		let debounceTimeout: NodeJS.Timeout;
		const handler = () => {
			if (this._isNearBottom() && !this._isOnBottom()) {
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
		this._root.addDocumentHandler({ event: 'scroll', callback: handler });
	}

	private _addPostsHandler() {
		this._components.posts?.forEach((post) => {
			post.likeButtonVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(new ActionPostLike(post.config.id));
				},
			});
		});
	}
}
