import { Action, ActionType } from './action';

export const ACTION_HEADER_TYPES = {
	logoutClickSuccess: 'logoutClickSuccess',
	logoutClickFail: 'logoutClickFail',
};

export class ActionHeaderLogoutClickSuccess implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_HEADER_TYPES.logoutClickSuccess;
		this.data = {};
	}
}

export class ActionHeaderLogoutClickFail implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_HEADER_TYPES.logoutClickFail;
		this.data = {};
	}
}
