import {
	ActionPostsRequestFail,
	ActionPostsRequestSuccess,
} from '../../actions/actionFeed';
import app from '../../app';
import { IPostConfig, Post, Root } from '../../components';
import { PostResponse } from '../../models/post';
import ajax, { AjaxResponse } from '../../modules/ajax';
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
	private _requestPosts(): void {
		ajax.getPromise<AjaxResponse<PostResponse[]>>(app.config.URL.post)
			.then((body) => {
				if (body.success) {
					this.sendAction(new ActionPostsRequestSuccess(body.data));
				} else {
					this.sendAction(new ActionPostsRequestFail(body.message));
				}
			})
			.catch((error) => {
				this.sendAction(new ActionPostsRequestFail(error));
			});
	}

	private _addHandlers() {}
}
