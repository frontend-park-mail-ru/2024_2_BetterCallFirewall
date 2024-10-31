import { PostResponse } from '../models/post';
import { Action, ActionType } from './action';

export const ACTION_FEED_TYPES = {
	postsRequestSuccess: 'actionFeedPostsRequestSuccess',
	postsRequestFail: 'actionFeedPostsRequestFail',
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
	error?: Error;
	message?: string;
};

export class ActionPostsRequestFail implements Action {
	type: ActionType;
	data: ActionPostsRequestFailData;

	constructor(message?: string, error?: Error) {
		this.type = ACTION_FEED_TYPES.postsRequestFail;
		this.data = { message, error };
	}
}
