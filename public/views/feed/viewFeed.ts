import { ACTION_FEED_TYPES } from '../../actions/actionFeed';
import { ACTION_LOGIN_TYPES } from '../../actions/actionLogin';
import { ActionPostEditGoTo } from '../../actions/actionPostEdit';
import { ACTION_SIGNUP_TYPES } from '../../actions/actionSignup';
import api from '../../api/api';
import { IPostConfig, Post, Root } from '../../components';
import { ChangeFeed } from '../../stores/storeFeed';
import { HomeConfig, IViewHome, ViewHome } from '../home/viewHome';

export interface ViewFeedConfig extends HomeConfig {
	posts: IPostConfig[];
}

export interface IViewFeed extends IViewHome {}

export class ViewFeed extends ViewHome implements IViewFeed {
	protected _configFeed: ViewFeedConfig;

	constructor(config: ViewFeedConfig, root: Root) {
		super(config, root);
		this._configFeed = config;
	}

	handleChange(change: ChangeFeed): void {
		console.log('ViewFeed: change:', change);
		super.handleChange(change);
		switch (change.type) {
			case ACTION_LOGIN_TYPES.loginClickSuccess:
			case ACTION_SIGNUP_TYPES.signupClickSuccess:
				if (!this._configFeed.posts.length) {
					api.requestPosts(this.lastPostId);
				}
				break;
			case ACTION_FEED_TYPES.postsRequestSuccess:
			case ACTION_FEED_TYPES.postsRequestFail:
				this.updateViewFeed(change.data);
				break;
		}
	}

	render(): void {
		this._render();
		this._addHandlers();

		if (this._isNearBottom()) {
			api.requestPosts(this.lastPostId);
		}
	}

	updateViewFeed(data: ViewFeedConfig) {
		console.log('update ViewHome:', this);
		this.updateViewHome(data);
		this._configFeed = { ...this._configFeed, ...data };
		this._render();
		this._addHandlers();
	}

	protected _render(): void {
		super._render();
		this._renderPosts();
		this._printMessage();
	}

	private get lastPostId(): number {
		const posts = this._configFeed.posts;
		if (posts.length) {
			return posts[posts.length - 1].id;
		}
		return -1;
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
					api.requestPosts(this.lastPostId);
				}, 200);
			}
		};

		this.content.addHandler(document, 'scroll', handler);
	}
}
