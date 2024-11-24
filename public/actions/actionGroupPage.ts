import { FullGroupResponse } from '../models/group';
import { Action, ActionType } from './action';

export const ACTION_GROUP_PAGE_TYPES = {
	groupPageRequest: 'groupPageRequest',
    groupPageRequestSuccess: 'groupPageRequestSuccess',
    updateGroupPage: 'updateGroupPage',
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