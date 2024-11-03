import { Action, ActionType } from './action';

export const ACTION_PROFILE_EDIT_TYPES = {
	updateProfileEdit: 'actionUpdateProfileEdit',
	goToProfileEdit: 'actionProfileEditGoTo',
};

export class ActionUpdateProfileEdit implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_PROFILE_EDIT_TYPES.updateProfileEdit;
		this.data = {};
	}
}

export class ActionProfileEditGoTo implements Action {
	type: ActionType = ACTION_PROFILE_EDIT_TYPES.goToProfileEdit;
	data: object = {};
}
