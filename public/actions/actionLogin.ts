import { Action, ActionType } from './action';

export const ACTION_LOGIN_TYPES = {
	actionLoginToSignupClick: 'actionLoginToSignupClick',
	loginClickSuccess: 'loginClickSuccess',
};

export class ActionLoginToSignupClick implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_LOGIN_TYPES.actionLoginToSignupClick;
		this.data = {};
	}
}

export class ActionLoginClickSuccess implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_LOGIN_TYPES.loginClickSuccess;
		this.data = {};
	}
}
