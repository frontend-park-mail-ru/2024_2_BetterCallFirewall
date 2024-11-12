import { Action, ActionType } from './action';

export const ACTION_LOGIN_TYPES = {
	toSignupClick: 'actionLoginToSignupClick',
};

export class ActionLoginToSignupClick implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_LOGIN_TYPES.toSignupClick;
		this.data = {};
	}
}
