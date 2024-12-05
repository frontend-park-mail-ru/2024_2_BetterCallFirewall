import { CommentPayload, CommentResponse } from '../models/comment';
import { Action, ActionType } from './action';

export const ACTION_COMMENT_TYPES = {
	request: 'actionCommentRequest',
	requestSuccess: 'actionCommentRequestSuccess',
	requestFail: 'actionCommentRequestFail',
	create: 'actionCommentCreate',
	createSuccess: 'actionCommentCreateSuccess',
	createFail: 'actionCommentCreateFail',
};

export class ActionCommentRequest implements Action {
	type: ActionType = ACTION_COMMENT_TYPES.request;
	data: { postId: number; lastId?: number };

	constructor(postId: number, lastId?: number) {
		this.data = { postId, lastId };
	}
}
export class ActionCommentRequestSuccess implements Action {
	type: ActionType = ACTION_COMMENT_TYPES.requestSuccess;
	data: {
		commentsResponses: CommentResponse[];
		postId: number;
		append: boolean;
	};

	constructor(
		commentsResponses: CommentResponse[],
		postId: number,
		append: boolean,
	) {
		this.data = { commentsResponses, postId, append };
	}
}
export class ActionCommentRequestFail implements Action {
	type: ActionType = ACTION_COMMENT_TYPES.requestFail;
	data: object = {};
}

export class ActionCommentCreate implements Action {
	type: ActionType = ACTION_COMMENT_TYPES.create;
	data: { postId: number; commentPayload: CommentPayload };

	constructor(postId: number, commentPayload: CommentPayload) {
		this.data = { postId, commentPayload };
	}
}
export class ActionCommentCreateSuccess implements Action {
	type: ActionType = ACTION_COMMENT_TYPES.createSuccess;
	data: { commentResponse: CommentResponse; postId: number };

	constructor(commentResponse: CommentResponse, postId: number) {
		this.data = { commentResponse, postId };
	}
}
export class ActionCommentCreateFail implements Action {
	type: ActionType = ACTION_COMMENT_TYPES.createFail;
	data: object = {};
}
