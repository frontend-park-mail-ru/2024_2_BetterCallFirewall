import { FullGroupResponse } from '../models/group';
import { PostResponse } from '../models/post';
import { Action, ActionType } from './action';

export const ACTION_GROUP_PAGE_TYPES = {
	groupPageRequest: 'actionGroupPageRequest',
	groupPageRequestSuccess: 'actionGroupPageRequestSuccess',
	updateGroupPage: 'actionUpdateGroupPage',
	deleteGroup: 'actionDeleteGroup',
	deleteGroupSuccess: 'actionDeleteGroupSuccess',
	postsRequest: 'actionGroupPagePostsRequest',
	postsRequestSuccess: 'actionGroupPagePostsRequestSuccess',
	postsRequestFail: 'actionGroupPagePostsRequestFail',
};

export interface ActionUpdateGroupPageData {}

export class ActionUpdateGroupPage implements Action {
	type: ActionType = ACTION_GROUP_PAGE_TYPES.updateGroupPage;
	data: ActionUpdateGroupPageData = {};
}

export interface ActionGroupPageRequestData {
	href: string;
}

export class ActionGroupPageRequest implements Action {
	type: ActionType;
	data: ActionGroupPageRequestData;

	constructor(groupPageHref: string) {
		this.type = ACTION_GROUP_PAGE_TYPES.groupPageRequest;
		this.data = { href: groupPageHref };
	}
}

export interface ActionGroupPageRequestSuccessData {
	groupPageResponse: FullGroupResponse;
}

export class ActionGroupPageRequestSuccess implements Action {
	type: ActionType;
	data: ActionGroupPageRequestSuccessData;

	constructor(data: ActionGroupPageRequestSuccessData) {
		this.type = ACTION_GROUP_PAGE_TYPES.groupPageRequestSuccess;
		this.data = data;
	}
}

export interface ActionGroupPageDeleteData {
	groupId: number;
}

export class ActionGroupPageDeleteGroup implements Action {
	type: ActionType;
	data: ActionGroupPageDeleteData;

	constructor(groupId: number) {
		this.type = ACTION_GROUP_PAGE_TYPES.deleteGroup;
		this.data = { groupId: groupId };
	}
}

export class ActionGroupPageDeleteGroupSuccess implements Action {
	type: ActionType;
	data: object = {};

	constructor() {
		this.type = ACTION_GROUP_PAGE_TYPES.deleteGroupSuccess;
	}
}

export interface ActionGroupPagePostsRequestData {
	groupId: number;
}
export class ActionGroupPagePostsRequest implements Action {
	type: ActionType = ACTION_GROUP_PAGE_TYPES.postsRequest;
	data: ActionGroupPagePostsRequestData;

	constructor(groupId: number) {
		this.data = { groupId };
	}
}

export interface ActionGroupPagePostsRequestSuccessData {
	postsResponses: PostResponse[];
}
export class ActionGroupPagePostsRequestSuccess implements Action {
	type: ActionType = ACTION_GROUP_PAGE_TYPES.postsRequest;
	data: ActionGroupPagePostsRequestSuccessData;

	constructor(postsResponses: PostResponse[]) {
		this.data = { postsResponses };
	}
}
