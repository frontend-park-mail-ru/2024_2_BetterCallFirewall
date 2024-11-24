import { ShortGroupResponse } from '../models/group';
import { Action, ActionType } from './action';

export const ACTION_GROUPS_TYPES = {
    getGroups: 'actionGroupsGetGroups',
    getGroupsSuccess: 'actionGroupsGetGroupsSuccess',
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

