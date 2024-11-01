import { Action, ActionType } from './action';

export const ACTION_SIGNUP_TYPES = {
	toLoginLinkClick: 'toLoginLinkClick',
	signupClickSuccess: 'signupClickSuccess',
};

export class ActionSignupToLoginClick implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_SIGNUP_TYPES.toLoginLinkClick;
		this.data = {};
	}
}

export class ActionSignupClickSuccess implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_SIGNUP_TYPES.signupClickSuccess;
		this.data = {};
	}
}
