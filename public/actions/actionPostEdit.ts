import { PostResponse } from '../models/post';
import { Action, ActionType } from './action';

export const ACTION_POST_EDIT_TYPES = {
	updatePostEdit: 'actionUpdatePostEdit',
	goToPostEdit: 'actionPostEditGoTo',
	requestSuccess: 'actionPostEditRequestSuccess',
	requestFail: 'actionPostEditRequestFail',
};

export interface ActionPostEditUpdateData {
	inputs: {
		firstName?: string;
		lastName?: string;
	};
}

export class ActionPostEditUpdate implements Action {
	type: ActionType = ACTION_POST_EDIT_TYPES.updatePostEdit;
	data: ActionPostEditUpdateData;

	constructor(data: ActionPostEditUpdateData) {
		this.data = data;
	}
}

export interface ActionPostEditGoToData {
	postId: number;
}

export class ActionPostEditGoTo implements Action {
	type: ActionType = ACTION_POST_EDIT_TYPES.goToPostEdit;
	data: ActionPostEditGoToData;

	constructor(postId: number) {
		this.data = { postId };
	}
}

export interface ActionPostEditRequestSuccessData {
	postResponse: PostResponse;
}

export class ActionPostEditRequestSuccess implements Action {
	type: ActionType = ACTION_POST_EDIT_TYPES.requestSuccess;
	data: ActionPostEditRequestSuccessData;

	constructor(data: ActionPostEditRequestSuccessData) {
		this.data = data;
	}
}

export class ActionPostEditRequestFail implements Action {
	type: ActionType = ACTION_POST_EDIT_TYPES.requestFail;
	data: object = {};
}
