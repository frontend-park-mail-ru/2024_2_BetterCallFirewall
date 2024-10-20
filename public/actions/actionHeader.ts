import { Action, ActionType } from './action';

export const ACTION_HEADER_TYPES = {
	logoutClick: 'logoutClick',
};

export class ActionHeaderLogoutClick implements Action {
	type: ActionType;
	data: object;
	constructor() {
		this.type = ACTION_HEADER_TYPES.logoutClick;
		this.data = {};
	}
}
