import { FullProfileResponse } from '../models/profile';
import { Action, ActionType } from './action';

export const ACTION_PROFILE_EDIT_TYPES = {
	updateProfileEdit: 'actionUpdateProfileEdit',
	goToProfileEdit: 'actionProfileEditGoTo',
	requestSuccess: 'actionProfileEditRequestSuccess',
	requestFail: 'actionProfileEditRequestFail',
};

export interface ActionProfileEditUpdateData {
	inputs: {
		firstName?: string;
		lastName?: string;
		description?: string;
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

export interface ActionProfileEditRequestSuccessData {
	profileResponse: FullProfileResponse;
}

export class ActionProfileEditRequestSuccess implements Action {
	type: ActionType = ACTION_PROFILE_EDIT_TYPES.requestSuccess;
	data: ActionProfileEditRequestSuccessData;

	constructor(profileResponse: FullProfileResponse) {
		this.data = { profileResponse };
	}
}

export class ActionProfileEditRequestFail implements Action {
	type: ActionType = ACTION_PROFILE_EDIT_TYPES.requestFail;
	data: object = {};
}
