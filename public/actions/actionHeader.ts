import { Action, ActionType } from './action';

export const ACTION_HEADER_TYPES = {
	logoutClickSuccess: 'logoutClickSuccess',
	logoutClickFail: 'logoutClickFail',
	searchResultsSwitch: 'actionHeaderSearchResultsSwitch',
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
