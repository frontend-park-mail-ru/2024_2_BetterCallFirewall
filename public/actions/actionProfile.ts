import { IProfileConfig } from '../components/Profile/Profile';
import { FullProfileResponse } from '../models/profile';
import { Action, ActionType } from './action';

export const ACTION_PROFILE_TYPES = {
	goToProfile: 'goToProfile',
	updateProfile: 'updateProfile',
	profileRequestSuccess: 'profileRequestSuccess',
	profileRequestFail: 'profileRequestFail',
};

export interface ActionUpdateProfileData extends IProfileConfig {}

export class ActionUpdateProfile implements Action {
	type: ActionType;
	data: ActionUpdateProfileData;
	constructor(data: ActionUpdateProfileData) {
		this.type = ACTION_PROFILE_TYPES.updateProfile;
		this.data = data;
	}
}

export type ActionGoToProfileData = {
	href: string;
};

export class ActionGoToProfile implements Action {
	type: ActionType;
	data: object;

	constructor(data: ActionGoToProfileData) {
		this.type = ACTION_PROFILE_TYPES.goToProfile;
		this.data = data;
	}
}

export interface ActionProfileRequestSuccessData {
	profileResponse: FullProfileResponse;
}

export class ActionProfileRequestSuccess implements Action {
	type: ActionType;
	data: ActionProfileRequestSuccessData;

	constructor(data: ActionProfileRequestSuccessData) {
		this.type = ACTION_PROFILE_TYPES.profileRequestSuccess;
		this.data = data;
	}
}

export interface ActionProfileRequestFailData {
	status: number;
}

export class ActionProfileRequestFail implements Action {
	type: ActionType;
	data: ActionProfileRequestFailData;

	constructor(data: ActionProfileRequestFailData) {
		this.type = ACTION_PROFILE_TYPES.profileRequestFail;
		this.data = data;
	}
}
