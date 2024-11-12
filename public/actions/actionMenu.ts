import { Action, ActionType } from './action';

export const ACTION_MENU_TYPES = {
	titleClick: 'menuTitleClick',
	updateProfileLinkHref: 'menuUpdateProfileLinkHref',
};

export interface ActionMenuLinkClickData {
	href: string;
}

export class ActionMenuTitleClick implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_MENU_TYPES.titleClick;
		this.data = {};
	}
}

export interface ActionUpdateProfileLinkHrefData {
	href: string;
}

export class ActionMenuUpdateProfileLinkHref implements Action {
	type: ActionType;
	data: ActionUpdateProfileLinkHrefData;

	constructor(href: string) {
		this.type = ACTION_MENU_TYPES.updateProfileLinkHref;
		this.data = { href };
	}
}
