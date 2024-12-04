import { HeaderResponse } from '../models/header';
import { FullProfileResponse, ShortProfileResponse } from '../models/profile';
import { Action, ActionType } from './action';

export const ACTION_PROFILE_TYPES = {
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
	search: 'actionProfileSearch',
	searchSuccess: 'actionProfileSearchSuccess',
	searchFail: 'actionProfileSearchFail',
	delete: 'actionProfileDelete',
	deleteSuccess: 'actionProfileDeleteSuccess',
	deleteFail: 'actionProfileDeleteFail',
};

export interface ActionUpdateProfileData {}

export class ActionUpdateProfile implements Action {
	type: ActionType = ACTION_PROFILE_TYPES.updateProfile;
	data: ActionUpdateProfileData = {};
}

export interface ActionProfileRequestData {
	href: string;
}

export class ActionProfileRequest implements Action {
	type: ActionType = ACTION_PROFILE_TYPES.profileRequest;
	data: ActionProfileRequestData;

	constructor(profileHref: string) {
		this.data = { href: profileHref };
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

export interface ActionProfileSearchData {
	str: string;
	lastId?: number;
}

export class ActionProfileSearch implements Action {
	type: ActionType = ACTION_PROFILE_TYPES.search;
	data: ActionProfileSearchData;

	constructor(str: string, lastId?: number) {
		this.data = { str, lastId };
	}
}

export interface ActionProfileSearchSuccessData {
	profilesResponses: ShortProfileResponse[];
}

export class ActionProfileSearchSuccess implements Action {
	type: ActionType = ACTION_PROFILE_TYPES.searchSuccess;
	data: ActionProfileSearchSuccessData;

	constructor(profilesResponses: ShortProfileResponse[]) {
		this.data = { profilesResponses };
	}
}

export class ActionProfileSearchFail implements Action {
	type: ActionType = ACTION_PROFILE_TYPES.searchFail;
	data: object = {};
}

export class ActionProfileDelete implements Action {
	type: ActionType = ACTION_PROFILE_TYPES.delete;
	data: { profileId: number };

	constructor(profileId: number) {
		this.data = { profileId };
	}
}

export class ActionProfileDeleteSuccess implements Action {
	type: ActionType = ACTION_PROFILE_TYPES.deleteSuccess;
	data: object = {};
}

export class ActionProfileDeleteFail implements Action {
	type: ActionType = ACTION_PROFILE_TYPES.deleteFail;
	data: object = {};
}
