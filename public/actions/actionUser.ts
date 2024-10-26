import { Action, ActionType } from './action';

export const ACTION_USER_TYPES = {
	loginClickSuccess: 'loginClickSuccess',
	signupClickSuccess: 'signupClickSuccess',
};

export class ActionSignupClickSuccess implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_USER_TYPES.signupClickSuccess;
		this.data = {};
	}
}

export class ActionLoginClickSuccess implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_USER_TYPES.loginClickSuccess;
		this.data = {};
	}
}
