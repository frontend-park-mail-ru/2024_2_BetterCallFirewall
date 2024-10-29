import { IProfileConfig } from '../components/Profile/Profile';
import { Action, ActionType } from './action';

export const ACTION_PROFILE_TYPES = {
	goToProfile: 'goToProfile',
	updateProfile: 'updateProfile',
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
