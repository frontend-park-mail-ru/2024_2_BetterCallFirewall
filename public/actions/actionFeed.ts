import { PostResponse } from '../models/post';
import { Action, ActionType } from './action';

export const ACTION_FEED_TYPES = {
	postsRequestSuccess: 'actionFeedPostsRequestSuccess',
	postsRequestFail: 'actionFeedPostsRequestFail',
	postCreateSuccess: 'actionFeedPostCreateSuccess',
	postCreateFail: 'actionFeedPostCreateFail',
};

export type ActionPostsRequestSuccessData = {
	postsData: PostResponse[];
};

export class ActionPostsRequestSuccess implements Action {
	type: ActionType;
	data: ActionPostsRequestSuccessData;

	constructor(postsData: PostResponse[]) {
		this.type = ACTION_FEED_TYPES.postsRequestSuccess;
		this.data = { postsData };
	}
}

export type ActionPostsRequestFailData = {
	status?: number;
	message?: string;
};

export class ActionPostsRequestFail implements Action {
	type: ActionType;
	data: ActionPostsRequestFailData;

	constructor(data: ActionPostsRequestFailData) {
		this.type = ACTION_FEED_TYPES.postsRequestFail;
		this.data = data;
	}
}

export interface ActionFeedPostCreateSuccessData {
	post: PostResponse;
}

export class ActionFeedPostCreateSuccess implements Action {
	type: ActionType;
	data: ActionFeedPostCreateSuccessData;

	constructor(data: ActionFeedPostCreateSuccessData) {
		this.type = ACTION_FEED_TYPES.postCreateSuccess;
		this.data = data;
	}
}

export class actionFeedPostCreateFail implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_FEED_TYPES.postCreateFail;
		this.data = {};
	}
}
