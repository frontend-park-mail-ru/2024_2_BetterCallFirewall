import { Action, ActionType } from './action';

export const ACTION_PROFILE_EDIT_TYPES = {
	updateProfileEdit: 'actionUpdateProfileEdit',
};

export class ActionUpdateProfileEdit implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_PROFILE_EDIT_TYPES.updateProfileEdit;
		this.data = {};
	}
}
