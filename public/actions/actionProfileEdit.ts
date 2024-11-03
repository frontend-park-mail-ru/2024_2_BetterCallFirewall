import { Action, ActionType } from './action';

export const ACTION_PROFILE_EDIT_TYPES = {
	updateProfileEdit: 'actionUpdateProfileEdit',
	goToProfileEdit: 'actionProfileEditGoTo',
};

export interface ActionProfileEditUpdateData {
	inputs: {
		firstName?: string;
		lastName?: string;
	};
}

export class ActionProfileEditUpdate implements Action {
	type: ActionType = ACTION_PROFILE_EDIT_TYPES.updateProfileEdit;
	data: ActionProfileEditUpdateData;

	constructor(data: ActionProfileEditUpdateData) {
		this.data = data;
	}
}

export class ActionProfileEditGoTo implements Action {
	type: ActionType = ACTION_PROFILE_EDIT_TYPES.goToProfileEdit;
	data: object = {};
}
