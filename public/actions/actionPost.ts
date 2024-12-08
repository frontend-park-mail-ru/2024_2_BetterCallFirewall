import { Action, ActionType } from './action';

export const ACTION_POST_TYPES = {
	like: 'actionPostLike',
	unlike: 'actionPostUnlike',
	likeSuccess: 'actionPostLikeSuccess',
	likeFail: 'actionPostLikeFail',
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

export interface ActionPostUnlikeData {
	postId: number;
}
export class ActionPostUnlike implements Action {
	type: ActionType = ACTION_POST_TYPES.unlike;
	data: ActionPostUnlikeData;

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
