import { CommentConfig } from '../components/Comment/Comment';
import { CommentPayload, CommentResponse } from '../models/comment';
import { Action, ActionType } from './action';

export const ACTION_COMMENT_TYPES = {
	request: 'actionCommentRequest',
	requestSuccess: 'actionCommentRequestSuccess',
	requestFail: 'actionCommentRequestFail',
	create: 'actionCommentCreate',
	createSuccess: 'actionCommentCreateSuccess',
	createFail: 'actionCommentCreateFail',
	edit: 'actionCommentEdit',
	editSuccess: 'actionCommentEditSuccess',
	editFail: 'actionCommentEditFail',
	delete: 'actionCommentDelete',
	deleteSuccess: 'actionCommentDeleteSuccess',
	deleteFail: 'actionCommentDeleteFail',
};

export class ActionCommentRequest implements Action {
	type: ActionType = ACTION_COMMENT_TYPES.request;
	data: { postId: number; sort: string; lastId?: number };

	constructor(postId: number, sort: string, lastId?: number) {
		this.data = { postId, sort, lastId };
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

export class ActionCommentEdit implements Action {
	type: ActionType = ACTION_COMMENT_TYPES.edit;
	data: {
		postId: number;
		commentId: number;
		commentConfig: CommentConfig;
		commentPayload: CommentPayload;
	};

	constructor(
		postId: number,
		commentId: number,
		commentConfig: CommentConfig,
		commentPayload: CommentPayload,
	) {
		this.data = { postId, commentId, commentConfig, commentPayload };
	}
}
export class ActionCommentEditSuccess implements Action {
	type: ActionType = ACTION_COMMENT_TYPES.editSuccess;
	data: { commentResponse: CommentResponse; postId: number };

	constructor(commentResponse: CommentResponse, postId: number) {
		this.data = { commentResponse, postId };
	}
}
export class ActionCommentEditFail implements Action {
	type: ActionType = ACTION_COMMENT_TYPES.editFail;
	data: object = {};
}

export class ActionCommentDelete implements Action {
	type: string = ACTION_COMMENT_TYPES.delete;
	data: { postId: number; commentId: number };

	constructor(postId: number, commentId: number) {
		this.data = { postId, commentId };
	}
}
export class ActionCommentDeleteSuccess implements Action {
	type: string = ACTION_COMMENT_TYPES.deleteSuccess;
	data: { postId: number; commentId: number };

	constructor(postId: number, commentId: number) {
		this.data = { postId, commentId };
	}
}
export class ActionCommentDeleteFail implements Action {
	type: string = ACTION_COMMENT_TYPES.deleteFail;
	data: object = {};
}
