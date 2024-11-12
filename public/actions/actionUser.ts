import { Action, ActionType } from './action';

export const ACTION_USER_TYPES = {
	unauthorized: 'actionUserUnauthorized',
	auth: 'actionUserAuth',
};

export class ActionUserUnauthorized implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_USER_TYPES.unauthorized;
		this.data = {};
	}
}

export class ActionUserAuth implements Action {
	type: ActionType = ACTION_USER_TYPES.auth;
	data: object = {};
}
