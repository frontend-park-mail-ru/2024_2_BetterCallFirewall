import { Action, ActionType } from './action';

export const ACTION_POST_TYPES = {
	like: 'actionPostLike',
	unlike: 'actionPostUnlike',
	likeSuccess: 'actionPostLikeSuccess',
	likeFail: 'actionPostLikeFail',
	commentsOpenSwitch: 'actionPostCommentsOpenSwitch',
	commentEdit: 'actionPostCommentEdit',
	commentsSortChange: 'actionPostCommentsSortChange',
	expandSwitch: 'actionPostExpandSwitch',
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

export class ActionPostCommentsOpenSwitch implements Action {
	type: ActionType = ACTION_POST_TYPES.commentsOpenSwitch;
	data: { show: boolean; postId: number; sort: string };

	constructor(show: boolean, postId: number, sort: string) {
		this.data = { show, postId, sort };
	}
}

export class ActionPostCommentEdit implements Action {
	type: ActionType = ACTION_POST_TYPES.commentEdit;
	data: { postId: number; commentId: number };

	constructor(postId: number, commentId: number) {
		this.data = { postId, commentId };
	}
}

export class ActionPostCommentsSortChange implements Action {
	type: string = ACTION_POST_TYPES.commentsSortChange;
	data: { postId: number; sort: string };

	constructor(postId: number, sort: string) {
		this.data = { postId, sort };
	}
}

export class ActionPostExpandSwitch implements Action {
	type: string = ACTION_POST_TYPES.expandSwitch;
	data: { postId: number; expand: boolean };

	constructor(postId: number, expand: boolean) {
		this.data = { postId, expand };
	}
}
