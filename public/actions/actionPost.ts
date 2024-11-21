import { LikeCountResponse } from '../models/likeCount';
import { Action, ActionType } from './action';

export const ACTION_POST_TYPES = {
	like: 'actionPostLike',
	likeSuccess: 'actionPostLikeSuccess',
	likeFail: 'actionPostLikeFail',
	likeCount: 'actionPostLikeCount',
	likeCountSuccess: 'actionPostLikeCountSuccess',
	likeCountFail: 'actionPostLikeCountFail',
};

export interface ActionPostLikeData {
	postId: number;
}

export class ActionPostLike implements Action {
	type: ActionType = ACTION_POST_TYPES.like;
	data: ActionPostLikeData;

	constructor(postId: number) {
		this.data = { postId };
	}
}

export interface ActionPostLikeSuccessData {
	postId: number;
}

export class ActionPostLikeSuccess implements Action {
	type: ActionType = ACTION_POST_TYPES.likeSuccess;
	data: ActionPostLikeSuccessData;

	constructor(postId: number) {
		this.data = { postId };
	}
}

export class ActionPostLikeFail implements Action {
	type: ActionType = ACTION_POST_TYPES.likeFail;
	data: object = {};
}

export interface ActionPostLikeCountData {
	postId: number;
}

export class ActionPostLikeCount implements Action {
	type: ActionType = ACTION_POST_TYPES.likeCount;
	data: ActionPostLikeCountData;

	constructor(postId: number) {
		this.data = { postId };
	}
}

export interface ActionPostLikeCountSuccessData {
	likeCountResponse: LikeCountResponse;
	postId: number;
}

export class ActionPostLikeCountSuccess implements Action {
	type: ActionType = ACTION_POST_TYPES.likeCountSuccess;
	data: ActionPostLikeCountSuccessData;

	constructor(likeCountResponse: LikeCountResponse, postId: number) {
		this.data = { likeCountResponse, postId };
	}
}

export class ActionPostLikeCountFail implements Action {
	type: ActionType = ACTION_POST_TYPES.likeCountFail;
	data: object = {};
}
