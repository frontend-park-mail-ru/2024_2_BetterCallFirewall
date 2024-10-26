import { Action, ActionType } from './action';

export const ACTION_MENU_TYPES = {
	menuLinkClick: 'menuLinkClick',
	titleClick: 'menuTitleClick',
};

export interface ActionMenuLinkClickData {
	href: string;
}

export class ActionMenuLinkClick implements Action {
	type: ActionType;
	data: ActionMenuLinkClickData;
	constructor(type: ActionType, data: ActionMenuLinkClickData) {
		this.type = type;
		this.data = data;
	}
}

export class ActionMenuTitleClick implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_MENU_TYPES.titleClick;
		this.data = {};
	}
}
