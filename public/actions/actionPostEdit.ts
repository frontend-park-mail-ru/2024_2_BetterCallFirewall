import { Action, ActionType } from './action';

export const ACTION_POST_EDIT_TYPES = {
	updatePostEdit: 'actionUpdatePostEdit',
	goToPostEdit: 'actionPostEditGoTo',
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

export class ActionPostEditGoTo implements Action {
	type: ActionType = ACTION_POST_EDIT_TYPES.goToPostEdit;
	data: object = {};
}
