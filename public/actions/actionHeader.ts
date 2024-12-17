import { Action, ActionType } from './action';

export const ACTION_HEADER_TYPES = {
	logout: 'actionLogout',
	logoutSuccess: 'logoutSuccess',
	logoutFail: 'logoutFail',
	searchResultsSwitch: 'actionHeaderSearchResultsSwitch',
};

export class ActionLogout implements Action {
	type: string = ACTION_HEADER_TYPES.logout;
	data: object = {};
}
export class ActionHeaderLogoutSuccess implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_HEADER_TYPES.logoutSuccess;
		this.data = {};
	}
}

export class ActionHeaderLogoutFail implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_HEADER_TYPES.logoutFail;
		this.data = {};
	}
}

export interface ActionHeaderSearchResultsSwitchData {
	show: boolean;
}

export class ActionHeaderSearchResultsSwitch implements Action {
	type: ActionType = ACTION_HEADER_TYPES.searchResultsSwitch;
	data: ActionHeaderSearchResultsSwitchData;

	constructor(show: boolean) {
		this.data = { show };
	}
}
