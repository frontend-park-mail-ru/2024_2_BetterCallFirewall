import { Action, ActionType } from './action';

export const ACTION_CREATE_GROUP_TYPES = {
	goToCreateGroup: 'actionCreateGroupGoTo',
	createSuccess: 'actionGroupsCreateSuccess',
};

export class ActionCreateGroupGoTo implements Action {
	type: ActionType = ACTION_CREATE_GROUP_TYPES.goToCreateGroup;
	data: object = {};
}

export interface ActionCreateGroupSuccessData {
	id: number;
}
export class ActionCreateGroupSuccess implements Action {
	type: ActionType = ACTION_CREATE_GROUP_TYPES.createSuccess;
	data: ActionCreateGroupSuccessData;

	constructor(id: number) {
		this.data = { id };
	}
}
