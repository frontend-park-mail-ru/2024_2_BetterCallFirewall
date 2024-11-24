import { ShortGroupResponse } from '../models/group';
import { Action, ActionType } from './action';

export const ACTION_GROUPS_TYPES = {
    getGroups: 'actionGroupsGetGroups',
    getGroupsSuccess: 'actionGroupsGetGroupsSuccess',
    groupsUnfollowGroup: 'actionGroupsUnfollowGroup',
    groupsUnfollowGroupSuccess: 'actionGroupUnfollowSuccess',
	search: 'actionGroupsSearch',
	searchSuccess: 'actionGroupsSearchSuccess',
	searchFail: 'actionGroupsSearchFail',
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

export interface ActionGroupsUnfollowGroupData {
    groupId: number;
}

export class ActionGroupsUnfollowGroup implements Action {
    type: ActionType;
    data: ActionGroupsUnfollowGroupData;
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

export class ActionGroupSearchFail implements Action {
	type: ActionType = ACTION_GROUPS_TYPES.searchSuccess;
	data: object = {};
}
