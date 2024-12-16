import { ChangePasswordPayload, FullProfileResponse } from '../models/profile';
import { Action, ActionType } from './action';

export const ACTION_PROFILE_EDIT_TYPES = {
	updateProfileEdit: 'actionUpdateProfileEdit',
	goToProfileEdit: 'actionProfileEditGoTo',
	requestSuccess: 'actionProfileEditRequestSuccess',
	requestFail: 'actionProfileEditRequestFail',
	changePassword: 'actionProfileChangePassword',
	changePasswordSuccess: 'actionProfileChangePasswordSuccess',
	changePasswordFail: 'actionProfileChangePasswordFail',
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

export class ActionProfileChangePassword implements Action {
	type: string = ACTION_PROFILE_EDIT_TYPES.changePassword;
	data: { payload: ChangePasswordPayload };

	constructor(payload: ChangePasswordPayload) {
		this.data = { payload };
	}
}
export class ActionProfileChangePasswordSuccess implements Action {
	type: string = ACTION_PROFILE_EDIT_TYPES.changePasswordSuccess;
	data: object = {};
}
export class ActionProfileChangePasswordFail implements Action {
	type: string = ACTION_PROFILE_EDIT_TYPES.changePasswordFail;
	data: { status: number };

	constructor(status: number) {
		this.data = { status };
	}
}
