import { ACTION_APP_TYPES } from '../../actions/actionApp';
import {
	ACTION_FEED_TYPES,
	ActionFeedPostsRequest,
	ActionFeedUpdate,
} from '../../actions/actionFeed';
import { PostConfig, Post, Root } from '../../components';
import deepClone from '../../modules/deepClone';
import { update } from '../../modules/vdom';
import { ChangeFeed } from '../../stores/storeFeed';
import { HomeConfig, ViewHome } from '../home/viewHome';

export interface ViewFeedConfig extends HomeConfig {
	posts: PostConfig[];
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
		console.log('ViewFeed: handleChange:', change);
		super.handleChange(change);
		switch (change.type) {
			case ACTION_FEED_TYPES.update:
				this.updateViewFeed(change.data);
				break;
			// case ACTION_FEED_TYPES.postsRequest:
			// 	this.content.showLoader();
			// 	break;
			case ACTION_APP_TYPES.goTo:
				if (!this._configFeed.posts.length) {
					this.sendAction(
						new ActionFeedPostsRequest(this.lastPostId),
					);
				}
				this.sendAction(new ActionFeedUpdate());
				break;
			// case ACTION_FEED_TYPES.postsRequestSuccess:
			// case ACTION_FEED_TYPES.postsRequestFail:
			// 	this.content.hideLoader();
			// 	this.updateViewFeed(change.data);
			// 	break;
		}
	}

	render(): void {
		console.log('ViewFeed.render()');
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

	protected _render(): void {
		console.log('ViewFeed._render()');
		super._render();
		const rootNode = this._root.node;
		const rootVNode = deepClone(this._root.vnode);

		this._renderPosts();

		update(rootNode, rootVNode);
		// this._renderPosts();
		// this._printMessage();
		// this._addHandlers();
	}

	private get lastPostId(): number | undefined {
		const posts = this._configFeed.posts;
		if (posts.length) {
			return posts[posts.length - 1].id;
		}
	}

	private _renderPosts(): void {
		this._configFeed.posts.forEach((postData) => {
			new Post(postData, this.content);
		});
	}

	private _addHandlers() {
		this._addScrollHandler();
	}

	private _addScrollHandler() {
		// let debounceTimeout: NodeJS.Timeout;
		// const handler = () => {
		// 	if (this._isNearBottom()) {
		// 		clearTimeout(debounceTimeout);
		// 		debounceTimeout = setTimeout(() => {
		// 			if (!this.config.pendingPostRequest) {
		// 				this.sendAction(
		// 					new ActionFeedPostsRequest(this.lastPostId),
		// 				);
		// 			}
		// 		}, 200);
		// 	}
		// };
		// this.content.addHandler(document, 'scroll', handler);
	}
}
