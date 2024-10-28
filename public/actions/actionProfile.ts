import { Action, ActionType } from './action';

export const ACTION_PROFILE_TYPES = {
	goToProfile: 'goToProfile',
	updateProfile: 'updateProfile',
};

export interface ActionUpdateProfileData {
	firstName?: string;
	secondName?: string;
	description?: string;
	friendsCount?: number;
	groupsCount?: number;
	img?: string;
}

export class ActionUpdateProfile implements Action {
	type: ActionType;
	data: ActionUpdateProfileData;
	constructor(type: ActionType, data: ActionUpdateProfileData) {
		this.type = type;
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
