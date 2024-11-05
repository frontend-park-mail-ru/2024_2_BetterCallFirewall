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
		let update = true;
		switch (change.type) {
			case ACTION_LOGIN_TYPES.loginClickSuccess:
			case ACTION_SIGNUP_TYPES.signupClickSuccess:
				if (!this._configFeed.posts.length) {
					api.requestPosts(this.lastPostId);
				}
				update = false;
				break;
			case ACTION_FEED_TYPES.postsRequestSuccess:
				this.updateViewFeed(change.data);
				update = false; // Чтобы посты сначала отрендерились, а потом шел запрос с последним id
				if (!this._configFeed.posts.length) {
					api.requestPosts(this.lastPostId);
				}
				break;
		}
		if (update) {
			this.updateViewFeed(change.data);
		}
	}

	render(): void {
		console.log('render');
		this._render();
		this._addHandlers();

		if (this._isNearBottom()) {
			api.requestPosts(this.lastPostId);
		}
	}

	updateViewFeed(data: ViewFeedConfig) {
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
		const content = this._components.content;
		if (!content) {
			throw new Error('content does no exist on ViewFeed');
		}

		this._configFeed.posts.forEach((postData) => {
			const post = new Post(postData, content);
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
		let pending = false;
		const fetchPosts = async () => {
			if (!pending) {
				pending = true;
				await api.requestPosts(this.lastPostId);
				pending = false;
			}
		};
		// let limited = false;
		// const intervalLimit = (func: () => void): (() => void) => {
		// 	console.log('intervalLimit: limited:', limited);
		// 	return () => {
		// 		if (!limited) {
		// 			limited = true;
		// 			func();
		// 			const limit = 2000;
		// 			setTimeout(() => {
		// 				console.log('timeout');
		// 				limited = false;
		// 			}, limit);
		// 		}
		// 	};
		// };
		const times = {
			now: 0,
			lastCall: 0,
		};
		const throttle = (func: () => void, delay: number) => {
			let lastCall = 0;
			return () => {
				const now = Date.now();
				console.log('scroll: now:', now, 'lastCall:', lastCall);
				if (now - lastCall > delay) {
					console.log('call');
					lastCall = now;
					func();
				}
			};
		};
		const handler = () => {
			console.log('request:');
			if (this._isNearBottom()) {
				fetchPosts();
			}
		};
		const throttledHandler = () => {
			const throttledHandler = throttle(handler, 1000);
			return throttledHandler;
		};
		const h = throttledHandler();
		this.content.addHandler(document, 'scroll', h);
	}
}
