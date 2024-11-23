import { Action, ActionType } from './action';

export const ACTION_CREATE_GROUP_TYPES = {
	goToCreateGroup: 'actionCreatePostGoTo',
};

export class ActionCreateGroupGoTo implements Action {
	type: ActionType = ACTION_CREATE_GROUP_TYPES.goToCreateGroup;
	data: object = {};
}
