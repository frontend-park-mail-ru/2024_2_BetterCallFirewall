import { Action, ActionType } from './action';

export const ACTION_USER_TYPES = {
	loginClickSuccess: 'loginClickSuccess',
	signupClickSuccess: 'signupClickSuccess',
	formError: 'formError',
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

export interface IFormErrorData {
	formError: string;
}

export class ActionFormError {
	type: ActionType;
	data: object;
	constructor(message: string) {
		this.type = ACTION_USER_TYPES.formError;
		this.data = {
			formError: message,
		};
	}
}
