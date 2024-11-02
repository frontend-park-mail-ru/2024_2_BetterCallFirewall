import { Action, ActionType } from './action';

export const ACTION_USER_TYPES = {
	unauthorized: 'actionUserUnauthorized',
};

export class ActionUserUnauthorized implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_USER_TYPES.unauthorized;
		this.data = {};
	}
}
