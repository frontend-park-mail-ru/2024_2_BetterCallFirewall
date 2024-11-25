import { ShortGroupResponse } from '../models/group';
import { Action, ActionType } from './action';

export const ACTION_GROUPS_TYPES = {
	getGroups: 'actionGroupsGetGroups',
	getGroupsSuccess: 'actionGroupsGetGroupsSuccess',
	groupsUnfollowGroup: 'actionGroupsUnfollowGroup',
	groupsUnfollowGroupSuccess: 'actionGroupUnfollowSuccess',
	groupsFollowGroup: 'actionGroupsFollowGroup',
	groupsFollowGroupSuccess: 'actionGroupFollowSuccess',
	search: 'actionGroupsSearch',
	searchSuccess: 'actionGroupsSearchSuccess',
	searchFail: 'actionGroupsSearchFail',
	editSuccess: 'actionGroupsEditSuccess',
	editFail: 'actionGroupsEditFail',
};

export class ActionGroupsGetGroups implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_GROUPS_TYPES.getGroups;
		this.data = {};
	}
}

export interface ActionGroupsGetGroupsSuccessData {
	groups: ShortGroupResponse[];
}

export class ActionGroupsGetGroupsSuccess implements Action {
	type: ActionType;
	data: ActionGroupsGetGroupsSuccessData;

	constructor(data: ActionGroupsGetGroupsSuccessData) {
		this.type = ACTION_GROUPS_TYPES.getGroupsSuccess;
		this.data = data;
	}
}

export interface ActionGroupsSearchData {
	str: string;
	lastId?: number;
}
export class ActionGroupsSearch implements Action {
	type: ActionType = ACTION_GROUPS_TYPES.search;
	data: ActionGroupsSearchData;

	constructor(str: string, lastId?: number) {
		this.data = { str, lastId };
	}
}

export interface ActionGroupsFollowGroupData {
	groupId: number;
}

export class ActionGroupsUnfollowGroup implements Action {
	type: ActionType;
	data: ActionGroupsFollowGroupData;
	constructor(groupId: number) {
		this.type = ACTION_GROUPS_TYPES.groupsUnfollowGroup;
		this.data = { groupId: groupId };
	}
}

export class ActionGroupsUnfollowGroupSuccess implements Action {
	type: ActionType;
	data: object = {};

	constructor() {
		this.type = ACTION_GROUPS_TYPES.groupsUnfollowGroupSuccess;
	}
}

export class ActionGroupsFollowGroup implements Action {
	type: ActionType;
	data: ActionGroupsFollowGroupData;

	constructor(groupId: number) {
		this.type = ACTION_GROUPS_TYPES.groupsFollowGroup;
		this.data = { groupId: groupId };
	}
}

export class ActionGroupsFollowGroupSuccess implements Action {
	type: ActionType;
	data: object = {};

	constructor() {
		this.type = ACTION_GROUPS_TYPES.groupsFollowGroupSuccess;
	}
}

export interface ActionGroupsSearchSuccessData {
	groupsResponses: ShortGroupResponse[];
}
export class ActionGroupsSearchSuccess implements Action {
	type: ActionType = ACTION_GROUPS_TYPES.searchSuccess;
	data: ActionGroupsSearchSuccessData;

	constructor(groupsResponses: ShortGroupResponse[]) {
		this.data = { groupsResponses };
	}
}

export class ActionGroupsSearchFail implements Action {
	type: ActionType = ACTION_GROUPS_TYPES.searchSuccess;
	data: object = {};
}

export class ActionGroupsEditSuccess implements Action {
	type: ActionType = ACTION_GROUPS_TYPES.editSuccess;
	data: object = {};
}

export class ActionGroupsEditFail implements Action {
	type: ActionType = ACTION_GROUPS_TYPES.editFail;
	data: object = {};
}
