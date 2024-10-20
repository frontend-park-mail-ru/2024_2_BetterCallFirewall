import { Action } from './action';

export const ACTION_USER_TYPES = {
	logoutClick: 'logout',
};

export class ActionLogoutClick implements Action {
	type: string;
	data: object;
	constructor() {
		this.type = ACTION_USER_TYPES.logoutClick;
		this.data = {};
	}
}
