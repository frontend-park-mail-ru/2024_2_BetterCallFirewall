import { IProfileConfig } from '../components/Profile/Profile';
import { HeaderResponse } from '../models/header';
import { FullProfileResponse } from '../models/profile';
import { Action, ActionType } from './action';

export const ACTION_PROFILE_TYPES = {
	goToProfile: 'goToProfile',
	updateProfile: 'updateProfile',
	profileRequest: 'actionProfileRequest',
	profileRequestSuccess: 'profileRequestSuccess',
	profileRequestFail: 'profileRequestFail',
	getYourOwnProfile: 'getYourOwnProfile',
	getYourOwnProfileSuccess: 'getYourOwnProfileSuccess',
	getYourOwnProfileFail: 'getYourOwnProfileFail',
	getHeader: 'actionProfileGetHeader',
	getHeaderSuccess: 'getHeaderSuccess',
	getHeaderFail: 'getHeaderFail',
	deletePostSuccess: 'actionProfileDeletePostSuccess',
	deletePostFail: 'actionProfileDeletePostFail',
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

export class ActionProfileRequest implements Action {
	type: ActionType = ACTION_PROFILE_TYPES.profileRequest;
	data: object = {};
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
	message?: string;
}

export class ActionProfileRequestFail implements Action {
	type: ActionType;
	data: ActionProfileRequestFailData;

	constructor(data: ActionProfileRequestFailData) {
		this.type = ACTION_PROFILE_TYPES.profileRequestFail;
		this.data = data;
	}
}

export class ActionProfileGetYourOwnProfile implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_PROFILE_TYPES.getYourOwnProfile;
		this.data = {};
	}
}

export interface ActionProfileGetYourOwnProfileSuccessData {
	profile: FullProfileResponse;
}

export class ActionProfileGetYourOwnProfileSuccess implements Action {
	type: ActionType;
	data: ActionProfileGetYourOwnProfileSuccessData;

	constructor(data: ActionProfileGetYourOwnProfileSuccessData) {
		this.type = ACTION_PROFILE_TYPES.getYourOwnProfileSuccess;
		this.data = data;
	}
}

export interface ActionProfileGetYourOwnProfileFailData {
	status: number;
	message?: string;
}

export class ActionProfileGetYourOwnProfileFail implements Action {
	type: ActionType;
	data: ActionProfileGetYourOwnProfileFailData;

	constructor(data: ActionProfileGetYourOwnProfileFailData) {
		this.type = ACTION_PROFILE_TYPES.getYourOwnProfileFail;
		this.data = data;
	}
}

export class ActionProfileGetHeader implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_PROFILE_TYPES.getHeader;
		this.data = {};
	}
}

export interface ActionProfileGetHeaderSuccessData {
	headerResponse: HeaderResponse;
}

export class ActionProfileGetHeaderSuccess implements Action {
	type: ActionType;
	data: ActionProfileGetHeaderSuccessData;

	constructor(data: ActionProfileGetHeaderSuccessData) {
		this.type = ACTION_PROFILE_TYPES.getHeaderSuccess;
		this.data = data;
	}
}

export interface ActionProfileGetHeaderFailData {
	status: number;
}

export class ActionProfileGetHeaderFail implements Action {
	type: ActionType;
	data: ActionProfileGetHeaderFailData;

	constructor(data: ActionProfileGetHeaderFailData) {
		this.type = ACTION_PROFILE_TYPES.getHeaderFail;
		this.data = data;
	}
}

export class ActionProfileDeletePostSuccess implements Action {
	type: ActionType = ACTION_PROFILE_TYPES.deletePostSuccess;
	data: object = {};
}

export class ActionProfileDeletePostFail implements Action {
	type: ActionType = ACTION_PROFILE_TYPES.deletePostFail;
	data: object = {};
}
