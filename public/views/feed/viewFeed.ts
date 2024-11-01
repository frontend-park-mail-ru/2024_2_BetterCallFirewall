import {
	ActionPostsRequestFail,
	ActionPostsRequestSuccess,
} from '../../actions/actionFeed';
import { IPostConfig, Post, Root } from '../../components';
import ajax, { QueryParams } from '../../modules/ajax';
import { ChangeFeed } from '../../stores/storeFeed';
import { HomeConfig, IViewHome, ViewHome } from '../home/viewHome';

export interface ViewFeedConfig extends HomeConfig {
	posts: IPostConfig[];
	errorMessage: string;
}

export interface IViewFeed extends IViewHome {}

export class ViewFeed extends ViewHome implements IViewFeed {
	protected _configFeed: ViewFeedConfig;

	constructor(config: ViewFeedConfig, root: Root) {
		super(config, root);
		this._configFeed = config;
	}

	handleChange(change: ChangeFeed): void {
		super.handleChange(change);
		switch (change.type) {
			default:
				console.log('change:', change);
				this.updateViewFeed(change.data);
		}
	}

	render(): void {
		console.log('render');
		this._render();
		this._addHandlers();

		this._requestPosts(); // tmp
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
		});
	}

	private _printMessage() {
		const content = this._components.content;
		if (!content) {
			throw new Error('content does no exist on ViewFeed');
		}
		if (this._configFeed.errorMessage) {
			content.printMessage(this._configFeed.errorMessage);
		}
	}

	/**
	 * Выполняет запрос постов и добавляет их
	 */
	private async _requestPosts(): Promise<void> {
		const id = this.lastPostId;
		const params: QueryParams = {};
		if (id >= 0) {
			params.id = id.toString();
		}
		const response = await ajax.getPosts(params);
		switch (response.status) {
			case 200:
				this.sendAction(new ActionPostsRequestSuccess(response.data));
				break;
			case 401:
				this.sendAction(
					new ActionPostsRequestFail({
						status: response.status,
					}),
				);
				break;
			case 204:
				this.sendAction(
					new ActionPostsRequestFail({
						status: response.status,
						message: response.message,
					}),
				);
		}

		// return ajax
		// 	.getPromise<AjaxResponse<PostResponse[]>>(
		// 		app.config.URL.post,
		// 		params,
		// 	)
		// 	.then((body) => {
		// 		if (!body) {
		// 			this.sendAction(
		// 				new ActionPostsRequestFail({
		// 					message: 'Постов больше нет',
		// 				}),
		// 			);
		// 			return;
		// 		}
		// 		if (body.success) {
		// 			this.sendAction(new ActionPostsRequestSuccess(body.data));
		// 		} else {
		// 			this.sendAction(
		// 				new ActionPostsRequestFail({ message: body.message }),
		// 			);
		// 		}
		// 	})
		// 	.catch((error: Error) => {
		// 		console.log('status:', error.message);
		// 		this.sendAction(
		// 			new ActionPostsRequestFail({
		// 				status: Number(error.message),
		// 			}),
		// 		);
		// 	});
	}

	private _addHandlers() {
		this._addScrollHandler();
	}

	private _addScrollHandler() {
		const isNearBottom = () => {
			return (
				window.innerHeight * 2 + window.scrollY >
				document.body.offsetHeight
			);
		};
		let pending = false;
		const fetchPosts = async () => {
			if (!pending) {
				pending = true;
				await this._requestPosts();
				pending = false;
			}
		};
		let limited = false;
		const intervalLimit = (func: () => void): (() => void) => {
			if (limited) {
				return () => {};
			}
			const limit = 1000;
			limited = true;
			setTimeout(() => {
				limited = false;
			}, limit);
			return func;
		};
		const handler = () => {
			if (isNearBottom()) {
				fetchPosts();
			}
		};
		this.content.addHandler(document, 'scroll', intervalLimit(handler));
	}
}
